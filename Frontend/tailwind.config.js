/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      fontSize: {
        '11px': '11px',
        '14px':'14px'
      },
      colors: {
        'primary': '#b68bdcb1',
        'secondary': '#2E4CFF',
        'third' : '#6f42c1'
      },
      
    },
  },
  plugins: [],
}