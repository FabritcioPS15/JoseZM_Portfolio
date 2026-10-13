import type { Metadata } from 'next'
import SectionPage from '@/components/SectionPage'
import { absoluteUrl } from '@/lib/seo'

export const revalidate = 60

const DESCRIPTION =
  'Investigaciones de José Luis Zelada sobre gestión del talento humano, desempeño organizacional y liderazgo.'

export const metadata: Metadata = {
  title: 'Investigaciones',
  description: DESCRIPTION,
  alternates: { canonical: '/investigaciones' },
  openGraph: {
    type: 'website',
    title: 'Investigaciones | José Luis Zelada',
    description: DESCRIPTION,
    url: absoluteUrl('/investigaciones'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investigaciones | José Luis Zelada',
    description: DESCRIPTION,
  },
}

export default function InvestigacionesPage() {
  return (
    <SectionPage
      sectionLink="/investigaciones"
      eyebrow="INVESTIGACIONES"
      title="Investigaciones"
      description="Estudios y análisis sobre gestión del talento humano, desempeño organizacional y las nuevas dinámicas del trabajo."
    />
  )
}
