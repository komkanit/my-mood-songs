/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-blue': "#017AFF",
        'theme-yellow': "#FFF11E",
        'theme-grey': "#DFE8F3",
      }
    },
  },
  plugins: [],
}
