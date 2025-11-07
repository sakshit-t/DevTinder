 /** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{html,js,jsx,ts,tsx}"], // include jsx/ts if using React
  theme: {
    extend: {}
  },
  plugins: [require("daisyui")],
  daisyui: {
     themes: ["light", "dark", "cupcake"],// correct place for themes
  },
}