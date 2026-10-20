import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FaArrowRight, FaCheck, FaChevronRight, FaBuilding, FaProjectDiagram, FaShieldAlt, FaUsers, FaChartBar, FaBullseye, FaCommentAlt, FaBriefcase, FaStar, FaAward, FaChartLine } from 'react-icons/fa'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import { getServiceBySlug, servicePageMetadata } from '@/lib/services'

/* ──────────────────────────────────────────────────────────────
 * Contenido único de ESTE servicio — edita aquí.
 * ────────────────────────────────────────────────────────────── */

const KEY_SERVICES = [
  {
    icon: FaBuilding,
    title: 'Estructura organizacional',
    description: 'Diseño de roles, responsabilidades y niveles de decisión claros.',
  },
  {
    icon: FaProjectDiagram,
    title: 'Procesos y procedimientos',
    description: 'Mapeo y optimización de flujos de trabajo eficientes.',
  },
  {
    icon: FaShieldAlt,
    title: 'Gobernanza y gestión',
    description: 'Sistemas de gobierno y toma de decisiones efectivos.',
  },
  {
    icon: FaUsers,
    title: 'Cultura y cambio',
    description: 'Gestión del cambio cultural y desarrollo organizacional.',
  },
]

const APPROACH_STEPS = [
  {
    icon: FaChartBar,
    title: 'Diagnóstico',
    description: 'Análisis profundo de la estructura actual, identificación de brechas y oportunidades de mejora.',
  },
  {
    icon: FaBullseye,
    title: 'Diseño',
    description: 'Definición del modelo organizacional alineado a la estrategia del negocio.',
  },
  {
    icon: FaStar,
    title: 'Implementación',
    description: 'Acompañamiento en la ejecución del cambio con plan de transición detallado.',
  },
  {
    icon: FaChartLine,
    title: 'Seguimiento',
    description: 'Monitoreo de resultados y ajustes continuos para asegurar el éxito.',
  },
]

const BENEFITS = [
  'Organización más clara y alineada a sus objetivos.',
  'Procesos más eficientes y menos reprocesos.',
  'Equipos mejor coordinados y enfocados en resultados.',
  'Mayor capacidad de adaptación al cambio.',
  'Crecimiento sostenible.',
  'Mejora en la comunicación y en la toma de decisiones.',
]

const TARGET_AUDIENCE = [
  {
    icon: FaBriefcase,
    title: 'Empresas privadas',
    description: 'Organizaciones que buscan optimizar su estructura para crecer.',
  },
  {
    icon: FaBuilding,
    title: 'Entidades públicas',
    description: 'Instituciones que requieren modernizar sus procesos organizacionales.',
  },
  {
    icon: FaStar,
    title: 'Organizaciones en transformación',
    description: 'Empresas en proceso de cambio o expansión.',
  },
  {
    icon: FaUsers,
    title: 'Proyectos y nuevas unidades',
    description: 'Iniciativas que requieren una estructura sólida desde el inicio.',
  },
]

const RESULTS = [
  {
    icon: FaChartLine,
    value: '+30%',
    label: 'En eficiencia operativa',
  },
  {
    icon: FaUsers,
    value: '+25%',
    label: 'En productividad de equipos',
  },
  {
    icon: FaArrowRight,
    value: '-40%',
    label: 'En tiempo de respuesta',
  },
  {
    icon: FaAward,
    value: 'Casos de éxito',
    label: 'Ver casos',
    link: '/casos-de-exito',
  },
]

const TESTIMONIALS = [
  {
    quote: 'El rediseño organizacional nos permitió clarificar roles y tomar decisiones más ágiles. Ahora cada equipo sabe exactamente qué hacer y cómo contribuir a los objetivos.',
    client: 'Director General',
    company: 'Empresa de Servicios Tecnológicos',
  },
  {
    quote: 'La estructura propuesta transformó nuestra forma de trabajar. Pasamos de una organización fragmentada a un equipo cohesionado y orientado a resultados.',
    client: 'Gerente de Operaciones',
    company: 'Industria Manufacturera',
  },
  {
    quote: 'El acompañamiento en el cambio fue clave. No solo diseñamos la estructura, sino que gestionamos la transición de forma exitosa con todo el equipo.',
    client: 'Director de RRHH',
    company: 'Sector Financiero',
  },
]

