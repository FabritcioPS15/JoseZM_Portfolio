'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'motion/react'

/** Duración del relleno: más largo en la primera carga, más corto al navegar. */
const INITIAL_DURATION = 1.4
const NAV_DURATION = 0.85
const HOLD = 0.28

export default function LogoLoader() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)
  const isFirst = useRef(true)
  const progress = useMotionValue(0)

  // El clip revela el logo de abajo hacia arriba; la línea "surface" marca el borde.
  const fillClip = useTransform(progress, (v) => `inset(${Math.max(0, 100 - v)}% 0% 0% 0%)`)
  const surfaceTop = useTransform(progress, (v) => `${Math.max(0, 100 - v)}%`)
  const barScale = useTransform(progress, (v) => Math.max(0, v / 100))

  useEffect(() => {
    const duration = isFirst.current ? INITIAL_DURATION : NAV_DURATION
    isFirst.current = false

    setVisible(true)
    progress.set(0)

    const controls = animate(progress, 100, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    })
    const hold = window.setTimeout(() => setVisible(false), duration * 1000 + HOLD * 1000)

    return () => {
      controls.stop()
      window.clearTimeout(hold)
    }
  }, [pathname, progress])

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
            className="relative flex flex-col items-center gap-6"
          >
            {/* Logo rellenándose */}
            <div className="relative h-32 w-32 md:h-40 md:w-40">
              <span className="absolute inset-0 logo-mask bg-brand-navy/10" />
              <motion.span
                className="absolute inset-0 logo-mask bg-gradient-to-t from-brand-gold to-[#E8CF96]"
                style={{ clipPath: fillClip }}
              />
              <motion.span
                className="absolute -left-[6%] -right-[6%] h-[2px] rounded-full bg-brand-gold/70 blur-[1px]"
                style={{ top: surfaceTop }}
              />
            </div>

            {/* Nombre + barra de progreso */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-[10px] font-bold tracking-[0.35em] text-brand-navy/50 uppercase md:text-[11px]">
                José Luis Zelada
              </p>
              <span className="relative h-[3px] w-40 overflow-hidden rounded-full bg-brand-navy/10">
                <motion.span
                  className="absolute inset-0 origin-left rounded-full bg-brand-gold"
                  style={{ scaleX: barScale }}
                />
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
