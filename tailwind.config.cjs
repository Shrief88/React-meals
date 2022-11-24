/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  
  theme: {
    extend: {
      keyframes: {
        pump: {
          '0% ,100%': { transform: 'scale(1)' },
          '10%': { transform: 'scale(0.9)' },
          '30%': { transform: 'scale(1.1)'},
          '50%': { transform: 'scale(1.15)'},
        }
      },
      animation:{
        pump : 'pump 300ms ease-out'
      } 
    } 
     
  },
  
}
