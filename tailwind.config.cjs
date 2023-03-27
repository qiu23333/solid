/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  // 配置指定所有的pages跟components,让tailwind最后可以进行一个摇树优化
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // 
  darkMode: 'class', // or 'media' or 'class'
  theme: {  
    extend: {},
  },
  plugins: [],
}
