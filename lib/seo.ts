import { type Section, type SectionItem, itemHref } from '@/lib/sections'

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://joseluiszelada.pe'
).replace(/\/+$/, '')

export const SITE_NAME = 'José Luis Zelada'
export const FULL_NAME = 'José Luis Zelada Minaya'
export const SITE_TAGLINE = 'Consultor en Gestión del Talento Humano'
export const SITE_SLOGAN = 'Personas, Procesos y Resultados'
export const SITE_DESCRIPTION =
  'Consultor especializado en gestión del talento humano, desarrollo organizacional y consultoría estratégica. Acompaño a personas y organizaciones hacia el éxito.'
export const CONTACT_EMAIL = 'contacto@joseluiszelada.pe'
export const LINKEDIN_URL = 'https://linkedin.com/in/joseluiszelada'

// Variaciones del nombre para búsquedas (Google y datos estructurados).
export const NAME_VARIANTS = [
  'José Luis Zelada',
  'José Luis Minaya',
  'José Luis Zelada Minaya',
  'José Zelada Minaya',
  'José Zelada',
  'José Minaya',
  'Zelada Minaya',
  // Sin acentos para búsquedas
  'Jose Luis Zelada',
  'Jose Luis Minaya',
  'Jose Luis Zelada Minaya',
  'Jose Zelada Minaya',
  'Jose Zelada',
  'Jose Minaya',
  'Jose Zelada Peru',
  'Jose Luis Zelada Peru',
  'Jose Zelada Consultor',
  'Jose Luis Zelada Consultor',
  'Consultor RRHH Jose Zelada',
  'Consultor Talento Humano Jose Zelada',
]

export const LOGO_URL = `${SITE_URL}/images/Logotipo.png`
export const PORTRAIT_URL = `${SITE_URL}/images/perfilbueno.png`

export const PERSON_ID = `${SITE_URL}/#person`
export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//i.test(path)) return path
  return new URL(path.startsWith('/') ? path : `/${path}`, SITE_URL).toString()
}

function toIsoDate(value?: string): string | undefined {
  if (!value) return undefined
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return undefined
  return date.toISOString()
}

/** Convierte HTML del editor a texto plano (para meta descriptions). */
export function plainText(html?: string): string {
  if (!html) return ''
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

/** Meta description: usa la descripción o recorta el contenido sin HTML. */
export function metaDescription(item: SectionItem, max = 160): string {
  const base = item.description?.trim() || plainText(item.content)
  if (base.length <= max) return base
  return `${base.slice(0, max).replace(/\s+\S*$/, '')}…`
}

export function personSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE_NAME,
    alternateName: NAME_VARIANTS,
    givenName: 'José Luis',
    familyName: 'Zelada Minaya',
    url: SITE_URL,
    jobTitle: 'Consultor en Gestión del Talento Humano',
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    image: PORTRAIT_URL,
    logo: LOGO_URL,
    worksFor: { '@id': ORGANIZATION_ID },
    sameAs: [LINKEDIN_URL],
    knowsAbout: [
      'Gestión del Talento Humano',
      'Liderazgo',
      'Desarrollo Organizacional',
      'Gestión Estratégica',
      'Optimización de Procesos',
      'Recursos Humanos',
    ],
  }
}

export function organizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: NAME_VARIANTS,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
    },
    image: LOGO_URL,
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    slogan: SITE_SLOGAN,
    founder: { '@id': PERSON_ID },
    areaServed: { '@type': 'Country', name: 'Perú' },
    sameAs: [LINKEDIN_URL],
  }
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: 'es-PE',
    publisher: { '@id': PERSON_ID },
  }
}

export function breadcrumbSchema(
  items: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function collectionSchema(opts: {
  name: string
  description: string
  path: string
  items: { name: string; path: string }[]
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    inLanguage: 'es-PE',
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: opts.items.length,
      itemListElement: opts.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  }
}

export type ContentSchemaType = 'Article' | 'ScholarlyArticle' | 'Book'

export function contentSchema(opts: {
  item: SectionItem
  section: Section
}): Record<string, unknown> {
  const { item, section } = opts
  const path = itemHref(item, section)
  const url = absoluteUrl(path)

  let type: ContentSchemaType = 'Article'
  if (section.type === 'book') type = 'Book'
  else if ((section.link || '').includes('investigaciones')) type = 'ScholarlyArticle'

  const description =
    item.description || plainText(item.content).slice(0, 160) || undefined

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': type,
    headline: item.title,
    name: item.title,
    description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: 'es-PE',
    author: {
      '@type': 'Person',
      name: item.author || SITE_NAME,
      url: SITE_URL,
    },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
  }

  if (item.image) schema.image = absoluteUrl(item.image)

  const published = toIsoDate(item.date)
  const modified = toIsoDate(item.updatedAt) || published
  if (published) {
    schema.datePublished = published
  }
  if (modified) {
    schema.dateModified = modified
  }

  if (item.tags && item.tags.length > 0) schema.keywords = item.tags.join(', ')

  const bodyText = plainText(item.content)
  const wordCount = bodyText ? bodyText.split(/\s+/).filter(Boolean).length : 0
  if (wordCount > 0) schema.wordCount = wordCount

  if (type === 'Book') {
    schema.bookFormat = 'https://schema.org/Paperback'
    schema.inLanguage = 'es'
    if (section.title) schema.bookSeries = section.title
  } else if (section.title) {
    schema.articleSection = section.title
  }

  if (item.category) schema.genre = item.category

  return schema
}
