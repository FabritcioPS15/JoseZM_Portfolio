'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import type { Service } from '@/lib/services'

export default function ServiceBanner({ service }: { service: Service }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
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
    <section
      ref={containerRef}
      className="relative w-full min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] bg-[#0B1522] pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-14 lg:pb-16 flex items-center overflow-hidden"
    >
      {/* Background service image (right side, like home hero) */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[54%] xl:w-[51%] 2xl:w-[49%] max-w-[880px] xl:max-w-[860px] h-full pointer-events-none select-none z-0 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          priority
          quality={90}
          className="object-cover object-center"
        />
        {/* Blue gradient vignette (same style as home hero) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1522] via-[#0B1522]/95 via-45% md:via-[#0B1522]/70 md:via-55% lg:via-[#0B1522]/40 lg:via-35% to-transparent"></div>
        {/* Mobile darkened overlay so text is 100% legible */}
        <div className="absolute inset-0 bg-[#0B1522]/80 lg:hidden"></div>
        {/* Bottom subtle fade */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#0B1522] to-transparent"></div>
      </div>

      {/* Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          <div
            className="lg:col-span-7 xl:col-span-7 text-center lg:text-left space-y-5"
            style={{
              animationName: isVisible ? 'fadeInUp' : 'none',
              animationDuration: '0.8s',
              animationTimingFunction: 'ease-out',
              animationFillMode: 'forwards',
              opacity: 0,
            }}
          >
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center justify-center lg:justify-start gap-1.5 text-[11px] font-sans text-gray-400">
              <Link href="/servicios" className="hover:text-brand-gold transition-colors duration-200">
                Servicios
              </Link>
              <ChevronRight size={12} className="text-gray-500" />
              <span className="text-gray-300">{service.shortTitle}</span>
            </nav>

            {/* Eyebrow */}
            <span className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase">
              SERVICIO
            </span>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-white leading-[1.14] tracking-tight">
              {service.title}
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-sm sm:text-[15px] font-sans leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              {service.description}
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              <Link
                href="/contacto"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-gold hover:bg-[#b8924b] text-[#0B1522] font-sans font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-[4px] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
              >
                <span>Consultar sobre este servicio</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
