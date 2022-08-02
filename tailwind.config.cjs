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
    extend: {
      animation: {
        'toast-animation': 'fadein 0.5s, fadeout 0.5s 1.5s',
      },
      keyframes: {
        fadein: {
          'from': { bottom: '0', opacity: '0' },
          'to': {  bottom: '2.5rem', opacity: '1' },
        },
        fadeout: {
          'from': {  bottom: '2.5rem', opacity: '1' },
          'to': { bottom: '0', opacity: '0' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
