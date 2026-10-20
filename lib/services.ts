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

export const SERVICES: Service[] = [
  {
    slug: 'talento-humano',
    title: 'Gestión del Talento Humano',
    shortTitle: 'Talento Humano',
    description:
      'Estrategias y herramientas para atraer, desarrollar y retener el talento, fortaleciendo equipos comprometidos y productivos.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=600&h=400&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop&q=80',
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
