import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '358px',
      md: '710px',
      lg: '1160px',
      xl: '1326px',
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        mainTextColor: '#1B1B30',
        formBg: '#CDEAE3',
        buttonForm: '#ADA3A3',
        lightGrayBorder: '#636060',
        darkGreyColor: '#B6B5B5',
        headerTable: '#417D8A',
        rowUnderLine: '#B5C9BE',
        greenBtn: '#32BB79',
        hoverGreenBtn: '#169659',
        bgFooter: '#0F3952',
        lightGreen: '#CFF0E0',
        priceTableBg: '#F7FFFB',
        priceTableBorderColor: '#DCDCDC',
        hederTransparent: 'rgba(15, 57, 82, 0.38)',
        emailColorLink: '#2366E8',
        whiteText: '#FFFFFF',
        inputBorder: '#E6E6E6',
        mainBgColor: '#FEFEFE;',
        blueHoverBtn: '#41A7BE',
        redStar: '#EC2C2C',
        bgBurgerMenu: '#194954',
        disable: '#908F8F',
        textDisable: '#6C6C6C',
        rowBtnDisableText: '#858585',
        rowBtnDisableBorder: '#6C6C6C',
        disableAlfaName: '#372037',
        smsServiceCardShadow: '#a3d6d94d',
        smsServiceCardBg: '#cde8ea',
        bgDark: '#091E36',
        darkItems: '#00162F',
        darkInput:'#1E2737',
        swetchThemeBgLight: '#72809B7A',
        bgSwetch:'#EDEDED',
        bgDarkInput: '#7D7D7D40',
        textColorDarkTheme: '#F4F4F4',
        tableCptionBG:'#132B41',
        tableBorder:'#265863',
  
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
      boxShadow: {
        '3xl': '0 8px 8px 0 #a3d6d94d',
        'shadow': '0px 2px 4px 0px rgba(146, 146, 146, 0.3)',
        'custom-inset-light': 'inset -1px -1px 4px 0px rgba(255, 255, 255, 0.25)', // Pierwszy cień
        'custom-inset-dark': 'inset 2px 2px 8px 0px rgba(255, 255, 255, 0.25)',   // Drugi cień

      },
      backdropFilter: {
        'blur-20': 'blur(20px)',  // Używa efektu rozmycia tła
      },
    },
  },
  plugins: [
    require('tailwindcss-filters'), // Plugin Tailwind dla efektów filtrów
  ],

  darkMode: 'class',
};
export default config;
