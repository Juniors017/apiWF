'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPhotos() {
      try {
        // Tentative de charger le fichier JSON local (généré par GitHub Actions)
        const res = await fetch('/photos-data.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPhotos(data);
      } catch (err) {
        console.warn('Fichier JSON non trouvé, fallback vers l’API directe');
        try {
          // Fallback : appel direct à l'API
          const res = await fetch('https://jsonplaceholder.typicode.com/albums/1/photos');
          if (!res.ok) throw new Error(`API HTTP ${res.status}`);
          const data = await res.json();
          setPhotos(data);
        } catch (apiErr) {
          setError('Impossible de charger les photos. Veuillez réessayer plus tard.');
          console.error(apiErr);
        }
      } finally {
        setLoading(false);
      }
    }

    loadPhotos();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Chargement des photos...</div>;
  if (error) return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>{error}</div>;

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        📸 Photos de l'album 1
      </h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        {photos.map(photo => (
          <div key={photo.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#fff',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              style={{ width: '100%', height: '180px', objectFit: 'cover' }}
            />
            <div style={{ padding: '0.75rem' }}>
              <p style={{ fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>
                {photo.title}
              </p>
              <a
                href={photo.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.8rem', color: '#0066cc' }}
              >
                Voir original →
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}