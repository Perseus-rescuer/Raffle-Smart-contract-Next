/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      displayName: false,
    },
  },
  output: "export",
};

module.exports = { nextConfig, images: { loader: "custom" } };
