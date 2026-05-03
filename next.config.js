// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',   // génère un site statique dans le dossier 'out'
  images: {
    unoptimized: true, // nécessaire pour l'export statique avec des images externes
  },
}

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


