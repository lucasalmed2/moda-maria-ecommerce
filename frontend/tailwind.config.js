/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta inspirada no logo da Moda Maria (rosa claro + dourado)
        blush: {
          50: '#fdf2f5',
          100: '#fce7ed',
          200: '#f9cedb',
          300: '#f4a7bd',
          400: '#ed7397',
          500: '#e04672',
          600: '#c92c58',
          700: '#a81f47',
          800: '#8c1d3f',
          900: '#781c3a',
        },
        gold: {
          50: '#fdfaf0',
          100: '#faf1d9',
          200: '#f3e0ad',
          300: '#eaca78',
          400: '#e0b148',
          500: '#d29a2e',
          600: '#b57c23',
          700: '#925e20',
          800: '#784c20',
          900: '#66401f',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
