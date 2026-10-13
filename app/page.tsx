import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Featured from '@/components/Featured'
import Stats from '@/components/Stats'
import ConsultingCta from '@/components/ConsultingCta'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

// Revalida cada 60s y se refresca al instante al guardar desde el editor (/api/sections)
export const revalidate = 60

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Services />
      <Featured />
      <Stats />
      <ConsultingCta />
      <Footer />
      <ScrollToTop />
    </main>
  )
}