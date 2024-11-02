/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  themes:[],
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [], // Disable all default themes
},
}

