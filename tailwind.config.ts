import { transform } from 'next/dist/build/swc';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      aspectRatio: {
        half: '2 / 1',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          100: '#e6f4ea',
          200: '#cce9d5',
          300: '#b3dfc1',
          400: '#99d4ac',
          500: '#517c4f',
          600: '#42633f',
          700: '#334a30',
          800: '#253220',
          900: '#162910',
          DEFAULT: '#517c4f',
        },
        secondary: {
          100: '#e9e0db',
          200: '#d3c1b8',
          300: '#bda396',
          400: '#a68473',
          500: '#56351E',
          600: '#452b18',
          700: '#342211',
          800: '#23180b',
          900: '#120e05',
          DEFAULT: '#56351E',
        },
        accent: {
          100: '#fce4ec',
          200: '#f8bbd0',
          300: '#f48fb1',
          400: '#f06292',
          500: '#ec407a',
          600: '#b0006f',
          700: '#880048',
          800: '#56002c',
          900: '#310017',
          DEFAULT: '#ec407a',
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInCurve: {
          '0%': { opacity: '0' },
          '50%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        moveInTop: {
          '0%': { transform: 'translateY(-100%)', opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        moveOutTop: {
          '0%': { transform: 'translateY(100%)', opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        moveOutRight: {
          '0%': { opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        moveOutLeft: {
          '0%': { opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards',
        fadeInCurve: 'fadeInCurve 1.5s ease-out forwards',
        fadeOut: 'fadeOut 1s ease-out forwards',
        moveOutRight: 'moveOutRight 1s ease-in forwards',
        moveOutLeft: 'moveOutLeft 1s ease-in forwards',
        moveInTop: 'moveInTop 2s ease-in forwards',
        moveOutTop: 'moveOutTop 2s ease-in forwards',
      },
    },
  },

  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      {
        tesak: {
          primary: '#517c4f',
          'primary-content': '#e6f4ea',
          secondary: '#56351E',
          'secondary-content': '#e9e0db',
          accent: '#ec407a',
          'accent-content': '#fce4ec',
          neutral: '#3d4451',
          'neutral-content': '#2a2e37',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#d1d5db',
          'base-content': '#1f2937',
          info: '#3abff8',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#f87272',
          fontSize: {
            xs: '.75rem',
            sm: '.875rem',
            md: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
          },
        },
      },
    ],
  },
};
export default config;
