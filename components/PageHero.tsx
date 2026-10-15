import type { ReactNode } from 'react'

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  backgroundImage,
  aside,
}: {
  eyebrow: string
  title: ReactNode
  description: string
  breadcrumb: string
  backgroundImage?: string
  aside?: ReactNode
}) {
  return (
    <section className="relative bg-[#0d1825] overflow-hidden border-b border-gray-800">
      {/* Ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_75%_20%,rgba(212,142,58,0.14),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(13,24,37,1)_0%,rgba(13,24,37,0.95)_45%,rgba(13,24,37,0.65)_100%)] pointer-events-none z-10" />

      {/* Optional backdrop image */}
      {backgroundImage && (
        <div
          className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 bg-cover bg-center opacity-30 mix-blend-luminosity filter contrast-125"
          style={{ backgroundImage: `url("${backgroundImage}")` }}
        />
      )}

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Altura única para todos los banners del sitio. Ajusta aquí para
            que Servicios, Publicaciones y Contacto midan exactamente igual. */}
        <div className="min-h-[360px] sm:min-h-[380px] lg:min-h-[400px] flex items-start pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-12 lg:pb-16">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className={`${aside ? 'lg:col-span-7' : 'lg:col-span-12 max-w-4xl'} space-y-3.5`}>
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-[2px] bg-[#c4863c] inline-block" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c4863c]">
                  {eyebrow}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.18]">
                {title}
              </h1>

              <p className="text-gray-300/90 text-sm sm:text-[15px] leading-relaxed max-w-2xl font-normal pt-1">
                {description}
              </p>
            </div>

            {aside && (
              <div className="hidden lg:flex lg:col-span-5 justify-center lg:justify-end">
                {aside}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
