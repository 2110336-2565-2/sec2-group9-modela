module.exports = {
  root: true,
  extends: ['custom', 'next/core-web-vitals'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
    'react-hooks/exhaustive-deps': 'error',
  },
}
