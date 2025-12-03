import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0a1a2a",
        gold: "#d4af37",
        ivory: "#f7f5f0"
      },
      boxShadow: {
        luxe: "0 20px 45px rgba(10, 26, 42, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
