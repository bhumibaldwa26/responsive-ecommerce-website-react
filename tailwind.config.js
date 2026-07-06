/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grayborder: "#B3B3B3", // Add custom grayborder color without overriding default colors
      },
    },
  },
  plugins: [],
};
