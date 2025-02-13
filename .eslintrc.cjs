module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  plugins: [],
  rules: {
    // @nuxtjs/eslint-config-typescript uses "plugin:vue/recommended" which is for Vue 2
    'vue/no-multiple-template-root': 'off',
    camelcase: 'off',
    'no-console': 'warn',
  },
};
