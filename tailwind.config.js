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
      },
      colors: {
        cardLightRed: "#FFECEF",
        cardRed: "#F0173D",
        cardLightBlue: "#E3EFFD",
        cardBlue: "#3F5FB4",
        cardLightPurple: "#E0E4FF",
        cardPurple: "#0A1785",
        cardLightGreen: "#E9FDFF",
        cardGreen: "#0F7E86",
        cardLightYellow: "#FFF6ED",
        cardYellow: "#FFB800",
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
