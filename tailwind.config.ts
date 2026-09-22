import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary accent — champagne gold
        gold: {
          50:  "#fdfbf3",
          100: "#f9f0d0",
          200: "#f2df9e",
          300: "#e8c96a",
          400: "#C9A84C",   // ← main accent
          500: "#b08d35",
          600: "#8e6e24",
          700: "#6d5119",
          800: "#4e3910",
          900: "#34260a",
        },
        // Secondary accent — deep violet
        violet: {
          50:  "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#7C3AED",   // ← main secondary
          600: "#6B21A8",   // ← deep secondary
          700: "#5b21b6",
          800: "#4c1d95",
          900: "#2e1065",
        },
        // Keep cyber scale for legacy utility refs (mapped to gold shades)
        cyber: {
          50:  "#fdfbf3",
          100: "#f9f0d0",
          200: "#f2df9e",
          300: "#e8c96a",
          400: "#C9A84C",
          500: "#b08d35",
          600: "#8e6e24",
          700: "#6d5119",
          800: "#4e3910",
          900: "#34260a",
        },
        neon: {
          purple: "#7C3AED",
          pink:   "#db2777",
          cyan:   "#C9A84C",   // legacy ref → maps to gold
          blue:   "#4361ee",
        },
        dark: {
          950: "#080608",
          900: "#0d0b10",
          800: "#141019",
          700: "#1c1525",
          600: "#251d30",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      // Extend opacity scale with values used in the codebase (/4, /8, /12)
      // that are absent from Tailwind v3's default scale (5,10,15,20…).
      opacity: {
        "4":  "0.04",
        "8":  "0.08",
        "12": "0.12",
      },
      animation: {
        "pulse-slow":    "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow":          "glow 3s ease-in-out infinite alternate",
        "float":         "float 7s ease-in-out infinite",
        "scan":          "scan 6s linear infinite",
        "waveform":      "waveform 1.4s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          from: { boxShadow: "0 0 12px rgba(201,168,76,0.4), 0 0 24px rgba(201,168,76,0.2)" },
          to:   { boxShadow: "0 0 20px rgba(124,58,237,0.5), 0 0 45px rgba(124,58,237,0.25)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        scan: {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        waveform: {
          "0%, 100%": { transform: "scaleY(0.25)" },
          "50%":      { transform: "scaleY(1)" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 70%)",
        "hero-gradient":
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 60%)",
      },
      backgroundSize: {
        "grid": "40px 40px",
      },
    },
  },
  plugins: [],
};

export default config;
