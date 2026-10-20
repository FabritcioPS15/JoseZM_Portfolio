import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, ChevronDown } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ConsultingCta from '@/components/ConsultingCta'
import ServiceBanner from '@/components/ServiceBanner'
import OtherServices from '@/components/OtherServices'
import { getServiceBySlug, servicePageMetadata } from '@/lib/services'

/* ──────────────────────────────────────────────────────────────
 * Contenido único de ESTE servicio — edita aquí.
 * ────────────────────────────────────────────────────────────── */

const STEPS = [
  {
    title: 'Mapa de procesos',
    description:
      '[Placeholder] Breve descripción del primer paso del proceso: qué se evalúa, con qué herramientas y qué se obtiene.',
  },
  {
    title: 'Análisis de cuellos de botella',
    description:
      '[Placeholder] Breve descripción de cómo se identifican las fricciones, reprocesos y desperdicios.',
  },
  {
    title: 'Rediseño del flujo',
    description:
      '[Placeholder] Breve descripción de cómo se propone el nuevo flujo: responsables, tiempos y estándares.',
  },
  {
    title: 'Estandarización y seguimiento',
    description:
      '[Placeholder] Breve descripción del cierre: documentación, indicadores del proceso y gobierno.',
  },
]

const BENEFITS = [
  {
    title: 'Menos reprocesos y esperas',
    description: '[Placeholder] Resultado esperado con una frase o dos de explicación.',
  },
  {
    title: 'Procesos documentados y replicables',
    description: '[Placeholder] Resultado esperado con una frase o dos de explicación.',
  },
  {
    title: 'Responsables claros en cada etapa',
    description: '[Placeholder] Resultado esperado con una frase o dos de explicación.',
  },
  {
    title: 'Cultura de mejora continua',
    description: '[Placeholder] Resultado esperado con una frase o dos de explicación.',
  },
]

const FAQS = [
  {
    question: '[Placeholder] ¿Qué procesos conviene mapear primero?',
    answer: '[Placeholder] Respuesta breve y concreta para esta pregunta.',
  },
  {
    question: '[Placeholder] ¿Cada cuánto se debe revisar un proceso rediseñado?',
    answer: '[Placeholder] Respuesta breve y concreta para esta pregunta.',
  },
  {
    question: '[Placeholder] ¿Se necesita software de gestión de procesos (BPM)?',
    answer: '[Placeholder] Respuesta breve y concreta para esta pregunta.',
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
      <Header />

      <ServiceBanner service={service} />

      {/* ── Sobre el servicio ──────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-2">
              SOBRE EL SERVICIO
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-[30px] font-serif font-bold text-brand-navy leading-snug">
              {service.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-gray-600 text-sm sm:text-[15px] font-sans leading-relaxed font-normal">
                {service.detail}
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 mt-4 text-xs font-semibold text-brand-gold hover:text-[#b8924b] transition-colors duration-200 group cursor-pointer"
              >
                <span>Conversemos sobre tu organización</span>
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-gray-50/80 border border-gray-200/80 rounded-xl p-5 sm:p-6">
                <p className="font-sans font-bold text-sm text-brand-navy mb-4">
                  ¿En qué consiste?
                </p>
                <ul className="space-y-3">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 mt-0.5 w-4.5 h-4.5 rounded-full bg-brand-gold/10 flex items-center justify-center">
                        <Check size={11} className="text-brand-gold" strokeWidth={3} />
                      </span>
                      <span className="text-xs sm:text-[13px] text-gray-600 font-sans leading-relaxed font-normal">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Metodología ────────────────────────────────────────── */}
      <section className="w-full bg-[#0B1522] py-14 sm:py-16 lg:py-20 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-brand-gold/10 blur-3xl pointer-events-none"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-2">
              CÓMO SE TRABAJA
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-[30px] font-serif font-bold text-white leading-snug">
              Metodología del servicio
            </h2>
            <p className="text-gray-400 text-sm sm:text-[15px] font-sans leading-relaxed font-normal mt-3">
              Un proceso claro, paso a paso, para llegar a resultados concretos.
            </p>
          </div>

          <ol className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {STEPS.map((step, index) => (
              <li key={step.title} className="relative">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-brand-gold/40 text-brand-gold font-serif font-bold text-lg mb-4">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif font-bold text-[17px] text-white leading-snug mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-[13px] font-sans leading-relaxed font-normal">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Resultados ─────────────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-2">
              RESULTADOS
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-[30px] font-serif font-bold text-brand-navy leading-snug">
              Qué puedes esperar
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-xl border border-gray-200/80 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-gray-300/70"
              >
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-gold/10 mb-4">
                  <Check size={16} className="text-brand-gold" strokeWidth={3} />
                </span>
                <h3 className="font-serif font-bold text-[15px] text-brand-navy leading-snug mb-1.5">
                  {benefit.title}
                </h3>
                <p className="text-[13px] text-gray-500 font-sans leading-relaxed font-normal">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="w-full bg-gray-50/80 border-y border-gray-200/80 py-14 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-2">
              PREGUNTAS FRECUENTES
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-[30px] font-serif font-bold text-brand-navy leading-snug">
              Lo que suelen preguntar
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group bg-white rounded-xl border border-gray-200/80 overflow-hidden hover:border-gray-300/70 transition-colors duration-300"
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
                  <p className="text-[13px] sm:text-sm text-gray-600 font-sans leading-relaxed font-normal">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <OtherServices currentSlug={SLUG} />

      <ConsultingCta />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
