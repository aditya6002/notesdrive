/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#E85D04',
          deep: '#B83E00',
        },
        ivory: '#F5F1EB',
        warmgray: '#E9E4DC',
        charcoal: '#151515',
        muted: '#66615B',
        darkcard: '#1A1A1A',
        edge: '#D8D1C7',
      },
      fontFamily: {
        display: ['Satoshi', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero-eyebrow': ['13px', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        'hero-h1': ['64px', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'hero-h1-lg': ['72px', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
      },
      boxShadow: {
        notebook: '0 30px 60px -15px rgba(21,21,21,0.35), 0 10px 20px -8px rgba(21,21,21,0.2)',
        card: '0 2px 8px rgba(21,21,21,0.04)',
        'card-hover': '0 12px 28px -8px rgba(21,21,21,0.12)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(var(--tw-rotate, 0deg))' },
          '50%': { transform: 'translateY(-10px) rotate(var(--tw-rotate, 0deg))' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
