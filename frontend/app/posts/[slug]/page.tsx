import {isImageWithAsset} from '@sanity/image-url'
import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'
import {type PortableTextBlock} from 'next-sanity'
import {Suspense} from 'react'

import Link from 'next/link'
import DateComponent from '@/app/components/Date'
import {MorePosts} from '@/app/components/Posts'
import PortableText from '@/app/components/PortableText'
import Image from '@/app/components/SanityImage'
import {sanityFetch} from '@/sanity/lib/live'
import {postPagesSlugs, postQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: postPagesSlugs,
    // Use the published perspective in generateStaticParams
    perspective: 'published',
    stega: false,
  })
  return (data || []).slice(0, 60)
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(
  props: PageProps<'/posts/[slug]'>,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params
  const {data: post} = await sanityFetch({
    query: postQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  })
  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(post?.coverImage)

  return {
    authors:
      post?.author?.firstName && post?.author?.lastName
        ? [{name: `${post.author.firstName} ${post.author.lastName}`}]
        : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata
}

export default async function PostPage(props: PageProps<'/posts/[slug]'>) {
  const params = await props.params
  const [{data: post}] = await Promise.all([sanityFetch({query: postQuery, params})])

  if (!post?._id) {
    return notFound()
  }
  const categories = ((post as unknown as {categories?: string[] | null}).categories || []).slice(0, 3)

  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <Link href="/news">News</Link>
          </nav>
          <div className="meta">
            <DateComponent dateString={post.date} />
            {categories.length > 0 && ` · ${categories.join(', ')}`}
          </div>
          <h1>{post.title}</h1>
        </div>
      </div>
      <div className="narrow">
        <article style={{padding: '32px 0'}}>
          {isImageWithAsset(post.coverImage) && (
            <Image
              value={post.coverImage}
              alt={post.coverImage.alt || ''}
              className="rounded-sm w-full"
              width={1024}
              height={538}
              mode="cover"
            />
          )}
          {post.content?.length ? <PortableText value={post.content as PortableTextBlock[]} /> : null}
        </article>
        <p>
          <Link className="btn alt" href="/news">
            ← Back to all news
          </Link>
        </p>
      </div>
      <div className="band">
        <div className="wrap">
          <Suspense>
            <MorePosts skip={post._id} limit={3} />
          </Suspense>
        </div>
      </div>
    </>
  )
}
