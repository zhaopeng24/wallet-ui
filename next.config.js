/** @type {import('next').NextConfig} */
const path = require('path')
// import path from 'path'
 

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
  images: {
    domains: ['images.dog.ceo', 'decentralized-storage-01.web3idea.xyz'],
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig
