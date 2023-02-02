module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@mui/system', '@mui/material', '@mui/icons-material'],
  modularizeImports: {
    '@mui/icons-material/?(((\\w*)?/?)*)': {
      transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}',
    },
  },
}
