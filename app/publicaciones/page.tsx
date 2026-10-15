import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import PublicacionesView from '@/components/PublicacionesView'
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

      <PublicacionesView sections={sections} />

      <Footer />
      <ScrollToTop />
    </main>
  )
}
