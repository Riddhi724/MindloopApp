/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito"', 'system-ui', 'sans-serif'],
      },
      colors: {
        sage: {
          50: '#f3f7f4',
          100: '#e3ece6',
          200: '#c7d9cf',
          300: '#a3c0b0',
          400: '#7da08d',
          500: '#5d8472',
          600: '#486a59',
          700: '#3a5648',
          800: '#30463b',
          900: '#283a31',
        },
        mist: {
          50: '#eef5f8',
          100: '#d8e9f0',
          200: '#b6d4e2',
          300: '#88b6cb',
          400: '#5d97b4',
          500: '#427c9c',
          600: '#36647f',
          700: '#2f5267',
          800: '#2b4556',
          900: '#273b49',
        },
        sand: {
          50: '#faf6f0',
          100: '#f3ebe0',
          200: '#e6d4c0',
          300: '#d6ba9b',
          400: '#c39e78',
          500: '#b3865e',
        },
        band: {
          stable: '#5d8472',
          mild: '#c39e78',
          elevated: '#d68a4e',
          critical: '#c25a4a',
        },
      },
      boxShadow: {
        soft: '0 6px 20px -8px rgba(40, 58, 49, 0.18)',
        card: '0 2px 12px -4px rgba(40, 58, 49, 0.12)',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(0.8)', opacity: '0.85' },
          '50%': { transform: 'scale(1.15)', opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        popIn: {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '70%': { transform: 'scale(1.08)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        breathe: 'breathe 4s ease-in-out infinite',
        fadeUp: 'fadeUp 0.4s ease-out both',
        fadeIn: 'fadeIn 0.4s ease-out both',
        popIn: 'popIn 0.35s ease-out both',
      },
    },
  },
  plugins: [],
};
