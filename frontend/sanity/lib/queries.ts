import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
  categories,
`

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ...,
        button {
          ...,
          ${linkFields}
        }
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

// ---- TEAM Coalition additions ----

export const latestPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    _id,
    "title": coalesce(title, "Untitled"),
    "slug": slug.current,
    excerpt,
    "date": coalesce(date, _updatedAt)
  }
`)

export const newsListQuery = defineQuery(`
  {
    "total": count(*[_type == "post" && defined(slug.current) && ($cat == "" || $cat in categories) && ($from == "" || date >= $from) && ($to == "" || date < $to)]),
    "items": *[_type == "post" && defined(slug.current) && ($cat == "" || $cat in categories) && ($from == "" || date >= $from) && ($to == "" || date < $to)] | order(date desc, _updatedAt desc) [$start...$end] {
      _id,
      "title": coalesce(title, "Untitled"),
      "slug": slug.current,
      excerpt,
      "date": coalesce(date, _updatedAt),
      categories
    }
  }
`)

export const searchQuery = defineQuery(`
  *[_type in ["page", "post"] && defined(slug.current) && (coalesce(title, name) match $q || pt::text(content) match $q || pt::text(pageBuilder[_type == "infoSection"][0].content) match $q)] | order(_type asc, date desc) [0...40] {
    _id,
    _type,
    "title": coalesce(title, name),
    "slug": slug.current,
    date,
    "snippet": coalesce(excerpt, pt::text(pageBuilder[_type == "infoSection"][0].content[0...3]))
  }
`)
