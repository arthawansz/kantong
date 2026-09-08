import os from "node:os";

const lanDevOrigins = Object.values(os.networkInterfaces())
  .flatMap((interfaces) => interfaces ?? [])
  .filter(
    (details) =>
      details && details.family === "IPv4" && !details.internal
  )
  .map((details) => details.address);

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  allowedDevOrigins: lanDevOrigins,
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
