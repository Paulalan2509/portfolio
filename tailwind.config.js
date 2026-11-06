/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        cream: '#f7f3e9',
        paper: '#fffdf8',
        forest: '#18231d',
        gold: '#d99b37',
        'gold-soft': '#f1d6a5',
        ink: '#191713',
        muted: '#615e55'
      },
      fontFamily: {
        display: ['Bricolage', 'Arial', 'sans-serif'],
        sans: ['Figtree', 'Arial', 'sans-serif']
      }
    }
  }
};
