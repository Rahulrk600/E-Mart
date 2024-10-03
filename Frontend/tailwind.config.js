/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        move:{
          '0% ,100%':{transform: 'translwteX(0) translwteY(0) '},
          '50%': {transform: 'translwteX(10px) translwteY(10px) '},
        },
      },
      animation:{
        move:'move 1s linear infinite'
      }
    },
  },
  plugins: [],
}

