'use client'

import { ArrowRight } from 'lucide-react'

function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.549 1.761.815 2.796.815 3.183 0 5.769-2.587 5.77-5.766.001-3.181-2.585-5.767-5.77-5.767zm3.349 8.243c-.145.407-.743.766-1.026.814-.312.052-.719.078-2.327-.589-1.954-.81-3.21-2.802-3.307-2.931-.097-.13-.787-1.047-.787-1.996 0-.949.497-1.417.674-1.611.176-.194.385-.243.513-.243.128 0 .256.002.368.007.118.005.276-.045.431.328.16.386.547 1.332.595 1.43.048.098.081.213.016.342-.064.13-.098.211-.194.324-.097.113-.203.252-.29.339-.098.097-.2.203-.086.398.114.195.506.834 1.087 1.352.748.667 1.378.874 1.573.971.195.097.309.081.424-.05.114-.13.488-.568.618-.763.13-.195.26-.162.438-.097.179.065 1.134.535 1.329.633.195.098.325.146.374.227.048.081.048.472-.097.879zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.179L2 22l4.957-1.398A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
    </svg>
  )
}

export default function ConsultingCta() {
  const scrollToContact = () => {
    const el = document.getElementById('contacto')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const openWhatsApp = () => {
    const phone = '51987654321' // Reemplazable con el número oficial de José Luis Zelada
    const text = encodeURIComponent('Hola José Luis, quisiera conversar sobre los desafíos de mi organización.')
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank')
  }

  return (
    <section className="relative py-14 sm:py-16 lg:py-20 bg-[#0B1522] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-navy/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          {/* Left Text */}
          <div className="max-w-2xl text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
              ¿Hablamos sobre tu organización?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mt-2.5 font-normal">
              Conversemos sobre los desafíos de tu empresa y cómo puedo ayudarte a alcanzar tus objetivos.
            </p>
          </div>

          {/* Right Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
            <button
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-[#b8924b] text-[#0B1522] font-sans font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-[4px] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
            >
              <span>Solicita una consultoría</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
