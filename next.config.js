/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "github.com",
      "croffle.gesiaplatform.com",
      "www.saeroevent.co.kr",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/v1/:path*",
        destination: "https://croffle-api.gesiaplatform.com/v1/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
