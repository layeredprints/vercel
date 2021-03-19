const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    filter: { // defaults to {}
      none: 'none',
      grayscale: 'grayscale(1)',
      invert: 'invert(1)',
      sepia: 'sepia(1)',
    },
    extend: {
      screens: {
        '2xl': '1440px',
      },
      zIndex: {
        '-10': '-10',
      },
      colors: {
        primary: '#bb9333',
        'bx-blue': '#2FADD6',
        'bx-purple': '#5D2784',
      },
      minWidth: {
        140: '140px',
      },
      maxWidth: {
        'breakpoint-md': '768px',
        'breakpoint-lg': '96rem',
        'breakpoint-xl': '96rem',
        'breakpoint-2xl': '960px',
      },
      width: {
        108: '27rem',
        120: '30rem',
        140: '35rem',
        160: '40rem',
        176: '44rem',
        184: '46rem',
      },
      fontFamily: {
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
        openSans: ['Open Sans', ...defaultTheme.fontFamily.sans],
        rainbow: ['Over the Rainbow', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    filter: ['responsive'], // defaults to ['responsive']
    backdropFilter: ['responsive'], // defaults to ['responsive']
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('tailwindcss-filters'),
  ],
};
