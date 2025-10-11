import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0B0D12 0%, #4F46E5 50%, #7C3AED 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <div
          style={{
            background: 'rgba(247, 247, 248, 0.95)',
            borderRadius: '24px',
            padding: '60px',
            textAlign: 'center',
            maxWidth: '800px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
        >
          <h1
            style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#0B0D12',
              margin: '0 0 20px 0',
              fontFamily: 'Playfair Display, serif',
              lineHeight: '1.2',
            }}
          >
            Edimax Creations
          </h1>
          <p
            style={{
              fontSize: '24px',
              color: '#4F46E5',
              margin: '0 0 30px 0',
              fontWeight: '600',
            }}
          >
            Lifestyle-Driven Digital Marketing Agency
          </p>
          <p
            style={{
              fontSize: '18px',
              color: '#6B7280',
              margin: '0',
              lineHeight: '1.6',
            }}
          >
            Let's turn your business into a brand!
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
