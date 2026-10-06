export default function BookCover({
  title,
  author,
  image,
  size = 'sm',
}: {
  title?: string
  author?: string
  image?: string
  size?: 'sm' | 'lg'
}) {
  const isLg = size === 'lg'

  return (
    <div
      className={`relative flex flex-col justify-between text-center overflow-hidden rounded-[3px] shadow-lg border border-brand-gold/40 bg-gradient-to-br from-[#16305a] via-brand-navy to-[#0a1929] ${
        isLg ? 'w-56 h-80 p-4' : 'w-[85px] h-[125px] p-2'
      }`}
    >
      {/* Spine highlight */}
      <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-gradient-to-r from-black/45 via-black/15 to-transparent z-10"></div>
      {/* Page edges */}
      <div className="absolute right-0 top-1 bottom-1 w-[3px] bg-gradient-to-l from-white/50 via-white/20 to-transparent"></div>

      {image ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title || 'Portada'}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/5"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </>
      ) : (
        <>
          {/* Inner gold frame */}
          <div className="absolute inset-1 border border-brand-gold/25 rounded-sm pointer-events-none"></div>

          <div className={`relative ${isLg ? 'mt-3 space-y-1.5' : 'mt-1 space-y-0.5'}`}>
            <span
              className={`flex items-center justify-center gap-1.5 ${isLg ? 'mb-2' : 'mb-1'}`}
            >
              <span className="h-px w-4 bg-brand-gold/50"></span>
              <span className={`${isLg ? 'w-1.5 h-1.5' : 'w-1 h-1'} rotate-45 bg-brand-gold`}></span>
              <span className="h-px w-4 bg-brand-gold/50"></span>
            </span>

            {title ? (
              <p
                className={`text-brand-gold font-bold leading-tight uppercase line-clamp-4 ${
                  isLg ? 'text-sm md:text-base tracking-wide' : 'text-[7px] tracking-[0.05em]'
                }`}
              >
                {title}
              </p>
            ) : (
              <div className={isLg ? 'space-y-1' : 'space-y-0.5'}>
                <span className={`text-brand-gold tracking-[0.1em] font-bold block leading-none ${isLg ? 'text-xs' : 'text-[7px]'}`}>
                  COMUNICA
                </span>
                <span className={`text-brand-gold tracking-[0.1em] font-bold block leading-none ${isLg ? 'text-xs' : 'text-[7px]'}`}>
                  LIDERA
                </span>
                <span className={`text-brand-gold tracking-[0.1em] font-bold block leading-none ${isLg ? 'text-xs' : 'text-[7px]'}`}>
                  IMPACTA
                </span>
              </div>
            )}
          </div>

          <div className="relative mb-1">
            <div className={`mx-auto mb-1 bg-brand-gold/40 ${isLg ? 'w-10 h-[1.5px]' : 'w-4 h-[1px]'}`}></div>
            <span className={`text-gray-300 uppercase tracking-widest block leading-none ${isLg ? 'text-[9px]' : 'text-[5px]'}`}>
              {author || 'J. L. ZELADA'}
            </span>
          </div>
        </>
      )}
    </div>
  )
}
