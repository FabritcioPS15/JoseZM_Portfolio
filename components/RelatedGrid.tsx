import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { itemHref, type Section, type SectionItem } from '@/lib/sections'

export default function RelatedGrid({
  related,
  section,
  showHeading = true,
}: {
  related: SectionItem[]
  section: Section
  showHeading?: boolean
}) {
  if (!related || related.length === 0) return null
  return (
    <div>
      {showHeading && (
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-sm md:text-base font-serif font-bold text-brand-navy uppercase tracking-wider">
            Sigue leyendo
          </h3>
          <span className="h-px flex-1 bg-brand-gold/30"></span>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {related.map((rel) => (
          <Link
            key={rel.id}
            href={itemHref(rel, section)}
            className="group relative flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-gray-100 hover:border-brand-gold/40"
          >
            <span className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></span>
            <div className="relative w-full h-28 overflow-hidden bg-gray-100">
              {rel.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={rel.image}
                  alt={rel.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-brand-navy/10 to-brand-gold/10"></div>
              )}
              {rel.category && (
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur text-brand-navy text-[9px] font-bold uppercase tracking-wider shadow-sm">
                  {rel.category}
                </span>
              )}
            </div>
            <div className="p-4 flex flex-col gap-2 flex-grow">
              <h4 className="font-serif font-bold text-sm text-brand-navy leading-snug line-clamp-2 group-hover:text-brand-gold transition-colors">
                {rel.title}
              </h4>
              <span className="mt-auto pt-2 text-[11px] font-bold text-brand-navy inline-flex items-center gap-1">
                Leer más
                <ArrowRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
