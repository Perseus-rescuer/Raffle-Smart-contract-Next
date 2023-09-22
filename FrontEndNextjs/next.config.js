/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    reactStrictMode: true,
    compiler: {
        styledComponents: {
            displayName: false,
        },
    },
}

module.exports = { nextConfig, images: { loader: "custom" } }
