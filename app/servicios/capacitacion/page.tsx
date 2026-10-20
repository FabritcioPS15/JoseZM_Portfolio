import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FaArrowRight, FaCheck, FaChevronRight, FaSearch, FaDraftingCompass, FaChalkboardTeacher, FaUserTie, FaChartLine, FaLightbulb, FaExclamationTriangle, FaUsers, FaTrophy, FaComments, FaBuilding, FaLandmark, FaCrown, FaSync, FaCogs, FaCalendarCheck, FaHandshake } from 'react-icons/fa'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import { getServiceBySlug, servicePageMetadata } from '@/lib/services'

/* ──────────────────────────────────────────────────────────────
 * Contenido único de ESTE servicio — edita aquí.
 * ────────────────────────────────────────────────────────────── */

const INCLUDES_ITEMS = [
  {
    icon: FaSearch,
    title: 'Diagnóstico de necesidades',
    description: 'Identificación de los principales desafíos, objetivos y temas.',
  },
  {
    icon: FaDraftingCompass,
    title: 'Diseño del programa',
    description: 'Propuesta a la medida con contenidos y metodologías apropiadas.',
  },
  {
    icon: FaChalkboardTeacher,
    title: 'Talleres y sesiones',
    description: 'Experiencias de aprendizaje prácticas e interactivas.',
  },
  {
    icon: FaUserTie,
    title: 'Coaching y acompañamiento',
    description: 'Soporte personalizado para la aplicación en el trabajo.',
  },
  {
    icon: FaChartLine,
    title: 'Seguimiento del progreso',
    description: 'Medición de resultados y refuerzo del aprendizaje.',
  },
  {
    icon: FaLightbulb,
    title: 'Recomendaciones de mejora',
    description: 'Propuestas de acciones para potenciar el impacto y sustentabilidad.',
  },
]

const PROBLEMS_SOLVED = [
  'Bajo desempeño en equipos.',
  'Falta de alineación con objetivos.',
  'Resistencia al cambio.',
  'Liderazgo débil.',
  'Poca aplicación de lo aprendido.',
  'Equipos desmotivados.',
  'Comunicación deficiente.',
  'Falta de cultura colaborativa.',
]

const RESULTS = [
  {
    icon: FaUsers,
    value: '+25%',
    label: 'En desarrollo de equipos',
  },
  {
    icon: FaCogs,
    value: '+30%',
    label: 'En aplicación en el trabajo diario',
  },
  {
    icon: FaCrown,
    value: '+40%',
    label: 'En habilidades de liderazgo',
  },
  {
    icon: FaComments,
    value: '+30%',
    label: 'En colaboración entre áreas',
  },
  {
    icon: FaTrophy,
    value: '+35%',
    label: 'En clima y motivación',
  },
  {
    icon: FaSync,
    value: '+40%',
    label: 'En logro de resultados',
  },
]

const HOW_IT_WORKS = [
  {
    icon: FaSearch,
    title: 'Diagnóstico',
    description: 'Entendemos la realidad y los objetivos de la organización.',
  },
  {
    icon: FaDraftingCompass,
    title: 'Diseño',
    description: 'Creamos un programa a la medida de tus necesidades.',
  },
  {
    icon: FaChalkboardTeacher,
    title: 'Facilitación y acompañamiento',
    description: 'Desarrollamos sesiones y damos soporte continuo.',
  },
  {
    icon: FaChartLine,
    title: 'Seguimiento',
    description: 'Medimos el progreso y el impacto logrado.',
  },
]

const TARGET_AUDIENCE = [
  {
    icon: FaBuilding,
    title: 'Empresas privadas',
    description: 'Organizaciones que buscan fortalecer las capacidades de sus equipos.',
  },
  {
    icon: FaLandmark,
    title: 'Entidades públicas',
    description: 'Instituciones que buscan fortalecer capacidades y mejorar su gestión.',
  },
  {
    icon: FaCrown,
    title: 'Equipos de liderazgo',
    description: 'Líderes y gerentes que quieren potenciar sus competencias.',
  },
  {
    icon: FaSync,
    title: 'Organizaciones en transformación',
    description: 'Equipos en procesos de transformación o que necesitan acelerar el cambio.',
  },
]

const TESTIMONIALS = [
  {
    quote: 'La metodología práctica y el acompañamiento cercano hicieron la diferencia. Nuestro equipo no solo aprendió, sino que aplicó lo aprendido en el trabajo diario.',
    client: 'Gerente General',
    company: 'Sector Servicios',
  },
  {
    quote: 'El programa se adaptó perfectamente a nuestras necesidades. El soporte continuo aseguró que los cambios se sostengan en el tiempo.',
    client: 'Director Administrativo',
    company: 'Entidad Pública',
  },
  {
    quote: 'El impacto en nuestro equipo fue notable. Mejoró el liderazgo, la comunicación y el compromiso con los resultados.',
    client: 'Jefe de Talento Humano',
    company: 'Sector Industrial',
  },
]

