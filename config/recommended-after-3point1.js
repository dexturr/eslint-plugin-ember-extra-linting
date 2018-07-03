module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: '../config/recommended.js',
  env: {
    'browser': true
  },
  plugins: [
    'ember-extra-linting'
  ],
  rules: {
    'ember-extra-linting/ember-no-pointless-gets': 2,
    'ember-extra-linting/ember-no-get-properties': 2
  }
};