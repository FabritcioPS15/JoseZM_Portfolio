import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import SectionItemDetail from '@/components/SectionItemDetail'
import { getSections, getSectionItem } from '@/lib/sections'
import { absoluteUrl } from '@/lib/seo'

type Props = { params: Promise<{ id: string }> }

export const revalidate = 60

export async function generateStaticParams() {
  const sections = await getSections()
  return sections
    .filter((section) => (section.link || '').replace(/\/+$/, '') === '/articulos')
    .flatMap((section) => section.items.map((item) => ({ id: item.id })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const found = await getSectionItem('/articulos', id)
  if (!found) return { title: 'Artículo no encontrado', robots: { index: false, follow: false } }

  const path = `/articulos/${id}`
  const description =
    found.item.description || found.item.content?.slice(0, 160) || undefined
  const images = found.item.image ? [absoluteUrl(found.item.image)] : undefined

  return {
    title: found.item.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      title: found.item.title,
      description,
      url: absoluteUrl(path),
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: found.item.title,
      description,
      images,
    },
  }
}

export default async function ArticuloDetailPage({ params }: Props) {
  const { id } = await params
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <SectionItemDetail sectionLink="/articulos" itemId={id} />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
