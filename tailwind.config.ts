import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Verde esmeralda como color principal de marca
        brand: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        // Acento azul-cian
        accent: {
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
        // Superficies oscuras
        ink: {
          950: "#08090b",
          900: "#0e0f12",
          800: "#15171b",
          700: "#1e2127",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -15px rgba(16, 185, 129, 0.35)",
        card: "0 8px 30px -12px rgba(0, 0, 0, 0.6)",
        glow: "0 0 0 1px rgba(16,185,129,0.25), 0 18px 50px -16px rgba(16,185,129,0.45)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out both",
        floaty: "floaty 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
