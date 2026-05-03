// next.config.js
const isProd = process.env.NODE_ENV === 'production';
const repoName = 'apiWF';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  ...(isProd && { basePath: `/${repoName}`, assetPrefix: `/${repoName}` }),
  trailingSlash: true,
  // Autoriser l'accès depuis l'IP locale en dev (optionnel)
  allowedDevOrigins: ['192.168.1.19'],
};

module.exports = {
  output: 'export',
  images: { unoptimized: true },
  // Pour autoriser les images distantes en dev (optionnel)
  distDir: '.next',
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "img-src 'self' https://via.placeholder.com https://placehold.co;",
          },
        ],
      },
    ];
  },
};



module.exports = nextConfig


