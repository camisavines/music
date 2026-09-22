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
        cyber: {
          50:  "#f0feff",
          100: "#ccfbff",
          200: "#99f6ff",
          300: "#55edff",
          400: "#06d6f5",
          500: "#00b9d9",
          600: "#0093b5",
          700: "#007592",
          800: "#065f77",
          900: "#0a4f63",
        },
        neon: {
          purple: "#9b5de5",
          pink:   "#f72585",
          cyan:   "#00f5d4",
          blue:   "#4361ee",
        },
        dark: {
          950: "#020408",
          900: "#060d17",
          800: "#0b1628",
          700: "#101f38",
          600: "#162848",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "pulse-slow":    "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow":          "glow 2s ease-in-out infinite alternate",
        "float":         "float 6s ease-in-out infinite",
        "scan":          "scan 4s linear infinite",
        "waveform":      "waveform 1.2s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          from: { boxShadow: "0 0 10px #06d6f5, 0 0 20px #06d6f5" },
          to:   { boxShadow: "0 0 20px #9b5de5, 0 0 40px #9b5de5, 0 0 60px #9b5de5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        scan: {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        waveform: {
          "0%, 100%": { transform: "scaleY(0.3)" },
          "50%":      { transform: "scaleY(1)" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(6,214,245,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6,214,245,0.05) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(ellipse at center, rgba(9,117,146,0.15) 0%, transparent 70%)",
        "hero-gradient":
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6,214,245,0.1) 0%, transparent 60%)",
      },
      backgroundSize: {
        "grid": "40px 40px",
      },
    },
  },
  plugins: [],
};

export default config;
