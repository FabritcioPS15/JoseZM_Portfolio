import { ImageResponse } from 'next/og'
import { SITE_NAME, SITE_TAGLINE } from '@/lib/seo'

export const ogAlt = `${SITE_NAME} — ${SITE_TAGLINE}`
export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 96px',
          backgroundColor: '#0B1522',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            color: '#C5A059',
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: 6,
            textTransform: 'uppercase',
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 800,
            marginTop: 28,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Consultor en Gestión del Talento Humano
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            color: '#94A3B8',
            marginTop: 32,
          }}
        >
          Personas, Procesos y Resultados
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: 14,
            backgroundColor: '#C5A059',
          }}
        />
      </div>
    ),
    { ...ogSize }
  )
}
