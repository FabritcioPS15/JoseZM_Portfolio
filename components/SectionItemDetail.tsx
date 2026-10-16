import { notFound, permanentRedirect } from 'next/navigation'
import PublicacionDetalle from './PublicacionDetalle'
import { findSectionItem, itemHref } from '@/lib/sections'

export default async function SectionItemDetail({
  sectionLink,
  itemId,
}: {
  sectionLink: string
  itemId: string
}) {
  const found = await findSectionItem(sectionLink, itemId)
  if (!found) notFound()

  // URL antigua basada en id: se redirige 301 a la URL con slug.
  if (found.matchedBy === 'id' && found.item.slug) {
    permanentRedirect(itemHref(found.item, found.section))
  }

  const related = found.section.items
    .filter((it) => it.id !== found.item.id)
    .slice(0, 3)
    .map(({ content, ...rest }) => rest)

  return <PublicacionDetalle item={found.item} section={found.section} related={related} />
}
