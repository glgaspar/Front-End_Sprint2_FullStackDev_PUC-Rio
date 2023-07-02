/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'main-blue': '#025373',
        'element-blue':'#025373ca',
        'accent-orange':'#ffa500',
        'component-whitesmoke':'#f5f5f5',
      },
    },
  },
  plugins: [],
}

