import type { Metadata } from 'next'
import { absoluteUrl, SITE_URL, PERSON_ID, SITE_NAME } from '@/lib/seo'

export type Service = {
  slug: string
  title: string
  shortTitle: string
  description: string
  image: string
  /** Párrafo adicional para la página de detalle */
  detail: string
  /** Puntos clave para la página de detalle */
  points: string[]
}

/**
 * Catálogo de servicios (usado por home, nav, sitemap y "otros servicios").
 * El contenido detallado de cada página vive en:
 * app/servicios/<slug>/page.tsx
 */
export const SERVICES: Service[] = [
  {
    slug: 'talento-humano',
    title: 'Gestión del Talento Humano',
    shortTitle: 'Talento Humano',
    description:
      'Estrategias y herramientas para atraer, desarrollar y retener el talento, fortaleciendo equipos comprometidos y productivos.',
    image:
      '/images/Servicios/Gestion_de_talento_humano.jpeg',
    detail:
      'Las personas son el motor de cualquier organización. Acompaño a los equipos directivos a diseñar una gestión del talento coherente con su estrategia: desde cómo atraen a las personas correctas, hasta cómo las desarrollan, reconocen y retienen. El resultado son equipos más comprometidos, con claridad en sus roles y alineados con los objetivos del negocio.',
    points: [
      'Diagnóstico del clima y la cultura organizacional',
      'Planes de desarrollo, compensación y retención de talento',
      'Sistemas de evaluación de desempeño',
      'Estrategias de compromiso y bienestar laboral',
    ],
  },
  {
    slug: 'diseno-organizacional',
    title: 'Diseño y Desarrollo Organizacional',
    shortTitle: 'Diseño Organizacional',
    description:
      'Estructuras, roles y procesos alineados a la estrategia para una organización más eficiente, ágil y sostenible.',
    image:
      '/images/Servicios/Diseño_y_desarrollo_organizacional.jpeg',
    detail:
      'Una buena estrategia necesita una estructura que la sostenga. Analizo la estructura actual de la organización —niveles de decisión, roles, responsabilidades y flujos de comunicación— y la rediseño para que soporte el crecimiento y la agilidad que el negocio requiere, sin perder el control ni la claridad.',
    points: [
      'Diagnóstico de estructura, roles y responsabilidades',
      'Modelos organizacionales alineados a la estrategia',
      'Rediseño de áreas, niveles y flujos de decisión',
      'Acompañamiento en la gestión del cambio',
    ],
  },
  {
    slug: 'gestion-procesos',
    title: 'Gestión por Procesos',
    shortTitle: 'Gestión por Procesos',
    description:
      'Mapeo, análisis y mejora de procesos para incrementar la eficiencia, reducir reprocesos y generar mayor valor.',
    image:
      '/images/Servicios/Gestion_por_procesos.jpeg',
    detail:
      'Cuando los procesos no están claros, el esfuerzo se pierde en reprocesos, esperas y decisiones que nadie sabe quién toma. Mapeo y documento los procesos clave de la organización, identifico cuellos de botella y propongo mejoras concretas para que el trabajo fluya con menos fricción y genere más valor.',
    points: [
      'Mapeo y documentación de procesos clave',
      'Identificación de cuellos de botella y reprocesos',
      'Modelos de gobierno y mejora continua',
      'Estandarización y escalamiento de buenas prácticas',
    ],
  },
  {
    slug: 'indicadores-resultados',
    title: 'Indicadores y Gestión de Resultados',
    shortTitle: 'Indicadores y Resultados',
    description:
      'Definición e implementación de indicadores y tableros de gestión para una mejor toma de decisiones.',
    image:
      '/images/Servicios/Indicadores_y_gestion_de_resultados.jpeg',
    detail:
      'Lo que no se mide, no se gestiona. Defino junto al equipo los indicadores que realmente importan para el negocio, los conecto con los objetivos estratégicos y construyo tableros de gestión que permiten tomar decisiones con información confiable y a tiempo, en lugar de intuiciones.',
    points: [
      'Definición de indicadores alineados a los objetivos',
      'Tableros de gestión para la toma de decisiones',
      'Seguimiento de metas y cultura de resultados',
      'Ciclo de gestión por resultados y rendición de cuentas',
    ],
  },
  {
    slug: 'capacitacion',
    title: 'Capacitación y Acompañamiento',
    shortTitle: 'Capacitación',
    description:
      'Programas de formación y acompañamiento para fortalecer las competencias clave y la cultura organizacional.',
    image:
      '/images/Servicios/Capacitacion_y_acompañamiento.jpeg',
    detail:
      'La mejora organizacional es sostenible solo cuando las personas la hacen propia. Diseño e impulso programas de formación y acompañamiento práctico —talleres, mentoría y seguimiento— para fortalecer las competencias de los equipos y sostener los cambios en el tiempo.',
    points: [
      'Programas de formación a la medida de la organización',
      'Talleres de liderazgo, competencias y cultura',
      'Acompañamiento en proyectos de mejora',
      'Seguimiento para la sustentabilidad del aprendizaje',
    ],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug)
}

export function serviceHref(service: Service): string {
  return `/servicios/${service.slug}`
}

/** Schema.org para una página de servicio */
export function serviceSchema(service: Service): Record<string, unknown> {
  const path = `/servicios/${service.slug}`
  const url = absoluteUrl(path)

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: service.title,
    description: service.description,
    url,
    image: absoluteUrl(service.image),
    provider: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: SITE_NAME,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Perú',
    },
    inLanguage: 'es-PE',
    offers: {
      '@type': 'Offer',
      name: service.title,
      description: service.description,
      availableAtOrFrom: {
        '@type': 'Place',
        name: 'Perú',
      },
    },
  }
}

/** Metadata estándar para la página de detalle de un servicio. */
export function servicePageMetadata(slug: string): Metadata {
  const service = getServiceBySlug(slug)
  if (!service) {
    return { title: 'Servicio no encontrado', robots: { index: false, follow: false } }
  }

  const path = `/servicios/${service.slug}`
  const description = service.description

  return {
    title: service.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      title: `${service.title} | José Luis Zelada`,
      description,
      url: absoluteUrl(path),
      images: [
        {
          url: absoluteUrl(service.image),
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | José Luis Zelada`,
      description,
      images: [absoluteUrl(service.image)],
    },
  }
}
