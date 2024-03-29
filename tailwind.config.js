/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        knewave:['"Knewave", system-ui'],
        raleway:['"Raleway", sans-serif'],
        oxanium:['"Oxanium", sans-serif'],
        signature:['"Dancing Script", cursive']
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
}