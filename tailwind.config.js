module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.jsx"], // Specify  HTML/JSX files
  darkMode: true,
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
