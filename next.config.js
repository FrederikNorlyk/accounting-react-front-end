/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects () {
    return [
      {
        source: '/',
        destination: '/expenses',
        permanent: true
      }
    ]
  },
  experimental: {
    appDir: true
  },
  reactStrictMode: false
}

module.exports = nextConfig
