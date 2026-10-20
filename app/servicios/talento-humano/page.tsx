import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Calendar,
  Users,
  TrendingUp,
  Award,
  Building2,
  Search,
  FileText,
  BarChart3,
  GraduationCap,
  RefreshCw,
  UserCheck,
  Frown,
  ClipboardCheck,
  Target,
  Settings,
  Rocket,
  ChevronDown,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ConsultingCta from '@/components/ConsultingCta'
import OtherServices from '@/components/OtherServices'
import { servicePageMetadata } from '@/lib/services'

export const metadata: Metadata = servicePageMetadata('talento-humano')

const SLUG = 'talento-humano'

// 4 Pilares clave (barra debajo del Hero)
const KEY_PILLARS = [
  {
    icon: Users,
    title: 'Atracción y selección',
    description: 'Incorporamos el talento adecuado para impulsar tus objetivos.',
  },
  {
    icon: TrendingUp,
    title: 'Desarrollo de competencias',
    description: 'Potenciamos las habilidades de tus equipos.',
  },
  {
    icon: Award,
    title: 'Desempeño y crecimiento',
    description: 'Impulsamos el alto desempeño y el desarrollo profesional.',
  },
  {
    icon: Building2,
    title: 'Clima y cultura',
    description: 'Fortalecemos entornos de trabajo positivos y sostenibles.',
  },
]

// ¿Qué incluye este servicio? (5 tarjetas numeradas)
const INCLUDED_SERVICES = [
  {
    number: 1,
    icon: Search,
    title: 'Diagnóstico de talento',
    description:
      'Análisis de la situación actual del talento, identificación de brechas y oportunidades de mejora.',
  },
  {
    number: 2,
    icon: FileText,
    title: 'Perfiles y roles',
    description:
      'Definición y actualización de perfiles de puestos, roles y estructuras organizacionales alineadas a la estrategia.',
  },
  {
    number: 3,
    icon: BarChart3,
    title: 'Evaluación de desempeño',
    description:
      'Diseño e implementación de sistemas de evaluación objetivos y orientados al desarrollo.',
  },
  {
    number: 4,
    icon: GraduationCap,
    title: 'Planes de capacitación',
    description:
      'Programas de formación y desarrollo de competencias clave para el presente y el futuro.',
  },
  {
    number: 5,
    icon: Award,
    title: 'Estrategias de retención',
    description:
      'Iniciativas para fortalecer el compromiso, la motivación y la permanencia del talento clave.',
  },
]

// Problemas que ayudamos a resolver (5 tarjetas)
const PROBLEMS_SOLVED = [
  {
    icon: RefreshCw,
    title: 'Alta rotación de personal',
    description: 'Reducimos la pérdida de talento y los costos asociados.',
  },
  {
    icon: Users,
    title: 'Equipos desalineados',
    description: 'Alineamos a las personas con la estrategia y los objetivos del negocio.',
  },
  {
    icon: UserCheck,
    title: 'Falta de liderazgo',
    description: 'Desarrollamos líderes capaces de inspirar y generar resultados.',
  },
  {
    icon: Frown,
    title: 'Bajo compromiso',
    description: 'Creamos entornos de trabajo que motivan y retienen al talento.',
  },
  {
    icon: ClipboardCheck,
    title: 'Ausencia de evaluación clara',
    description: 'Implementamos sistemas de desempeño objetivos y transparentes.',
  },
]

// Resultados que puedes lograr (4 tarjetas)
const EXPECTED_RESULTS = [
  {
    stat: '+30%',
    icon: BarChart3,
    title: 'Mejora del clima laboral',
    description: 'Equipos más motivados y colaborativos.',
  },
  {
    stat: '+25%',
    icon: Users,
    title: 'Mayor compromiso',
    description: 'Personas más conectadas con el propósito de la organización.',
  },
  {
    icon: Target,
    title: 'Mejor selección',
    description: 'Incorporación de talento más alineado y con mayor potencial de éxito.',
  },
  {
    icon: TrendingUp,
    title: 'Crecimiento del talento',
    description: 'Equipos más preparados para asumir nuevos retos y generar valor.',
  },
]

