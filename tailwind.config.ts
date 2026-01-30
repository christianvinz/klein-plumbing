import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Mapping the variables defined in your RootLayout
        sans: ["var(--font-montserrat)", "sans-serif"],
        heading: ["var(--font-oswald)", "sans-serif"],
      },
      colors: {
        "klein-green": "#CEDC00",
        "klein-beige": "#F2F0E9",
        "klein-dark": "#333333",
        "klein-text": "#555555",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
