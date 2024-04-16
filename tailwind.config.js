/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto"],
        robotoCondensed: ["Roboto Condensed"],
        inter: ["Inter", "sans-serif"],
        helvetica: ["Helvetica Neue", "sans-serif"],
      }
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
  daisyui: {
    themes: ["light"],
  }
};
