'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPhotos() {
      try {
        // Tentative de charger le fichier JSON local
        const res = await fetch('/photos-data.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // L'API Picsum renvoie directement un tableau
        setPhotos(data);
      } catch (err) {
        console.warn('Fichier JSON non trouvé, fallback vers API Picsum', err);
        try {
          const res = await fetch('https://picsum.photos/v2/list?page=2&limit=20');
          if (!res.ok) throw new Error(`API HTTP ${res.status}`);
          const data = await res.json();
          setPhotos(data);
        } catch (apiErr) {
          setError('Impossible de charger les photos.');
          console.error(apiErr);
        }
      } finally {
        setLoading(false);
      }
    }

    loadPhotos();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Chargement des photos...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>{error}</div>;
  }

  if (!photos.length) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Aucune photo trouvée.</div>;
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>📸 Galerie de photos (Lorem Picsum)</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {photos.map((photo) => (
          <div
            key={photo.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#fff',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            <img
              src={`https://picsum.photos/id/${photo.id}/300/200`}
              alt={`Photo by ${photo.author}`}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                display: 'block',
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/300x200?text=Image+manquante';
              }}
            />
            <div style={{ padding: '0.75rem' }}>
              <p style={{ fontSize: '0.9rem', margin: '0 0 0.25rem 0' }}>
                Auteur : {photo.author}
              </p>
              <p style={{ fontSize: '0.75rem', color: '#555', margin: '0 0 0.5rem 0' }}>
                Photo ID: {photo.id}
              </p>
              <a
                href={photo.download_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.8rem', color: '#0066cc' }}
              >
                Voir l'image originale
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}