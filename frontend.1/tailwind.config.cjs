/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "mint-green": {
          200: "rgba(223, 255, 220, 1)",
          500: "rgba(162, 255, 147, 1)",
        },
      },
    },
  },
  plugins: [],
};
