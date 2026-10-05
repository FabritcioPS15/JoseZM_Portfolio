import { supabaseAdmin } from './supabase'
import type { Section } from './sections'

export type VisibleColumn = 'is_visible' | 'isVisible'

let visibleColumnCache: VisibleColumn | null | undefined

// La tabla `sections` puede llamar a la columna de visibilidad `is_visible`
// (Postgres, ver supabase/schema.sql) o `isVisible` (si la tabla se creó desde
// la API con nombre camelCase). Se detecta una sola vez y se cachea: enviar una
// clave que no existe en la tabla hace fallar TODAS las escrituras.
export async function supabaseVisibleColumn(): Promise<VisibleColumn | null> {
  if (visibleColumnCache !== undefined) return visibleColumnCache
  if (!supabaseAdmin) {
    visibleColumnCache = null
    return null
  }

  for (const column of ['is_visible', 'isVisible'] as const) {
    const { error } = await supabaseAdmin.from('sections').select(column).limit(1)
    if (!error) {
      visibleColumnCache = column
      return column
    }
  }

  visibleColumnCache = null
  return null
}

export function resetVisibleColumnCache() {
  visibleColumnCache = undefined
}

// Fila exacta que espera la tabla, usando el nombre real de la columna de
// visibilidad. Si la columna no existe, se omite en lugar de romper el guardado.
export async function sectionToRow(section: Section) {
  const visibleColumn = await supabaseVisibleColumn()

  const row: Record<string, unknown> = {
    id: section.id,
    title: section.title.trim(),
    icon: section.icon,
    type: section.type,
    link: section.link || '/publicaciones',
    order: Number.isFinite(section.order) ? Math.trunc(section.order) : 0,
    items: section.items,
    updated_at: new Date().toISOString(),
  }

  if (visibleColumn) row[visibleColumn] = section.isVisible !== false

  return row
}

// Traduce los errores de PostgREST a algo que el admin pueda entender.
export function friendlyError(message: string): string {
  const msg = (message || '').toLowerCase()
  if (msg.includes('could not find the') && msg.includes('column')) {
    return 'La tabla "sections" no coincide con el código. Ejecuta supabase/schema.sql en tu base de datos.'
  }
  if (msg.includes('duplicate key')) {
    return 'Ya existe un registro con ese identificador.'
  }
  if (msg.includes('invalid input syntax for type uuid')) {
    return 'Identificador de sección inválido.'
  }
  return message || 'Error desconocido al guardar'
}

// Crea o actualiza la sección. Si PostgREST todavía tiene la caché del esquema
// desactualizada, se limpia y se reintenta una vez.
export async function upsertSection(section: Section) {
  const attempt = async () =>
    supabaseAdmin!
      .from('sections')
      .upsert(await sectionToRow(section), { onConflict: 'id' })
      .select()
      .single()

  let result = await attempt()

  if (result.error?.code === 'PGRST204' || result.error?.code === '42703') {
    resetVisibleColumnCache()
    result = await attempt()
  }

  return result
}