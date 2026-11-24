import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'

import PageBuilderPage from '@/app/components/PageBuilder'
import Sidebar from '@/app/components/Sidebar'
import {sanityFetch} from '@/sanity/lib/live'
import {getPageQuery, pagesSlugs} from '@/sanity/lib/queries'
import {GetPageQueryResult} from '@/sanity.types'
import {sectionFor} from '@/lib/nav'

/**
 * Pages live in Sanity with slugs like "training/state-laws", so one catch-all route serves them all.
 */
export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: pagesSlugs,
    perspective: 'published',
    stega: false,
  })
  return (data || []).map((d: {slug: string | null}) => ({slug: String(d.slug).split('/')}))
}

const toSlug = (parts: string[] | undefined) => (parts || []).map(decodeURIComponent).join('/')

export async function generateMetadata(props: PageProps<'/[...slug]'>): Promise<Metadata> {
  const params = await props.params
  const {data: page} = await sanityFetch({
    query: getPageQuery,
    params: {slug: toSlug(params.slug)},
    stega: false,
  })

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata
}

export default async function Page(props: PageProps<'/[...slug]'>) {
  const params = await props.params
  const slug = toSlug(params.slug)
  const {data: page} = await sanityFetch({query: getPageQuery, params: {slug}})

  if (!page?._id) {
    return notFound()
  }

  const path = `/${slug}`
  const section = sectionFor(path)

  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            {section && section.href !== path && (
              <>
                {' / '}
                <Link href={section.href}>{section.title}</Link>
              </>
            )}
          </nav>
          <h1>{page.heading}</h1>
          {page.subheading && <p className="lead">{page.subheading}</p>}
        </div>
      </div>
      <div className={`wrap layout${section ? '' : ' nosidebar'}`}>
        <Sidebar path={path} />
        <div className="content">
          <PageBuilderPage page={page as GetPageQueryResult} />
        </div>
      </div>
    </>
  )
}
