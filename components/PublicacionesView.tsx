'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Mail,
  CheckCircle2,
  X,
} from 'lucide-react'
import type { Section } from '@/lib/sections'
import PageHero from '@/components/PageHero'
import PillarsVisual from '@/components/PillarsVisual'
import {
  CATEGORIAS_PUBLICACIONES,
  ARTICULO_DESTACADO,
  PUBLICACIONES_ARTICULOS,
  TEMAS_MAS_LEIDOS,
  PublicacionItem,
} from '@/lib/publicacionesData'

interface PublicacionesViewProps {
  sections?: Section[]
}

function formatFriendlyDate(dateStr?: string): string {
  if (!dateStr) return 'Reciente'
  // If already formatted like '15 abr. 2024', keep as is
  if (!dateStr.includes('T') && !dateStr.includes('-')) return dateStr
  try {
    const d = new Date(dateStr)
    if (Number.isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString('es-PE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

export default function PublicacionesView({ sections = [] }: PublicacionesViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [subscribed, setSubscribed] = useState<boolean>(false)

  // Merge default curated publications with any custom items from Supabase
  const allArticles = useMemo(() => {
    const dbItems: PublicacionItem[] = []
    if (sections && sections.length > 0) {
      for (const section of sections) {
        for (const item of section.items) {
          if (
            !PUBLICACIONES_ARTICULOS.some((p) => p.id === item.id) &&
            ARTICULO_DESTACADO.id !== item.id
          ) {
            dbItems.push({
              id: item.id,
              title: item.title,
              meta: item.meta || item.date || '2024',
              category: item.category || section.title || 'General',
              description: item.description || '',
              content: item.content || item.description || '',
              date: item.date || item.meta || 'Reciente',
              readTime: '6 min de lectura',
              image:
                item.image ||
                'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
              author: item.author || 'José Luis Zelada',
              tags: item.tags,
            })
          }
        }
      }
    }

    return [...PUBLICACIONES_ARTICULOS, ...dbItems]
  }, [sections])

  // Filter articles by category and search
  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'Todos' ||
        article.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim() ||
        (selectedCategory === 'Gestión del Talento' &&
          (article.category.toLowerCase().includes('talento') ||
            article.tags?.some((t) => t.toLowerCase().includes('talento')))) ||
        (selectedCategory === 'Procesos' &&
          (article.category.toLowerCase().includes('proceso') ||
            article.tags?.some((t) => t.toLowerCase().includes('proceso')))) ||
        (selectedCategory === 'Liderazgo' &&
          (article.category.toLowerCase().includes('liderazgo') ||
            article.tags?.some((t) => t.toLowerCase().includes('liderazgo')))) ||
        (selectedCategory === 'Cultura Organizacional' &&
          (article.category.toLowerCase().includes('cultura') ||
            article.tags?.some((t) => t.toLowerCase().includes('cultura')))) ||
        (selectedCategory === 'Productividad' &&
          (article.category.toLowerCase().includes('productividad') ||
            article.tags?.some((t) => t.toLowerCase().includes('productividad')))) ||
        (selectedCategory === 'Análisis' &&
          (article.category.toLowerCase().includes('análisis') ||
            article.category.toLowerCase().includes('analisis') ||
            article.tags?.some((t) => t.toLowerCase().includes('tendencia'))))

      if (!matchesCategory) return false

      // Search filter
      if (!searchQuery.trim()) return true
      const query = searchQuery.toLowerCase().trim()
      return (
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        (article.tags && article.tags.some((t) => t.toLowerCase().includes(query)))
      )
    })
  }, [allArticles, selectedCategory, searchQuery])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setSubscribed(true)
    setTimeout(() => {
      setEmail('')
    }, 4000)
  }

  return (
    <div className="bg-[#fbfbfd] min-h-screen text-gray-800">
      {/* 1. HERO BANNER */}
      <PageHero
        eyebrow="PUBLICACIONES"
        breadcrumb="Publicaciones"
        title={
          <>
            Ideas y experiencias <br />
            para construir{' '}
            <span className="italic font-normal text-[#d48e3a]">mejores organizaciones</span>
          </>
        }
        description="Artículos, análisis y reflexiones sobre personas, procesos, liderazgo y gestión organizacional, con un enfoque práctico y orientado a la realidad."
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
        aside={<PillarsVisual />}
      />

      {/* 2. CATEGORY FILTER PILLS & SEARCH BAR ROW */}
      <section className="bg-white border-b border-gray-200/70 sticky top-18 sm:top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
              {CATEGORIAS_PUBLICACIONES.map((category) => {
                const isActive = selectedCategory === category
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#c4863c] text-white shadow-sm ring-1 ring-[#c4863c]'
                        : 'bg-white text-gray-700 border border-gray-200/90 hover:border-gray-300 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>

            {/* Live Search Input Box */}
            <div className="relative w-full md:w-64 shrink-0">
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3.5 pr-9 py-1.5 text-xs rounded-lg border border-gray-200 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#c4863c] focus:border-[#c4863c] transition shadow-2xs"
              />
              <Search
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT: 2-COLUMN LAYOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: ARTICLES GRID (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Active search or filter feedback */}
            {(selectedCategory !== 'Todos' || searchQuery) && (
              <div className="flex items-center justify-between bg-amber-50/70 border border-amber-200/70 px-4 py-2 rounded-lg text-xs text-amber-900">
                <span>
                  Mostrando {filteredArticles.length}{' '}
                  {filteredArticles.length === 1 ? 'publicación' : 'publicaciones'}
                  {selectedCategory !== 'Todos' && ` en "${selectedCategory}"`}
                  {searchQuery && ` para "${searchQuery}"`}
                </span>
                <button
                  onClick={() => {
                    setSelectedCategory('Todos')
                    setSearchQuery('')
                  }}
                  className="inline-flex items-center gap-1 font-semibold text-[#c4863c] hover:underline cursor-pointer"
                >
                  <X size={13} /> Limpiar filtros
                </button>
              </div>
            )}

            {filteredArticles.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-200/80 p-8">
                <p className="text-gray-500 text-sm mb-3">
                  No se encontraron publicaciones con los criterios seleccionados.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('Todos')
                    setSearchQuery('')
                  }}
                  className="px-4 py-2 bg-[#c4863c] text-white text-xs font-semibold rounded-lg hover:bg-[#b5772e] transition cursor-pointer"
                >
                  Ver todas las publicaciones
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    className="group bg-white rounded-xl border border-gray-200/80 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gray-300/90"
                  >
                    {/* Card Thumbnail Image */}
                    <Link
                      href={`/publicaciones/${article.id}`}
                      className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 block"
                    >
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </Link>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 flex flex-col flex-grow">
                      {/* Category Badge */}
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#c4863c] mb-1.5 block">
                        {article.category}
                      </span>

                      {/* Title */}
                      <h3 className="font-serif font-bold text-sm sm:text-base text-gray-900 leading-snug line-clamp-2 group-hover:text-[#c4863c] transition-colors">
                        <Link href={`/publicaciones/${article.id}`}>{article.title}</Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="mt-2 text-xs text-gray-500 leading-relaxed line-clamp-3">
                        {article.description}
                      </p>

                      {/* Meta Footer */}
                      <div className="mt-auto pt-4 flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 font-medium">
                            <Calendar size={12} className="text-gray-400 shrink-0" />
                            {formatFriendlyDate(article.date)}
                          </span>
                          <span className="flex items-center gap-1 font-medium">
                            <Clock size={12} className="text-gray-400 shrink-0" />
                            {article.readTime}
                          </span>
                        </div>
                        <Link
                          href={`/publicaciones/${article.id}`}
                          aria-label={`Leer ${article.title}`}
                          className="text-[#c4863c] hover:translate-x-1 transition-transform inline-flex items-center"
                        >
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: SIDEBAR (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Widget 1: Featured Article ("ARTÍCULO DESTACADO") */}
            <div className="relative rounded-xl overflow-hidden border border-gray-200/80 bg-white group hover:shadow-md transition">
              <div className="relative flex flex-col sm:flex-row overflow-hidden bg-gradient-to-r from-amber-50/40 via-white to-white">
                <div className="p-5 flex-1 z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#c4863c] block mb-1.5">
                    ARTÍCULO DESTACADO
                  </span>
                  <h4 className="font-serif font-bold text-base text-gray-900 leading-snug group-hover:text-[#c4863c] transition-colors">
                    <Link href={`/publicaciones/${ARTICULO_DESTACADO.id}`}>
                      {ARTICULO_DESTACADO.title}
                    </Link>
                  </h4>
                  <p className="mt-1.5 text-xs text-gray-500 leading-relaxed line-clamp-3">
                    {ARTICULO_DESTACADO.description}
                  </p>
                  <Link
                    href={`/publicaciones/${ARTICULO_DESTACADO.id}`}
                    className="mt-3.5 inline-flex items-center text-[#c4863c] text-xs font-semibold gap-1 hover:translate-x-1 transition-transform"
                  >
                    <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="relative sm:w-36 h-32 sm:h-auto shrink-0 overflow-hidden">
                  <img
                    src={ARTICULO_DESTACADO.image}
                    alt={ARTICULO_DESTACADO.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="hidden sm:block absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white via-white/80 to-transparent" />
                </div>
              </div>
            </div>

            {/* Widget 2: Newsletter Subscription */}
            <div className="rounded-xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-2xs">
              <div className="flex items-start gap-3 mb-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100">
                  <Mail size={16} className="text-[#c4863c]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#c4863c] block">
                    SUSCRÍBETE
                  </span>
                  <h4 className="font-serif font-bold text-base text-gray-900 leading-snug">
                    Recibe nuevas publicaciones
                  </h4>
                </div>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                Artículos, investigaciones y novedades directamente en tu correo.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/80 p-3 rounded-lg font-medium">
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span>¡Gracias por suscribirte! Te mantendremos informado.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu correo electrónico"
                    className="flex-1 px-3.5 py-2 text-xs rounded-lg border border-gray-200 bg-gray-50/50 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#c4863c] focus:border-[#c4863c] transition"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#c4863c] hover:bg-[#b5772e] text-white text-xs font-semibold transition shadow-2xs cursor-pointer whitespace-nowrap"
                  >
                    Suscribirme
                  </button>
                </form>
              )}
            </div>

            {/* Widget 3: Temas más leídos */}
            <div className="rounded-xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-2xs">
              <div className="mb-4">
                <h4 className="font-serif font-bold text-base text-gray-900 leading-snug">
                  Temas más leídos
                </h4>
                <span className="block w-8 h-[2px] bg-[#c4863c] mt-1.5" />
              </div>

              <ul className="space-y-3.5">
                {TEMAS_MAS_LEIDOS.map((tema, index) => (
                  <li key={tema.id}>
                    <Link
                      href={`/publicaciones/${tema.id}`}
                      className="group flex items-start gap-3 text-xs text-gray-700 hover:text-[#c4863c] transition-colors"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#c4863c] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        {index + 1}
                      </span>
                      <span className="leading-snug font-medium line-clamp-2">
                        {tema.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
