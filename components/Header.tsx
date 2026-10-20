'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, ArrowRight, Mail, Store, ChevronDown } from 'lucide-react'

type NavChild = { label: string; href: string }
type NavItem = { label: string; href: string; children?: NavChild[] } | { label: string; anchor: string }

const SERVICES_NAV: NavChild[] = [
  { label: 'Gestión del Talento Humano', href: '/servicios/talento-humano' },
  { label: 'Diseño y Desarrollo Organizacional', href: '/servicios/diseno-organizacional' },
  { label: 'Gestión por Procesos', href: '/servicios/gestion-procesos' },
  { label: 'Indicadores y Gestión de Resultados', href: '/servicios/indicadores-resultados' },
  { label: 'Capacitación y Acompañamiento', href: '/servicios/capacitacion' },
]

const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', anchor: 'inicio' },
  { label: 'Servicios', href: '/servicios', children: SERVICES_NAV },
  { label: 'Publicaciones', href: '/publicaciones' },
  { label: 'Contacto', href: '/contacto' },
]

const HEADER_OFFSET = 80

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeAnchor, setActiveAnchor] = useState('inicio')
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'

  const isActive = (item: NavItem) =>
    'href' in item
      ? pathname === item.href || pathname.startsWith(`${item.href}/`)
      : isHome && activeAnchor === item.anchor

  const scrollToAnchor = (anchor: string) => {
    if (anchor === 'inicio' || anchor === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(anchor)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
    window.scrollTo({ top, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isHome) return
    const hash = decodeURIComponent(window.location.hash.slice(1))
    if (!hash) return
    setActiveAnchor(hash)
    const timer = setTimeout(() => scrollToAnchor(hash), 150)
    return () => clearTimeout(timer)
  }, [isHome])

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isMobileMenuOpen])

  const handleNavClick = (anchor: string) => {
    setIsMobileMenuOpen(false)
    setActiveAnchor(anchor)
    if (isHome) {
      window.history.replaceState(
        null,
        '',
        anchor === 'inicio' ? window.location.pathname : `#${anchor}`
      )
      scrollToAnchor(anchor)
    } else {
      router.push(anchor === 'inicio' ? '/' : `/#${anchor}`)
    }
  }

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 backdrop-blur-md ${isScrolled ? 'bg-white/95 shadow-md py-1.5' : 'bg-white py-2'
        }`}
    >
      {/* Top subtle border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-100"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo with Logotipo.png and titles */}
          <Link href="/" className="flex items-center gap-3 sm:gap-3.5 flex-shrink-0 group">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/Logotipo.png"
                alt="José Luis Zelada"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-brand-navy font-bold text-xs sm:text-sm tracking-wider leading-tight group-hover:text-brand-gold transition-colors font-sans uppercase">
                JOSÉ LUIS ZELADA
              </span>
              <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium tracking-tight leading-tight mt-0.5">
                Personas, Procesos y Resultados
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <nav className="flex items-center gap-6 xl:gap-7">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item)
                const itemClassName = `text-[14px] font-medium tracking-normal transition-all duration-200 relative pb-1 ${active ? 'text-brand-navy font-semibold' : 'text-gray-700 hover:text-brand-gold'
                  }`
                const underline = active ? (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold transition-all duration-300"></span>
                ) : (
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-brand-gold group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                )
                return 'href' in item ? (
                  item.children && item.children.length > 0 ? (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setIsServicesMenuOpen(true)}
                      onMouseLeave={() => setIsServicesMenuOpen(false)}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        aria-haspopup="true"
                        aria-expanded={isServicesMenuOpen}
                        className={`${itemClassName} group inline-flex items-center gap-1`}
                      >
                        {item.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${isServicesMenuOpen ? 'rotate-180' : ''}`}
                        />
                        {underline}
                      </Link>
                      <div
                        className={`absolute left-0 top-full mt-2 w-72 rounded-xl bg-white shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 origin-top ${
                          isServicesMenuOpen
                            ? 'opacity-100 visible scale-y-100 translate-y-0'
                            : 'opacity-0 invisible scale-y-95 -translate-y-1 pointer-events-none'
                        }`}
                      >
                        <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"></div>
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setIsServicesMenuOpen(false)}
                            className="flex items-center justify-between gap-2 px-4 py-3 text-[13px] font-medium text-gray-700 hover:text-brand-navy hover:bg-cream/60 border-b border-gray-50 last:border-b-0 transition-colors duration-150"
                          >
                            <span className="truncate">{child.label}</span>
                            <ArrowRight size={13} className="text-brand-gold/60 flex-shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`${itemClassName} group`}
                    >
                      {item.label}
                      {underline}
                    </Link>
                  )
                ) : (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.anchor)}
                    className={`${itemClassName} group`}
                  >
                    {item.label}
                    {underline}
                  </button>
                )
              })}
            </nav>

            {/* Store icon */}
            <Link
              href="/tienda"
              aria-label="Ir a la tienda"
              title="Tienda"
              className="p-2 text-gray-700 hover:text-brand-gold hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Store size={19} strokeWidth={2.2} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
            className={`lg:hidden p-2.5 rounded-lg text-brand-navy transition-all duration-300 hover:text-brand-gold active:scale-95 ${isMobileMenuOpen ? 'bg-brand-navy/5' : ''
              }`}
          >
            {isMobileMenuOpen ? <X size={26} strokeWidth={2.5} /> : <Menu size={26} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      <div
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 top-18 sm:top-20 bg-brand-navy/40 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
      ></div>

      {/* Mobile Navigation Panel */}
      <div
        className={`lg:hidden fixed inset-x-0 top-18 sm:top-20 z-40 px-4 pt-2 transition-all duration-300 ease-out ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-3 pointer-events-none opacity-0'
          }`}
      >
        <nav className="rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-cream/60 to-transparent">
            <p className="text-[11px] font-bold tracking-[0.2em] text-brand-navy/60 uppercase">Menú</p>
            <Link
              href="/tienda"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-brand-navy/70 hover:bg-white hover:text-brand-gold transition-colors"
            >
              <Store size={15} />
              Tienda
            </Link>
          </div>

          <div className="max-h-[calc(100dvh-8rem)] overflow-y-auto">
            {NAV_ITEMS.filter((item) => !('href' in item && item.href === '/contacto')).map((item, idx) => {
              const active = isActive(item)
              const inner = (
                <>
                  <span className="flex items-center gap-4">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-navy/5 text-[10px] font-bold text-brand-gold group-hover:bg-brand-navy group-hover:text-white transition-colors duration-200">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </span>
                  <ArrowRight size={16} className="text-gray-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-gold" />
                </>
              )
              const itemClassName = `group flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold tracking-wider transition-colors duration-200 border-b border-gray-100 last:border-b-0 ${active
                ? 'bg-cream text-brand-gold'
                : 'text-brand-navy hover:bg-cream hover:text-brand-gold active:bg-cream'
                }`
              return 'href' in item ? (
                item.children && item.children.length > 0 ? (
                  <div key={item.label} className="border-b border-gray-100">
                    <div className="flex items-stretch">
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={`${itemClassName} flex-1 border-b-0`}
                      >
                        {inner}
                      </Link>
                      <button
                        onClick={() => setIsMobileServicesOpen((open) => !open)}
                        aria-label={isMobileServicesOpen ? 'Ocultar servicios' : 'Mostrar servicios'}
                        aria-expanded={isMobileServicesOpen}
                        className="px-4 text-gray-400 hover:text-brand-gold transition-colors"
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isMobileServicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="bg-cream/40 border-t border-gray-100">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => {
                              setIsMobileServicesOpen(false)
                              setIsMobileMenuOpen(false)
                            }}
                            className="block pl-14 pr-5 py-3 text-[13px] text-gray-600 hover:text-brand-navy hover:bg-cream transition-colors border-b border-gray-100/70 last:border-b-0"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={itemClassName}
                  >
                    {inner}
                  </Link>
                )
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.anchor)}
                  className={itemClassName}
                >
                  {inner}
                </button>
              )
            })}
          </div>

          <Link
            href="/contacto"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 px-5 py-4 bg-brand-navy text-white text-xs font-bold tracking-wider hover:bg-brand-navy/90 transition-colors duration-200"
          >
            <Mail size={14} className="text-brand-gold" />
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  )
}
