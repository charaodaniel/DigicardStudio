/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './**/*.html',
    './js/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        headline: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        primary: '#5048e5',
      },
    },
  },
  plugins: [],
}
