import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "pure-black": "#000000",
        crimson: "#8B0000",
        "crimson-dark": "#4A0000",
        gold: "#C9A961",
        "off-white": "#F5F1E8",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        smallcaps: "0.35em",
      },
      backgroundImage: {
        "crimson-gradient": "linear-gradient(135deg, #8B0000, #4A0000)",
      },
    },
  },
  plugins: [],
};

export default config;
