import { supabase } from './supabase'

export type SectionIcon = 'search' | 'book-open' | 'pen-tool' | 'briefcase'
export type SectionType = 'carousel' | 'book'

export interface SectionItem {
  id: string
  title: string
  meta: string
  description?: string
  image?: string
  link?: string
  category?: string
  author?: string
  date?: string
  tags?: string[]
  content?: string
  featured?: boolean
  /** Parte final de la URL (SEO). Si falta, se usa el id. */
  slug?: string
  /** Última modificación en ISO, para dateModified del JSON-LD. */
  updatedAt?: string
}

export interface Section {
  id: string
  title: string
  icon: SectionIcon
  type: SectionType
  link?: string
  order: number
  isVisible: boolean
  items: SectionItem[]
}

export function newId(): string {
  const c = typeof globalThis !== 'undefined' ? globalThis.crypto : undefined
  if (c && typeof c.randomUUID === 'function') return c.randomUUID()

  const bytes = c?.getRandomValues ? c.getRandomValues(new Uint8Array(16)) : null
  if (bytes) {
    bytes[6] = (bytes[6] & 0x0f) | 0x40
    bytes[8] = (bytes[8] & 0x3f) | 0x80
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
  }

  const rnd = (n: number) =>
    Array.from({ length: n }, () => Math.floor(Math.random() * 16).toString(16)).join('')
  return `${rnd(8)}-${rnd(4)}-4${rnd(3)}-${['8', '9', 'a', 'b'][Math.floor(Math.random() * 4)]}${rnd(3)}-${rnd(12)}`
}

export function parseTags(value: string): string[] {
  return value
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
}

/** Convierte un título en un slug: sin acentos, minúsculas y guiones. */
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/g, '')
}

/** Identificador legible del ítem en la URL. Cae al id si no hay slug. */
export function itemSlug(item: SectionItem): string {
  return (item.slug || '').trim() || item.id
}

// La tarjeta SIEMPRE abre la página de detalle interna del ítem, aunque
// tenga enlace externo. El enlace externo (item.link) se muestra como
// botón aparte ("Ver publicación completa") dentro del detalle.
export function itemHref(item: SectionItem, section: Section): string {
  const base =
    section.link && section.link.startsWith('/')
      ? section.link.replace(/\/+$/, '')
      : '/publicaciones'
  return `${base}/${itemSlug(item)}`
}

export function defaultSection(order: number): Section {
  return {
    id: newId(),
    title: 'NUEVA SECCIÓN',
    icon: 'search',
    type: 'carousel',
    link: '/publicaciones',
    order,
    isVisible: true,
    items: [
      {
        id: newId(),
        title: 'Título del artículo',
        meta: '2025',
        category: 'Investigación',
        author: 'José Luis Zelada',
        description: 'Resumen breve del artículo.',
        image:
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&h=300&fit=crop',
      },
    ],
  }
}

/**
 * Asigna un slug derivado del título a cada ítem que aún no lo tenga,
 * garantizando que sea único dentro de su sección. Devuelve las secciones
 * resultantes y los ids de las que cambiaron, para que el editor las marque
 * como pendientes de guardar.
 */
export function backfillSlugs(sections: Section[]): {
  sections: Section[]
  changedIds: string[]
} {
  const changedIds: string[] = []

  const next = sections.map((section) => {
    const used = new Set(
      section.items.map((it) => (it.slug || '').trim().toLowerCase()).filter(Boolean)
    )

    let changed = false
    const items = section.items.map((item) => {
      if ((item.slug || '').trim()) return item

      const base = slugify(item.title)
      if (!base) return item

      let candidate = base
      let n = 2
      while (used.has(candidate)) candidate = `${base}-${n++}`
      used.add(candidate)
      changed = true
      return { ...item, slug: candidate }
    })

    if (!changed) return section
    changedIds.push(section.id)
    return { ...section, items }
  })

  return { sections: next, changedIds }
}

