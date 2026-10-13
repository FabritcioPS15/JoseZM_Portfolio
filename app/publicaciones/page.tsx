import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import PublicacionesList from '@/components/PublicacionesList'
import PageBanner from '@/components/PageBanner'
import JsonLd from '@/components/JsonLd'
import { getSections, itemHref } from '@/lib/sections'
import { collectionSchema, breadcrumbSchema, absoluteUrl } from '@/lib/seo'

export const revalidate = 60

const DESCRIPTION =
  'Investigaciones, artículos y publicaciones de José Luis Zelada sobre gestión del talento humano, liderazgo y desarrollo organizacional.'

export const metadata: Metadata = {
  title: 'Publicaciones',
  description: DESCRIPTION,
  alternates: { canonical: '/publicaciones' },
  openGraph: {
    type: 'website',
    title: 'Publicaciones | José Luis Zelada',
    description: DESCRIPTION,
    url: absoluteUrl('/publicaciones'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Publicaciones | José Luis Zelada',
    description: DESCRIPTION,
  },
}

export default async function PublicacionesPage() {
  const sections = await getSections()
  const items = sections.flatMap((section) =>
    section.items.map((item) => ({ name: item.title, path: itemHref(item, section) }))
  )

  return (
    <main className="min-h-screen bg-white">
      <JsonLd
        data={[
          collectionSchema({
            name: 'Publicaciones de José Luis Zelada',
            description: DESCRIPTION,
            path: '/publicaciones',
            items,
          }),
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Publicaciones', path: '/publicaciones' },
          ]),
        ]}
      />
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
