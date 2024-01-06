module.exports = {
  content: [
    "../../packages/ui/**/*.{tsx,jsx}",
    "./components/**/*.{tsx,jsx}",
    "./pages/**/*.{tsx,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
