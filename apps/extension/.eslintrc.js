const presets = require('scripts/eslint-preset');

module.exports = {
  ...presets,
  globals: {
    chrome: 'readonly',
  },
};
