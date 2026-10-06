export function readingTime(content?: string): string {
  if (!content) return ''

  const text = content
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/gi, ' ')
    .trim()

  const words = text ? text.split(/\s+/).length : 0
  if (words === 0) return ''

  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min de lectura`
}
