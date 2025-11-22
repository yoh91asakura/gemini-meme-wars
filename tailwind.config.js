/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        game: {
          bg: '#0f172a', // Slate 900
          panel: '#1e293b', // Slate 800
          accent: '#facc15', // Yellow 400
          success: '#22c55e', // Green 500
          danger: '#ef4444', // Red 500
        },
        rarity: {
          common: '#94a3b8', // Slate 400
          rare: '#3b82f6', // Blue 500
          epic: '#a855f7', // Purple 500
          legendary: '#f97316', // Orange 500
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
