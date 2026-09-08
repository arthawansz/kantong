/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: false,
    allowedDevOrigins: ["10.110.2.190"],
    turbopack: {
        root: process.cwd(),
    },
};

export default nextConfig;
