import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      mobileS: "320px",
      mobileM: "375px",
      mobileL: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      laptopL: "1440px",
      screen2Xl: "1536px",
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#11181C",
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#006FEE",
            },
          },
        },
        dark: {
          colors: {
            background: "#14062d",
            foreground: "#ECEDEE",
            primary: {
              foreground: "#C9CCCF",
              DEFAULT: "#006FEE",
            },
          },
        },
      },
    }),
  ],
};

export default config;
