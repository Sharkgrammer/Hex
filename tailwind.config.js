/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#F4A300',
        'main-dark': '#D68800',
        'main-light': '#FFC45E',
      }
    },
  },
  plugins: [],
}

