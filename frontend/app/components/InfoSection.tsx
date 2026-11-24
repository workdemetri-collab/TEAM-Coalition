import {type PortableTextBlock} from 'next-sanity'

import PortableText from '@/app/components/PortableText'
import {InfoSection} from '@/sanity.types'

type InfoProps = {
  block: InfoSection
  index: number
  // Needed if you want to createDataAttributes to do non-text overlays in Presentation (Visual Editing)
  pageId: string
  pageType: string
}

export default function CTA({block}: InfoProps) {
  return (
    <section className="mb-8">
      {block?.heading && <h2>{block.heading}</h2>}
      {block?.subheading && <p className="meta">{block.subheading}</p>}
      {block?.content?.length ? <PortableText value={block.content as PortableTextBlock[]} /> : null}
    </section>
  )
}
