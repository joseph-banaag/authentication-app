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
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#e6e6e6", // or DEFAULT
            foreground: "#3d3d43", // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: "#52525b",
              DEFAULT: "#52525b",
            },
          },
        },
        dark: {
          colors: {
            background: "#0a0316", // or DEFAULT
            foreground: "#bcbcc2", // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: "#52525b",
              DEFAULT: "#52525b",
            },
          },
        },
      },
    }),
  ],
};

export default config;
