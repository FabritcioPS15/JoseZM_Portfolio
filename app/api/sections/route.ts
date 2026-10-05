import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { isAuthenticated } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'
import { sectionToRow, friendlyError } from '@/lib/sectionsAdmin'
import { normalizeSection, newId, type Section } from '@/lib/sections'

// Solo el panel de administración necesita el listado completo (incluye
// secciones ocultas y el contenido de los artículos). El sitio público usa
// lib/sections.ts, así que aquí basta con exigir sesión.
export async function GET(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ sections: [] })
  }

  const { data, error } = await supabaseAdmin
    .from('sections')
    .select('*')
    .order('order', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data || data.length === 0) {
    return NextResponse.json({ sections: [] })
  }

  const sections = (data ?? [])
    .map(normalizeSection)
    .filter((s): s is Section => s !== null)

  return NextResponse.json({ sections })
}

// Crea una sección nueva. Si viene sin id, se genera en el servidor.
export async function POST(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase no está configurado' }, { status: 500 })
  }

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
  if (!body.id) section.id = newId()

  const { data, error } = await supabaseAdmin
    .from('sections')
    .insert(await sectionToRow(section))
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: friendlyError(error.message) }, { status: 500 })
  }

  await revalidatePath('/', 'layout')

  return NextResponse.json({ section: normalizeSection(data) }, { status: 201 })
}