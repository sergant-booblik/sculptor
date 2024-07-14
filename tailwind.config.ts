import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '32px',
      },
      screens: {
        DEFAULT: '1100px',
      }
    },
  },
  plugins: [],
} satisfies Config;
