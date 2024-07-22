/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  content: [],
  theme: {
    screens: {
      xs: '0',
      sm: '600px',
      md: '1024px',
      lg: '1440px',
      xl: '1920px',
    },
    fontFamily: {
      display: ["Gluten", "cursive"],
      logo: ["Playwrite AT", "cursive"],
      body: ["Georama", "sans-serif"]
    },
    extend: {
      colors: {
        primary: '#ebd4d9',
        secondary: '#c4b3dd',
        tertiary: '#F2EDE9',
        accent: '#0032CC',
        dark: '#402620',
        positive: '#39b54a',
        negative: '#c10015',
        info: '#31ccec',
        warning: '#f2c037',
      }
    },
  },
  plugins: [],
}

