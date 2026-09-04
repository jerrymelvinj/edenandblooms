import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./fft-ocean-surface/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          base: "#FAF8F5",
          "soft-pink": "#FAF0EE",
          "royal-blue": "#010618",
          "royal-blue-mid": "#0F2854",
          "rose-gold-start": "#A46755",
          "rose-gold-mid": "#FCCDC7",
          "rose-gold-end": "#CB9183",
          "text-main": "#2C3545",
          "text-muted": "#64748B",
          border: "#EAE6DF",
        },
      },
      backgroundImage: {
        "rose-gold-gradient": "linear-gradient(90deg, #A46755 0%, #FCCDC7 50%, #CB9183 100%)",
        "navy-radial": "radial-gradient(ellipse at center, #0F2854 0%, #010618 100%)",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        body: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "sans-serif"],
        script: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
      },
      boxShadow: {
        "brand-sm": "0 4px 12px rgba(1, 6, 24, 0.08)",
        "brand-md": "0 12px 32px rgba(1, 6, 24, 0.16)",
        "brand-lg": "0 24px 48px rgba(1, 6, 24, 0.24)",
      },
      borderRadius: {
        "brand-sm": "6px",
        "brand-md": "12px",
        "brand-lg": "20px font-bold",
      },
    },
  },
  plugins: [],
};

export default config;
