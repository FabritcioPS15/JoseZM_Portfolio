import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

const BUCKET = 'uploads'
const MAX_SIZE = 5 * 1024 * 1024 // 5 MB

// Solo formatos de imagen reales. SVG queda fuera a propósito: es XML ejecutable
// y, en un bucket público, servirlo permite XSS almacenado.
const CONTENT_TYPE: Record<string, string> = {
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  avif: 'image/avif',
}

// Detecta el formato por los primeros bytes. El `file.type` del navegador lo
// controla el cliente, así que no sirve como única validación.
function sniffFormat(bytes: Buffer): string | null {
  if (bytes.length < 12) return null
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'jpeg'
  if (
    bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  )
    return 'png'
  if (bytes.subarray(0, 3).toString('ascii') === 'GIF') return 'gif'
  if (
    bytes.subarray(0, 4).toString('ascii') === 'RIFF' &&
    bytes.subarray(8, 12).toString('ascii') === 'WEBP'
  )
    return 'webp'
  if (bytes.subarray(4, 8).toString('ascii') === 'ftyp') {
    const brand = bytes.subarray(8, 12).toString('ascii').toLowerCase()
    if (brand.startsWith('avif') || brand.startsWith('avis')) return 'avif'
  }
  return null
}

const EXTENSION: Record<string, string> = {
  jpeg: 'jpg',
  png: 'png',
  gif: 'gif',
  webp: 'webp',
  avif: 'avif',
}

export async function POST(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase no está configurado' }, { status: 500 })
  }

  let file: File | null = null
  try {
    const formData = await request.formData()
    const value = formData.get('file')
    if (value instanceof File) file = value
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 })
  }

  if (!file) {
    return NextResponse.json({ error: 'No se recibió ningún archivo' }, { status: 400 })
  }
  if (file.size === 0) {
    return NextResponse.json({ error: 'El archivo está vacío' }, { status: 400 })
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: 'La imagen supera el máximo de 5 MB. Optimízala e inténtalo de nuevo.' },
      { status: 400 }
    )
  }

  try {
    const bytes = Buffer.from(await file.arrayBuffer())
    const format = sniffFormat(bytes)

    // El nombre y el content-type los envía el cliente; la decisión se toma
    // sobre los bytes reales del archivo.
    if (!format) {
      const rawExt = (file.name.split('.').pop() || '').toLowerCase()
      const hint =
        rawExt === 'svg' || rawExt === 'svgz'
          ? ' Los SVG no se permiten por seguridad.'
          : ''
      return NextResponse.json(
        { error: `El archivo no es una imagen válida (JPG, PNG, WebP, GIF o AVIF).${hint}` },
        { status: 400 }
      )
    }

    const contentType = CONTENT_TYPE[format]
    const path = `articles/${crypto.randomUUID()}.${EXTENSION[format]}`
    const options = { contentType, upsert: true, cacheControl: '31536000' }

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(path, bytes, options)

    if (uploadError) {
      const notFound =
        uploadError.message?.toLowerCase().includes('bucket not found') ||
        (uploadError as { statusCode?: string })?.statusCode === '404'

      // Si el bucket aún no existe, se crea y se reintenta una vez.
      if (!notFound) {
        return NextResponse.json({ error: uploadError.message }, { status: 500 })
      }

      const { error: createError } = await supabaseAdmin.storage.createBucket(BUCKET, {
        public: true,
      })
      if (createError && !createError.message?.toLowerCase().includes('already exists')) {
        return NextResponse.json({ error: createError.message }, { status: 500 })
      }

      const { error: retryError } = await supabaseAdmin.storage
        .from(BUCKET)
        .upload(path, bytes, options)

      if (retryError) {
        return NextResponse.json({ error: retryError.message }, { status: 500 })
      }
    }

    const { data: pub } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path)
    return NextResponse.json({ url: pub.publicUrl })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error interno al subir la imagen'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}