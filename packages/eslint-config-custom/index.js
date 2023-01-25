module.exports = {
  extends: ['eslint:recommended', 'turbo', 'prettier'],
  plugins: ['prettier', 'simple-import-sort', '@typescript-eslint'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
    'turbo/no-undeclared-env-vars': 'off',
  },
  env: {
    jest: true,
  },
  globals: {
    NodeJS: true,
  },
}
