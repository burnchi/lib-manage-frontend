import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "white",
        bg2: "#F0F3F8",
        text: "#333333",
        primary: "#46A2A0",
        boxhead: "#FAFAFA",
      },
      padding: {
        primary: "16px",
      },
      animation: {
        toastmove: "tmove 3s linear ",
      },
      keyframes: {
        tmove: {
          "0% ": {
            transform: "translateY(0px) translateX(50%)",
            opacity: "20%",
          },
          "10%": {
            transform: "translateY(80px) translateX(50%)",
            opacity: "100%",
          },
          "80%": {
            transform: "translateY(80px) translateX(50%)",
            opacity: "100%",
          },
          "100%": {
            transform: "translateY(60px) translateX(50%)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
