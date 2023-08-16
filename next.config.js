const nextConfig = () => {
  console.log(process.env.APP_ENV);
  if (process.env.APP_ENV === "development") {
    return {
      env: {
        NEXT_PUBLIC_BARO_URL:
          "https://baroapi-dot-centered-sight-237801.appspot.com",
        NEXT_PUBLIC_APIS_URL:
          "https://apis-dot-centered-sight-237801.appspot.com",
        NEXT_PUBLIC_EDGE_API_URL:
          "https://edge-dot-centered-sight-237801.appspot.com",
        NEXT_PUBLIC_WEBSOCKET_URL:
          "wss://edge-dot-centered-sight-237801.appspot.com",
        NEXT_PUBLIC_APP_MARK: "REACT_DEV",
      },
      reactStrictMode: false,
      swcMinify: true,
      output: "export",
      distDir: "../build",
    };
  } else {
    return {
      env: {
        NEXT_PUBLIC_BARO_URL: "https://baroapi-dot-prd-barofactory.appspot.com",
        NEXT_PUBLIC_APIS_URL: "https://apis-dot-prd-barofactory.appspot.com",
        NEXT_PUBLIC_EDGE_API_URL:
          "https://edge-dot-prd-barofactory.appspot.com",
        NEXT_PUBLIC_WEBSOCKET_URL: "wss://edge-dot-prd-barofactory.appspot.com",
        NEXT_PUBLIC_APP_MARK: "REACT_PRD",
      },
      reactStrictMode: false,
      swcMinify: true,
      output: "export",
      distDir: "../build",
    };
  }
};

module.exports = nextConfig;
