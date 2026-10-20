import type { Metadata } from 'next'
import { Store } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ConsultingCta from '@/components/ConsultingCta'
import PageHero from '@/components/PageHero'
import { absoluteUrl } from '@/lib/seo'

const DESCRIPTION =
  'Tienda de José Luis Zelada: publicaciones, recursos y materiales de gestión organizacional, talento humano y mejora de procesos.'

export const metadata: Metadata = {
  title: 'Tienda',
  description: DESCRIPTION,
  alternates: { canonical: '/tienda' },
  openGraph: {
    type: 'website',
    title: 'Tienda | José Luis Zelada',
    description: DESCRIPTION,
    url: absoluteUrl('/tienda'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tienda | José Luis Zelada',
    description: DESCRIPTION,
  },
}

export default function TiendaPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <PageHero
        eyebrow="TIENDA"
        breadcrumb="Tienda"
        title={
          <>
            Tienda de <span className="italic text-brand-gold">recursos y publicaciones</span>
          </>
        }
        description="Un espacio para encontrar publicaciones, materiales y recursos de gestión organizacional, talento humano y mejora de procesos."
        backgroundImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=600&fit=crop&q=80"
      />

      {/* Próximamente */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto mb-6">
            <Store size={26} className="text-brand-gold" strokeWidth={2} />
          </div>
          <p className="text-brand-gold font-sans font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-3">
            PRÓXIMAMENTE
          </p>
          <h2 className="text-xl sm:text-2xl lg:text-[30px] font-serif font-bold text-brand-navy leading-snug mb-4">
            Estamos preparando este espacio para ti
          </h2>
          <p className="text-gray-500 text-sm sm:text-[15px] font-sans leading-relaxed font-normal">
            La tienda estará disponible muy pronto. Mientras tanto, puedes explorar mis
            publicaciones o conversar conmigo sobre los desafíos de tu organización.
          </p>
          <div className="mt-8">
            <a
              href="/publicaciones"
              className="inline-flex items-center gap-2.5 bg-brand-gold hover:bg-[#b8924b] text-[#0B1522] font-sans font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-[4px] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Ver publicaciones
            </a>
          </div>
        </div>
      </section>

      <ConsultingCta />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
