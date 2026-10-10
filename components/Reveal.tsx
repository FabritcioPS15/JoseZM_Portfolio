'use client'

import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

const variants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
}

/** Envoltorio de entrada: aparece con un fade + subida al entrar en pantalla. */
export default function Reveal({
  children,
  className,
  delay = 0,
  amount = 0.15,
}: {
  children: ReactNode
  className?: string
  delay?: number
  amount?: number
}) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
