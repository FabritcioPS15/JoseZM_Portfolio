'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/** Reinicia el scroll al inicio cada vez que cambia la ruta (cambio de página). */
export default function ScrollToTopOnNavigate() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
