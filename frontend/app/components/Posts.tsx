import Link from 'next/link'

import {sanityFetch} from '@/sanity/lib/live'
import {morePostsQuery} from '@/sanity/lib/queries'
import DateComponent from '@/app/components/Date'

export type PostCardData = {
  _id: string
  title: string
  slug: string
  excerpt?: string | null
  date?: string | null
  categories?: string[] | null
}

export function PostCard({post}: {post: PostCardData}) {
  return (
    <article className="card">
      {post.date && (
        <div className="meta">
          <DateComponent dateString={post.date} />
        </div>
      )}
      <h3>
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h3>
      {post.excerpt && <p>{post.excerpt}</p>}
    </article>
  )
}

export const MorePosts = async ({skip, limit}: {skip: string; limit: number}) => {
  const {data} = await sanityFetch({
    query: morePostsQuery,
    params: {skip, limit},
  })
  const posts = (data || []) as unknown as PostCardData[]
  if (posts.length === 0) return null
  return (
    <div>
      <h2>More news</h2>
      <div className="cards">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}
