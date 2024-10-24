/** @type {import('tailwindcss').Config} */
import animationDelay from 'tailwindcss-animation-delay';

export default {
  darkMode: 'class',
  content: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.vue',
  ],
  theme: {
    extend: {
      screens: {
        xs: '470px',
        mobile: '420px',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Cambié a "Inter" para un estilo más profesional
      },
      fontSize: {
        xsm: '13px',
        '2xs': '11px',
        xxs: '10px',
      },
      colors: {
        granate: '#921733',
        plomoClaro: '#F8F8FA',
        blancoPuro: '#FFFFFF',
        azulado: '#F8F8FA', // Corregí el valor con espacio extra
        negroClaro: '#49454F',
        active: { // Agregado para evitar el error en el archivo CSS
          DEFAULT: '#921733', // Usando el color 'granate' para active por defecto
        },
      },
      transitionProperty: {
        width: 'width',
        height: 'height',
        'max-height': 'max-height',
      },
      boxShadow: {
        google: '0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12), 0px 5px 5px -3px rgba(0, 0, 0, 0.2)',
        'google-sm': '0px 2px 2px 1px rgba(0, 0, 0, 0.14), 0px 2px 2px 2px rgba(0, 0, 0 , 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.2)',
      },
      borderRadius: {
        sm: '4px',
      },
      animationDelay: {
        100: '100ms',
        200: '200ms',
        300: '300ms',
        400: '400ms',
        500: '500ms',
        600: '600ms',
        700: '700ms',
        800: '800ms',
        900: '900ms',
        1000: '1000ms',
        1100: '1100ms',
        1200: '1200ms',
        1300: '1300ms',
        1400: '1400ms',
        1500: '1500ms',
        1600: '1600ms',
      },
    },
  },
  plugins: [animationDelay],
};
