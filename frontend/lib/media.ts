// Photos and PDFs from the old WordPress site are still loaded from there.
// When teamcoalition.org is pointed at the new site, keep the old site on another address
// (for example https://old.teamcoalition.org) and set NEXT_PUBLIC_MEDIA_BASE to it in Vercel.
export const MEDIA_BASE = (process.env.NEXT_PUBLIC_MEDIA_BASE || 'https://teamcoalition.org').replace(/\/$/, '')

export const media = (path: string) => `${MEDIA_BASE}${path}`

/** Point /wp-content/uploads/... and /documents/... URLs inside imported HTML at the media host. */
export function rewriteMedia(html: string): string {
  return html.replace(/(["'(])(\/(?:wp-content\/uploads|documents)\/)/g, (_m, q: string, p: string) => `${q}${MEDIA_BASE}${p}`)
}
