'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const scrollToAnchor = (anchor: string) => {
    if (anchor === 'inicio') {
      scrollToTop()
      return
    }
    const el = document.getElementById(anchor)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <footer id="contacto" className="relative bg-white text-gray-700 border-t border-gray-200 overflow-hidden pt-12 md:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-12">

          {/* Column 1: Logo & Brand */}
          <div className="md:col-span-5 flex flex-col items-start text-left">
            {/* Logotipo image */}
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-12 h-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/Logotipo.png"
                  alt="José Luis Zelada"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            <div className="mt-3">
              <p className="text-brand-navy font-bold text-sm tracking-wider uppercase font-sans">
                JOSÉ LUIS ZELADA
              </p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Consultor | Autor | Investigador
              </p>
            </div>

            <p className="text-xs text-gray-600 max-w-sm mt-3.5 leading-relaxed font-normal">
              José Luis Zelada — consultor en gestión del talento humano. Contribuyo al
              desarrollo de organizaciones más humanas, eficientes y sostenibles.
            </p>
          </div>

          {/* Enlaces + Sígueme: en móvil van en columna (enlaces arriba, Contáctame + LinkedIn debajo) */}
          <div className="md:col-span-7 flex flex-col items-start gap-5 md:contents">
            {/* Column 2: Enlaces */}
            <div className="md:col-span-4 text-left">
              <h3 className="font-sans font-bold text-xs sm:text-sm text-brand-navy uppercase tracking-wider mb-4">
                Enlaces
              </h3>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs sm:text-sm md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-2.5">
                <div className="flex flex-row md:flex-col items-center md:items-start gap-x-5 md:gap-x-0 md:space-y-2.5">
                  <button
                    onClick={() => scrollToAnchor('inicio')}
                    className="text-left whitespace-nowrap text-gray-600 hover:text-brand-gold transition-colors duration-200 cursor-pointer"
                  >
                    Inicio
                  </button>
                  <Link
                    href="/servicios"
                    className="text-left whitespace-nowrap text-gray-600 hover:text-brand-gold transition-colors duration-200"
                  >
                    Servicios
                  </Link>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-start gap-x-5 md:gap-x-0 md:space-y-2.5">
                  <Link
                    href="/investigaciones"
                    className="hidden md:block text-gray-600 hover:text-brand-gold transition-colors duration-200"
                  >
                    Investigaciones
                  </Link>
                  <Link
                    href="/publicaciones"
                    className="hidden md:block text-gray-600 hover:text-brand-gold transition-colors duration-200"
                  >
                    Libros
                  </Link>
                  <Link
                    href="/publicaciones"
                    className="md:hidden text-gray-600 hover:text-brand-gold transition-colors duration-200"
                  >
                    Publicaciones
                  </Link>
                  <Link
                    href="/contacto"
                    className="whitespace-nowrap text-gray-600 hover:text-brand-gold transition-colors duration-200"
                  >
                    Contacto
                  </Link>
                </div>
              </div>
            </div>

            {/* Column 3: Sígueme */}
            <div className="md:col-span-3 text-left">
              <h3 className="hidden md:block font-sans font-bold text-xs sm:text-sm text-brand-navy uppercase tracking-wider mb-4">
                Sígueme
              </h3>
              <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-3">
                <p className="md:hidden font-sans font-bold text-xs sm:text-sm text-brand-navy uppercase tracking-wider whitespace-nowrap">
                  Contáctame
                </p>
                <a
                  href="https://linkedin.com/in/joseluiszelada"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Perfil de LinkedIn de José Luis Zelada"
                  className="w-10 h-10 rounded-md bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-xs"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} José Luis Zelada. Todos los derechos reservados.</p>

          <div className="flex items-center gap-4">
            <Link
              href="/politica-de-privacidad"
              className="hover:text-brand-gold transition-colors duration-200"
            >
              Política de Privacidad
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/terminos-y-condiciones"
              className="hover:text-brand-gold transition-colors duration-200"
            >
              Términos y Condiciones
            </Link>

            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-brand-gold/15 text-brand-navy hover:bg-brand-gold hover:text-white flex items-center justify-center transition-all ml-2 cursor-pointer"
              aria-label="Subir al inicio"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}
