import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Enhanced orange-red palette for your gradients
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c', // Your primary gradient start
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        red: {
          500: '#ef4444', // Your primary gradient end
          600: '#dc2626',
        },
        // Template Master vertical colors (from your verticals.ts)
        restaurant: {
          50: '#fef7ed',
          500: '#E67E22',
          600: '#ea580c',
        },
        service: {
          50: '#eff6ff',
          500: '#3498DB',
          600: '#2563eb',
        },
        creative: {
          50: '#faf5ff',
          500: '#9B59B6',
          600: '#9333ea',
        }
      },
      backgroundImage: {
        // Keep your existing gradients working
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        // Enhanced animations for your components
        "bounce-subtle": "bounceSubtle 2s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
      },
      keyframes: {
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          },
        },
      },
      boxShadow: {
        // Premium shadows for your cards
        'premium': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'premium-lg': '0 20px 40px -4px rgba(0, 0, 0, 0.1), 0 8px 16px -4px rgba(0, 0, 0, 0.06)',
        'premium-orange': '0 20px 40px -4px rgba(234, 88, 12, 0.15), 0 8px 16px -4px rgba(239, 68, 68, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

export default config;