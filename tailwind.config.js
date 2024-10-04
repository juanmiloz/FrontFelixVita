/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        team: "url('./assets/img/team.jpg')",
      },
      colors: {
        felix: {
          primary: '#93BA58',     // Verde
          secondary: '#C86C14',   // Naranja
          accent: '#619396',      // Azul
          gray: '#2C444E',  // Gris oscuro
        },
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
};
