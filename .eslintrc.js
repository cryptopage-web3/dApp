module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    '@nuxtjs',
    '@nuxtjs/eslint-config-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error'
  }
}
