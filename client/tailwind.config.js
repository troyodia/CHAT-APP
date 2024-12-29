/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        images: "url('./images/background.jpg')",
      },
      keyframes: {
        pulsing: {
          "0%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.5",
          },
          "100%": {
            opacity: "1",
          },
        },
        highlight: {
          "0%": { backgroundColor: "#6e6e74" },
          "100%": { backgroundColor: "transparent" },
        },
      },
      animation: {
        pulsing: "pulsing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        highlight: "highlight 2s ease-in-out",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        /* Chrome, Safari and Opera */
        ".scrollbar-hidden::-webkit-scrollbar": {
          display: "none",
        },

        ".scrollbar-hidden": {
          "scrollbar-width": "none" /* Firefox */,
          "-ms-overflow-style": "none" /* IE and Edge */,
        },
      });
    }),
  ],
};
