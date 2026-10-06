'use client'

import { useEffect, useState } from 'react'
import { BookOpen, X } from 'lucide-react'
import type { Section, SectionItem } from '@/lib/sections'
import RelatedGrid from './RelatedGrid'

export default function RelatedModal({
  related,
  section,
}: {
  related: SectionItem[]
  section: Section
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  if (!related || related.length === 0) return null

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-navy text-white text-xs font-bold tracking-wider uppercase hover:bg-brand-navy/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
      >
        <BookOpen size={15} className="text-brand-gold" /> Ver contenido relacionado
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Contenido relacionado"
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
        >
          <div
            className="absolute inset-0 bg-brand-navy/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          ></div>

          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto p-6 md:p-8">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-9 h-9 rounded-lg bg-cream flex items-center justify-center flex-shrink-0">
                  <BookOpen size={16} className="text-brand-gold" />
                </span>
                <h3 className="font-serif font-bold text-base md:text-lg text-brand-navy uppercase tracking-wider truncate">
                  Contenido relacionado
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-brand-navy hover:border-brand-navy transition-colors flex-shrink-0"
              >
                <X size={16} />
              </button>
            </div>

            <RelatedGrid related={related} section={section} showHeading={false} />
          </div>
        </div>
      )}
    </>
  )
}
