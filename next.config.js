// next.config.js
const repoName = 'apiWF'; // Remplacez par le nom exact de votre dépôt GitHub

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}`,
  trailingSlash: true, // optionnel mais recommandé pour GitHub Pages
};

module.exports = nextConfig;
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


