import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import PageBanner from '@/components/PageBanner'
import ConsultingCta from '@/components/ConsultingCta'
import { absoluteUrl } from '@/lib/seo'
import { Users, Cog, BarChart3, Leaf, Check } from 'lucide-react'

const DESCRIPTION =
  'Servicios de consultoría en gestión del talento humano, optimización de procesos, gestión estratégica e indicadores y desarrollo organizacional.'

export const metadata: Metadata = {
  title: 'Servicios',
  description: DESCRIPTION,
  alternates: { canonical: '/servicios' },
  openGraph: {
    type: 'website',
    title: 'Servicios | José Luis Zelada',
    description: DESCRIPTION,
    url: absoluteUrl('/servicios'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Servicios | José Luis Zelada',
    description: DESCRIPTION,
  },
}

const SERVICES = [
  {
    id: 'talento-humano',
    icon: Users,
    title: 'Gestión del Talento Humano',
    description:
      'Atracción, desarrollo, retención y evaluación del talento para construir equipos comprometidos y de alto desempeño.',
    features: [
      'Reclutamiento y selección por competencias',
      'Gestión y evaluación del desempeño',
      'Planes de desarrollo y capacitación',
      'Clima laboral y cultura organizacional',
    ],
    cardBg: 'bg-[#FAF6EE]',
    borderColor: 'border-[#F2E8D7]',
    circleBorder: 'border-[#EADBBE]',
    iconColor: 'text-[#A27228]',
  },
  {
    id: 'optimizacion-procesos',
    icon: Cog,
    title: 'Optimización y Sistematización de Procesos',
    description:
      'Diseñamos procesos más eficientes, documentados y orientados a resultados que reducen costos y tiempos.',
    features: [
      'Mapeo y análisis de procesos',
      'Diseño de procedimientos y manuales',
      'Automatización y digitalización',
      'Indicadores de eficiencia y calidad',
    ],
    cardBg: 'bg-[#F0F5FA]',
    borderColor: 'border-[#DFEAF4]',
    circleBorder: 'border-[#D2E2F0]',
    iconColor: 'text-[#163860]',
  },
  {
    id: 'gestion-estrategica',
    icon: BarChart3,
    title: 'Gestión Estratégica e Indicadores',
    description:
      'Transformo la información en decisiones: objetivos claros, metas medibles y tableros de control accionables.',
    features: [
      'Definición de objetivos y metas',
      'Diseño de tableros de control (KPIs)',
      'Cuadro de mando integral',
      'Analítica de datos para la gestión',
    ],
    cardBg: 'bg-[#F2F7F2]',
    borderColor: 'border-[#E0EEE0]',
    circleBorder: 'border-[#D0E6D0]',
    iconColor: 'text-[#2D6E3F]',
  },
  {
    id: 'desarrollo-organizacional',
    icon: Leaf,
    title: 'Desarrollo Organizacional',
    description:
      'Acompaño procesos de cambio, fortalezco el liderazgo y alineo la cultura con la estrategia del negocio.',
    features: [
      'Diagnóstico organizacional',
      'Programas de liderazgo',
      'Gestión del cambio',
      'Cultura y valores organizacionales',
    ],
    cardBg: 'bg-[#FAF7F2]',
    borderColor: 'border-[#EFE7DC]',
    circleBorder: 'border-[#E6DEC8]',
    iconColor: 'text-[#2C5734]',
  },
]

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <PageBanner
        eyebrow="SERVICIOS"
        breadcrumb="Servicios"
        title="Consultoría para organizaciones más humanas"
        description="Servicios diseñados para fortalecer a las personas, optimizar los procesos y generar resultados sostenibles en tu organización."
      />

      {/* Services grid */}
      <section className="relative py-14 sm:py-16 lg:py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {SERVICES.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.id}
                  className={`rounded-2xl p-6 sm:p-8 border ${service.borderColor} ${service.cardBg} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                >
                  <div className="flex items-center gap-3.5 mb-4">
                    <div
                      className={`w-12 h-12 rounded-full bg-white shadow-xs border ${service.circleBorder} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon size={22} className={service.iconColor} strokeWidth={2.2} />
                    </div>
                    <h2 className="font-serif font-bold text-lg sm:text-xl text-brand-navy leading-snug">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <ul className="space-y-2.5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <Check size={16} className="text-brand-gold mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <ConsultingCta />

      <Footer />
      <ScrollToTop />
    </main>
  )
}
