/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      displayName: false,
    },
  },
};

module.exports = { nextConfig, images: { loader: "custom" } };
