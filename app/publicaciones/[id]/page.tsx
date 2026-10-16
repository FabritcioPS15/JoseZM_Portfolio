import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import PublicacionDetalle from '@/components/PublicacionDetalle'
import {
  getSections,
  itemHref,
  itemSlug,
  type ItemMatch,
  type Section,
  type SectionItem,
} from '@/lib/sections'
import {
  getPublicacionById,
  getDefaultPublicacionesSection,
  asSectionItem,
  TODAS_LAS_PUBLICACIONES,
} from '@/lib/publicacionesData'
import { absoluteUrl, metaDescription } from '@/lib/seo'

type Props = { params: Promise<{ id: string }> }

export const revalidate = 60

export async function generateStaticParams() {
  const sections = await getSections()
  const sectionKeys = sections
    .filter((section) => (section.link || '/publicaciones').replace(/\/+$/, '') === '/publicaciones')
    .flatMap((section) => section.items.map((item) => ({ id: itemSlug(item) })))

  const defaultKeys = TODAS_LAS_PUBLICACIONES.map((p) => ({ id: p.slug || p.id }))
  const allKeys = Array.from(
    new Set([...sectionKeys.map((s) => s.id), ...defaultKeys.map((d) => d.id)])
  )
  return allKeys.map((id) => ({ id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const found = await findItem(id)
  if (!found) return { title: 'Publicación no encontrada', robots: { index: false, follow: false } }

  const path = itemHref(found.item, found.section)
  const description = metaDescription(found.item) || undefined
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

async function findItem(
  key: string
): Promise<{ item: SectionItem; section: Section; matchedBy: ItemMatch } | null> {
  const sections = await getSections()

  for (const section of sections) {
    const bySlug = section.items.find((it) => it.slug && it.slug === key)
    if (bySlug) return { item: bySlug, section, matchedBy: 'slug' }
  }
  for (const section of sections) {
    const byId = section.items.find((it) => it.id === key)
    if (byId) return { item: byId, section, matchedBy: 'id' }
  }

  // Fallback a las publicaciones principales de publicacionesData
  const fallbackPub = getPublicacionById(key)
  if (fallbackPub) {
    const fallbackSection = getDefaultPublicacionesSection()
    return { item: asSectionItem(fallbackPub), section: fallbackSection, matchedBy: 'slug' }
  }

  return null
}

export default async function PublicacionDetailPage({ params }: Props) {
  const { id } = await params
  const found = await findItem(id)
  if (!found) notFound()

  // URL antigua basada en id: se redirige 301 a la URL con slug.
  if (found.matchedBy === 'id' && found.item.slug) {
    permanentRedirect(itemHref(found.item, found.section))
  }

  const related = found.section.items.filter((it) => it.id !== found.item.id).slice(0, 3)

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PublicacionDetalle item={found.item} section={found.section} related={related} />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
