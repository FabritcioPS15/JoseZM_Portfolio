import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import PageBanner from '@/components/PageBanner'
import { Mail, MessageCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contacto | José Luis Zelada',
  description:
    'Ponte en contacto con José Luis Zelada, consultor en gestión del talento humano y desarrollo organizacional. Correo, WhatsApp y LinkedIn.',
}

const EMAIL = 'contacto@joseluiszelada.pe'
const LINKEDIN = 'https://linkedin.com/in/joseluiszelada'
const WHATSAPP = '51987654321'

function LinkedInIcon({ size = 22, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  )
}

function ChannelCard({
  href,
  icon,
  label,
  value,
  description,
  external = false,
}: {
  href: string
  icon: ReactNode
  label: string
  value: string
  description: string
  external?: boolean
}) {
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-gold/40 transition-all duration-300 p-6 flex flex-col"
    >
      <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center mb-4 text-brand-gold transition-colors group-hover:bg-brand-gold/15">
        {icon}
      </div>
      <p className="text-[11px] font-bold uppercase tracking-wider text-brand-navy/60">{label}</p>
      <p className="font-semibold text-brand-navy mt-1 break-all">{value}</p>
      <p className="text-xs text-gray-500 leading-relaxed mt-2 flex-grow">{description}</p>
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-navy group-hover:text-brand-gold mt-4 transition-colors">
        Contactar
        <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <PageBanner
        eyebrow="CONTACTO"
        breadcrumb="Contacto"
        title="Hablemos sobre tu organización"
        description="¿Tienes un proyecto, una consulta o quieres conocer más sobre mis servicios? Elige el canal que prefieras y estaré encantado de ayudarte."
      />

      {/* Channels */}
      <section className="relative pb-16 md:pb-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <ChannelCard
              href={`mailto:${EMAIL}`}
              icon={<Mail size={22} />}
              label="Correo electrónico"
              value={EMAIL}
              description="Escríbeme y te responderé a la brevedad posible."
            />
            <ChannelCard
              href={`https://wa.me/${WHATSAPP}`}
              external
              icon={<MessageCircle size={22} />}
              label="WhatsApp"
              value="+51 987 654 321"
              description="Conversemos directamente sobre los desafíos de tu empresa."
            />
            <ChannelCard
              href={LINKEDIN}
              external
              icon={<LinkedInIcon size={22} />}
              label="LinkedIn"
              value="in/joseluiszelada"
              description="Conecta conmigo y sigamos en contacto profesional."
            />
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  )
}
