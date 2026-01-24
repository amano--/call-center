export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae2fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
      },
      backgroundColor: {
        DEFAULT: "#f0f9ff",
        surface: "#ffffff",
      },
      textColor: {
        DEFAULT: "#082f49",
        secondary: "#0369a1",
      },
      borderColor: {
        DEFAULT: "#bae2fd",
        light: "#e0f2fe",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
};
