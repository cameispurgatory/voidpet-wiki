module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "bg": "#E8E9F0",
        "bg-dark": "#0d1118",
        "accent": "#4d586f",
      }
    },
  },
  plugins: [require("@tailwindcss/typography"), require('@tailwindcss/forms')],
};
