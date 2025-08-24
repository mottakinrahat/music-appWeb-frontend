/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Ensure SWC is being used
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "resize.indiatvnews.com",
      },
      {
        protocol: "https",
        hostname: "static.abplive.com",
      },
      {
        protocol: "https",
        hostname: "www.shutterstock.com",
      },
    ],
  },
};

export default nextConfig;
