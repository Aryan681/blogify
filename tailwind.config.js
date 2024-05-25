/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.ejs',],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        gradient: 'gradient 5s ease infinite',
      },
    },
  },
  plugins: [],
}

