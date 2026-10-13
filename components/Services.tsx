'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Users, Cog, BarChart3, Leaf, ArrowRight } from 'lucide-react'

interface ServiceItem {
  id: string
  icon: typeof Users
  title: string
  description: string
  cardBg: string
  borderColor: string
  circleBorder: string
  iconColor: string
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'talento-humano',
    icon: Users,
    title: 'Gestión del Talento Humano',
    description: 'Atracción, desarrollo, retención y evaluación del talento.',
    cardBg: 'bg-[#FAF6EE]',
    borderColor: 'border-[#F2E8D7]',
    circleBorder: 'border-[#EADBBE]',
    iconColor: 'text-[#A27228]',
  },
  {
    id: 'optimizacion-procesos',
    icon: Cog,
    title: 'Optimización y Sistematización de Procesos',
    description: 'Procesos más eficientes y orientados a resultados.',
    cardBg: 'bg-[#F0F5FA]',
    borderColor: 'border-[#DFEAF4]',
    circleBorder: 'border-[#D2E2F0]',
    iconColor: 'text-[#163860]',
  },
  {
    id: 'gestion-estrategica',
    icon: BarChart3,
    title: 'Gestión Estratégica e Indicadores',
    description: 'Información para tomar mejores decisiones.',
    cardBg: 'bg-[#F2F7F2]',
    borderColor: 'border-[#E0EEE0]',
    circleBorder: 'border-[#D0E6D0]',
    iconColor: 'text-[#2D6E3F]',
  },
  {
    id: 'desarrollo-organizacional',
    icon: Leaf,
    title: 'Desarrollo Organizacional',
    description: 'Cultura, liderazgo y gestión del cambio.',
    cardBg: 'bg-[#FAF7F2]',
    borderColor: 'border-[#EFE7DC]',
    circleBorder: 'border-[#E6DEC8]',
    iconColor: 'text-[#2C5734]',
  },
]

export default function Services() {
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

  const scrollToContact = () => {
    const el = document.getElementById('contacto')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="servicios" className="relative py-14 sm:py-16 lg:py-20 bg-white overflow-hidden">
      {/* Anchor helper for backward compatibility */}
      <div id="consultorías" className="absolute -top-20" aria-hidden="true"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-2">
              MIS SERVICIOS
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-bold text-brand-navy leading-tight text-balance">
              Soluciones para una gestión organizacional efectiva
            </h2>
          </div>

          <Link
            href="/servicios"
            className="self-start md:self-end flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-navy hover:text-brand-gold transition-colors duration-200 group pb-1 whitespace-nowrap"
          >
            <span>Ver todos los servicios</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* 4 Services Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {SERVICES_DATA.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={service.id}
                className={`group rounded-2xl p-6 sm:p-7 border ${service.borderColor} ${service.cardBg} flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                style={{
                  animationName: isVisible ? 'fadeInUp' : 'none',
                  animationDuration: '0.6s',
                  animationTimingFunction: 'ease-out',
                  animationFillMode: 'forwards',
                  animationDelay: `${0.1 + index * 0.1}s`,
                  opacity: 0,
                }}
              >
                {/* Card Top: Icon & Title */}
                <div>
                  <div className="flex items-center gap-3.5 mb-3.5">
                    <div
                      className={`w-12 h-12 rounded-full bg-white shadow-xs border ${service.circleBorder} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}
                    >
                      <Icon size={22} className={service.iconColor} strokeWidth={2.2} />
                    </div>
                    <h3 className="font-serif font-bold text-base sm:text-[17px] text-brand-navy leading-snug">
                      {service.title}
                    </h3>
                  </div>

                  {/* Card Description */}
                  <p className="text-xs sm:text-[13px] text-gray-600 font-sans leading-relaxed mt-4 font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="pt-6 mt-auto">
                  <button
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-navy group-hover:text-brand-gold underline underline-offset-4 decoration-gray-300 group-hover:decoration-brand-gold transition-all duration-200 cursor-pointer"
                  >
                    <span>Conoce más</span>
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
