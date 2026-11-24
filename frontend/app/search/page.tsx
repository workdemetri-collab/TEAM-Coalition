import type {Metadata} from 'next'
import Link from 'next/link'

import {sanityFetch} from '@/sanity/lib/live'
import {searchQuery} from '@/sanity/lib/queries'

export const metadata: Metadata = {title: 'Search'}

type Hit = {_id: string; _type: 'page' | 'post'; title: string; slug: string; snippet?: string | null}

export default async function SearchPage(props: PageProps<'/search'>) {
  const sp = await props.searchParams
  const raw = (Array.isArray(sp.q) ? sp.q[0] : sp.q) || ''
  const words = raw.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length > 1)
  let hits: Hit[] = []
  if (words.length) {
    const {data} = await sanityFetch({query: searchQuery, params: {q: words.map((w) => `${w}*`).join(' ')}})
    hits = (data || []) as unknown as Hit[]
  }
  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <nav className="crumbs">
            <Link href="/">Home</Link>
          </nav>
          <h1>Search</h1>
          <form action="/search" role="search">
            <input type="search" name="q" defaultValue={raw} placeholder="Search the whole site" aria-label="Search the site" />
          </form>
        </div>
      </div>
      <div className="wrap" style={{padding: '24px 20px 48px'}}>
        {words.length > 0 && hits.length === 0 && <p>No results.</p>}
        <ul className="plain">
          {hits.map((h) => (
            <li key={h._id}>
              <Link href={h._type === 'post' ? `/posts/${h.slug}` : `/${h.slug}`}>{h.title}</Link>
              {h.snippet && <small>{h.snippet.slice(0, 150)}</small>}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