/* ────────────────────────────────────────────────────────────── */

export const metadata: Metadata = servicePageMetadata('capacitacion')

const SLUG = 'capacitacion'

export default function CapacitacionPage() {
  const service = getServiceBySlug(SLUG)
  if (!service) return null

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── Hero Section ─────────────────────────────────────────── */}
      <section className="relative w-full min-h-[600px] lg:min-h-[650px] bg-[#0B1522] pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-14 lg:pb-16 flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority
            quality={90}
            className="object-cover object-center"
          />
          {/* Blue gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1522] via-[#0B1522]/95 via-45% md:via-[#0B1522]/70 md:via-55% lg:via-[#0B1522]/40 lg:via-35% to-transparent"></div>
          {/* Mobile darkened overlay */}
          <div className="absolute inset-0 bg-[#0B1522]/80 lg:hidden"></div>
          {/* Bottom subtle fade */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#0B1522] to-transparent"></div>
        </div>

        {/* Content */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            <div className="lg:col-span-7 xl:col-span-7 text-center lg:text-left space-y-6">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="flex items-center justify-center lg:justify-start gap-1.5 text-[11px] font-sans text-gray-400">
                <Link href="/servicios" className="hover:text-brand-gold transition-colors duration-200">
                  Servicios
                </Link>
                <FaChevronRight className="text-gray-500 text-xs" />
                <span className="text-gray-300">{service.shortTitle}</span>
              </nav>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-serif font-bold text-white leading-[1.14] tracking-tight">
                {service.title}
              </h1>

              {/* Description */}
              <p className="text-gray-300 text-sm sm:text-[15px] font-sans leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                {service.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                <Link
                  href="/contacto"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-gold hover:bg-[#b8924b] text-[#0B1522] font-sans font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-[4px] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
                >
                  <span>Solicita una propuesta</span>
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  href="/contacto"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent hover:bg-white/10 text-white font-sans font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-[4px] border border-white/30 hover:border-white/50 transition-all duration-300 group cursor-pointer"
                >
                  <span>Agenda una reunión</span>
                  <FaCalendarCheck className="text-sm group-hover:scale-110 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Qué incluye Section ─────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-2">
              QUÉ INCLUYE
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-bold text-brand-navy leading-snug">
              Un servicio completo, flexible y adaptado a tus necesidades
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INCLUDES_ITEMS.map((item) => (
              <div
                key={item.title}
                className="bg-gray-50/80 border border-gray-200/80 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-gray-300/70"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-gold/10 mb-4">
                  <item.icon className="text-brand-gold text-2xl" />
                </div>
                <h3 className="font-serif font-bold text-[17px] text-brand-navy leading-snug mb-2">
                  {item.title}
                </h3>
                <p className="text-[13px] text-gray-600 font-sans leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ¿Qué es? Section ────────────────────────────────────── */}
      <section className="bg-gray-50/80 py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase">
              ¿QUÉ ES?
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-bold text-brand-navy leading-snug">
              No solo se trata de aprender, sino de traducir ese aprendizaje en cambios reales en el trabajo
            </h2>
            <p className="text-gray-600 text-sm sm:text-[15px] font-sans leading-relaxed font-normal">
              {service.detail}
            </p>
          </div>
        </div>
      </section>

      {/* ── ¿Qué problemas ayudamos a resolver? Section ─────────── */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase">
              ¿QUÉ PROBLEMAS AYUDAMOS A RESOLVER?
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-bold text-brand-navy leading-snug">
              Superamos los principales desafíos en el desarrollo de equipos
            </h2>
            <ul className="space-y-4">
              {PROBLEMS_SOLVED.map((problem) => (
                <li key={problem} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-brand-gold/10 flex items-center justify-center">
                    <FaExclamationTriangle className="text-brand-gold text-xs" />
                  </span>
                  <span className="text-sm sm:text-[15px] text-gray-600 font-sans leading-relaxed font-normal">
                    {problem}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── ¿Qué lograrás? Section ────────────────────────────────── */}
      <section className="w-full bg-[#0B1522] py-14 sm:py-16 lg:py-20 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-brand-gold/10 blur-3xl pointer-events-none"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-2">
              ¿QUÉ LOGRARÁS?
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-bold text-white leading-snug">
              Cambios visibles y tangibles en tu organización
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESULTS.map((result) => (
              <div key={result.label} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold/10 mb-4">
                  <result.icon className="text-brand-gold text-3xl" />
                </div>
                <p className="text-3xl sm:text-4xl font-serif font-bold text-brand-gold leading-tight mb-2">
                  {result.value}
                </p>
                <p className="text-sm text-gray-300 font-sans leading-relaxed font-normal">
                  {result.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cómo funciona Section ────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-2">
              CÓMO FUNCIONA
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-bold text-brand-navy leading-snug">
              Una metodología simple, efectiva y orientada a resultados
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold/10 mb-4">
                    <step.icon className="text-brand-gold text-3xl" />
                  </div>
                  <h3 className="font-serif font-bold text-[17px] text-brand-navy leading-snug mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-gray-600 font-sans leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
                {/* Connector line */}
                {index < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-full h-0.5 bg-gradient-to-r from-brand-gold/30 to-transparent -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ¿A quién está dirigido? Section ───────────────────────── */}
      <section className="bg-gray-50/80 py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-2">
              ¿A QUIÉN ESTÁ DIRIGIDO?
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-bold text-brand-navy leading-snug">
              Un servicio flexible para diferentes tipos de organizaciones
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TARGET_AUDIENCE.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-200/80 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-gray-300/70"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-gold/10 mb-4">
                  <item.icon className="text-brand-gold text-2xl" />
                </div>
                <h3 className="font-serif font-bold text-[17px] text-brand-navy leading-snug mb-2">
                  {item.title}
                </h3>
                <p className="text-[13px] text-gray-600 font-sans leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lo que dicen nuestros clientes Section ───────────────── */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-2">
              TESTIMONIOS
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-bold text-brand-navy leading-snug">
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.company}
                className="bg-gray-50/80 border border-gray-200/80 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-gray-300/70"
              >
                <p className="text-gray-600 text-sm sm:text-[15px] font-sans leading-relaxed font-normal mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="space-y-1">
                  <p className="font-serif font-bold text-[15px] text-brand-navy leading-snug">
                    {testimonial.client}
                  </p>
                  <p className="text-[13px] text-gray-500 font-sans leading-relaxed font-normal">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Conversemos CTA Section ─────────────────────────────── */}
      <section className="relative w-full min-h-[400px] bg-[#0B1522] py-14 sm:py-16 lg:py-20 flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
          <Image
            src={service.image}
            alt="Capacitación y acompañamiento"
            fill
            quality={90}
            className="object-cover object-center opacity-30"
          />
          {/* Blue gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1522] via-[#0B1522]/80 to-[#0B1522]/60"></div>
        </div>

        {/* Content */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-bold text-white leading-snug">
              Conversemos sobre cómo fortalecer a tu equipo
            </h2>
            <p className="text-gray-300 text-sm sm:text-[15px] font-sans leading-relaxed max-w-2xl mx-auto font-normal">
              Desarrolla competencias, aplica el aprendizaje y genera cambios sostenibles en tu organización. Estamos listos para acompañarte.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2">
              <Link
                href="/contacto"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-gold hover:bg-[#b8924b] text-[#0B1522] font-sans font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-[4px] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
              >
                <span>Solicita una propuesta</span>
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/contacto"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent hover:bg-white/10 text-white font-sans font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-[4px] border border-white/30 hover:border-white/50 transition-all duration-300 group cursor-pointer"
              >
                <span>Conversemos</span>
                <FaComments className="text-sm group-hover:scale-110 transition-transform duration-300" />
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-gold/10 mb-3">
                  <FaLightbulb className="text-brand-gold text-lg" />
                </div>
                <h3 className="font-serif font-bold text-[15px] text-white leading-snug mb-1">
                  Metodología práctica
                </h3>
                <p className="text-[13px] text-gray-400 font-sans leading-relaxed font-normal">
                  Aprendizaje aplicado en el trabajo real.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-gold/10 mb-3">
                  <FaHandshake className="text-brand-gold text-lg" />
                </div>
                <h3 className="font-serif font-bold text-[15px] text-white leading-snug mb-1">
                  Acompañamiento cercano
                </h3>
                <p className="text-[13px] text-gray-400 font-sans leading-relaxed font-normal">
                  Soporte continuo durante todo el proceso.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-gold/10 mb-3">
                  <FaCogs className="text-brand-gold text-lg" />
                </div>
                <h3 className="font-serif font-bold text-[15px] text-white leading-snug mb-1">
                  Soluciones a tu medida
                </h3>
                <p className="text-[13px] text-gray-400 font-sans leading-relaxed font-normal">
                  Programas adaptados a tu realidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  )
}
