'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'

/** Duración en pantalla: más larga en la primera carga, más corta al navegar. */
const INITIAL_DURATION = 1.4
const NAV_DURATION = 0.85

export default function LogoLoader() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)
  const isFirst = useRef(true)

  useEffect(() => {
    const duration = isFirst.current ? INITIAL_DURATION : NAV_DURATION
    isFirst.current = false

    setVisible(true)
    const hold = window.setTimeout(() => setVisible(false), duration * 1000)

    return () => window.clearTimeout(hold)
  }, [pathname])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="logo-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-white"
        >
          <div className="pointer-events-none absolute -top-24 -right-16 h-[420px] w-[420px] rounded-full bg-brand-gold/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-[360px] w-[360px] rounded-full bg-brand-navy/5 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative flex flex-col items-center gap-7"
          >
            {/* Spinner con el logo al centro */}
            <div className="relative grid place-items-center [--loader-size:6.5rem] md:[--loader-size:8rem]">
              <span className="loader-rings" />
              <img
                src="/images/Logotipo.png"
                alt=""
                className="absolute inset-0 m-auto h-10 w-10 object-contain md:h-14 md:w-14"
              />
            </div>

            <p className="text-[10px] font-bold tracking-[0.35em] text-brand-navy/50 uppercase md:text-[11px]">
              José Luis Zelada
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
