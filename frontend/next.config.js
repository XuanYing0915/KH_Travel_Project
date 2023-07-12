/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: 'export', // don't use with `next start` or api route
  //distDir: 'dist',
  reactStrictMode: false,
  images: {
    unoptimized: true,
    domains: ['via.placeholder.com', 'localhost'],
  },
  // avoid cors with proxy
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:3005/:path*', // Proxy to Backend
  //     },
  //   ]
  // },
}

module.exports = nextConfig
