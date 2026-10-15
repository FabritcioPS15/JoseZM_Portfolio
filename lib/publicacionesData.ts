import type { SectionItem, Section } from './sections'

export interface PublicacionItem extends SectionItem {
  id: string
  title: string
  category: string
  description: string
  content: string
  date: string
  readTime: string
  image: string
  author: string
  tags?: string[]
  featured?: boolean
}

export const CATEGORIAS_PUBLICACIONES = [
  'Todos',
  'Gestión del Talento',
  'Liderazgo',
  'Procesos',
  'Cultura Organizacional',
  'Productividad',
  'Innovación',
  'Análisis',
]

export const ARTICULO_DESTACADO: PublicacionItem = {
  id: 'gestion-que-impulsa-resultados-sostenibles',
  title: 'Gestión que impulsa resultados sostenibles',
  category: 'Artículo Destacado',
  description: 'Claves para integrar personas, procesos y estrategia en un mismo direccionamiento.',
  meta: '2024',
  date: '18 may. 2024',
  readTime: '7 min de lectura',
  author: 'José Luis Zelada',
  image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=500&fit=crop',
  tags: ['Estrategia', 'Sostenibilidad', 'Gestión Integral'],
  featured: true,
  content: `La sostenibilidad de los resultados empresariales no proviene de esfuerzos aislados, sino de la sincronización armónica de tres pilares fundamentales: personas, procesos y estrategia. Cuando una organización logra alinear estos tres componentes, el crecimiento deja de ser una casualidad para convertirse en una consecuencia natural y predecible.

En primer lugar, las personas representan el motor ejecutor de toda visión. Sin un equipo con las competencias adecuadas, motivado y con claridad sobre su rol, hasta la estrategia más brillante fracasa en la implementación. Es indispensable fomentar una cultura de liderazgo cercano y comunicación abierta.

En segundo término, los procesos proporcionan la estructura y la certidumbre necesarias para escalar. La sistematización de operaciones clave no burocratiza la empresa, sino que libera tiempo para la innovación y garantiza estándares consistentes de calidad.

Por último, la estrategia brinda el rumbo. Sin un direccionamiento claro, la eficiencia operativa se convierte en velocidad sin destino. La integración continua de estos elementos es el sello distintivo de las organizaciones de alto desempeño.`,
}

