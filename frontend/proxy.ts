import {NextResponse, type NextRequest} from 'next/server'

import redirects from './redirects.json'

// ~1,100 permanent redirects from the old WordPress addresses to the new ones.
// (Done here instead of next.config.ts because Vercel limits config redirects to about 1,000.)
const map = redirects as Record<string, string>

export function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl
  const key = pathname.length > 1 ? pathname.replace(/\/+$/, '').toLowerCase() : pathname
  const to = map[key]
  if (to) {
    const url = request.nextUrl.clone()
    const [path, query] = to.split('?')
    url.pathname = path
    url.search = query ? `?${query}` : ''
    return NextResponse.redirect(url, 301)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|images|.*\\..*).*)'],
}
