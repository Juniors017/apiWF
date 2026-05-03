'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPhotos() {
      try {
        // 1. D'abord, essayer de charger le fichier JSON local
        const res = await fetch('/photos-data.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // 2. Vérifier la structure (l'API renvoie un objet avec une propriété "photos")
        // highlight-next-line
        if (data && Array.isArray(data.photos)) {
          setPhotos(data.photos);
        } else if (Array.isArray(data)) {
          // fallback si la structure était différente (ancienne API)
          setPhotos(data);
        } else {
          throw new Error('Structure de données inattendue');
        }
      } catch (err) {
        console.warn('Fichier JSON non trouvé, fallback vers l’API directe', err);
        try {
          // 3. Fallback : appeler directement l'API
          // highlight-next-line
          const res = await fetch('https://api.slingacademy.com/v1/sample-data/photos?offset=10&limit=20');
          if (!res.ok) throw new Error(`API HTTP ${res.status}`);
          const data = await res.json();
          // highlight-next-line
          if (data && Array.isArray(data.photos)) {
            setPhotos(data.photos);
          } else {
            throw new Error('Structure de données inattendue');
          }
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
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>📸 Galerie de photos (Sling Academy)</h1>
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
            {/* highlight-next-line */}
            <img
              src={photo.url}
              alt={photo.title}
              style={{
                width: '100%',
                height: '180px',
                objectFit: 'cover',
                display: 'block',
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/400x200?text=Image+introuvable';
              }}
            />
            <div style={{ padding: '0.75rem' }}>
              <h2 style={{ fontSize: '1rem', margin: '0 0 0.25rem 0' }}>{photo.title}</h2>
              {/* highlight-next-line */}
              <p style={{ fontSize: '0.75rem', color: '#555', margin: '0 0 0.5rem 0' }}>
                Utilisateur {photo.user}
              </p>
              <p style={{ fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>{photo.description}</p>
              <a
                href={photo.url}
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