let withBundleAnalyzer = (obj) => obj

if (process.env.ANALYZE === 'true') {
  withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  })
}

/**
 * @type {import('next').NextConfig}
 */
module.exports = withBundleAnalyzer({
  images: {
    domains: ['cloudflare-ipfs.com'],
  },
  reactStrictMode: true,
  transpilePackages: ['@mui/system', '@mui/material', '@mui/icons-material'],
  modularizeImports: {
    '@mui/icons-material/?(((\\w*)?/?)*)': {
      transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}',
    },
  },
  webpack: (config) => {
    Object.assign(config.resolve.alias, {
      '@nestjs/swagger': '@modela/frontend-optimizer/src/swagger',
      '@faker-js/faker': '@modela/frontend-optimizer/src/faker',
      'class-validator': '@modela/frontend-optimizer/src/class-decorators',
      'class-transformer': '@modela/frontend-optimizer/src/class-decorators',
    })

    return config
  },
  async rewrites() {
    if (process.env.NODE_ENV !== 'development') return []
    return [
      {
        source: '/apiProxy/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
      },
    ]
  },
})
