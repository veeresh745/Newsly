module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      colors: {
        "dark-mode-primary": "#1A1A1A",
        "dark-mode-secondary": "#212121",
        "brand-accent": "#F0DA10",
      },
      screens: {
        md: "960px",
      },
      fontFamily: ["Inter", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("daisyui"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
  ],
};
