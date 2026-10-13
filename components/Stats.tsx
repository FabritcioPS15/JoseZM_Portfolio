'use client'

import { useEffect, useRef, useState } from 'react'
import { Briefcase, Users, FileText, Book } from 'lucide-react'

const STATS_DATA = [
  {
    icon: Briefcase,
    number: '+15',
    label: 'años de experiencia',
  },
  {
    icon: Users,
    number: '+10',
    label: 'organizaciones asesoradas',
  },
  {
    icon: FileText,
    number: '+10',
    label: 'artículos y publicaciones',
  },
  {
    icon: Book,
    number: '3',
    label: 'libros publicados',
  },
]

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null)
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
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  return (
    <section
      ref={sectionRef}
      id="trayectoria"
      className="relative py-12 md:py-16 bg-white border-t border-b border-gray-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-center">
          {STATS_DATA.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="flex items-center gap-3.5 sm:gap-4 justify-start sm:justify-center group"
                style={{
                  animationName: isVisible ? 'fadeInUp' : 'none',
                  animationDuration: '0.6s',
                  animationTimingFunction: 'ease-out',
                  animationFillMode: 'forwards',
                  animationDelay: `${0.1 + index * 0.1}s`,
                  opacity: 0,
                }}
              >
                {/* Icon */}
                <div className="flex-shrink-0 text-brand-navy transition-transform duration-300 group-hover:scale-110">
                  <Icon size={34} strokeWidth={2.2} />
                </div>

                {/* Number & Label */}
                <div className="flex flex-col text-left">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy leading-none tracking-tight">
                    {stat.number}
                  </span>
                  <span className="text-xs sm:text-[13px] text-gray-500 font-sans font-normal mt-1 leading-snug">
                    {stat.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
