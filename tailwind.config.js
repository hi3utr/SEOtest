/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        customPrimary: {
          50: '#f1f9fe',
          100: '#e3f1fb',
          200: '#c0e5f7',
          300: '#88d0f1',
          400: '#48b9e8',
          500: '#2aa9df',
          600: '#1281b7',
          700: '#106794',
          800: '#12577a',
          900: '#144966',
          950: '#0d2f44',
        },
        main: '#29a9df',
        yellow: '#F8D982',
        green: '#71CF69',
        red: '#DD3B4F',
        gray: {
          100: '#8A8C92',
          200: '#F4F8FB',
          300: '#727688',
          400: '#B7B8BF',
          500: '#E2E2EC',
          600: '#424242',
          700: '#D3D3DF',
          800: '#777E90',
          900: '#353945',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
};
