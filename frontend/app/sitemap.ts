import {MetadataRoute} from 'next'
import {headers} from 'next/headers'

import {sanityFetch} from '@/sanity/lib/live'
import {sitemapData} from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {data} = await sanityFetch({query: sitemapData})
  const host = (await headers()).get('host') as string
  const base = process.env.NEXT_PUBLIC_SITE_URL || `https://${host}`
  const out: MetadataRoute.Sitemap = [
    {url: base, lastModified: new Date(), priority: 1, changeFrequency: 'monthly'},
    {url: `${base}/news`, lastModified: new Date(), priority: 0.7, changeFrequency: 'weekly'},
  ]
  for (const p of data || []) {
    if (!p.slug) continue
    const isPost = p._type === 'post'
    out.push({
      url: `${base}${isPost ? '/posts' : ''}/${p.slug}`,
      lastModified: p._updatedAt || new Date(),
      priority: isPost ? 0.5 : 0.8,
      changeFrequency: isPost ? 'never' : 'monthly',
    })
  }
  return out
}
