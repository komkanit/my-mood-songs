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
        'theme-bg-blue': "#017AFF",
        'theme-blue': "#3A90CD",
        'theme-yellow': "#FDBC3B",
        'buy-me-coffee': "#FFDD00",
        'theme-grey': "#DFE8F3",
        'theme-text-grey': "#555555",
        'theme-green': "#32B15D",
        'theme-red': '#E2383E',
        'theme-orange': '#F47D35',
      },
      scale: {
        '110': '1.1',
        '250': '2.5',
      },
      height: {
        '30vh': '30vh',
        '40vh': '40vh',
      },
      animation: {
        wiggle: 'wiggle 1.5s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(12deg) scale(1.1)' },
          '50%': { transform: 'rotate(-12deg) scale(1)' },
        }
      }
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
  ],
}
