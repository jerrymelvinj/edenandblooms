import {
  compute,
  draw,
  effect,
  geometry,
  sampler,
  storage,
  target,
  type Gpu,
} from "vgpu";
import { sphere } from "vgpu/scene";

import bakeShaderRaw from "./bake.wgsl";
import compositeWgslRaw from "./composite.wgsl";
import fftColWgslRaw from "./fft-col.wgsl";
import fftRowWgslRaw from "./fft-row.wgsl";
import oceanSurfaceWgslRaw from "./ocean-surface.wgsl";
import skydomeWgslRaw from "./skydome.wgsl";
import spectrumInitWgslRaw from "./spectrum-init.wgsl";
import spectrumUpdateWgslRaw from "./spectrum-update.wgsl";

function toWgsl(mod: any): string {
  if (typeof mod === "string") return mod;
  if (mod && typeof mod.default === "string") return mod.default;
  return String(mod || "");
}

const bakeShader = toWgsl(bakeShaderRaw);
const compositeWgsl = toWgsl(compositeWgslRaw);
const fftColWgsl = toWgsl(fftColWgslRaw);
const fftRowWgsl = toWgsl(fftRowWgslRaw);
const oceanSurfaceWgsl = toWgsl(oceanSurfaceWgslRaw);
const skydomeWgsl = toWgsl(skydomeWgslRaw);
const spectrumInitWgsl = toWgsl(spectrumInitWgslRaw);
const spectrumUpdateWgsl = toWgsl(spectrumUpdateWgslRaw);

export const OCEAN_CAMERA = {
  fov: 48,
  near: 1,
  far: 8000,
  position: [0, 24, 128] as const,
  target: [0, 5, 0] as const,
};

export const DEFAULT_PARAMS = {
  windSpeed: 24,
  windAngle: 18,
  amplitude: 4,
  patchSize: 265,
  heightScale: 34,
  choppyScale: 14,
  foamScale: 0.5,
  sunElevation: 6.5,
  sunAzimuth: 236,
  timeScale: 1,
};

export type OceanParams = typeof DEFAULT_PARAMS;
type Destroyable = { destroy(): void };
type Size = readonly [number, number];

const N = 256;
const COMPLEX_BYTES = N * N * 2 * 4;
const VEC4_BYTES = N * N * 4 * 4;
const GRID = 512;
const WORLD_SIZE = 1000;
const SKY_RADIUS = 6000;
const DEG = Math.PI / 180;
const CLEAR = [0.02, 0.02, 0.04, 1] as const;

