/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        robotoText: ["Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
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
