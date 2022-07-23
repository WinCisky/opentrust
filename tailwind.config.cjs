/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,html}",
    "./src/assets/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    minWidth: {
      '400': '400px',
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
