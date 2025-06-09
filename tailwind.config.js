module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "var(--primary-blue)",
          "blue-hover": "var(--primary-blue-hover)",
          dark: "var(--primary-dark)",
          light: "var(--primary-light)",
        },
        secondary: {
          gray: "var(--secondary-gray)",
          "light-gray": "var(--secondary-light-gray)",
          border: "var(--secondary-border)",
          "border-light": "var(--secondary-border-light)",
        },
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          white: "var(--text-white)",
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};