// Nuestra metodología / Cómo trabajamos
const METHODOLOGY_STEPS = [
  {
    number: 1,
    icon: Search,
    title: 'Diagnóstico',
    description: 'Analizamos tu realidad, identificamos oportunidades y definimos prioridades.',
  },
  {
    number: 2,
    icon: Settings,
    title: 'Diseño de la solución',
    description: 'Diseñamos una propuesta a la medida, con objetivos claros y un plan de acción.',
  },
  {
    number: 3,
    icon: Rocket,
    title: 'Implementación y acompañamiento',
    description: 'Implementamos la solución y te acompañamos para asegurar resultados.',
  },
]

// Preguntas frecuentes
const FAQS = [
  {
    question: '¿Cuánto tiempo toma un diagnóstico de talento humano?',
    answer:
      'Generalmente entre 2 y 4 semanas, dependiendo del tamaño de la organización, la cantidad de sedes y el alcance requerido.',
  },
  {
    question: '¿Trabajan con empresas en crecimiento o solo con grandes corporaciones?',
    answer:
      'Acompaño tanto a medianas empresas en fase de consolidación y expansión como a organizaciones consolidadas que buscan optimizar su estructura y potenciar a sus líderes.',
  },
  {
    question: '¿Cómo se mide el impacto de la gestión del talento?',
    answer:
      'A través de indicadores clave como la tasa de retención de talento crítico, índice de satisfacción del clima laboral, efectividad en la evaluación de desempeño y retorno en productividad.',
  },
]

