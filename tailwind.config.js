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
        'theme-yellow': "#FDBC3B",
        'theme-grey': "#DFE8F3",
        'theme-text-grey': "#555555",
        'theme-green': "#32B15D",
        'theme-red': '#E2383E',
        'theme-orange': '#F47D35',
      },
      scale: {
        '250': '2.5',
      },
      height: {
        '30vh': '30vh',
        '40vh': '40vh',
      }
    },
  },
  plugins: [],
}