export const PUBLICACIONES_ARTICULOS: PublicacionItem[] = [
  {
    id: 'diversidad-generacional-organizaciones',
    title: 'La diversidad generacional en las organizaciones',
    category: 'Gestión del Talento',
    description: 'Cómo aprovechar las fortalezas de cada generación para construir equipos más productivos y comprometidos.',
    meta: '2024',
    date: '15 abr. 2024',
    readTime: '6 min de lectura',
    author: 'José Luis Zelada',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
    tags: ['Diversidad', 'Generaciones', 'Equipos', 'Talento Humano'],
    content: `Hoy en día, las organizaciones conviven por primera vez en la historia con cuatro generaciones distintas en un mismo espacio de trabajo: Baby Boomers, Generación X, Millennials y Generación Z. Cada grupo aporta perspectivas, estilos de comunicación y expectativas laborales singulares.

El verdadero desafío del liderazgo moderno radica en dejar de ver estas diferencias como una fuente de fricción y transformarlas en una ventaja competitiva. Mientras que los profesionales con mayor trayectoria ofrecen sabiduría contextual, resiliencia y pensamiento estratégico, las generaciones más jóvenes inyectan fluidez digital, agilidad y cuestionamiento del statu quo.

Para capitalizar esta sinergia, las organizaciones deben establecer programas de mentoría bidireccional, flexibilizar los modelos de trabajo y promover una cultura fundamentada en el respeto mutuo y la escucha activa.`,
  },
  {
    id: 'beneficios-sistematizar-procesos',
    title: 'Beneficios de sistematizar tus procesos',
    category: 'Procesos',
    description: 'Decisiones que las Mypes deben priorizar para mejorar la productividad y ser más competitivas.',
    meta: '2024',
    date: '28 feb. 2024',
    readTime: '8 min de lectura',
    author: 'José Luis Zelada',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&h=400&fit=crop',
    tags: ['Procesos', 'Productividad', 'Mypes', 'Eficiencia'],
    content: `Uno de los mayores obstáculos para el crecimiento de las pequeñas y medianas empresas es la falta de procesos estandarizados. Con frecuencia, las operaciones diarias dependen de la memoria individual o de decisiones improvisadas, generando cuellos de botella y errores recurrentes.

Sistematizar los procesos no significa llenar la empresa de manuales densos que nadie lee. Consiste en documentar de manera práctica y visual los flujos críticos de trabajo: cómo se atiende a un cliente, cómo se entrega un servicio y cómo se resuelven las contingencias operativas.

Entre los principales beneficios destacan la reducción de costos operativos, la aceleración de la curva de aprendizaje de nuevos colaboradores y la capacidad real de delegar sin comprometer la calidad del resultado final.`,
  },
  {
    id: 'empresa-procesos-o-depende-personas',
    title: '¿Tu empresa tiene procesos o depende de personas?',
    category: 'Liderazgo',
    description: 'Riesgos, consecuencias y cómo avanzar hacia una gestión más sólida y sostenible.',
    meta: '2024',
    date: '10 ene. 2024',
    readTime: '5 min de lectura',
    author: 'José Luis Zelada',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    tags: ['Liderazgo', 'Institucionalización', 'Riesgos', 'Gestión'],
    content: `¿Qué ocurriría en tu empresa si tu colaborador clave se ausenta durante un mes? Si la respuesta genera alarma inmediata, tu organización padece de alta dependencia personal en lugar de contar con una estructura basada en procesos.

La dependencia excesiva de personas clave crea vulnerabilidad operativa, limita la escalabilidad del negocio y genera sobrecarga en los líderes. Los procesos bien definidos no buscan deshumanizar el trabajo, sino brindar una red de seguridad que potencie el talento individual.

La transición hacia una gestión basada en procesos requiere identificar los conocimientos tácitos, transformarlos en estándares compartidos y empoderar al equipo para mejorar continuamente esos procedimientos.`,
  },
  {
    id: 'indicadores-de-gestion-que-medir',
    title: 'Indicadores de gestión: qué medir y para qué',
    category: 'Productividad',
    description: 'Los indicadores clave que toda organización debe monitorear para una mejor toma de decisiones.',
    meta: '2023',
    date: '12 dic. 2023',
    readTime: '7 min de lectura',
    author: 'José Luis Zelada',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    tags: ['KPIs', 'Indicadores', 'Productividad', 'Decisiones'],
    content: `Lo que no se mide no se puede gestionar, pero medirlo todo conduce a la parálisis por análisis. Los líderes efectivos seleccionan un número acotado de indicadores clave (KPIs) directamente conectados con los objetivos estratégicos.

Es crucial balancear los indicadores de resultado (lagging metrics) —como la rentabilidad o rotación de personal— con indicadores de proceso (leading metrics), que alertan oportunamente sobre desviaciones antes de que se conviertan en pérdidas.

Un tablero de control efectivo debe ser comprensible para todo el equipo y servir como base para conversaciones constructivas de mejora, no como un instrumento punitivo.`,
  },
  {
    id: 'fortalecer-cultura-organizacional-practica',
    title: 'Cómo fortalecer la cultura organizacional en la práctica',
    category: 'Cultura Organizacional',
    description: 'Acciones concretas para construir equipos más comprometidos y alineados con los objetivos del negocio.',
    meta: '2023',
    date: '05 nov. 2023',
    readTime: '6 min de lectura',
    author: 'José Luis Zelada',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop',
    tags: ['Cultura', 'Compromiso', 'Valores', 'Clima Laboral'],
    content: `La cultura organizacional no es el cartel con valores colgado en la recepción; es lo que sucede cuando los directivos no están presentes. Se construye día a día en la forma en que se reconocen los aciertos, se corrigen los errores y se toman decisiones complejas.

Para fortalecerla de manera práctica, es indispensable que los líderes modelen con coherencia los comportamientos esperados. Nada daña más la moral de un equipo que la disparidad entre el discurso oficial y las acciones cotidianas.

Implementar rituales de reconocimiento, espacios periódicos de feedback y canales transparentes de comunicación son palancas probadas para afianzar el sentido de pertenencia y elevar el compromiso.`,
  },
  {
    id: 'tendencias-gestion-del-talento-proximos-anos',
    title: 'Tendencias en gestión del talento para los próximos años',
    category: 'Análisis',
    description: 'Oportunidades y desafíos que las organizaciones deben considerar para seguir siendo competitivas.',
    meta: '2023',
    date: '20 oct. 2023',
    readTime: '9 min de lectura',
    author: 'José Luis Zelada',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop',
    tags: ['Tendencias', 'Futuro del Trabajo', 'Talento', 'Innovación'],
    content: `El mundo del trabajo atraviesa transformaciones sin precedentes impulsadas por la inteligencia artificial, la flexibilidad laboral y la demanda de propósitos auténticos por parte de los profesionales.

Las organizaciones líderes ya no se enfocan únicamente en retener talento mediante compensación monetaria, sino en diseñar una propuesta de valor integral: desarrollo continuo de habilidades (upskilling y reskilling), bienestar emocional y liderazgo humanizado.

Quienes anticipen estas transformaciones y adapten sus modelos de atracción y fidelización de talento consolidarán una ventaja definitiva frente a competidores rígidos y tradicionales.`,
  },
]

