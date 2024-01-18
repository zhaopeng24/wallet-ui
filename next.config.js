/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
  images: {
    domains: ['images.dog.ceo'],
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig
