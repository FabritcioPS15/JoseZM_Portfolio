'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import type { Section } from '@/lib/sections'

export default function FeaturedGrid({ sections = [] }: { sections?: Section[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  return (
    <section id="publicaciones" className="relative py-14 sm:py-16 lg:py-20 bg-[#F8F9FA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {/* COLUMN 1: Artículos recientes */}
          <div
            className="flex flex-col"
            style={{
              animationName: isVisible ? 'fadeInUp' : 'none',
              animationDuration: '0.6s',
              animationTimingFunction: 'ease-out',
              animationFillMode: 'forwards',
              animationDelay: '0.1s',
              opacity: 0,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-brand-navy">
                Artículos recientes
              </h2>
              <Link
                href="/articulos"
                className="text-xs font-semibold text-brand-navy hover:text-brand-gold flex items-center gap-1 transition-colors duration-200"
              >
                <span>Ver todas</span>
                <span>→</span>
              </Link>
            </div>

            {/* Card */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 flex flex-col justify-between flex-grow transition-all duration-300 group">
              <Link href="/articulos" className="block relative w-full h-48 overflow-hidden bg-gray-100">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=350&fit=crop"
                  alt="La diversidad generacional en las organizaciones"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-[11px] font-bold text-brand-gold uppercase tracking-wider block mb-1.5 font-sans">
                    GESTIÓN DEL TALENTO
                  </span>
                  <Link href="/articulos">
                    <h3 className="font-serif font-bold text-lg text-brand-navy leading-snug group-hover:text-brand-gold transition-colors duration-200">
                      La diversidad generacional en las organizaciones
                    </h3>
                  </Link>
                  <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed mt-2.5">
                    Cómo aprovechar las fortalezas de cada generación para construir equipos más productivos y comprometidos.
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    15 abr. 2024
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    6 min de lectura
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Investigaciones */}
          <div
            className="flex flex-col"
            style={{
              animationName: isVisible ? 'fadeInUp' : 'none',
              animationDuration: '0.6s',
              animationTimingFunction: 'ease-out',
              animationFillMode: 'forwards',
              animationDelay: '0.2s',
              opacity: 0,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-brand-navy">
                Investigaciones
              </h2>
              <Link
                href="/investigaciones"
                className="text-xs font-semibold text-brand-navy hover:text-brand-gold flex items-center gap-1 transition-colors duration-200"
              >
                <span>Ver todas</span>
                <span>→</span>
              </Link>
            </div>

            {/* Card */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 flex flex-col justify-between flex-grow transition-all duration-300 group">
              <Link href="/investigaciones" className="block relative w-full h-48 overflow-hidden bg-gray-100">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=350&fit=crop"
                  alt="Sistematización de procesos en organizaciones peruanas"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-[11px] font-bold text-brand-gold uppercase tracking-wider block mb-1.5 font-sans">
                    GESTIÓN ORGANIZACIONAL
                  </span>
                  <Link href="/investigaciones">
                    <h3 className="font-serif font-bold text-lg text-brand-navy leading-snug group-hover:text-brand-gold transition-colors duration-200">
                      Sistematización de procesos en organizaciones peruanas
                    </h3>
                  </Link>
                  <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed mt-2.5">
                    Un análisis sobre el estado actual y los principales desafíos para una gestión más eficiente.
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    28 feb. 2024
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    8 min de lectura
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 3: Libros */}
          <div
            className="flex flex-col"
            style={{
              animationName: isVisible ? 'fadeInUp' : 'none',
              animationDuration: '0.6s',
              animationTimingFunction: 'ease-out',
              animationFillMode: 'forwards',
              animationDelay: '0.3s',
              opacity: 0,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-brand-navy">
                Libros
              </h2>
              <Link
                href="/publicaciones"
                className="text-xs font-semibold text-brand-navy hover:text-brand-gold flex items-center gap-1 transition-colors duration-200"
              >
                <span>Ver todos</span>
                <span>→</span>
              </Link>
            </div>

            {/* Card with 3 Book Covers */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 flex flex-col justify-between flex-grow p-6 transition-all duration-300">
              {/* 3 Standing Book Covers */}
              <div className="flex items-end justify-center gap-2 sm:gap-2.5 pt-2 pb-4 select-none">

                {/* Book 1: TALENTO EN ACCIÓN */}
                <div className="book3d-scene w-[88px] sm:w-[94px] aspect-[2/3]">
                  <div className="book3d">
                    <div className="book3d-face rounded-[2px] shadow-md border border-gray-200 flex flex-col justify-between p-2 bg-gradient-to-b from-white to-gray-50">
                      <div className="text-center pt-0.5">
                        <p className="text-[8px] font-black tracking-tight text-brand-navy leading-none">
                          TALENTO
                        </p>
                        <p className="text-[7.5px] font-bold tracking-tight text-brand-gold leading-none mt-0.5">
                          EN ACCIÓN
                        </p>
                      </div>
                      <div className="w-full h-11 relative overflow-hidden rounded-[2px] my-1 shadow-inner">
                        <Image
                          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=120&fit=crop"
                          alt="Talento en Acción"
                          fill
                          sizes="90px"
                          className="object-cover"
                        />
                      </div>
                      <p className="text-[5.5px] text-gray-500 text-center tracking-tighter uppercase font-semibold">
                        JOSÉ LUIS ZELADA
                      </p>
                    </div>
                  </div>
                </div>

                {/* Book 2: COMUNICA LIDERA IMPACTA (center, slightly elevated) */}
                <div className="book3d-scene w-[96px] sm:w-[102px] aspect-[2/3] -translate-y-1.5 z-10">
                  <div className="book3d">
                    <div className="book3d-face rounded-[2px] shadow-xl border border-gray-200 flex flex-col justify-between p-2 bg-white">
                      <div className="text-center pt-0.5">
                        <p className="text-[8.5px] font-black tracking-tight text-brand-navy leading-none">
                          COMUNICA
                        </p>
                        <p className="text-[8px] font-black tracking-tight text-[#163860] leading-none mt-0.5">
                          LIDERA
                        </p>
                        <p className="text-[8px] font-black tracking-tight text-brand-gold leading-none mt-0.5">
                          IMPACTA
                        </p>
                      </div>
                      <div className="w-full h-12 relative overflow-hidden rounded-[2px] my-1 shadow-inner">
                        <Image
                          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&h=120&fit=crop"
                          alt="Comunica Lidera Impacta"
                          fill
                          sizes="100px"
                          className="object-cover"
                        />
                      </div>
                      <p className="text-[6px] text-gray-600 text-center tracking-tighter uppercase font-bold">
                        JOSÉ LUIS ZELADA
                      </p>
                    </div>
                  </div>
                </div>

                {/* Book 3: EL PRÍNCIPE DEL SOL */}
                <div className="book3d-scene w-[88px] sm:w-[94px] aspect-[2/3]">
                  <div className="book3d">
                    <div className="book3d-face rounded-[2px] shadow-md border border-amber-900/40 flex flex-col justify-between p-2 bg-gradient-to-b from-[#693315] via-[#8E4A1E] to-[#2E150A] text-white">
                      <div className="text-center pt-0.5">
                        <p className="text-[6.5px] font-bold tracking-wider text-amber-200 leading-none">
                          EL
                        </p>
                        <p className="text-[8px] font-black tracking-wider text-amber-300 leading-none mt-0.5">
                          PRÍNCIPE
                        </p>
                        <p className="text-[7px] font-bold tracking-wider text-amber-100 leading-none mt-0.5">
                          DEL SOL
                        </p>
                      </div>
                      <div className="w-full h-11 relative overflow-hidden rounded-[2px] my-1 shadow-inner">
                        <Image
                          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&h=120&fit=crop"
                          alt="El Príncipe del Sol"
                          fill
                          sizes="90px"
                          className="object-cover"
                        />
                      </div>
                      <p className="text-[5.5px] text-amber-200/90 text-center tracking-tighter uppercase font-medium">
                        JOSÉ LUIS ZELADA
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Exact Text from screenshot (red box) */}
              <div className="mt-3 flex flex-col justify-between flex-grow">
                <p className="text-xs sm:text-[13px] text-gray-600 font-sans leading-relaxed">
                  Libros para líderes, profesionales y estudiantes interesados en mejorar sus habilidades blandas, la gestión de personas y organizaciones.
                </p>

                <div className="pt-4 mt-auto">
                  <Link
                    href="/publicaciones"
                    className="text-xs font-semibold text-brand-navy hover:text-brand-gold transition-colors inline-flex items-center gap-1 group/link"
                  >
                    <span>Conoce mis libros</span>
                    <ArrowRight size={13} className="transition-transform duration-200 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
