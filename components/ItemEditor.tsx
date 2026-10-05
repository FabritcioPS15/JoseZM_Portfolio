'use client'

import { useRef, useState } from 'react'
import {
  Trash2,
  ImagePlus,
  Loader2,
  Star,
  X,
  FileText,
  Image as ImageIcon,
  SlidersHorizontal,
  Check,
  ChevronDown,
  Link2,
} from 'lucide-react'
import toast from 'react-hot-toast'
import type { SectionItem, SectionType } from '@/lib/sections'
import { parseTags } from '@/lib/sections'
import RichTextEditor from './RichTextEditor'

const CATEGORIES = ['Investigaciones', 'Artículos', 'Libros']

const inputClass =
  'w-full px-3 py-2 rounded-md border border-gray-200 text-sm bg-white transition-colors placeholder:text-gray-300 focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/25'

function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string
  hint?: string
  htmlFor?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider"
      >
        {label}
      </label>
      {children}
      {hint && <p className="text-[11px] leading-snug text-gray-400">{hint}</p>}
    </div>
  )
}

/** Bloque plegable. `open` por defecto controlado por el padre. */
function Block({
  icon,
  title,
  subtitle,
  open,
  onToggle,
  badge,
  children,
}: {
  icon: React.ReactNode
  title: string
  subtitle?: string
  open: boolean
  onToggle: () => void
  badge?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="w-7 h-7 rounded-md bg-brand-navy/5 text-brand-gold flex items-center justify-center flex-shrink-0">
          {icon}
        </span>
        <span className="flex-1 min-w-0">
          <span className="flex items-center gap-2">
            <span className="text-xs font-bold text-brand-navy tracking-wide uppercase">
              {title}
            </span>
            {badge}
          </span>
          {subtitle && (
            <span className="block text-[11px] text-gray-400 leading-snug mt-0.5">{subtitle}</span>
          )}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180 text-brand-gold' : ''
          }`}
        />
      </button>
      {open && <div className="px-4 pb-4 pt-1 border-t border-gray-100 space-y-4">{children}</div>}
    </section>
  )
}

export default function ItemEditor({
  item,
  index,
  sectionType,
  onChange,
  onRemove,
  onUploaded,
  autoFocus = false,
}: {
  item: SectionItem
  index: number
  sectionType: SectionType
  onChange: (patch: Partial<SectionItem>) => void
  onRemove: () => void
  /** Se llama tras subir la imagen para aplicarla y persistirla sin pulsar Guardar. */
  onUploaded?: (url: string) => void
  autoFocus?: boolean
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [tagsDraft, setTagsDraft] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [showBody, setShowBody] = useState(!!item.content)
  const [showMeta, setShowMeta] = useState(
    !!item.author || !!item.date || !!item.link || !!item.featured
  )
  // Último valor de `meta` generado solo, para no pisar lo que escribió el autor.
  const autoMetaRef = useRef(item.meta || '')

  // Mientras se escribe no se re-derivan las etiquetas: si no, el input se
  // reformatea bajo el cursor al teclear la coma.
  const tagsString = tagsDraft ?? (item.tags ?? []).join(', ')
  const words = item.content ? item.content.trim().split(/\s+/).filter(Boolean).length : 0
  const minutes = words > 0 ? Math.max(1, Math.round(words / 200)) : 0

  // Antes había dos fechas sueltas ("fecha visible" y "fecha de publicación").
  // Ahora se elige la fecha real y la etiqueta de la tarjeta se rellena sola.
  const handleDate = (value: string) => {
    if (!value) {
      onChange({ date: undefined, meta: autoMetaRef.current ? '' : item.meta })
      autoMetaRef.current = ''
      return
    }
    const iso = new Date(value).toISOString()
    const label = String(new Date(value).getFullYear())
    const patch: Partial<SectionItem> = { date: iso }
    if (!item.meta || item.meta === autoMetaRef.current) {
      patch.meta = label
      autoMetaRef.current = label
    }
    onChange(patch)
  }

  const upload = async (file: File) => {
    setUploading(true)
    setUploadError(null)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.url) {
        setUploadError(data.error || 'No se pudo subir la imagen')
        toast.error(data.error || 'No se pudo subir la imagen')
        return
      }
      if (onUploaded) onUploaded(data.url)
      else onChange({ image: data.url })
      toast.success('Imagen subida y guardada')
    } catch {
      setUploadError('Error de conexión al subir la imagen')
      toast.error('Error de conexión al subir la imagen')
    } finally {
      setUploading(false)
    }
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (file) await upload(file)
  }

  const essentials = [
    { label: 'Título', done: !!item.title.trim() },
    { label: 'Categoría', done: !!item.category },
    { label: 'Resumen', done: !!item.description?.trim() },
    { label: 'Portada', done: !!item.image },
  ]
  const doneCount = essentials.filter((c) => c.done).length
  const complete = doneCount === essentials.length

  return (
    <div className="bg-gray-50/60 border-t border-gray-100 p-4">
      {/* Cabecera fija: identidad, progreso y eliminar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-bold text-brand-navy">
            Publicación {index + 1}
          </span>
          {item.featured && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold text-[10px] font-bold uppercase">
              <Star size={10} /> Destacado
            </span>
          )}
          {complete ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase">
              <Check size={10} /> Lista
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold uppercase">
              {doneCount}/{essentials.length} campos clave
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-red-500 hover:text-red-600 transition-colors"
        >
          <Trash2 size={13} /> Quitar publicación
        </button>
      </div>

      <div className="space-y-3">
        {/* ---- 1. Esencial: identidad y cómo se verá en la tarjeta ---- */}
        <section className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3">
            <span className="w-7 h-7 rounded-md bg-brand-navy/5 text-brand-gold flex items-center justify-center flex-shrink-0">
              <FileText size={14} />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold text-brand-navy tracking-wide uppercase">
                Esencial
              </p>
              <p className="text-[11px] text-gray-400 leading-snug">
                Es lo que se ve en la tarjeta del sitio.
              </p>
            </div>
          </div>

          <div className="px-4 pb-4 pt-1 border-t border-gray-100 space-y-4">
            <Field label="Título *" htmlFor={`item-title-${item.id}`}>
              <input
                id={`item-title-${item.id}`}
                value={item.title}
                onChange={(e) => onChange({ title: e.target.value })}
                placeholder="Título de la publicación"
                autoFocus={autoFocus}
                className={`${inputClass} text-base font-semibold`}
              />
            </Field>

            <Field
              label="Resumen"
              hint="Dos líneas en la tarjeta. Si lo dejas vacío, la tarjeta mostrará solo el título."
              htmlFor={`item-description-${item.id}`}
            >
              <textarea
                id={`item-description-${item.id}`}
                value={item.description || ''}
                onChange={(e) => onChange({ description: e.target.value })}
                rows={2}
                placeholder="Resume la publicación en una o dos frases."
                className={`${inputClass} resize-none`}
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Categoría">
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => onChange({ category: item.category === c ? '' : c })}
                      aria-pressed={item.category === c}
                      className={`px-3 py-1.5 rounded-full border text-[11px] font-semibold tracking-wide transition-all duration-200 ${
                        item.category === c
                          ? 'bg-brand-navy text-white border-brand-navy shadow-sm'
                          : 'bg-white border-gray-200 text-gray-500 hover:border-brand-gold/60 hover:text-brand-navy'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </Field>

              <Field
                label="Fecha"
                hint={
                  item.meta && item.meta !== autoMetaRef.current
                    ? `En la tarjeta: "${item.meta}".`
                    : 'La tarjeta muestra el año automáticamente.'
                }
              >
                <input
                  type="date"
                  value={(item.date || '').slice(0, 10)}
                  onChange={(e) => handleDate(e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>

            {/* Portada con arrastrar y soltar */}
            <Field
              label={sectionType === 'book' ? 'Portada' : 'Imagen de portada'}
              hint="JPG, PNG, WebP, GIF o AVIF. Máximo 5 MB. Se guarda al subirla."
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                onChange={handleFile}
                className="hidden"
              />
              <div
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragging(true)
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault()
                  setDragging(false)
                  const file = e.dataTransfer.files?.[0]
                  if (file) void upload(file)
                }}
                className={`flex flex-col sm:flex-row gap-4 rounded-lg border border-dashed p-3 transition-colors ${
                  dragging ? 'border-brand-gold bg-cream/60' : 'border-gray-200 bg-gray-50/50'
                }`}
              >
                <div className="relative w-full sm:w-40 h-28 rounded-lg overflow-hidden bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt="Portada" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon size={20} className="text-gray-300" />
                  )}
                  {uploading && (
                    <span className="absolute inset-0 bg-white/70 flex items-center justify-center">
                      <Loader2 size={18} className="animate-spin text-brand-gold" />
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-brand-navy text-white text-xs font-bold hover:bg-brand-navy/90 transition-colors disabled:opacity-50"
                  >
                    {uploading ? (
                      <Loader2 size={14} className="animate-spin text-brand-gold" />
                    ) : (
                      <ImagePlus size={14} className="text-brand-gold" />
                    )}
                    {item.image ? 'Reemplazar imagen' : 'Subir imagen'}
                  </button>

                  <input
                    value={item.image || ''}
                    onChange={(e) => onChange({ image: e.target.value })}
                    placeholder="O pega la URL de la imagen"
                    aria-label="URL de la imagen de portada"
                    className={inputClass}
                  />

                  {uploadError && <p className="text-[11px] text-red-500">{uploadError}</p>}

                  {item.image && (
                    <button
                      type="button"
                      onClick={() => onChange({ image: '' })}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={12} /> Quitar imagen
                    </button>
                  )}
                </div>
              </div>
            </Field>

            <label className="flex items-center gap-2.5 cursor-pointer select-none pt-1">
              <input
                type="checkbox"
                checked={!!item.featured}
                onChange={(e) => onChange({ featured: e.target.checked })}
                className="w-4 h-4 accent-brand-gold"
              />
              <span className="text-xs font-semibold text-gray-600">
                Marcar como destacado
              </span>
              <span className="text-[11px] text-gray-400">
                Aparece en la sección de destacados de la portada.
              </span>
            </label>
          </div>
        </section>

        {/* ---- 2. Cuerpo del artículo (opcional) ---- */}
        <Block
          icon={<FileText size={14} />}
          title="Cuerpo del artículo"
          subtitle={
            item.content
              ? `${words.toLocaleString('es')} palabras · ~${minutes} min de lectura`
              : 'Opcional. Con contenido, la publicación tiene su propia página.'
          }
          open={showBody}
          onToggle={() => setShowBody((v) => !v)}
          badge={
            item.content ? (
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-bold uppercase">
                Con página
              </span>
            ) : null
          }
        >
          <RichTextEditor
            value={item.content || ''}
            onChange={(html) => onChange({ content: html })}
          />
          <p className="text-[11px] text-gray-400 leading-snug">
            Sin cuerpo, la tarjeta enlaza al enlace externo que indiques en la ficha.
          </p>
        </Block>

        {/* ---- 3. Ficha y enlaces (avanzado) ---- */}
        <Block
          icon={<SlidersHorizontal size={14} />}
          title="Ficha y enlaces"
          subtitle="Autor, etiquetas y destino del botón."
          open={showMeta}
          onToggle={() => setShowMeta((v) => !v)}
          badge={
            item.author || item.tags?.length || item.link ? (
              <span className="px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[9px] font-bold uppercase">
                Completa
              </span>
            ) : null
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Autor">
              <input
                value={item.author || ''}
                onChange={(e) => onChange({ author: e.target.value })}
                placeholder="Ej: José Luis Zelada"
                className={inputClass}
              />
            </Field>

            <Field label="Etiqueta en la tarjeta" hint="Deja vacío para usar el año.">
              <input
                value={item.meta}
                onChange={(e) => onChange({ meta: e.target.value })}
                placeholder="Ej: 2024 o Mayo 2024"
                className={inputClass}
              />
            </Field>

            <Field
              label="Etiquetas"
              hint="Separadas por coma. Se muestran como #hashtags."
            >
              <input
                value={tagsString}
                onChange={(e) => {
                  const value = e.target.value
                  setTagsDraft(value)
                  onChange({ tags: parseTags(value) })
                }}
                onBlur={() => setTagsDraft(null)}
                placeholder="liderazgo, talento humano, cultura"
                className={inputClass}
              />
            </Field>

            <Field
              label="Enlace externo"
              hint="PDF, revista o publicación original."
            >
              <div className="relative">
                <Link2
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"
                />
                <input
                  value={item.link || ''}
                  onChange={(e) => onChange({ link: e.target.value })}
                  placeholder="https://…"
                  className={`${inputClass} pl-9`}
                />
              </div>
            </Field>
          </div>
        </Block>
      </div>
    </div>
  )
}