/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: 'loremflickr.com'
      },
      {
        hostname: 'lh3.googleusercontent.com'
      },
      {
        hostname: 'avatars.githubusercontent.com'
      }
    ]
  }
}

module.exports = nextConfig
