/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or false
  content: [],
  theme: {
    // height:{
    //   evo:'1212px'
    // },
    extend: {
      height:{
        // full : 951    body:831
          evo:'1237px'
        },
    },
  },
  plugins: [],
}

