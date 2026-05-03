// app/page.js
'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPhotos() {
      try {
        // Utiliser un chemin relatif (./) pour respecter basePath
        const res = await fetch('./photos-data.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPhotos(data);
      } catch (err) {
        console.warn('Fichier local introuvable, fallback vers API Picsum', err);
        try {
          const res = await fetch('https://picsum.photos/v2/list?page=2&limit=20');
          if (!res.ok) throw new Error(`API error ${res.status}`);
          const data = await res.json();
          setPhotos(data);
        } catch (apiErr) {
          setError('Impossible de charger les photos.');
        }
      } finally {
        setLoading(false);
      }
    }
    loadPhotos();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Chargement...</div>;
  if (error) return <div style={{ textAlign: 'center', color: 'red', marginTop: '50px' }}>{error}</div>;
  if (!photos.length) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Aucune photo</div>;

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>📸 Galerie (Lorem Picsum)</h1>
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
              src={`https://picsum.photos/id/${photo.id}/300/200`}
              alt={photo.author}
              style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
              onError={(e) => { e.target.src = 'https://placehold.co/300x200?text=Erreur'; }}
            />
            <div style={{ padding: '0.75rem' }}>
              <p style={{ margin: '0 0 0.25rem' }}><strong>{photo.author}</strong></p>
              <p style={{ fontSize: '0.75rem', color: '#555' }}>ID: {photo.id}</p>
              <a href={photo.download_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: '#0066cc' }}>
                Voir original →
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}