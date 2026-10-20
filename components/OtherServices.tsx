import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SERVICES, serviceHref } from '@/lib/services'

/**
 * Grilla de "Otros servicios" para las páginas de detalle.
 * Excluye el servicio actual a partir de su slug.
 */
export default function OtherServices({ currentSlug }: { currentSlug: string }) {
  const otherServices = SERVICES.filter((service) => service.slug !== currentSlug)

  return (
    <section className="w-full bg-white py-12 sm:py-14">
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
              <p className="font-sans font-bold text-[14px] text-brand-navy leading-snug mb-1.5">
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
  )
}
