import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      description:
        'Use existing site slugs: microscopic-dentistry, root-canal-treatments, restorative-dentistry, cosmetic-dentistry',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short description',
      type: 'text',
      rows: 3,
      description: 'Shown on the homepage service card',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 5,
      description: 'Shown on the service detail page',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first on the homepage',
      initialValue: 0,
    }),
    defineField({
      name: 'images',
      title: 'Gallery images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      media: 'images.0',
      order: 'order',
    },
    prepare({title, subtitle, media, order}) {
      return {
        title: title || 'Untitled service',
        subtitle: `${subtitle || 'no-slug'}${order != null ? ` · #${order}` : ''}`,
        media,
      }
    },
  },
})