export const ARTICULOS_ADICIONALES: PublicacionItem[] = [
  {
    id: 'liderazgo-efectivo-tiempos-cambio',
    title: 'Claves para un liderazgo efectivo en tiempos de cambio',
    category: 'Liderazgo',
    description: 'Estrategias prácticas para guiar equipos en contextos de incertidumbre y transformación.',
    meta: '2023',
    date: '14 sep. 2023',
    readTime: '6 min de lectura',
    author: 'José Luis Zelada',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=400&fit=crop',
    tags: ['Liderazgo', 'Cambio', 'Resiliencia'],
    content: `El liderazgo en tiempos de certidumbre es administrativo; en tiempos de cambio, es transformacional. Guiar a un equipo a través de la ambigüedad demanda serenidad, empatía y una visión nítida del norte estratégico.

Comunicar con frecuencia, incluso cuando no se tienen todas las respuestas, disminuye el rumor y fortalece la confianza colectiva. El cambio exige acompañamiento cercano y validación de las emociones del equipo.`,
  },
  {
    id: 'como-medir-indice-control-cumplimientos',
    title: 'Cómo medir el índice de control de cumplimientos',
    category: 'Procesos',
    description: 'Metodología paso a paso para evaluar el nivel de ejecución y estándares operativos en tu empresa.',
    meta: '2023',
    date: '02 ago. 2023',
    readTime: '8 min de lectura',
    author: 'José Luis Zelada',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
    tags: ['Control', 'Cumplimiento', 'Calidad', 'Operaciones'],
    content: `El índice de control de cumplimiento permite verificar si lo planificado se traduce efectivamente en la operación diaria. Establecer auditorías ágiles, listas de verificación estandarizadas y revisiones periódicas garantiza que los procesos se mantengan vivos y actualizados.`,
  },
]

export const TEMAS_MAS_LEIDOS = [
  {
    id: 'diversidad-generacional-organizaciones',
    title: 'La diversidad generacional en las organizaciones',
  },
  {
    id: 'beneficios-sistematizar-procesos',
    title: 'Beneficios de sistematizar tus procesos',
  },
  {
    id: 'empresa-procesos-o-depende-personas',
    title: '¿Tu empresa tiene procesos o depende de personas?',
  },
  {
    id: 'liderazgo-efectivo-tiempos-cambio',
    title: 'Claves para un liderazgo efectivo en tiempos de cambio',
  },
  {
    id: 'como-medir-indice-control-cumplimientos',
    title: 'Cómo medir el índice de control de cumplimientos',
  },
]

export const TODAS_LAS_PUBLICACIONES: PublicacionItem[] = [
  ARTICULO_DESTACADO,
  ...PUBLICACIONES_ARTICULOS,
  ...ARTICULOS_ADICIONALES,
]

export function getPublicacionById(id: string): PublicacionItem | undefined {
  return TODAS_LAS_PUBLICACIONES.find((p) => p.id === id)
}

export function asSectionItem(p: PublicacionItem): SectionItem {
  return {
    id: p.id,
    title: p.title,
    meta: p.meta || p.date,
    category: p.category,
    author: p.author,
    date: p.date,
    description: p.description,
    content: p.content,
    image: p.image,
    tags: p.tags,
    featured: p.featured,
  }
}

export function getDefaultPublicacionesSection(): Section {
  return {
    id: 'section-publicaciones-default',
    title: 'PUBLICACIONES',
    icon: 'book-open',
    type: 'carousel',
    link: '/publicaciones',
    order: 1,
    isVisible: true,
    items: TODAS_LAS_PUBLICACIONES.map(asSectionItem),
  }
}
