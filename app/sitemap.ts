import { MetadataRoute } from 'next'
import { getSections, itemHref } from '@/lib/sections'
import { SERVICES } from '@/lib/services'
import { SITE_URL } from '@/lib/seo'

// Se regenera cada 60 s para incluir publicaciones/artículos recién creados.
export const revalidate = 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sections = await getSections()
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/servicios`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/publicaciones`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/articulos`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/investigaciones`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contacto`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/tienda`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/politica-de-privacidad`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/terminos-y-condiciones`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${SITE_URL}/servicios/${service.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const dynamicRoutes: MetadataRoute.Sitemap = sections.flatMap((section) =>
    section.items.map((item) => {
      const modified = item.updatedAt
        ? new Date(item.updatedAt)
        : item.date
          ? new Date(item.date)
          : null
      const lastModified = modified && !Number.isNaN(modified.getTime()) ? modified : now
      return {
        url: `${SITE_URL}${itemHref(item, section)}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }
    })
  )

  return [...staticRoutes, ...serviceRoutes, ...dynamicRoutes]
}
