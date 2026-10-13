import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import PublicacionDetalle from '@/components/PublicacionDetalle'
import { getSections, itemHref, type Section, type SectionItem } from '@/lib/sections'
import { absoluteUrl } from '@/lib/seo'

type Props = { params: Promise<{ id: string }> }

export const revalidate = 60

export async function generateStaticParams() {
  const sections = await getSections()
  return sections
    .filter((section) => (section.link || '/publicaciones').replace(/\/+$/, '') === '/publicaciones')
    .flatMap((section) => section.items.map((item) => ({ id: item.id })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const found = await findItem(id)
  if (!found) return { title: 'Publicación no encontrada', robots: { index: false, follow: false } }

  const path = itemHref(found.item, found.section)
  const description =
    found.item.description || found.item.content?.slice(0, 160) || undefined
  const images = found.item.image ? [absoluteUrl(found.item.image)] : undefined

  return {
    title: found.item.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: found.section.type === 'book' ? 'book' : 'article',
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

async function findItem(id: string): Promise<{ item: SectionItem; section: Section } | null> {
  const sections = await getSections()
  for (const section of sections) {
    const item = section.items.find((it) => it.id === id)
    if (item) return { item, section }
  }
  return null
}

export default async function PublicacionDetailPage({ params }: Props) {
  const { id } = await params
  const found = await findItem(id)
  if (!found) notFound()

  const related = found.section.items.filter((it) => it.id !== id).slice(0, 3)

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PublicacionDetalle item={found.item} section={found.section} related={related} />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
