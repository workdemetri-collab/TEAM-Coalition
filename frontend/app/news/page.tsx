import type {Metadata} from 'next'
import Link from 'next/link'

import {PostCard, type PostCardData} from '@/app/components/Posts'
import {sanityFetch} from '@/sanity/lib/live'
import {newsListQuery} from '@/sanity/lib/queries'

export const metadata: Metadata = {title: 'News'}

const PAGE_SIZE = 12
const CATEGORIES = ['Press Release', 'RHIR', 'Responsibility Challenge', 'NFL', 'MLB', 'MLS', 'NASCAR', 'Anheuser-Busch', 'Aramark', 'Molson Coors']
const YEARS = Array.from({length: 2026 - 2009 + 1}, (_, i) => String(2026 - i))

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || ''

export default async function NewsPage(props: PageProps<'/news'>) {
  const sp = await props.searchParams
  const cat = first(sp.cat)
  const year = /^\d{4}$/.test(first(sp.year)) ? first(sp.year) : ''
  const page = Math.max(1, parseInt(first(sp.page) || '1', 10) || 1)

  const {data} = await sanityFetch({
    query: newsListQuery,
    params: {
      cat,
      from: year ? `${year}-01-01` : '',
      to: year ? `${Number(year) + 1}-01-01` : '',
      start: (page - 1) * PAGE_SIZE,
      end: page * PAGE_SIZE,
    },
  })
  const {total, items} = (data || {total: 0, items: []}) as unknown as {total: number; items: PostCardData[]}
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const href = (p: number, c = cat, y = year) => {
    const q = new URLSearchParams()
    if (c) q.set('cat', c)
    if (y) q.set('year', y)
    if (p > 1) q.set('page', String(p))
    const s = q.toString()
    return `/news${s ? `?${s}` : ''}`
  }

  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <nav className="crumbs">
            <Link href="/">Home</Link>
          </nav>
          <h1>News</h1>
          <p className="lead">Updates from TEAM Coalition, our members and partners.</p>
        </div>
      </div>
      <div className="wrap" style={{paddingBottom: 48}}>
        <div className="tools">
          <div className="chips">
            <Link href={href(1, '', year)} className={cat ? '' : 'on'}>
              All
            </Link>
            {CATEGORIES.map((c) => (
              <Link key={c} href={href(1, c, year)} className={cat === c ? 'on' : ''}>
                {c}
              </Link>
            ))}
          </div>
          <form className="newsform" action="/news">
            {cat && <input type="hidden" name="cat" value={cat} />}
            <select className="field" name="year" defaultValue={year} aria-label="Year">
              <option value="">All years</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <button className="btn alt" type="submit">
              Filter
            </button>
          </form>
        </div>
        {items.length === 0 ? (
          <p>No news found for that filter.</p>
        ) : (
          <div className="cards">
            {items.map((p) => (
              <PostCard key={p._id} post={p} />
            ))}
          </div>
        )}
        {pages > 1 && (
          <div className="pager">
            {page > 1 && (
              <Link className="btn alt" href={href(page - 1)}>
                ← Newer
              </Link>
            )}
            <span>
              Page {page} of {pages}
            </span>
            {page < pages && (
              <Link className="btn alt" href={href(page + 1)}>
                Older →
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  )
}
