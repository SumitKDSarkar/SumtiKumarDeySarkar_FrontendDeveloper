module.exports = {
  purge: ['./src/**/*.html', './src/**/*.jsx'], // Specify your HTML/JSX files here
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    // You can add other plugins here if needed
  ],
};
