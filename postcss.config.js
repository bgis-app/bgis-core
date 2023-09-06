module.exports = {
  plugins: {
    //'postcss-import' : {},
    tailwindcss: {},
    autoprefixer: {},
    'postcss-replace': {
      pattern: /(--tw|\*, ::before, ::after)/g,
      data: {
        '--tw': '--tw-bgis', // Prefixing
        '*, ::before, ::after': ':root', // So variables does not pollute every element
      },
    },
  },
};
