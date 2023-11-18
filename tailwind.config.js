/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class", // Enable dark mode based on the system's preferred color scheme
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: "#004e89",
            light: "#004e89", // Light mode color
            dark: "#7ba2b3", // Dark mode color
          },
          bg: {
            light: "#fff", // Light mode background color
            dark: "#161616", // Dark mode background color
          },
          secondary: {
            DEFAULT: "#ff6b35",
            light: "#ff6b35", // Light mode color
            dark: "#f7c59f", // Dark mode color
          },
          lighter: {
            lightDarker: "#d3e7eb",
            darkLighter: "#1e293b",
            darkLighter2: "#64748b",
          },
        },
        container: {
          center: true,
          padding: "1rem",
        },
      },
    },
    plugins: [require("tailwind-scrollbar")],
  };
  