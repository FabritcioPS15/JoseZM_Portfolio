'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Compass,
  Target,
  Award,
  Handshake,
} from 'lucide-react'
import { SERVICES, serviceHref } from '@/lib/services'

/* ── Bottom value propositions ─────────────────────────────────── */
const VALUE_PROPS = [
  {
    icon: Compass,
    title: 'Enfoque en la realidad',
    text: 'Soluciones prácticas y adaptadas a cada organización.',
  },
  {
    icon: Target,
    title: 'Orientación a resultados',
    text: 'Propuestas que generan impacto medible.',
  },
  {
    icon: Award,
    title: 'Experiencia comprobada',
    text: 'Metodologías aplicadas en diversos sectores y tipos de organizaciones.',
  },
  {
    icon: Handshake,
    title: 'Acompañamiento continuo',
    text: 'No solo diagnóstico, también implementación y seguimiento.',
  },
]

export default function Services() {
  const heroRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [heroVisible, setHeroVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(false)

  useEffect(() => {
    const observerHero = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !heroVisible) {
            setHeroVisible(true)
            observerHero.disconnect()
          }
        })
      },
      { threshold: 0.15 }
    )

    const observerCards = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !cardsVisible) {
            setCardsVisible(true)
            observerCards.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    if (heroRef.current) observerHero.observe(heroRef.current)
    if (cardsRef.current) observerCards.observe(cardsRef.current)

    return () => {
      observerHero.disconnect()
      observerCards.disconnect()
    }
  }, [heroVisible, cardsVisible])

  return (
    <section id="servicios" className="relative bg-white overflow-hidden">
      {/* Anchor helper for backward compatibility */}
      <div id="consultorías" className="absolute -top-20" aria-hidden="true"></div>

      {/* ── HERO AREA ── City skyline + headline */}
      <div
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{ minHeight: 'clamp(340px, 42vw, 500px)' }}
      >
        {/* Background city image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=600&fit=crop&q=80"
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/75 to-brand-navy/50"></div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-full py-16 sm:py-20 lg:py-24">
          <div
            className="max-w-2xl"
            style={{
              animationName: heroVisible ? 'fadeInUp' : 'none',
              animationDuration: '0.8s',
              animationTimingFunction: 'ease-out',
              animationFillMode: 'forwards',
              opacity: 0,
            }}
          >
            <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-3">
              SERVICIOS
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-serif font-bold text-white leading-[1.18] tracking-tight mb-4">
              Servicios para organizaciones que quieren{' '}
              <span className="italic text-brand-gold">seguir creciendo</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base lg:text-[16px] font-sans leading-relaxed max-w-xl font-normal">
              Acompaño a empresas e instituciones en la gestión de su talento,
              la mejora de sus procesos y el fortalecimiento organizacional,
              con un enfoque práctico y orientado a resultados.
            </p>
          </div>
        </div>
      </div>

      {/* ── SERVICES CARDS SECTION ── */}
      <div className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-2">
              MIS SERVICIOS
            </p>
            <h3 className="text-xl sm:text-2xl lg:text-[30px] font-serif font-bold text-brand-navy leading-snug mb-3">
              Soluciones en gestión de personas, procesos y resultados
            </h3>
            <p className="text-gray-500 text-sm sm:text-[15px] font-sans leading-relaxed max-w-3xl mx-auto font-normal">
              Diseño e implemento soluciones adaptadas a la realidad de cada organización,
              combinando experiencia, metodología y un enfoque práctico.
            </p>
          </div>

          {/* 5 Cards grid */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-4"
          >
            {SERVICES.map((service, index) => {
              return (
                <div
                  key={service.slug}
                  className="group relative bg-white rounded-xl border border-gray-200/80 overflow-visible flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-gray-300/70"
                  style={{
                    animationName: cardsVisible ? 'fadeInUp' : 'none',
                    animationDuration: '0.6s',
                    animationTimingFunction: 'ease-out',
                    animationFillMode: 'forwards',
                    animationDelay: `${0.08 + index * 0.08}s`,
                    opacity: 0,
                  }}
                >
                  {/* Card image */}
                  <div className="relative w-full aspect-[4/3] overflow-visible rounded-t-xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-xl"
                      loading="lazy"
                    />
                    {/* Subtle gradient at bottom of image */}
                    <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/20 to-transparent rounded-b-xl"></div>

                    {/* Numbered circle badge – sits on the bottom edge of the image */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10">
                      <div className="w-8 h-8 rounded-full bg-brand-navy text-white flex items-center justify-center text-sm font-bold font-sans shadow-md border-2 border-white">
                        {index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-4 sm:p-5 pt-6">
                    <h4 className="font-serif font-bold text-[15px] sm:text-base text-brand-navy leading-snug mb-2.5">
                      {service.title}
                    </h4>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-gray-500 font-sans leading-relaxed font-normal flex-1">
                      {service.description}
                    </p>

                    {/* Action link */}
                    <div className="pt-4 mt-auto">
                      <Link
                        href={serviceHref(service)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-gold hover:text-[#b8924b] transition-colors duration-200 cursor-pointer group/link"
                      >
                        <span>Conoce más</span>
                        <ArrowRight
                          size={13}
                          className="transition-transform duration-200 group-hover/link:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>

      {/* ── BOTTOM VALUE PROPOSITIONS BAR ── */}
      <div className="w-full bg-gray-50/80 border-t border-gray-200/80 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {VALUE_PROPS.map((prop) => {
              const Icon = prop.icon
              return (
                <div key={prop.title} className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-9 h-9 rounded-full bg-brand-gold/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-brand-gold/20">
                      <Icon size={18} className="text-brand-gold" strokeWidth={2.2} />
                    </div>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-sans font-bold text-[13px] sm:text-sm text-brand-navy leading-tight">
                      {prop.title}
                    </span>
                    <span className="font-sans text-[11px] sm:text-xs text-gray-500 font-normal leading-snug mt-0.5">
                      {prop.text}
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