export function buildOcean(gpu: Gpu, size: Size) {
  const resources = new Set<object>();
  const own = <T extends object>(resource: T): T => {
    resources.add(resource);
    return resource;
  };
  const release = (resource: object): void => {
    resources.delete(resource);
    isDestroyable(resource) && resource.destroy();
  };

  try {
    const params: OceanParams = { ...DEFAULT_PARAMS };
    const simUniform = (simTime: number) => ({
      wind: [
        Math.cos(params.windAngle * DEG) * params.windSpeed,
        Math.sin(params.windAngle * DEG) * params.windSpeed,
      ],
      amplitude: params.amplitude,
      patchSize: params.patchSize,
      heightScale: params.heightScale,
      choppyScale: params.choppyScale,
      foamScale: params.foamScale,
      simTime,
    });
    const sunDir = (): readonly [number, number, number] => {
      const el = params.sunElevation * DEG;
      const az = params.sunAzimuth * DEG;
      return [
        Math.cos(el) * Math.sin(az),
        Math.sin(el),
        Math.cos(el) * Math.cos(az),
      ];
    };
    const oceanUniform = (
      viewProj: Float32Array,
      camPos: ArrayLike<number>,
      sun = sunDir()
    ) => ({
      viewProj,
      camPos,
      sunDir: sun,
      worldSize: WORLD_SIZE,
      foamScale: params.foamScale,
    });
    const skyUniform = (
      viewProj: Float32Array,
      camPos: ArrayLike<number>,
      sun = sunDir()
    ) => ({ viewProj, camPos, radius: SKY_RADIUS, sunDir: sun });

    let h0 = own(storage(gpu, VEC4_BYTES, "read-write"));
    const specX = own(storage(gpu, COMPLEX_BYTES, "read-write"));
    const specY = own(storage(gpu, COMPLEX_BYTES, "read-write"));
    const specZ = own(storage(gpu, COMPLEX_BYTES, "read-write"));
    const tmpX = own(storage(gpu, COMPLEX_BYTES, "read-write"));
    const tmpY = own(storage(gpu, COMPLEX_BYTES, "read-write"));
    const tmpZ = own(storage(gpu, COMPLEX_BYTES, "read-write"));
    const displacement = own(storage(gpu, VEC4_BYTES, "read-write"));

    const initPass = compute(gpu, spectrumInitWgsl, {
      set: { h0, sim: simUniform(0) },
    });
    const updatePass = compute(gpu, spectrumUpdateWgsl, {
      set: { h0, specX, specY, specZ, sim: simUniform(0) },
    });
    const rowPass = compute(gpu, fftRowWgsl, {
      set: {
        inX: specX,
        inY: specY,
        inZ: specZ,
        outX: tmpX,
        outY: tmpY,
        outZ: tmpZ,
      },
    });
    const colPass = compute(gpu, fftColWgsl, {
      set: { inX: tmpX, inY: tmpY, inZ: tmpZ, disp: displacement },
    });

    const displacementTarget = own(
      target(gpu, { size: [N, N], format: "rgba16float" })
    );
    const displacementSampler = sampler(gpu, {
      addressModeU: "repeat",
      addressModeV: "repeat",
      minFilter: "linear",
      magFilter: "linear",
    });
    const bake = effect(gpu, bakeShader, {
      set: { disp: displacement },
    });

    const skyGeometry = own(geometry(gpu, sphere({ radius: 1 })));
    const identity = new Float32Array(16);
    const skydome = draw(gpu, {
      shader: skydomeWgsl,
      geometry: skyGeometry,
      cull: "front",
      set: { u: skyUniform(identity, [0, 0, 0]) },
    });
    const ocean = draw(gpu, {
      shader: oceanSurfaceWgsl,
      cull: "none",
      constants: { GRID },
      vertices: 6 * GRID * GRID,
      set: {
        u: oceanUniform(identity, [0, 0, 0]),
        disp: displacementTarget,
        dispSamp: displacementSampler,
      },
    });

    let hdr = own(
      target(gpu, {
        size: [size[0], size[1]],
        format: "rgba16float",
        depth: true,
      })
    );
    const linearSampler = sampler(gpu, {
      minFilter: "linear",
      magFilter: "linear",
    });
    const composite = effect(gpu, compositeWgsl, {
      set: { src: hdr, samp: linearSampler },
    });
    let simTime = 0;
    let destroyed = false;

    initPass.set({ sim: simUniform(0) });
    initPass.dispatch(N / 8, N / 8);

    return {
      params,
      get hdr() {
        return hdr;
      },
      skydome,
      ocean,
      composite,
      clear: CLEAR,
      rebuildSpectrum() {
        const nextH0 = own(storage(gpu, VEC4_BYTES, "read-write"));
        try {
          const nextPass = compute(gpu, spectrumInitWgsl, {
            set: { h0: nextH0, sim: simUniform(0) },
          });
          nextPass.dispatch(N / 8, N / 8);
          updatePass.set({ h0: nextH0 });
        } catch (error) {
          rethrow(error, () => release(nextH0));
        }
        const previous = h0;
        h0 = nextH0;
        release(previous);
      },
      resize(nextSize: Size) {
        const nextHdr = own(
          target(gpu, {
            size: [nextSize[0], nextSize[1]],
            format: "rgba16float",
            depth: true,
          })
        );
        composite.set({ src: nextHdr });
        const previousHdr = hdr;
        hdr = nextHdr;
        release(previousHdr);
      },
      simulate(dt: number) {
        simTime += dt * params.timeScale;
        updatePass.set({ sim: simUniform(simTime) });
        updatePass.dispatch(N / 8, N / 8);
        rowPass.dispatch(1, N);
        colPass.dispatch(N, 1);
        bake.draw(displacementTarget);
      },
      updateCamera(
        viewProj: Float32Array,
        camPos: ArrayLike<number>
      ) {
        skydome.set({ u: skyUniform(viewProj, camPos) });
        ocean.set({ u: oceanUniform(viewProj, camPos) });
      },
      destroy() {
        if (destroyed) return;
        destroyed = true;
        for (const resource of Array.from(resources).reverse()) {
          release(resource);
        }
      },
    };
  } catch (error) {
    for (const resource of Array.from(resources).reverse()) {
      release(resource);
    }
    throw error;
  }
}

export type OceanScene = ReturnType<typeof buildOcean>;

function isDestroyable(resource: unknown): resource is Destroyable {
  return (
    typeof resource === "object" &&
    resource !== null &&
    "destroy" in resource &&
    typeof resource.destroy === "function"
  );
}

function rethrow(error: unknown, cleanup: () => void): never {
  try {
    cleanup();
  } catch {
    // Retain the primary initialization or execution failure.
  }
  throw error;
}
