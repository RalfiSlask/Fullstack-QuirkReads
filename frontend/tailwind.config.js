/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#FFFFFF',
        'secondary': '#FFF8F1',
        'primaryBtn': '#AFD1D4',
        'primaryBtn-hover': '#FFB7A8',
        'primaryBtn-shadow': 'rgba(255, 214, 186, 0.5)',
        'primaryBtn-border': '#FF87A8',
        'header': '#FFD6BA',
        'grayText': '#828282',
      },
      boxShadow: {
        soft1: '0 0 8px 0 rgba(175, 209, 212, 0.8)',
      },
    },
  },
  plugins: [],
};
