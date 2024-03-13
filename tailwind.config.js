/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./static/css/style.css.{js,css}",
    "./views/layouts/main.hbs",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  darkMode: "class",
  plugins: [require("tw-elements/plugin.cjs")],
};