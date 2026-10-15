import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ConsultingCta from '@/components/ConsultingCta'
import { absoluteUrl } from '@/lib/seo'
import ServiciosContent from './ServiciosContent'

const DESCRIPTION =
  'Servicios de consultoría en gestión del talento humano, diseño organizacional, gestión por procesos, indicadores de resultados y capacitación.'

export const metadata: Metadata = {
  title: 'Servicios',
  description: DESCRIPTION,
  alternates: { canonical: '/servicios' },
  openGraph: {
    type: 'website',
    title: 'Servicios | José Luis Zelada',
    description: DESCRIPTION,
    url: absoluteUrl('/servicios'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Servicios | José Luis Zelada',
    description: DESCRIPTION,
  },
}

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <ServiciosContent />
      <ConsultingCta />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
