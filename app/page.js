export const runtime = 'edge'

export default function Home() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#0a0a0a',
      color: '#ededed'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        YooJin Hub
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#888' }}>
        Global Hub Funnel - Coming Soon
      </p>
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem 2rem', 
        backgroundColor: '#1a1a1a', 
        borderRadius: '8px',
        border: '1px solid #333'
      }}>
        <code>hub.jmshinhwa.org</code>
      </div>
    </main>
  )
}
