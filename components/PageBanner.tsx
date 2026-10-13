import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function PageBanner({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow: string
  title: string
  description: string
  breadcrumb: string
}) {
  return (
    <section className="relative pt-24 md:pt-32 pb-10 md:pb-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb en la esquina */}
        <nav
          aria-label="Ruta de navegación"
          className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-400 mb-5"
        >
          <Link href="/" className="hover:text-brand-gold transition-colors duration-200">
            Inicio
          </Link>
          <ChevronRight size={13} className="text-gray-300" />
          <span className="text-brand-navy font-semibold">{breadcrumb}</span>
        </nav>

        <p className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-2">
          {eyebrow}
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-brand-navy">
          {title}
        </h1>
        <p className="text-sm md:text-base text-gray-500 mt-3 max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  )
}
