# Portfolio — José Luis Zelada

Sitio web personal y portafolio profesional de **José Luis Zelada**, con publicaciones, investigaciones y artículos gestionados desde un panel de administración.

**Demo:** [joseluiszelada.pe](https://joseluiszelada.pe)

## Descripción

Sitio que muestra el trabajo académico y profesional en secciones de tipo catálogo (publicaciones, investigaciones y artículos), con fichas de detalle, portadas de libros, contenido relacionado y páginas legales.

Incluye el panel `/admin` para crear, editar y ordenar contenido sin tocar código: texto enriquecido, imágenes, fechas y enlaces externos, todo persistido en **Supabase**.

## Características

- Secciones configurables: publicaciones, investigaciones y artículos.
- Páginas de detalle con texto enriquecido, etiquetas, fecha y tiempo de lectura.
- Diseño tipo catálogo para libros con portada propia o generada.
- Contenido relacionado en línea y en modal (popup).
- Panel admin con sesión por contraseña, editor TipTap, drag & drop y carga de imágenes a Supabase Storage.
- SEO: `sitemap.xml`, `robots.txt` y metadatos por página.

## Stack tecnológico

| Capa | Tecnologías |
|------|-------------|
| Framework | Next.js 16 (App Router) · React 19 · TypeScript |
| Estilos | Tailwind CSS v4 |
| Editor | TipTap · dnd-kit · react-calendar |
| Backend | Supabase (PostgreSQL + Storage) |
| Analíticas | Vercel Analytics |

## Estructura

```
app/
  page.tsx              # Landing principal
  publicaciones/        # Listado y detalle ([id])
  investigaciones/       # Listado y detalle ([id])
  articulos/            # Listado y detalle ([id])
  admin/                # Panel de administración
  api/                  # Auth, secciones y subida de imágenes
components/             # UI (Header, cards, editores, modals…)
lib/                    # Utilidades: secciones, auth, supabase
supabase/schema.sql     # Esquema de la base de datos
```
