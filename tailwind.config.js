/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        terracotta: "#C66B3D",
        sage: "#8BA793",
        warmGray: "#9B8E7E",
        deepNavy: "#1F2937",
        cream: "#F5F2ED",

        // Accent Colors
        burntOrange: "#D35400",
        mutedGold: "#C4A484",
        forestGreen: "#2D5A27",
        charcoal: "#36454F",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        mono: ["Space Mono", "monospace"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      },
      backgroundImage: {
        blueprint:
          "url('https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80')",
        texture:
          "url('https://images.unsplash.com/photo-1553969546-6f7388a7e07d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80')",
      },
      animation: {
        float: "float 15s infinite ease-in-out",
        pulse: "pulse 2s infinite",
        "gradient-shift": "gradient-shift 8s infinite alternate",
        gridMove: "gridMove 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulse: {
          "0%, 100%": { opacity: 1, transform: "scale(1)" },
          "50%": { opacity: 0.7, transform: "scale(0.95)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        gridMove: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "50px 50px" },
        },
      },
      perspective: {
        1000: "1000px",
      },
    },
  },
  plugins: [],
};
