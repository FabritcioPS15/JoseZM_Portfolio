import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import ScrollToTopOnNavigate from '@/components/ScrollToTopOnNavigate'
import LogoLoader from '@/components/LogoLoader'
import './globals.css'

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: 'variable',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://joseluiszelada.pe'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'José Luis Zelada | Consultor en Gestión del Talento Humano',
  description: 'Consultor especializado en gestión del talento humano, desarrollo organizacional y consultoría estratégica. Acompaño a personas y organizaciones hacia el éxito.',
  keywords: ['Gestión del Talento Humano', 'Liderazgo', 'Recursos Humanos', 'Consultoría', 'José Luis Zelada', 'Desarrollo Organizacional'],
  authors: [{ name: 'José Luis Zelada' }],
  creator: 'José Luis Zelada',
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: SITE_URL,
    title: 'José Luis Zelada | Consultor en Gestión del Talento Humano',
    description: 'Consultor especializado en gestión del talento humano y desarrollo organizacional. Acompaño a personas y organizaciones hacia el éxito.',
    siteName: 'José Luis Zelada',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'José Luis Zelada',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'José Luis Zelada | Consultor en Gestión del Talento Humano',
    description: 'Consultor especializado en gestión del talento humano, desarrollo organizacional y consultoría estratégica.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0F2440' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`light ${cormorantGaramond.variable} ${dmSans.variable}`}>
      <body className="antialiased font-sans bg-white text-foreground">
        <LogoLoader />
        <ScrollToTopOnNavigate />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
