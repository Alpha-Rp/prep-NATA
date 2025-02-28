/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        terracotta: '#C66B3D',
        sage: '#8BA793',
        warmGray: '#9B8E7E',
        deepNavy: '#1F2937',
        cream: '#F5F2ED',
        
        // Accent Colors
        burntOrange: '#D35400',
        mutedGold: '#C4A484',
        forestGreen: '#2D5A27',
        charcoal: '#36454F',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['Space Mono', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backgroundImage: {
        'blueprint': "url('https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80')",
        'texture': "url('https://images.unsplash.com/photo-1553969546-6f7388a7e07d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80')",
      },
    },
  },
  plugins: [],
};