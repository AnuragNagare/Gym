/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: {
          base: '#FAFAFF',
          surface: '#FFFFFF',
          elevated: '#F5F3FF',
          border: '#E9E5F7',
          muted: '#D1CDE8',
        },
        ink: {
          DEFAULT: '#1E1B2E',
          soft: '#3D3852',
          muted: '#6B6580',
          light: '#948FA8',
          faint: '#B8B3CC',
        },
        accent: {
          DEFAULT: '#7C3AED',
          hover: '#6D28D9',
          light: '#A78BFA',
          muted: '#7C3AED10',
          glow: '#7C3AED30',
        },
        success: '#059669',
        warning: '#D97706',
        error: '#DC2626',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      boxShadow: {
        '3d': '0 10px 40px -10px rgba(124, 58, 237, 0.25), 0 4px 16px -4px rgba(124, 58, 237, 0.15)',
        '3d-lg': '0 25px 60px -15px rgba(124, 58, 237, 0.35), 0 10px 30px -8px rgba(124, 58, 237, 0.2)',
        '3d-sm': '0 4px 12px -2px rgba(124, 58, 237, 0.15)',
        'inner-glow': 'inset 0 1px 2px rgba(124, 58, 237, 0.08), 0 1px 3px rgba(124, 58, 237, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-left': 'slideLeft 0.6s ease-out forwards',
        'slide-right': 'slideRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 #7C3AED30' },
          '50%': { boxShadow: '0 0 30px 6px #7C3AED30' },
        },
      },
    },
  },
  plugins: [],
};
