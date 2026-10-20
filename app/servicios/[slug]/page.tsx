import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ConsultingCta from '@/components/ConsultingCta'
import ServiceBanner from '@/components/ServiceBanner'
import { SERVICES, getServiceBySlug, serviceHref } from '@/lib/services'
import { absoluteUrl } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
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
      images: [absoluteUrl(service.image)],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | José Luis Zelada`,
      description,
      images: [absoluteUrl(service.image)],
    },
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug)

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Banner tipo hero reducido con imagen del servicio */}
      <ServiceBanner service={service} />

      {/* ── Sección: Sobre el servicio ─────────────────────────── */}
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
            {/* Descripción */}
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

            {/* Puntos clave */}
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

      {/* ── Otros servicios ────────────────────────────────────── */}
      <section className="w-full bg-gray-50/80 border-t border-gray-200/80 py-12 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-6">
            OTROS SERVICIOS
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherServices.map((other) => (
              <Link
                key={other.slug}
                href={serviceHref(other)}
                className="group bg-white rounded-xl border border-gray-200/80 p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gray-300/70"
              >
                <p className="font-serif font-bold text-[14px] text-brand-navy leading-snug mb-1.5">
                  {other.shortTitle}
                </p>
                <p className="text-[12px] text-gray-500 font-sans leading-relaxed font-normal line-clamp-2">
                  {other.description}
                </p>
                <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-brand-gold group-hover:text-[#b8924b] transition-colors duration-200">
                  <span>Ver servicio</span>
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ConsultingCta />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
