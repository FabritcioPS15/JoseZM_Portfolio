'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Users, Cog, Lightbulb, Target } from 'lucide-react'

export default function Hero() {
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative w-full min-h-screen lg:min-h-[100dvh] bg-[#0B1522] pt-20 flex flex-col justify-between"
    >
      {/* Main Hero Container with portrait and dark theme */}
      <div className="relative flex-1 flex items-center overflow-hidden py-8 sm:py-12 lg:py-16">

        {/* Background Portrait of José Luis Zelada */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[58%] xl:w-[55%] 2xl:w-[52%] max-w-[920px] xl:max-w-[900px] h-full pointer-events-none select-none z-0 overflow-hidden">
          <Image
            src="/images/perfilbueno.png"
            alt="José Luis Zelada - Consultor en Recursos Humanos y Gestión Organizacional"
            fill
            priority
            quality={95}
            className="object-cover object-[center_2%] lg:object-[36%_2%]"
          />
          {/* Subtle warm lighting vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1522] via-[#0B1522]/90 via-22% md:via-[#0B1522]/55 md:via-15% lg:via-[#0B1522]/20 lg:via-10% to-transparent"></div>
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
              className="lg:col-span-7 xl:col-span-7 text-left space-y-6"
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
              <p className="text-gray-300 text-sm sm:text-base md:text-[16px] lg:text-[17px] font-sans leading-relaxed max-w-xl font-normal">
                Ayudo a las empresas a fortalecer su talento humano, optimizar sus procesos y desarrollar modelos de gestión orientados a resultados, productividad y crecimiento sostenible.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
                <button
                  onClick={() => scrollToSection('servicios')}
                  className="inline-flex items-center justify-center gap-2.5 bg-brand-gold hover:bg-[#b8924b] text-[#0B1522] font-sans font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-[4px] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
                >
                  <span>Conoce mis servicios</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <button
                  onClick={() => scrollToSection('trayectoria')}
                  className="inline-flex items-center justify-center bg-[#10233D]/90 hover:bg-[#183155] text-white border border-gray-600/80 font-sans font-medium text-xs sm:text-sm px-7 py-3.5 rounded-[4px] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
                >
                  Sobre mí
                </button>
              </div>
            </div>

            {/* Right Column: Floating Quote Card on desktop / visible on tablet */}
            <div
              className="lg:col-span-5 xl:col-span-5 flex justify-start lg:justify-end mt-4 lg:mt-0 lg:translate-x-40 xl:translate-x-48 2xl:translate-x-56 lg:-translate-y-24 xl:-translate-y-28"
              style={{
                animationName: isVisible ? 'fadeInUp' : 'none',
                animationDuration: '0.8s',
                animationTimingFunction: 'ease-out',
                animationFillMode: 'forwards',
                animationDelay: '0.2s',
                opacity: 0,
              }}
            >
              <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-5 max-w-[220px] sm:max-w-[245px] lg:max-w-[255px] border border-gray-100 text-left transition-transform duration-300 hover:scale-[1.02]">
                <p className="font-serif text-[#0F2440] text-sm sm:text-[15px] font-medium leading-snug">
                  “Organizaciones más humanas, eficientes y sostenibles son posibles.”
                </p>
                <div className="w-6 h-[1.5px] bg-brand-gold my-2.5"></div>
                <p className="font-sans font-bold text-[10px] sm:text-[11px] uppercase tracking-wider text-[#0F2440]">
                  JOSÉ LUIS ZELADA
                </p>
                <p className="font-sans text-[9px] sm:text-[10px] text-gray-500 font-medium leading-tight mt-0.5">
                  Consultor en Recursos Humanos y Gestión Organizacional
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom 4-Column Feature / Value Proposition Bar */}
      <div className="w-full bg-white border-t border-b border-gray-200/90 py-5 sm:py-6 relative z-20 shadow-sm flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

            {/* Feature 1 */}
            <div className="flex items-center gap-3.5">
              <div className="flex-shrink-0 text-brand-navy">
                <Users size={32} strokeWidth={2.2} />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-sans font-bold text-xs sm:text-[13px] text-brand-navy tracking-wide uppercase leading-tight">
                  ENFOQUE EN PERSONAS
                </span>
                <span className="font-sans text-[11px] sm:text-xs text-gray-600 font-normal leading-snug mt-0.5">
                  Equipos comprometidos y de alto desempeño.
                </span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3.5">
              <div className="flex-shrink-0 text-brand-navy">
                <Cog size={32} strokeWidth={2.2} />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-sans font-bold text-xs sm:text-[13px] text-brand-navy tracking-wide uppercase leading-tight">
                  PROCESOS EFICIENTES
                </span>
                <span className="font-sans text-[11px] sm:text-xs text-gray-600 font-normal leading-snug mt-0.5">
                  Menos reprocesos, más productividad.
                </span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3.5">
              <div className="flex-shrink-0 text-brand-gold">
                <Lightbulb size={32} strokeWidth={2.2} />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-sans font-bold text-xs sm:text-[13px] text-brand-navy tracking-wide uppercase leading-tight">
                  SOLUCIONES PRÁCTICAS
                </span>
                <span className="font-sans text-[11px] sm:text-xs text-gray-600 font-normal leading-snug mt-0.5">
                  Aplicables a la realidad de cada organización.
                </span>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-3.5">
              <div className="flex-shrink-0 text-brand-navy">
                <Target size={32} strokeWidth={2.2} />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-sans font-bold text-xs sm:text-[13px] text-brand-navy tracking-wide uppercase leading-tight">
                  RESULTADOS SOSTENIBLES
                </span>
                <span className="font-sans text-[11px] sm:text-xs text-gray-600 font-normal leading-snug mt-0.5">
                  Crecimiento con impacto en el tiempo.
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
