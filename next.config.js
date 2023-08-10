/** @type {import('next').NextConfig} */

// 환경에 따라 다른 .env 파일 로드
const dotenv = require("dotenv");
const envFile =
  process.env.NODE_ENV === "development"
    ? ".env.development"
    : ".env.production";

dotenv.config({ path: envFile });
console.log(envFile);

const nextConfig = (phase) => {
  return {
    reactStrictMode: false,
    swcMinify: true,
  };
};

module.exports = nextConfig;
