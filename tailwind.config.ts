import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "500px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        customBlue: "#23377C",
        royalBlue: "#425EB1",
        purpleBlue:"#819DF580",
        mainPurpleBlue:"#819DF5"
      },
      // screens: {
      //   'md-max': {
      //     raw: '(max-width: 768px)',
      //   },
      //   'lg-max': {
      //     raw: '(max-width: 1024px)',
      //   },
      // },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
