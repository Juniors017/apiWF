// app/layout.js
export const metadata = {
  title: 'Galerie de photos - Album 1',
  description: 'Affichage des photos depuis jsonplaceholder',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}