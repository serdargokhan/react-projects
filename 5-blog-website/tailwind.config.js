module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  darkMode: 'class',
  theme: {
    fontSize: {
      "10xl": "5.5rem",
      "12xl": "7rem",
      "3xl": "2rem",
      "sm": ".9rem",
      "xs": ".7rem",
      "md": "1rem"
    },
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '180': '180%',
      "140": "140%"
    },
    colors: {
      "light-white": "#E3E6EC",
      "light-gray": "#585E6B",
      "light-dark": "#323947",
      "light-purple": "#DA70D6",
      "light-purple-300": "#BA55D3",
      "light-gray-300": "#b9bdc6",
      "light-blue": "#B19AEF",
      "light-red": "#FF357A",
      "dark-rose": "#881337",
      "dark-red": "#FF0000",
      "white": "#FFFFFF",
    },
    extend: {
      lineHeight: {
        "big": "3.5rem",
        "extra": "5rem"
      },
      minHeight: {
        '(screen-16)': 'calc(100vh - 4.5rem)',
      },
      backgroundImage: {
        "register-img": "url('https://www.dwinawan.com/blog/bg_article_ux_writing.svg')",
        "logo-img": "url('https://www.dwinawan.com/blog/bgcircle.svg')"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      },
    },
  },
  plugins: [],
}
