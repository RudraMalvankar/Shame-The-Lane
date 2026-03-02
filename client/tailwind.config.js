/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rage: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        civic: {
          50: '#eff6ff',
          100: '#dbeafe',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        dark: {
          void: '#050508',
          deep: '#0a0a0f',
          surface: '#0f0f17',
          card: '#13131e',
          elevated: '#1a1a28',
          border: '#1e1e2e',
          borderLight: '#2a2a3e',
        },
        ink: {
          primary: '#f0f0ff',
          secondary: '#8888aa',
          muted: '#555570',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'ui-sans-serif', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(239,68,68,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(59,130,246,0.04) 0%, transparent 50%)',
        'rage-glow':
          'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(239,68,68,0.15) 0%, transparent 70%)',
      },
      animation: {
        'pulse-rage': 'pulse-rage 2s ease-in-out infinite',
        'glow-pulse': 'glow-pulse-anim 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.4s ease forwards',
        'slide-in-right': 'slide-in-right 0.4s ease forwards',
        'fade-in': 'fade-in 0.5s ease forwards',
      },
      keyframes: {
        'pulse-rage': { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.5' } },
        'glow-pulse-anim': {
          '0%,100%': { boxShadow: '0 0 20px rgba(239,68,68,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(239,68,68,0.5)' },
        },
        'slide-up': { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'slide-in-right': { from: { opacity: '0', transform: 'translateX(20px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
      },
      boxShadow: {
        rage: '0 0 30px rgba(239,68,68,0.25)',
        'rage-strong': '0 0 50px rgba(239,68,68,0.4)',
        civic: '0 0 30px rgba(59,130,246,0.2)',
        card: '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
