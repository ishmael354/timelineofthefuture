/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin-slow 12s linear infinite',
        'spin-reverse-slow': 'spin-reverse-slow 12s linear infinite',
        'pulseSlow': 'pulse-slow 4s ease-in-out infinite',
        'dash': 'dash 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'migration': 'migration 12s linear infinite',
        'grow': 'grow 2s ease-out forwards',
        'slideUp': 'slideUp 0.5s ease-out forwards',
        'scan': 'scan 4s linear infinite',
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'spin-reverse-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'dash': {
          'to': { strokeDashoffset: '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'migration': {
          '0%': { transform: 'translateX(-20vw) translateY(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateX(100vw) translateY(-50px)', opacity: '0' },
        },
        'grow': {
          'from': { height: '0' },
          'to': { height: '200px' },
        },
        'slideUp': {
          'from': { transform: 'translateY(20px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'fadeIn': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
