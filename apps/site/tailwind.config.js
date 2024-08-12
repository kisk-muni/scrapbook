/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@headlessui/tailwindcss'),
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      darker: '#151613',
      dark: '#20201d',
      darkless: '#2b2b27',
      black: '#1d201d',
      text: '#1d201d',
      slate: '#3b413a',
      muted: '#777f76',
      smoke: '#d5d8d5',
      sunken: '#d5d8d5',
      snow: '#f5f5f4',
      background: '#f5f5f4',
      white: '#ffffff',
      sheet: '#ffffff',
      elevated: '#ffffff',
      pink: '#ff62dc',
      orange: '#ff5b00',
      yellow: '#f7ff00',
      green: '#28ff00',
      cyan: '#00ffff',
      blue: '#00a4ff',
      purple: '#c210ff',
      red: '#ec3750',
      progress: '#ec3750',
    },
    fontFamily: {
      sans: [
        '"Baloo 2"',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        "'Segoe UI'",
        'Roboto',
        'sans-serif',
      ],
      longinput: ['sans-serif'],
      mono: `'SF Mono', 'Roboto Mono', Menlo, Consolas, monospace`,
      header: `'Josefin Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
    },
    backgroundImage: {
      'gradient-header':
        'radial-gradient(ellipse farthest-corner at top left, var(--tw-gradient-stops))',
    },
    extend: {
      colors: {
        border: '#d5d8d5',
        input: '#777f76',
        ring: '#777f76',
        background: '#f5f5f4',
        foreground: '#1d201d',
        primary: {
          DEFAULT: '#c210ff',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#3b413a',
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: '#ec3750',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#777f76',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#777f76',
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#1d201d',
        },
      },
      lineClamp: {
        8: '8',
      },
      width: {
        440: '440px',
        330: '330px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'slide-from-left': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        'slide-to-left': {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
      },
      animation: {
        'slide-from-left':
          'slide-from-left 0.3s cubic-bezier(0.82, 0.085, 0.395, 0.895)',
        'slide-to-left':
          'slide-to-left 0.25s cubic-bezier(0.82, 0.085, 0.395, 0.895)',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
};
