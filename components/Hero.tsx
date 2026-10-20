'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Users, Cog, Lightbulb, Target } from 'lucide-react'

const FEATURES = [
  { icon: Users, title: 'ENFOQUE EN PERSONAS', text: 'Equipos comprometidos y de alto desempeño.', gold: false },
  { icon: Cog, title: 'PROCESOS EFICIENTES', text: 'Menos reprocesos, más productividad.', gold: false },
  { icon: Lightbulb, title: 'SOLUCIONES PRÁCTICAS', text: 'Aplicables a la realidad de cada organización.', gold: true },
  { icon: Target, title: 'RESULTADOS SOSTENIBLES', text: 'Crecimiento con impacto en el tiempo.', gold: false },
] as const

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [openFeature, setOpenFeature] = useState<number | null>(null)

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
      id="inicio"
      ref={containerRef}
      className="relative w-full min-h-screen lg:min-h-[100dvh] bg-[#0B1522] pt-20 flex flex-col justify-between"
    >
      {/* Main Hero Container with portrait and dark theme */}
      <div className="relative flex-1 flex items-center overflow-hidden py-8 sm:py-12 lg:py-16">

        {/* Background Portrait of José Luis Zelada */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[54%] xl:w-[51%] 2xl:w-[49%] max-w-[880px] xl:max-w-[860px] h-full pointer-events-none select-none z-0 overflow-hidden">
          <Image
            src="/images/perfilbueno.png"
            alt="José Luis Zelada - Consultor en Recursos Humanos y Gestión Organizacional"
            fill
            priority
            quality={95}
            className="object-cover object-[center_2%] lg:object-[36%_2%]"
          />
          {/* Subtle warm lighting vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1522] via-[#0B1522]/95 via-45% md:via-[#0B1522]/70 md:via-55% lg:via-[#0B1522]/40 lg:via-35% to-transparent"></div>
          {/* Mobile darkened overlay so text is 100% legible */}
          <div className="absolute inset-0 bg-[#0B1522]/80 lg:hidden"></div>
          {/* Bottom subtle fade to merge into feature bar */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#0B1522] to-transparent"></div>
        </div>

        {/* Hero Content Container */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

            {/* Left Column: Headlines & CTAs */}
            <div
              className="lg:col-span-7 xl:col-span-7 text-center lg:text-left space-y-6"
              style={{
                animationName: isVisible ? 'fadeInUp' : 'none',
                animationDuration: '0.8s',
                animationTimingFunction: 'ease-out',
                animationFillMode: 'forwards',
                opacity: 0,
              }}
            >
              {/* Category tag */}
              <div className="inline-block">
                <span className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase">
                  CONSULTORÍA Y GESTIÓN ORGANIZACIONAL
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] font-serif font-bold text-white leading-[1.14] tracking-tight">
                Transformar organizaciones comienza por{' '}
                <span className="text-brand-gold">
                  transformar su gestión.
                </span>
              </h1>

              {/* Description Paragraph */}
              <p className="text-gray-300 text-sm sm:text-base md:text-[16px] lg:text-[17px] font-sans leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                Soy José Luis Zelada y ayudo a las empresas a fortalecer su talento humano,
                optimizar sus procesos y desarrollar modelos de gestión orientados a resultados,
                productividad y crecimiento sostenible.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
                <Link
                  href="/servicios"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-gold hover:bg-[#b8924b] text-[#0B1522] font-sans font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-[4px] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
                >
                  <span>Conoce mis servicios</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>

            {/* Right Column: Floating Quote Card (desktop only) */}
            <div
              className="hidden lg:col-span-5 xl:col-span-5 lg:flex lg:justify-end lg:translate-x-0 xl:translate-x-4 2xl:translate-x-12 lg:-translate-y-24 xl:-translate-y-28"
              style={{
                animationName: isVisible ? 'fadeInUp' : 'none',
                animationDuration: '0.8s',
                animationTimingFunction: 'ease-out',
                animationFillMode: 'forwards',
                animationDelay: '0.2s',
                opacity: 0,
              }}
            >
              <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-5 max-w-[150px] sm:max-w-[165px] lg:max-w-[175px] min-h-[210px] sm:min-h-[230px] border border-gray-100 text-left flex flex-col justify-center transition-transform duration-300 hover:scale-[1.02]">
                <p className="font-serif text-[#0F2440] text-sm sm:text-[15px] font-medium leading-relaxed">
                  “Gestión que conecta personas, procesos y resultados”
                </p>
                <div className="w-6 h-[1.5px] bg-brand-gold my-3"></div>
                <p className="font-sans text-[9px] sm:text-[10px] text-gray-500 font-medium leading-relaxed mt-0.5">
                  Consultoría en gestión organizacional, talento y mejora de procesos.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Feature / Value Proposition Bar */}
      <div className="w-full bg-white border-t border-b border-gray-200/90 py-1 sm:py-6 relative z-20 shadow-sm flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Mobile: el nombre se despliega en línea y empuja a los demás iconos */}
          <div className="lg:hidden flex flex-nowrap items-center justify-center gap-x-0.5 py-4 overflow-hidden">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon
              const open = openFeature === index
              return (
                <button
                  key={feature.title}
                  type="button"
                  onClick={() => setOpenFeature(open ? null : index)}
                  aria-expanded={open}
                  aria-label={feature.title}
                  className={`flex items-center gap-1 px-1.5 py-1.5 rounded transition-colors duration-300 cursor-pointer ${open ? 'bg-brand-navy/5' : ''}`}
                >
                  <div className={`shrink-0 ${feature.gold ? 'text-brand-gold' : 'text-brand-navy'} ${open ? '' : 'opacity-60'}`}>
                    <Icon size={28} strokeWidth={2.2} />
                  </div>
                  <span
                    className={`overflow-hidden whitespace-nowrap font-sans font-bold text-[10px] text-brand-navy tracking-wide uppercase transition-all duration-300 ${open ? 'max-w-[190px] opacity-100' : 'max-w-0 opacity-0'
                      }`}
                  >
                    {feature.title}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Desktop: fila de 4 columnas */}
          <div className="hidden lg:grid grid-cols-4 gap-8">
            {FEATURES.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="flex items-center gap-3.5">
                  <div className={`flex-shrink-0 ${feature.gold ? 'text-brand-gold' : 'text-brand-navy'}`}>
                    <Icon size={32} strokeWidth={2.2} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-sans font-bold text-[13px] text-brand-navy tracking-wide uppercase leading-tight">
                      {feature.title}
                    </span>
                    <span className="font-sans text-xs text-gray-600 font-normal leading-snug mt-0.5">
                      {feature.text}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
