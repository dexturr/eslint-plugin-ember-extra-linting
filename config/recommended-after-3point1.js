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
    'ig-ember'
  ],
  rules: {
    'ig-ember/ember-no-pointless-gets': 2,
    'ig-ember/ember-no-get-properties': 2
  }
};