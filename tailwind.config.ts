import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // https://www.color-hex.com/color-palette/30023
      // https://uicolors.app/create
      colors: {
        'dark-blue': '#193a6f',
        blue: '#5b84c4',
        // orange: '#f98125',
      },
      fontSize: {
        xxs: ['.6rem', '.75rem'],
      },
    },
  },
  plugins: [],
};
export default config;
