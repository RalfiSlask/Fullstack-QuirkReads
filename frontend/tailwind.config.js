/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#F2F2F2',
        'secondary': '#FFFFFF',
        'primaryBtn': '#B0C4DE',
        'primaryBtn-hover': '#A9A9A9',
        'primaryBtn-shadow': 'rgba(0, 0, 0, 0.1)',
        'header': '#B0C4DE',
      },
    },
  },
  plugins: [],
};
