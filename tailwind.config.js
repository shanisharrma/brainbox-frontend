/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      "edu-sa": ["Edu SA Beginner", "cursive"],
      mono: ["Roboto Mono", "monospace"],
    },
    colors: {
      white: "#fff",
      black: "#000",
      transparent: "#ffffff00",
      "rich-black": {
        5: "#F2F2F2", // Lightest shade
        25: "#E6E7E9",
        50: "#B8BBC0",
        100: "#A8A8A8",
        200: "#3A3D44",
        300: "#35363E",
        400: "#2C2D34",
        500: "#2C2E33",
        600: "#1F2026",
        700: "#1B1C22",
        800: "#1A1B21",
        900: "#1B1D23", // Darkest shade
      },
      blue: {
        5: "#E3F2FF", // Lightest blue tint
        25: "#B3D8FF", // Light sky blue
        50: "#83BEFF", // Soft blue tint
        100: "#3B82F6", // Bright base blue
        200: "#346ED9", // Slightly darker blue
        300: "#2D5ABC", // Deeper medium blue
        400: "#26479E", // Dark blue
        500: "#203381", // Darker rich blue
        600: "#192964", // Very dark blue
        700: "#121F47", // Deep blue-black
        800: "#0B1429", // Near-black blue
        900: "#050A14", // Deepest blue-black
      },
      caribbeangreen: {
        5: "#C1FFFD",
        25: "#83F1DE",
        50: "#44E4BF",
        100: "#06D6A0",
        200: "#05BF8E",
        300: "#05A77B",
        400: "#049069",
        500: "#037957",
        600: "#026144",
        700: "#014A32",
        800: "#01321F",
        900: "#001B0D",
      },
      crimsonRed: {
        5: "#FDE2E5", // Lightest tint of crimson red
        25: "#F8B3B9", // Light red tint
        50: "#E63946", // Base vibrant red
        100: "#D8353F", // Slightly deeper red
        200: "#C1272D", // Darker red
        300: "#A72124", // Deep crimson
        400: "#8E1A1E", // Dark crimson
        500: "#761418", // Rich dark red
        600: "#5E0E12", // Very dark red
        700: "#46080C", // Dark red-black
        800: "#2E0407", // Nearly black red
        900: "#160203", // Deepest black-red
      },
      "pure-greys": {
        5: "#F9F9F9",
        25: "#E2E2E2",
        50: "#CCCCCC",
        100: "#B5B5B5",
        200: "#9E9E9E",
        300: "#888888",
        400: "#717171",
        500: "#5B5B5B",
        600: "#444444",
        700: "#2D2D2D",
        800: "#171717",
        900: "#141414",
      },
    },
    extend: {
      maxWidth: {
        maxContent: "1260px",
        maxContentTab: "650px",
      },
    },
  },
  plugins: [],
};
