const dotenv = require("dotenv");
const path = require("path");

const nextConfig = () => {
  const envPath = path.resolve(__dirname, `.env.${process.env.APP_ENV}`);
  const envConfig = dotenv.config({ path: envPath }).parsed;
  return {
    env: envConfig,
    reactStrictMode: false,
    swcMinify: true,
    output: "export",
    distDir: "../build",
  };
};

module.exports = nextConfig;
