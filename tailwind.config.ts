import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: {
          DEFAULT: "#151c2b",
          50: "#ececec",
          100: "#96A5C8",
          200: "#7B8EBA",
          300: "#6077AC",
          400: "#4E6395",
          500: "#40527A",
          600: "#212c42",
          700: "#212c42",
          800: "#212c42",
          900: "#212c42",
        },
        green: {
          DEFAULT: "#A3EA2A",
          100: "#3BC81E",
        },
        red: {
          DEFAULT: "#EB0037",
          100: "#7A1123",
        },
        gray: {
          DEFAULT: "#525A6A",
        },
        lightGrey: {
          DEFAULT: "#FAFAFA",
        },
        blue: {
          DEFAULT: "#719CF9",
          100: "#1153E4",
        },
      },
    },
  },
  plugins: [],
};
export default config;
