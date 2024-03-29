import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // https://www.color-hex.com/color-palette/30023
      // https://uicolors.app/create
      colors: {
        leather: {
          "50": "#f6f3f0",
          "100": "#e9e1d8",
          "200": "#d4c5b4",
          "300": "#bba289",
          "400": "#a78468",
          "500": "#967259",
          "600": "#825e4c",
          "700": "#69493f",
          "800": "#5a3f39",
          "900": "#4e3835",
          "950": "#2c1d1c",
        },
      },
      fontSize: {
        xxs: [".6rem", ".75rem"],
      },
    },
  },
  plugins: [],
};
export default config;
