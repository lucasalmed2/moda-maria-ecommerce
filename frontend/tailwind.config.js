/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta off-white + marrom, a pedido da dona da loja
        cream: {
          50: '#fefdfb',
          100: '#faf8f4',
          200: '#f2ede4',
          300: '#e8ded0',
          400: '#d8c8ab',
          500: '#c4ad85',
          600: '#a68d63',
          700: '#8a7350',
          800: '#6f5c40',
          900: '#5c4c36',
        },
        caramel: {
          50: '#f7f1ec',
          100: '#ede1d5',
          200: '#d9c1a8',
          300: '#c19f7c',
          400: '#a67c56',
          500: '#8b6239',
          600: '#714d2c',
          700: '#5a3d24',
          800: '#48311f',
          900: '#3b281b',
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
