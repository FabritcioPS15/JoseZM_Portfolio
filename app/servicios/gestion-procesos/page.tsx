import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FaArrowRight, FaCheck, FaChevronRight, FaProjectDiagram, FaSearch, FaSync, FaClipboardList, FaChartLine, FaTasks, FaClock, FaExclamationTriangle, FaUserCheck, FaChartBar, FaHandshake, FaBuilding, FaBriefcase, FaUsers, FaShieldAlt, FaCogs, FaComments, FaCalendarCheck, FaLightbulb } from 'react-icons/fa'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import JsonLd from '@/components/JsonLd'
import { getServiceBySlug, servicePageMetadata, serviceSchema } from '@/lib/services'

/* ──────────────────────────────────────────────────────────────
 * Contenido único de ESTE servicio — edita aquí.
 * ────────────────────────────────────────────────────────────── */

const SERVICES_OFFERED = [
  {
    icon: FaProjectDiagram,
    title: 'Mapeo de procesos',
    description: 'Documentación y visualización de los flujos de trabajo actuales.',
  },
  {
    icon: FaSearch,
    title: 'Diagnóstico y análisis',
    description: 'Identificación de cuellos de botella, reprocesos y oportunidades de mejora.',
  },
  {
    icon: FaSync,
    title: 'Optimización y rediseño',
    description: 'Rediseño de procesos para eliminar ineficiencias y mejorar resultados.',
  },
  {
    icon: FaClipboardList,
    title: 'Estandarización',
    description: 'Definición de procedimientos claros y consistentes para toda la organización.',
  },
  {
    icon: FaChartLine,
    title: 'Indicadores y seguimiento',
    description: 'Implementación de métricas para monitorear el desempeño de los procesos.',
  },
]

const METHODOLOGY_STEPS = [
  {
    icon: FaSearch,
    title: 'Diagnóstico',
    description: 'Análisis detallado de los procesos actuales y sus puntos críticos.',
  },
  {
    icon: FaProjectDiagram,
    title: 'Mapeo de procesos',
    description: 'Documentación completa de los flujos de trabajo existentes.',
  },
  {
    icon: FaSync,
    title: 'Rediseño',
    description: 'Propuesta de mejoras y diseño de nuevos procesos optimizados.',
  },
  {
    icon: FaCogs,
    title: 'Implementación',
    description: 'Ejecución de los cambios con acompañamiento del equipo.',
  },
  {
    icon: FaChartLine,
    title: 'Seguimiento',
    description: 'Monitoreo continuo y ajustes para asegurar la mejora sostenible.',
  },
]

const PROBLEMS_SOLVED = [
  'Retrasos frecuentes en la entrega de servicios o productos.',
  'Tareas duplicadas y desperdicio de recursos.',
  'Cuellos de botella que frenan el flujo de trabajo.',
  'Falta de claridad en funciones y responsabilidades.',
  'Tiempos de respuesta lentos frente a requerimientos.',
  'Ausencia de control y trazabilidad en los procesos.',
  'Baja productividad por procesos ineficientes.',
  'Desorden operativo y falta de estandarización.',
]

const BENEFITS = [
  'Procesos más claros y ordenados.',
  'Menos reprocesos y desperdicios.',
  'Mejor eficiencia operativa.',
  'Mayor coordinación entre áreas.',
  'Mejor toma de decisiones con información.',
  'Mayor trazabilidad y control.',
  'Mejor experiencia del cliente.',
  'Crecimiento sostenible con base sólida.',
]

const TARGET_AUDIENCE = [
  {
    icon: FaBriefcase,
    title: 'Empresas privadas',
    description: 'Organizaciones que buscan optimizar sus operaciones.',
  },
  {
    icon: FaBuilding,
    title: 'Entidades públicas',
    description: 'Instituciones que requieren modernizar sus procesos.',
  },
  {
    icon: FaUsers,
    title: 'Organizaciones en crecimiento',
    description: 'Empresas que necesitan escalar sus operaciones.',
  },
  {
    icon: FaShieldAlt,
    title: 'Áreas que requieren ordenar y madurar',
    description: 'Departamentos que necesitan estructurar sus procesos.',
  },
]

const RESULTS = [
  {
    icon: FaCogs,
    value: 'Operaciones más eficientes',
    label: 'Procesos optimizados y sin fricciones.',
  },
  {
    icon: FaShieldAlt,
    value: 'Mayor control y trazabilidad',
    label: 'Visibilidad completa de las operaciones.',
  },
  {
    icon: FaUsers,
    value: 'Equipos más alineados',
    label: 'Colaboración efectiva entre áreas.',
  },
  {
    icon: FaChartBar,
    value: 'Resultados sostenibles',
    label: 'Mejora continua en el tiempo.',
  },
]

