import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import PublicacionesList from '@/components/PublicacionesList'
import PageBanner from '@/components/PageBanner'
import { getSections } from '@/lib/sections'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Publicaciones | José Luis Zelada',
  description:
    'Investigaciones, artículos y publicaciones de José Luis Zelada sobre gestión del talento humano, liderazgo y desarrollo organizacional.',
}

export default async function PublicacionesPage() {
  const sections = await getSections()

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <PageBanner
        eyebrow="PUBLICACIONES"
        breadcrumb="Publicaciones"
        title="Todas mis publicaciones"
        description="Un espacio con las investigaciones, artículos y publicaciones destacadas sobre gestión del talento humano, liderazgo y desarrollo organizacional."
      />

      {/* Sections */}
      <section className="relative pb-16 md:pb-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <PublicacionesList sections={sections} />
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  )
}