export default function TalentoHumanoPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── 1. Hero Section ────────────────────────────────────────── */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Texto Hero */}
            <div className="lg:col-span-7 text-left space-y-4 sm:space-y-5">
              <span className="inline-block text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase">
                NUESTROS SERVICIOS
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-brand-navy leading-[1.16] tracking-tight">
                Gestión del Talento Humano para equipos más comprometidos y productivos
              </h1>

              <p className="text-gray-600 text-sm sm:text-[15px] font-sans leading-relaxed max-w-xl font-normal">
                Diseño e implemento estrategias y herramientas para atraer, desarrollar y retener el
                talento, fortalecer la cultura organizacional y potenciar el desempeño de las
                personas, generando un impacto real en los resultados de tu organización.
              </p>

              {/* Botones de acción */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-[#b8924b] text-white font-sans font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-md shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer"
                >
                  <span>Solicita una asesoría</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 hover:text-brand-navy border border-gray-300 font-sans font-medium text-xs sm:text-sm px-5 sm:px-6 py-3.5 rounded-md shadow-xs transition-all duration-300 cursor-pointer"
                >
                  <Calendar size={16} className="text-brand-gold" />
                  <span>Agenda una reunión</span>
                </Link>
              </div>
            </div>

            {/* Imagen Hero */}
            <div className="lg:col-span-5">
              <div className="relative w-full h-[260px] sm:h-[320px] lg:h-[360px] rounded-2xl overflow-hidden shadow-md border border-gray-100">
                <Image
                  src="/images/Servicios/ServiciosPages/Gestiondeltalentohumano_pageservice.jpeg"
                  alt="Gestión del Talento Humano"
                  fill
                  priority
                  quality={90}
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* ── 2. Pilares clave (4 Tarjetas horizontales debajo del Hero) ── */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {KEY_PILLARS.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.title}
                  className="bg-white rounded-xl border border-gray-200/80 p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-gray-300/80 transition-all duration-200 flex items-start gap-3.5"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 text-brand-gold">
                    <Icon size={20} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-sm text-brand-navy mb-1 leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-sans leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 3. ¿Qué incluye este servicio? ────────────────────────── */}
      <section className="bg-white py-14 sm:py-16 lg:py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase block mb-2">
              QUÉ INCLUYE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-serif font-bold text-brand-navy leading-snug mb-2">
              ¿Qué incluye este servicio?
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm font-sans max-w-2xl mx-auto font-normal">
              Una solución integral y práctica, adaptada a la realidad de tu organización.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-4.5">
            {INCLUDED_SERVICES.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-xl border border-gray-200/80 p-5 sm:p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-6 h-6 rounded-full bg-brand-navy text-white text-xs font-sans font-bold flex items-center justify-center">
                        {item.number}
                      </span>
                      <Icon size={20} className="text-brand-gold" strokeWidth={2.2} />
                    </div>
                    <h3 className="font-serif font-bold text-[16px] sm:text-[17px] text-brand-navy leading-snug mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-[13px] font-sans leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 4. ¿Qué problemas ayudamos a resolver? ─────────────────── */}
      <section className="bg-[#FAF8F5] py-14 sm:py-16 lg:py-20 border-y border-amber-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase block mb-2">
              PROBLEMAS QUE RESOLVEMOS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-serif font-bold text-brand-navy leading-snug">
              ¿Qué problemas ayudamos a resolver?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-4.5">
            {PROBLEMS_SOLVED.map((problem) => {
              const Icon = problem.icon
              return (
                <div
                  key={problem.title}
                  className="bg-white rounded-xl border border-gray-200/80 p-5 sm:p-6 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-brand-gold mb-4">
                    <Icon size={18} strokeWidth={2.2} />
                  </div>
                  <h3 className="font-serif font-bold text-[15px] sm:text-[16px] text-brand-navy leading-snug mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-[13px] font-sans leading-relaxed font-normal">
                    {problem.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Resultados que puedes lograr ───────────────────────── */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase block mb-2">
              RESULTADOS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-serif font-bold text-brand-navy leading-snug mb-2">
              Resultados que puedes lograr
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm font-sans max-w-2xl mx-auto font-normal">
              Generamos un impacto medible en las personas y en tu organización.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {EXPECTED_RESULTS.map((res) => {
              const Icon = res.icon
              return (
                <div
                  key={res.title}
                  className="bg-white rounded-xl border border-gray-200/80 p-5 sm:p-6 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <Icon size={20} className="text-brand-gold" strokeWidth={2.2} />
                    {res.stat && (
                      <span className="font-serif font-bold text-xl sm:text-2xl text-brand-gold">
                        {res.stat}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif font-bold text-[16px] sm:text-[17px] text-brand-navy leading-snug mb-1.5">
                    {res.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-[13px] font-sans leading-relaxed font-normal">
                    {res.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 6. Cómo trabajamos (Nuestra Metodología) ──────────────── */}
      <section className="bg-[#FAF8F5] py-14 sm:py-16 lg:py-20 border-t border-amber-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Columna Izquierda: Título e Introducción */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase block">
                NUESTRA METODOLOGÍA
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-serif font-bold text-brand-navy leading-snug">
                Cómo trabajamos
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm font-sans leading-relaxed font-normal">
                Un proceso claro, colaborativo y orientado a resultados.
              </p>
            </div>

            {/* Columna Derecha: Pasos metodológicos con conectores */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 relative">
                {METHODOLOGY_STEPS.map((step, idx) => {
                  const Icon = step.icon
                  return (
                    <div
                      key={step.title}
                      className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between relative"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="w-7 h-7 rounded-full bg-brand-navy text-white text-xs font-sans font-bold flex items-center justify-center">
                            {step.number}
                          </span>
                          <Icon size={18} className="text-brand-gold" strokeWidth={2.2} />
                        </div>
                        <h3 className="font-serif font-bold text-[16px] text-brand-navy leading-snug mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-500 text-xs sm:text-[13px] font-sans leading-relaxed font-normal">
                          {step.description}
                        </p>
                      </div>

                      {/* Flecha conectora para desktop */}
                      {idx < METHODOLOGY_STEPS.length - 1 && (
                        <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-gray-300 pointer-events-none">
                          <ArrowRight size={14} />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ────────────────────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-16 lg:py-20 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase block mb-2">
              PREGUNTAS FRECUENTES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[30px] font-serif font-bold text-brand-navy leading-snug">
              Lo que suelen preguntar
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group bg-white rounded-xl border border-gray-200/80 overflow-hidden hover:border-gray-300/80 transition-colors duration-200"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 sm:px-6 py-4 select-none">
                  <span className="font-sans font-semibold text-sm text-brand-navy leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={16}
                    className="flex-shrink-0 text-brand-gold transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <div className="px-5 sm:px-6 pb-5 -mt-1">
                  <p className="text-xs sm:text-sm text-gray-600 font-sans leading-relaxed font-normal">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Otros servicios y CTA ─────────────────────────────────── */}
      <OtherServices currentSlug={SLUG} />
      <ConsultingCta />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
