/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  useFileSystemPublicRoutes: false,
  env:{
    secret:"GN8Mrz7EJC%3",
  },
  images: {
    domains: ['https://firebasestorage.googleapis.com/v0/b/me-leva-next.appspot.com/'],
  },
}

module.exports = nextConfig
