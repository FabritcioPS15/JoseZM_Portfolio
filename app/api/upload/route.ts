import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

const BUCKET = 'uploads'
const MAX_SIZE = 5 * 1024 * 1024 // 5 MB

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
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Solo se permiten imágenes' }, { status: 400 })
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'La imagen supera el máximo de 5 MB' }, { status: 400 })
  }

  try {
    const bytes = Buffer.from(await file.arrayBuffer())
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '')
    const path = `articles/${crypto.randomUUID()}.${ext || 'jpg'}`

    // Intentar subir directamente al bucket
    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(path, bytes, { contentType: file.type, upsert: true })

    if (uploadError) {
      console.error('[Upload Error]', uploadError)

      // Si el bucket no fue encontrado, intentamos crearlo y reintentar
      if (uploadError.message?.toLowerCase().includes('bucket not found') || (uploadError as { statusCode?: string })?.statusCode === '404') {
        const { error: createError } = await supabaseAdmin.storage.createBucket(BUCKET, {
          public: true,
        })
        if (createError && !createError.message?.toLowerCase().includes('already exists')) {
          console.error('[Create Bucket Error]', createError)
          return NextResponse.json({ error: createError.message }, { status: 500 })
        }

        const { error: retryError } = await supabaseAdmin.storage
          .from(BUCKET)
          .upload(path, bytes, { contentType: file.type, upsert: true })

        if (retryError) {
          console.error('[Retry Upload Error]', retryError)
          return NextResponse.json({ error: retryError.message }, { status: 500 })
        }
      } else {
        return NextResponse.json({ error: uploadError.message }, { status: 500 })
      }
    }

    const { data: pub } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path)
    return NextResponse.json({ url: pub.publicUrl })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error interno al subir imagen'
    console.error('[Upload Fatal Error]', err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
