import { NextResponse } from 'next/server'
import { getSections, itemHref } from '@/lib/sections'

// Índice público y ligero para el buscador del navbar. Solo expone los campos
// necesarios para filtrar y enlazar al detalle (nunca el contenido completo).
export const revalidate = 60

export async function GET() {
  const sections = await getSections()

  const items = sections.flatMap((section) =>
    section.items.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description ?? '',
      meta: item.meta ?? '',
      author: item.author ?? '',
      category: item.category ?? '',
      tags: item.tags ?? [],
      image: item.image ?? '',
      href: itemHref(item, section),
      section: section.title,
    }))
  )

  return NextResponse.json({ items })
}
