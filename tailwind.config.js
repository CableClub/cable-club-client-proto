module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'gameboy-green': {
          darkest: '#0f380f',
          DEFAULT: '#306230',
          light: '#8bac0f',
          lightest: '#9bbc0f',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