const CTA_STEPS = [
  {
    title: 'Reunión de exploración',
    description: 'Conocemos tu organización y sus desafíos.',
  },
  {
    title: 'Propuesta a medida',
    description: 'Diseñamos una solución adaptada a tus necesidades.',
  },
  {
    title: 'Acompañamiento en la implementación',
    description: 'Te guiamos en cada paso del proceso.',
  },
]

/* ────────────────────────────────────────────────────────────── */

export const metadata: Metadata = servicePageMetadata('diseno-organizacional')

const SLUG = 'diseno-organizacional'

export default function DisenoOrganizacionalPage() {
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
                  <span>Converse</span>
                  <FaCommentAlt className="text-sm group-hover:scale-110 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Services Section ─────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {KEY_SERVICES.map((item) => (
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

      {/* ── ¿QUÉ ES? Section ────────────────────────────────────── */}
      <section className="bg-gray-50/80 py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase">
                ¿QUÉ ES?
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-bold text-brand-navy leading-snug">
                Transformamos tu organización en una estructura que genera resultados
              </h2>
              <p className="text-gray-600 text-sm sm:text-[15px] font-sans leading-relaxed font-normal">
                {service.detail}
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 text-xs font-semibold text-brand-gold hover:text-[#b8924b] transition-colors duration-200 group cursor-pointer"
              >
                <span>Conversemos sobre tu organización</span>
                <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="relative h-[300px] lg:h-[400px] rounded-xl overflow-hidden">
              <Image
                src={service.image}
                alt="Equipo colaborando"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Nuestro Enfoque Section ───────────────────────────────── */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-2">
              NUESTRO ENFOQUE
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-bold text-brand-navy leading-snug">
              Un proceso claro y estructurado
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {APPROACH_STEPS.map((step, index) => (
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
                {index < APPROACH_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-full h-0.5 bg-gradient-to-r from-brand-gold/30 to-transparent -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ¿Qué lograrás? Section ────────────────────────────────── */}
      <section className="bg-gray-50/80 py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase">
                ¿QUÉ LOGRARÁS?
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-bold text-brand-navy leading-snug">
                Resultados tangibles para tu organización
              </h2>
              <ul className="space-y-4">
                {BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-brand-gold/10 flex items-center justify-center">
                      <FaCheck className="text-brand-gold text-xs" />
                    </span>
                    <span className="text-sm sm:text-[15px] text-gray-600 font-sans leading-relaxed font-normal">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[300px] lg:h-[400px] rounded-xl overflow-hidden">
              <Image
                src={service.image}
                alt="Reunión de equipo"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── ¿A quién está dirigido? Section ───────────────────────── */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-2">
              ¿A QUIÉN ESTÁ DIRIGIDO?
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-bold text-brand-navy leading-snug">
              Organizaciones que buscan transformarse
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TARGET_AUDIENCE.map((item) => (
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

      {/* ── Resultados que generan valor Section ─────────────────── */}
      <section className="w-full bg-[#0B1522] py-14 sm:py-16 lg:py-20 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-brand-gold/10 blur-3xl pointer-events-none"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-2">
              RESULTADOS QUE GENERAN VALOR
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-bold text-white leading-snug">
              Impacto medible en tu organización
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                {result.link && (
                  <Link
                    href={result.link}
                    className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-brand-gold hover:text-[#b8924b] transition-colors duration-200 group cursor-pointer"
                  >
                    <span>Ver casos</span>
                    <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                )}
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

      {/* ── Hablemos sobre tu proyecto CTA Section ──────────────── */}
      <section className="relative w-full min-h-[400px] bg-[#0B1522] py-14 sm:py-16 lg:py-20 flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
          <Image
            src={service.image}
            alt="Trabajando en laptop"
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
              Hablemos sobre tu proyecto
            </h2>
            <p className="text-gray-300 text-sm sm:text-[15px] font-sans leading-relaxed max-w-2xl mx-auto font-normal">
              Transforma tu organización con una estructura que genera resultados. Estamos listos para acompañarte en este proceso.
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
                <span>Converse</span>
                <FaCommentAlt className="text-sm group-hover:scale-110 transition-transform duration-300" />
              </Link>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              {CTA_STEPS.map((step, index) => (
                <div key={step.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-gold/10 mb-3">
                    <span className="text-brand-gold font-serif font-bold text-lg">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-[15px] text-white leading-snug mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-gray-400 font-sans leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  )
}
