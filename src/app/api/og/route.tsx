import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0B0D12 0%, #7a0e14 60%, #b61d23 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontFamily: 'Inter, system-ui, sans-serif',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '4px',
              background: '#b61d23',
            }}
          />
          <span
            style={{
              fontSize: '18px',
              color: '#b61d23',
              fontWeight: '700',
              letterSpacing: '6px',
              textTransform: 'uppercase',
            }}
          >
            Edimax Creations
          </span>
        </div>

        <h1
          style={{
            fontSize: '96px',
            fontWeight: '900',
            color: '#F7F8FA',
            margin: '0',
            fontFamily: 'Playfair Display, serif',
            lineHeight: '1.0',
            letterSpacing: '-0.03em',
            textAlign: 'center',
            maxWidth: '1000px',
          }}
        >
          Let's turn your business into a brand.
        </h1>

        <p
          style={{
            fontSize: '24px',
            color: 'rgba(247, 248, 250, 0.6)',
            margin: '40px 0 0 0',
            lineHeight: '1.5',
            textAlign: 'center',
            maxWidth: '720px',
          }}
        >
          Lifestyle-driven digital marketing — strategy, content, production, reputation.
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
