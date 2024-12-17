import type { Config } from "tailwindcss";
import daisyui from "daisyui"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode colors
        light: {
          background: "#f1f5f9", // Light gray background
          text: "#333333",       // Dark text on light background
          primary: "#FFFFFF",    // Pure white for primary elements
          secondary: "#E0E0E0",  // Light gray for secondary elements
        },
        // Dark mode colors
        dark: {
          backgroundImage: {
            'radial-gradient-hero': 'radial-gradient(circle at 75% 100%, #5451E5, #0B0B1D)',
          },
          background: "#0D0F11", // Dark background
          text: "#a1a1a1",       // Light text on dark background
          primary: "#333333",    // Dark gray for primary elements
          secondary: "#444444",  // Medium gray for secondary elements
        },
        // Gray tones for both modes
        gray: {
          100: "#F5F5F5", // Lightest gray
          200: "#E0E0E0", // Light gray
          300: "#B0B0B0", // Medium gray
          400: "#707070", // Dark gray
          500: "#333333", // Almost black
        },
      },
      screens: {
        xs: "400px",
        "3xl": "1680px",
        "4xl": "2200px",
      },
      backgroundImage: {
        hero: "url('/bg.png')",
        banner: "url(/src/assets/bg.png)",
      },
    },
  },
  plugins: [
    daisyui,
  ],
};

export default config;