export function normalizeSection(row: Record<string, unknown> | null | undefined): Section | null {
  if (!row) return null

  const items = Array.isArray(row.items)
    ? (row.items as unknown[]).map((it) => {
      const item = (it ?? {}) as Record<string, unknown>
      return {
        id: typeof item.id === 'string' && item.id ? item.id : newId(),
        title: typeof item.title === 'string' ? item.title : '',
        meta: typeof item.meta === 'string' ? item.meta : '',
        description:
          typeof item.description === 'string' ? item.description : undefined,
        image: typeof item.image === 'string' && item.image ? item.image : undefined,
        link: typeof item.link === 'string' && item.link ? item.link : undefined,
        category:
          typeof item.category === 'string' && item.category ? item.category : undefined,
        author:
          typeof item.author === 'string' && item.author ? item.author : undefined,
        date: typeof item.date === 'string' && item.date ? item.date : undefined,
        tags:
          Array.isArray(item.tags) &&
            item.tags.every((t) => typeof t === 'string')
            ? item.tags
            : undefined,
        content:
          typeof item.content === 'string' && item.content ? item.content : undefined,
        featured:
          typeof item.featured === 'boolean' ? item.featured : undefined,
        slug: typeof item.slug === 'string' && item.slug ? item.slug : undefined,
        updatedAt:
          typeof item.updatedAt === 'string' && item.updatedAt ? item.updatedAt : undefined,
      } satisfies SectionItem
    })
    : []

  const type = row.type === 'book' ? 'book' : 'carousel'
  const icon: SectionIcon =
    row.icon === 'book-open' || row.icon === 'pen-tool' || row.icon === 'briefcase'
      ? row.icon
      : 'search'

  // La columna puede llamarse is_visible (PostgREST) o isVisible (JSON).
  const rowIsVisible =
    typeof row.isVisible === 'boolean'
      ? row.isVisible
      : typeof row.is_visible === 'boolean'
        ? row.is_visible
        : true

  return {
    id: typeof row.id === 'string' ? row.id : newId(),
    title: typeof row.title === 'string' ? row.title : '',
    icon,
    type,
    link: typeof row.link === 'string' && row.link ? row.link : '/publicaciones',
    order: typeof row.order === 'number' ? row.order : 0,
    isVisible: rowIsVisible,
    items,
  }
}

export async function getSections(): Promise<Section[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('sections')
    .select('*')
    .order('order', { ascending: true })

  if (error) return []
  if (!data || data.length === 0) return []

  return data
    .map(normalizeSection)
    .filter((s): s is Section => s !== null)
    .filter((s) => s.isVisible !== false)
}

export async function getSectionByLink(link: string): Promise<Section | null> {
  const sections = await getSections()
  return sections.find((s) => s.link === link) ?? null
}

export type ItemMatch = 'slug' | 'id'

/** Busca un ítem por su slug (preferido) o su id. Indica con qué coincidió. */
export async function findSectionItem(
  link: string,
  key: string
): Promise<{ item: SectionItem; section: Section; matchedBy: ItemMatch } | null> {
  const section = await getSectionByLink(link)
  if (!section) return null

  const bySlug = section.items.find((it) => it.slug && it.slug === key)
  const item = bySlug ?? section.items.find((it) => it.id === key)
  if (!item) return null

  return { item, section, matchedBy: bySlug ? 'slug' : 'id' }
}

export async function getSectionItem(
  link: string,
  key: string
): Promise<{ item: SectionItem; section: Section } | null> {
  const found = await findSectionItem(link, key)
  if (!found) return null

  // Payload mínimo al cliente: la página de detalle solo usa título/enlace/tipo de la
  // sección; los "relacionados" se limitan a 3 y sin el contenido pesado.
  const stripContent = (it: SectionItem): SectionItem => {
    const { content, ...rest } = it
    return rest
  }

  return {
    item: found.item,
    section: {
      id: found.section.id,
      title: found.section.title,
      icon: found.section.icon,
      type: found.section.type,
      link: found.section.link,
      order: found.section.order,
      isVisible: true,
      items: found.section.items
        .filter((it) => it.id !== found.item.id)
        .slice(0, 3)
        .map(stripContent),
    },
  }
}