const TESTIMONIALS = [
  {
    quote: 'La gestión por procesos transformó nuestra forma de trabajar. Ahora tenemos claridad total en cada paso y hemos reducido los tiempos de entrega en un 40%.',
    client: 'Gerente de Operaciones',
    company: 'Empresa de Logística',
  },
  {
    quote: 'El mapeo de procesos nos permitió identificar ineficiencias que no veíamos. La estandarización nos dio consistencia y calidad en todo lo que hacemos.',
    client: 'Director de Calidad',
    company: 'Industria Manufacturera',
  },
  {
    quote: 'El acompañamiento fue clave. No solo rediseñamos los procesos, sino que capacitamos al equipo para mantener la mejora continua.',
    client: 'Coordinador de Procesos',
    company: 'Sector Servicios',
  },
]

const CTA_FEATURES = [
  {
    icon: FaLightbulb,
    title: 'Enfoque práctico orientado a resultados',
    description: 'Soluciones concretas que generan valor real.',
  },
  {
    icon: FaHandshake,
    title: 'Acompañamiento de punta a punta',
    description: 'Contigo desde el diagnóstico hasta la implementación.',
  },
  {
    icon: FaCogs,
    title: 'Soluciones adaptadas a tu realidad',
    description: 'Diseñadas según tus necesidades y recursos.',
  },
]

/* ────────────────────────────────────────────────────────────── */

export const metadata: Metadata = servicePageMetadata('gestion-procesos')

const SLUG = 'gestion-procesos'

export default function GestionProcesosPage() {
  const service = getServiceBySlug(SLUG)
  if (!service) return null

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={[serviceSchema(service)]} />
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

      {/* ── Services Offered Section ─────────────────────────────── */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-2">
              SERVICIOS
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-bold text-brand-navy leading-snug">
              Lo que ofrecemos
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {SERVICES_OFFERED.map((item) => (
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

      {/* ── ¿Qué es la gestión por procesos? Section ─────────────── */}
      <section className="bg-gray-50/80 py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase">
              ¿QUÉ ES LA GESTIÓN POR PROCESOS?
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-bold text-brand-navy leading-snug">
              Una metodología para ordenar y optimizar tu organización
            </h2>
            <p className="text-gray-600 text-sm sm:text-[15px] font-sans leading-relaxed font-normal">
              {service.detail}
            </p>
          </div>
        </div>
      </section>

      {/* ── Cómo trabajamos Section ───────────────────────────────── */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-2">
              CÓMO TRABAJAMOS
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-bold text-brand-navy leading-snug">
              Metodología en 5 pasos
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {METHODOLOGY_STEPS.map((step, index) => (
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
                {index < METHODOLOGY_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-full h-0.5 bg-gradient-to-r from-brand-gold/30 to-transparent -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ¿Qué problemas ayudamos a resolver? Section ─────────── */}
      <section className="bg-gray-50/80 py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase">
              ¿QUÉ PROBLEMAS AYUDAMOS A RESOLVER?
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-bold text-brand-navy leading-snug">
              Desafíos comunes que enfrentan las organizaciones
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
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-6">
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
        </div>
      </section>

      {/* ── Ideal para organizaciones Section ────────────────────── */}
      <section className="bg-gray-50/80 py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-2">
              IDEAL PARA
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-bold text-brand-navy leading-snug">
              Organizaciones que quieren crecer con orden
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

      {/* ── Procesos que generan control Section ─────────────────── */}
      <section className="w-full bg-[#0B1522] py-14 sm:py-16 lg:py-20 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-brand-gold/10 blur-3xl pointer-events-none"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-2">
              RESULTADOS
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-bold text-white leading-snug">
              Procesos que generan control, eficiencia y resultados
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESULTS.map((result) => (
              <div key={result.value} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold/10 mb-4">
                  <result.icon className="text-brand-gold text-3xl" />
                </div>
                <p className="text-lg sm:text-xl font-serif font-bold text-brand-gold leading-tight mb-2">
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

      {/* ── Conversemos sobre cómo optimizar tus procesos CTA ─────── */}
      <section className="relative w-full min-h-[400px] bg-[#0B1522] py-14 sm:py-16 lg:py-20 flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
          <Image
            src={service.image}
            alt="Optimización de procesos"
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
              Conversemos sobre cómo optimizar tus procesos
            </h2>
            <p className="text-gray-300 text-sm sm:text-[15px] font-sans leading-relaxed max-w-2xl mx-auto font-normal">
              Transforma tus operaciones con procesos eficientes, ordenados y orientados a resultados. Estamos listos para acompañarte.
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
              {CTA_FEATURES.map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-gold/10 mb-3">
                    <feature.icon className="text-brand-gold text-lg" />
                  </div>
                  <h3 className="font-serif font-bold text-[15px] text-white leading-snug mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-[13px] text-gray-400 font-sans leading-relaxed font-normal">
                    {feature.description}
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
