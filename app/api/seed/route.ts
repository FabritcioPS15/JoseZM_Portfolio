import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { isAuthenticated } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'
import { seedSections } from '@/lib/seedData'
import { sectionToRow, friendlyError } from '@/lib/sectionsAdmin'
import type { Section } from '@/lib/sections'

// Rellena la base con las secciones de demostración. Es una escritura, así que
// va por POST y con sesión: antes un GET sin autenticación podía sobrescribir
// las secciones `seed-*`.
export async function POST(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase no configurado' }, { status: 500 })
  }

  const rows = []
  for (const section of seedSections as Section[]) {
    rows.push(await sectionToRow({ ...section, isVisible: section.isVisible !== false }))
  }

  const { data, error } = await supabaseAdmin
    .from('sections')
    .upsert(rows, { onConflict: 'id' })
    .select('id')

  if (error) {
    return NextResponse.json({ error: friendlyError(error.message) }, { status: 500 })
  }

  await revalidatePath('/', 'layout')

  return NextResponse.json({ success: true, seeded: data?.length ?? 0 })
}