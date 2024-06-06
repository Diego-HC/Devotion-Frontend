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
        devotionPrimary: "#2A4365",
        devotionSecondary: "#E1EFFF",
        devotionAccent: "#5CCEFF",
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
        notStarted: "#363636",
        notStartedLight: "#f1eeee",
        inProgress: "#FFC700",
        inProgressLight: "#fffae9",
        inReview: "#0094D3",
        inReviewLight: "#e7fcff",
        done: "#00D387",
        doneLight: "#e8ffee",
        ludicrousSpeed: "#FE57E6",
        altBreadcrumbs: "#dcecf6",
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
