// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8888/api/v1/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
