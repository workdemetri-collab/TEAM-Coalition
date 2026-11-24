import {defineField, defineType} from 'sanity'
import {CodeBlockIcon} from '@sanity/icons'

/**
 * "HTML block": used for content that Portable Text can't express, such as tables, buttons,
 * FAQ accordions, staff cards and video embeds imported from the old WordPress site.
 */
export const htmlEmbed = defineType({
  name: 'htmlEmbed',
  title: 'HTML block',
  type: 'object',
  icon: CodeBlockIcon,
  fields: [defineField({name: 'html', title: 'HTML', type: 'text', rows: 12})],
  preview: {
    select: {html: 'html'},
    prepare({html}) {
      return {title: 'HTML block', subtitle: String(html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80)}
    },
  },
})
