// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',   // génère un site statique dans le dossier 'out'
  images: {
    unoptimized: true, // nécessaire pour l'export statique avec des images externes
  },
}

module.exports = nextConfig