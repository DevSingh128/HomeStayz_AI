/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",   // Yeh line sabse important hai, taaki views folder scan ho ske
    "./public/**/*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}