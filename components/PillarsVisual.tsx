export default function PillarsVisual() {
  return (
    <div className="relative flex items-center gap-4 sm:gap-6 select-none max-w-full">
      {/* 3 Stacked Books Spines */}
      <div className="relative flex flex-col items-center">
        {/* Book 1 (Top): PERSONAS */}
        <div
          className="relative w-48 sm:w-56 h-9 sm:h-10 bg-gradient-to-r from-[#172332] via-[#223146] to-[#172332] rounded-[3px] shadow-md border-y border-[#344865]/70 flex items-center justify-center transform hover:scale-[1.02] transition-transform duration-300"
          style={{
            boxShadow: '0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          <span className="absolute left-3 top-1 bottom-1 w-[1.5px] bg-[#3a4f6d]/80" />
          <span className="absolute left-4 top-1 bottom-1 w-[1.5px] bg-[#3a4f6d]/80" />
          <span className="text-[10px] sm:text-[11px] font-serif font-bold tracking-[0.25em] text-gray-200 uppercase drop-shadow">
            PERSONAS
          </span>
          <span className="absolute right-3 top-1 bottom-1 w-[1.5px] bg-[#3a4f6d]/80" />
          <span className="absolute right-4 top-1 bottom-1 w-[1.5px] bg-[#3a4f6d]/80" />
        </div>

        {/* Book 2 (Middle): PROCESOS */}
        <div
          className="relative w-52 sm:w-60 h-10 sm:h-11 bg-gradient-to-r from-[#131d2a] via-[#1c293c] to-[#131d2a] rounded-[3px] shadow-lg border-y border-[#2c3f58]/70 -mt-1 flex items-center justify-center transform hover:scale-[1.02] transition-transform duration-300 z-10"
          style={{
            boxShadow: '0 6px 16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          <span className="absolute left-3.5 top-1.5 bottom-1.5 w-[1.5px] bg-[#324560]/80" />
          <span className="absolute left-5 top-1.5 bottom-1.5 w-[1.5px] bg-[#324560]/80" />
          <span className="text-[10px] sm:text-[11px] font-serif font-bold tracking-[0.25em] text-gray-300 uppercase drop-shadow">
            PROCESOS
          </span>
          <span className="absolute right-3.5 top-1.5 bottom-1.5 w-[1.5px] bg-[#324560]/80" />
          <span className="absolute right-5 top-1.5 bottom-1.5 w-[1.5px] bg-[#324560]/80" />
        </div>

        {/* Book 3 (Bottom): RESULTADOS */}
        <div
          className="relative w-56 sm:w-66 h-11 sm:h-13 bg-gradient-to-r from-[#0f1722] via-[#162335] to-[#0f1722] rounded-[3px] shadow-2xl border-y border-[#223348]/70 -mt-1 flex items-center justify-center transform hover:scale-[1.02] transition-transform duration-300 z-20"
          style={{
            boxShadow: '0 10px 25px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <span className="absolute left-4 top-2 bottom-2 w-[1.5px] bg-[#293a52]/80" />
          <span className="absolute left-5.5 top-2 bottom-2 w-[1.5px] bg-[#293a52]/80" />
          <span className="text-[11px] sm:text-xs font-serif font-bold tracking-[0.25em] text-[#d48e3a] uppercase drop-shadow">
            RESULTADOS
          </span>
          <span className="absolute right-4 top-2 bottom-2 w-[1.5px] bg-[#293a52]/80" />
          <span className="absolute right-5.5 top-2 bottom-2 w-[1.5px] bg-[#293a52]/80" />
        </div>

        {/* Desk Surface Shadow */}
        <div className="w-60 sm:w-72 h-3 bg-black/60 rounded-full blur-md -mt-1 z-0" />
      </div>

      {/* Desk Laptop and notebook composition */}
      <div className="hidden sm:block relative -ml-2">
        <div className="w-28 h-20 bg-gradient-to-b from-gray-700 to-gray-900 rounded-t-md p-1 border border-gray-600 shadow-xl transform rotate-1">
          <div className="w-full h-full bg-slate-950 rounded-sm overflow-hidden flex flex-col p-1.5">
            <div className="w-8 h-1 bg-amber-500/60 rounded-xs mb-1" />
            <div className="w-16 h-1 bg-gray-600/80 rounded-xs mb-1" />
            <div className="w-12 h-1 bg-gray-600/60 rounded-xs" />
          </div>
        </div>
        <div className="w-32 h-2 bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500 rounded-b-md shadow-md -ml-2" />
      </div>
    </div>
  )
}
