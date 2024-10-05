/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        images: "url('./images/background.jpg')",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
