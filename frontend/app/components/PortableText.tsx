/**
 * Renders Portable Text (the rich text stored in Sanity).
 * Includes support for the `htmlEmbed` block used for tables, buttons, FAQs, staff cards and videos
 * that were imported from the old WordPress site.
 */
import {isImageWithAsset} from '@sanity/image-url'
import {PortableText, type PortableTextComponents, type PortableTextBlock} from 'next-sanity'

import ResolvedLink from '@/app/components/ResolvedLink'
import Image from '@/app/components/SanityImage'
import {rewriteMedia} from '@/lib/media'

const components: PortableTextComponents = {
  types: {
    image: ({value}) => {
      if (!isImageWithAsset(value)) {
        return null
      }
      return (
        <figure className="my-8">
          <Image value={value} alt={value.alt || ''} width={672} mode="cover" className="rounded-sm" />
        </figure>
      )
    },
    htmlEmbed: ({value}: {value: {html?: string}}) => (
      <div className="embed" dangerouslySetInnerHTML={{__html: rewriteMedia(value?.html || '')}} />
    ),
  },
  marks: {
    link: ({children, value: link}) => {
      return <ResolvedLink link={link}>{children}</ResolvedLink>
    },
  },
}

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string
  value: PortableTextBlock[]
}) {
  return (
    <div className={`prose ${className ?? ''}`}>
      <PortableText components={components} value={value} />
    </div>
  )
}
