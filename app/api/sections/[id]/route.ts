import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { isAuthenticated } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'
import { upsertSection, friendlyError } from '@/lib/sectionsAdmin'
import { normalizeSection } from '@/lib/sections'

type Params = { params: Promise<{ id: string }> }

// Upsert: crea o actualiza la sección con ese id (el editor siempre envía el id).
export async function PUT(request: Request, { params }: Params) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase no está configurado' }, { status: 500 })
  }

  const { id } = await params

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 })
  }

  const section = normalizeSection(body)
  if (!section || !section.title?.trim()) {
    return NextResponse.json({ error: 'La sección debe tener un título' }, { status: 400 })
  }
  section.id = id

  const { data, error } = await upsertSection(section)

  if (error) {
    return NextResponse.json({ error: friendlyError(error.message) }, { status: 500 })
  }

  await revalidatePath('/', 'layout')

  return NextResponse.json({ section: normalizeSection(data) })
}

export async function DELETE(request: Request, { params }: Params) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase no está configurado' }, { status: 500 })
  }

  const { id } = await params

  const { data, error } = await supabaseAdmin
    .from('sections')
    .delete()
    .eq('id', id)
    .select('id')

  if (error) {
    return NextResponse.json({ error: friendlyError(error.message) }, { status: 500 })
  }

  if (!data || data.length === 0) {
    return NextResponse.json(
      { error: 'La sección ya no existe. Recarga la página para ver el estado actual.' },
      { status: 404 }
    )
  }

  await revalidatePath('/', 'layout')

  return NextResponse.json({ ok: true })
}