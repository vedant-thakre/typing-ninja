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
        light: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      },
      colors: {
        textcolor: "var(--color-textcolor)",
        primary: "#4e6edd",
        secondary: "#2c2c2c",
        third: "#202020",
        dark: "#232323",
        textsecond: "#999999",
        bdshadow: "#3f5bc1",
        danger: "#d43b41",
        success: "#218340",
        success2: "#00c807",
        error2: "#f44336",
        orange: "#e37800",
        ponky: "#bd4d78",

        // background
        bgprimary: "var(--color-bgprimary)",
        bgsecondary: "var(--color-bgsecondary)",
        bgthird: "var(--color-bgthird)",

        // borders
        bprimary: "var(--color-border)",
        bdanger: "rgb(180,47,47)",
        bsuccess: "#195f2f",
        bmagenta: "#a24167",
        bgyou: "#03a791",
        bgopponent: "#ff6363",
      },
      fontSize: {
        posttitle: "23px",
        title: "20px",
        title2: "19px",
        title3: "18px",
        subtitle: "16px",
        content: "17px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
