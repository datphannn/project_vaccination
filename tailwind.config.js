/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          600: '#0891b2',
          800: '#155e75',
          900: '#164e63',
        },
        teal: {
          600: '#0d9488',
        }
      }
    },
  },
  plugins: [],
}