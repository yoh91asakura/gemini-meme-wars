/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Canvas and surface colors using CSS variables
        canvas: 'var(--color-canvas)',
        surface: {
          base: 'var(--color-surface-base)',
          elevated: 'var(--color-surface-elevated)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
        },
        border: {
          subtle: 'var(--color-border-subtle)',
        },
        // Functional colors
        brand: {
          primary: 'var(--color-brand-primary)',
        },
        utility: {
          success: 'var(--color-utility-success)',
          warning: 'var(--color-utility-warning)',
          danger: 'var(--color-utility-danger)',
          info: 'var(--color-utility-info)',
        },
        // Rarity colors aligned with UI spec
        rarity: {
          common: 'var(--color-rarity-common)',
          rare: 'var(--color-rarity-rare)',
          epic: 'var(--color-rarity-epic)',
          legendary: {
            start: 'var(--color-rarity-legendary-start)',
            end: 'var(--color-rarity-legendary-end)',
          }
        },
        // Legacy colors for backward compatibility
        game: {
          bg: '#0f172a', // Slate 900
          panel: '#1e293b', // Slate 800
          accent: '#facc15', // Yellow 400
          success: '#22c55e', // Green 500
          danger: '#ef4444', // Red 500
        }
      },
      spacing: {
        // Design token spacing system
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
        '4xl': 'var(--spacing-4xl)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
      },
      fontSize: {
        // Typography scale from UI spec
        'display': ['var(--text-display)', { lineHeight: '1.2' }],
        'h1': ['var(--text-h1)', { lineHeight: '1.4' }],
        'h2': ['var(--text-h2)', { lineHeight: '1.4' }],
        'body': ['var(--text-body)', { lineHeight: '1.5' }],
        'caption': ['var(--text-caption)', { lineHeight: '1.4' }],
        'tiny': ['var(--text-tiny)', { lineHeight: '1.3' }],
      },
      transitionDuration: {
        'fast': 'var(--motion-fast)',
        'normal': 'var(--motion-normal)',
        'slow': 'var(--motion-slow)',
      },
      boxShadow: {
        // Design system shadows
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'glow-common': 'var(--shadow-glow-common)',
        'glow-rare': 'var(--shadow-glow-rare)',
        'glow-epic': 'var(--shadow-glow-epic)',
        'glow-legendary': 'var(--shadow-glow-legendary)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'shake': 'shake 0.5s ease-in-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 20px rgba(250, 204, 21, 0.5)' },
          'to': { boxShadow: '0 0 30px rgba(250, 204, 21, 0.8)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-legendary': 'linear-gradient(135deg, var(--color-rarity-legendary-start), var(--color-rarity-legendary-end))',
      },
      minHeight: {
        'thumb-zone': '40vh',
      }
    },
  },
  plugins: [],
}
