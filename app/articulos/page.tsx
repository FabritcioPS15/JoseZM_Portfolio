import type { Metadata } from 'next'
import SectionPage from '@/components/SectionPage'
import { absoluteUrl } from '@/lib/seo'

export const revalidate = 60

const DESCRIPTION =
  'Artículos de José Luis Zelada sobre liderazgo consciente, cultura organizacional y desarrollo de equipos.'

export const metadata: Metadata = {
  title: 'Artículos',
  description: DESCRIPTION,
  alternates: { canonical: '/articulos' },
  openGraph: {
    type: 'website',
    title: 'Artículos | José Luis Zelada',
    description: DESCRIPTION,
    url: absoluteUrl('/articulos'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artículos | José Luis Zelada',
    description: DESCRIPTION,
  },
}

export default function ArticulosPage() {
  return (
    <SectionPage
      sectionLink="/articulos"
      eyebrow="ARTÍCULOS"
      title="Artículos"
      description="Reflexiones y experiencias sobre liderazgo, cultura organizacional y desarrollo profesional de los equipos."
    />
  )
}
