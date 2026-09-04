"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const OceanExample = dynamic(() => import("@/fft-ocean-surface"), {
  ssr: false,
  loading: () => <FallbackGradient />,
});

function FallbackGradient() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0F2854] via-[#08152E] to-[#010618] opacity-90 pointer-events-none transition-opacity duration-1000">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(203,145,131,0.15),transparent_60%)]" />
    </div>
  );
}

class WebGPUErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn("WebGPU initialization fallback:", error);
  }

  render() {
    if (this.state.hasError) {
      return <FallbackGradient />;
    }
    return this.props.children;
  }
}

export function WebGPUOceanCanvas() {
  const [hasWebGPU, setHasWebGPU] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("gpu" in navigator) {
        setHasWebGPU(true);
      } else {
        setHasWebGPU(false);
      }
    }
  }, []);

  if (hasWebGPU === false) {
    return <FallbackGradient />;
  }

  return (
    <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-screen overflow-hidden">
      <WebGPUErrorBoundary>
        {hasWebGPU && <OceanExample />}
      </WebGPUErrorBoundary>
      <FallbackGradient />
    </div>
  );
}
