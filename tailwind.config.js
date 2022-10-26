/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

function rgbaColor(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      "mobile-sm": "320px",
      "mobile-md": "375px",
      "mobile-lg": "425px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        themed: {
          "gray-base": rgbaColor("--gray-base"),
          "gray-inverse": rgbaColor("--gray-inverse"),
          "gray-t2": rgbaColor("--gray-t2"),
          "gray-t3": rgbaColor("--gray-t3"),
          "gray-t4": rgbaColor("--gray-t4"),
          "gray-t5": rgbaColor("--gray-t5"),
          "gray-t6": rgbaColor("--gray-t6"),
          "gray-t7": rgbaColor("--gray-t7"),
          "gray-t8": rgbaColor("--gray-t8"),
          "gray-t9": rgbaColor("--gray-t9"),
        },
        semantic: {
          info: rgbaColor("--semantic-info"),
          "info-t2": rgbaColor("--semantic-info-t2"),
          warning: rgbaColor("--semantic-warning"),
          "warning-t2": rgbaColor("--semantic-warning-t2"),
          error: rgbaColor("--semantic-error"),
          "error-t2": rgbaColor("--semantic-error-t2"),
          success: rgbaColor("--semantic-success"),
          "success-t2": rgbaColor("--semantic-success-t2"),
        },
        primary: {
          base: rgbaColor("--primary"),
          t2: rgbaColor("--primary-t2"),
          t3: rgbaColor("--primary-t3"),
          t4: rgbaColor("--primary-t4"),
          t5: rgbaColor("--primary-t5"),
        },
        secondary: {
          base: rgbaColor("--secondary"),
          t2: rgbaColor("--secondary-t2"),
          t3: rgbaColor("--secondary-t3"),
          t4: rgbaColor("--secondary-t4"),
          t5: rgbaColor("--secondary-t5"),
        },
        nblack: rgbaColor("--neutral-black"),
        nwhite: rgbaColor("--neutral-white"),
        "on-primary": rgbaColor("--on-primary"),
        "on-secondary": rgbaColor("--on-secondary"),
      },
      boxShadow: {
        "end-page": `0 32px 40px -10px rgba(0, 0, 0, 0.5)`,
        "end-b": `0px 40px 30px 2px rgba(0, 0, 0, 1)`,
      },
    },
  },
  plugins: [],
};
