import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowLeft, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="relative pt-32 md:pt-44 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-brand-gold text-6xl md:text-8xl font-serif font-bold mb-4">404</p>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-brand-navy mb-3">
            No encontramos esta página
          </h1>
          <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-8">
            El contenido que buscas no existe o fue movido. Puedes volver al inicio o explorar mis
            publicaciones.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-brand-navy text-white text-xs font-bold tracking-wider uppercase hover:bg-brand-navy/90 transition-colors"
            >
              <ArrowLeft size={15} /> Volver al inicio
            </Link>
            <Link
              href="/publicaciones"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-gray-200 text-brand-navy text-xs font-bold tracking-wider uppercase hover:border-brand-navy hover:bg-gray-50 transition-colors"
            >
              <Search size={15} /> Ver publicaciones
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
