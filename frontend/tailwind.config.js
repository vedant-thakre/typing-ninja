/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      logo: ["Lilita One", "serif"],
      route: ["Zain", "serif"],
      main: ["Capriola", "serif"],
    },
    extend: {
      boxShadow: {
        hard: "0 10px 10px rgba(0, 0, 0, 0.25), 0 10px 50px rgba(0, 0, 0, 0.25)",
      },
      colors: {
        primary: "#4e6edd",
        secondary: "#2c2c2c",
        third: "#202020",
        dark: "#232323",
        textsecond: "#999999",
        bdshadow: "#3f5bc1",
        danger: "#d43b41",
        success: "#218340",
        orange: "#e37800",
        pinky: "#bd4d78",
        // borders
        bprimary: "#555555",
        bsuccess: "#195f2f",
        bmagenta: "#a24167",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
