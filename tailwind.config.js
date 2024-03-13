/** @type {import('tailwindcss').Config} */
module.exports = {
    theme : {
      extend : {
        backgroundImage: {
          'hero-pattern': "url('static/images/main.jpg')",
          'footer-texture': "url('/img/footer-texture.png')",
        }
      }
    },
  content: [
    "./static/css/style.css.{js,css}",
    "./views/layouts/main.hbs",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  darkMode: "class",
  plugins: [require("tw-elements/plugin.cjs")],
};