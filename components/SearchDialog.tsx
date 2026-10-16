'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, X, ArrowRight, FileText } from 'lucide-react'

interface SearchItem {
  id: string
  title: string
  description: string
  meta: string
  author: string
  category: string
  tags: string[]
  image: string
  href: string
  section: string
}

const MAX_RESULTS = 8

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export default function SearchDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const loadedRef = useRef(false)

  const [items, setItems] = useState<SearchItem[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  // Carga el índice la primera vez que se abre.
  useEffect(() => {
    if (!open || loadedRef.current) return
    loadedRef.current = true
    setLoading(true)
    fetch('/api/search')
      .then((res) => res.json())
      .then((data) => setItems(Array.isArray(data.items) ? data.items : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [open])

  // Foco en el input al abrir.
  useEffect(() => {
    if (open) inputRef.current?.focus()
    else setQuery('')
  }, [open])

  // Esc para cerrar + bloqueo del scroll del body.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open, onClose])

  const results = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return []
    return items
      .filter((item) => {
        const haystack = normalize(
          [
            item.title,
            item.description,
            item.author,
            item.category,
            item.meta,
            item.section,
            item.tags.join(' '),
          ]
            .filter(Boolean)
            .join(' ')
        )
        return haystack.includes(q)
      })
      .slice(0, MAX_RESULTS)
  }, [items, query])

  if (!open) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (results.length > 0) {
      router.push(results[0].href)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-[90]">
      {/* Backdrop (empieza debajo del navbar para no difuminarlo) */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-18 sm:top-20 bg-brand-navy/40 backdrop-blur-sm"
      />

      {/* Panel */}
      <div className="relative mx-auto max-w-2xl px-4 pt-20 sm:pt-24">
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
          <form onSubmit={handleSubmit} className="flex items-center gap-3 border-b border-gray-100 px-4">
            <Search size={18} className="flex-shrink-0 text-gray-400" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar libros, artículos e investigaciones…"
              className="w-full bg-transparent py-4 text-sm text-brand-navy placeholder:text-gray-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar búsqueda"
              className="flex-shrink-0 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-brand-navy"
            >
              <X size={18} />
            </button>
          </form>

          <div className="max-h-[60vh] overflow-y-auto">
            {loading ? (
              <p className="px-5 py-8 text-center text-sm text-gray-500">Cargando…</p>
            ) : query.trim() === '' ? (
              <p className="px-5 py-8 text-center text-sm text-gray-500">
                Escribe para buscar en todas las publicaciones.
              </p>
            ) : results.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <p className="text-sm text-gray-600">
                  Sin resultados para <span className="font-semibold text-brand-navy">“{query.trim()}”</span>.
                </p>
              </div>
            ) : (
              <ul className="py-2">
                {results.map((item) => (
                  <li key={`${item.href}-${item.id}`}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center gap-4 px-5 py-3 transition-colors hover:bg-cream/60"
                    >
                      <span className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                        {item.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.image}
                            alt=""
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <FileText size={18} className="text-gray-400" />
                        )}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          {item.category && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                              {item.category}
                            </span>
                          )}
                          {item.section && (
                            <span className="truncate text-[10px] uppercase tracking-wider text-gray-400">
                              {item.section}
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 block truncate font-serif font-bold text-sm text-brand-navy group-hover:text-brand-gold">
                          {item.title}
                        </span>
                        {item.description && (
                          <span className="mt-0.5 block truncate text-xs text-gray-500">
                            {item.description}
                          </span>
                        )}
                      </span>

                      <ArrowRight
                        size={15}
                        className="flex-shrink-0 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-gold"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-gray-100 bg-gray-50/70 px-5 py-3">
            <span className="text-[11px] text-gray-400">
              Pulsa <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5 font-sans">Esc</kbd> para cerrar
            </span>
            <Link
              href="/publicaciones"
              onClick={onClose}
              className="text-xs font-semibold text-brand-navy transition-colors hover:text-brand-gold"
            >
              Ver todas las publicaciones →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
