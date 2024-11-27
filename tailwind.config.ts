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
        text: "#333333",
        primary: "#46A2A0",
        boxhead: "#FAFAFA",
      },
      padding: {
        primary: "16px",
      },
    },
  },
  plugins: [],
};
export default config;
