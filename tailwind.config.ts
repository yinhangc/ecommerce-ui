import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        twine: {
          "50": "#faf6f2",
          "100": "#f3ece1",
          "200": "#e6d7c2",
          "300": "#d6bc9b",
          "400": "#c7a17a",
          "500": "#b88457",
          "600": "#aa714c",
          "700": "#8e5b40",
          "800": "#734b39",
          "900": "#5d3e31",
          "950": "#321f18",
        },
      },
    },
  },
  plugins: [],
};
export default config;
