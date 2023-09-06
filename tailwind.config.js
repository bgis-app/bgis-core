/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    fontSize: {
      base: 'var(--bgis-font-size)',
      icon: ['var(--bgis-icon-size)','1']
    },
    colors: {
      transparent:'transparent',
      primary: {
        light: 'var(--bgis-primary-color-light)',
        DEFAULT: 'var(--bgis-primary-color)',
        dark: 'var(--bgis-primary-color-dark)'
      },
      secondary: {
        light: 'var(--bgis-secondary-color-light)',
        DEFAULT: 'var(--bgis-secondary-color)',
        dark: 'var(--bgis-secondary-color-dark)'
      },
      background: 'var(--bgis-background-color)',
      link: {
        light: 'var(--bgis-link-color-light)',
        DEFAULT: 'var(--bgis-link-color)',
        dark: 'var(--bgis-link-color-dark)'
      },
      text: {
        lighter: 'var(--bgis-text-color-lighter)',
        light: 'var(--bgis-text-color-light)',
        DEFAULT: 'var(--bgis-text-color)',
        dark: 'var(--bgis-text-color-dark)'
      },
      focus: 'var(--bgis-focus-color)'
    },
    fontFamily: {
      sans: ["Source Sans Pro", 'sans-serif'],
      icon: ['Bund-GIS', 'serif'],
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '0.5':'0.5px',
      '1': '1px',
      '2': '2px',
      '4': '4px',
      'gs': 'var(--bgis-grid-size)',
    },
     extend: {


      screens: {
        'md': { 'raw': '(min-width: 768px) and (min-height: 400px)' },
        // => @media (min-height: 800px) { ... }
      },


      maxWidth: {
        'maxtoolbarwidth': 'var(--bgis-max-toolbar-width)',
      },
      minHeight: {
        '15gs': 'calc(15 * var(--bgis-grid-size))',
        '8gs': 'calc(8 * var(--bgis-grid-size))',
      },
      zIndex: {
        '0': '0',
        '1': '1',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
      },
      flexGrow: {
        '2': 2,
        '100': 100
      },
      flexShrink: {
        '2': 2,
        '4': 4,
        '8': 8,
        '16': 16,
        '100': 100
      },
      spacing: {
        '0': '0',
        'desktopmenuwidth': 'var(--bgis-desktop-menu-width)',
        'listviewwidth': 'var(--bgis-list-view-width)',
        'xsmgs': 'calc(0.25 * var(--bgis-grid-size))',
        '3xsmgs': 'calc(0.75 * var(--bgis-grid-size))',
        'smgs': 'calc(0.5 * var(--bgis-grid-size))',
        '3smgs':'calc(1.5 * var(--bgis-grid-size))',
        '5smgs':'calc(2.5 * var(--bgis-grid-size))',
        '9smgs':'calc(4.5 * var(--bgis-grid-size))',
        'gs': 'var(--bgis-grid-size)',
        '2gs': 'calc(2 * var(--bgis-grid-size))',
        '3gs': 'calc(3 * var(--bgis-grid-size))',
        '4gs': 'calc(3 * var(--bgis-grid-size))',
        '5gs': 'calc(5 * var(--bgis-grid-size))',
        'content':'content',
        'fit-content':'fit-content',
        'unset':'unset',
        'third':'33%',
        '120px':'120px',
        '55%':'55%',
        '22_5%':'22.5%',
        '6rem':'6rem',
        'maxsearchheightmobile':'calc(100% - 5 * var(--bgis-grid-size))',

      }

    }

  },

  plugins: [],
}
