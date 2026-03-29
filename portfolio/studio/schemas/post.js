import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Describe the image for screen readers and SEO.',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
        }),
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      description: 'A short summary shown on listing pages and in social shares.',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal',  value: 'normal'  },
            { title: 'H2',      value: 'h2'      },
            { title: 'H3',      value: 'h3'      },
            { title: 'H4',      value: 'h4'      },
            { title: 'Quote',   value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet',  value: 'bullet'  },
            { title: 'Number',  value: 'number'  },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Em',     value: 'em'     },
              { title: 'Code',   value: 'code'   },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  { title: 'URL',   name: 'href',  type: 'url'     },
                  { title: 'Open in new tab', name: 'blank', type: 'boolean' },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt',     type: 'string', title: 'Alt text' }),
            defineField({ name: 'caption', type: 'string', title: 'Caption'  }),
          ],
        },
        {
          type: 'code',
          options: { withFilename: true },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title:    'title',
      author:   'author.name',
      media:    'mainImage',
      date:     'publishedAt',
    },
    prepare({ title, author, media, date }) {
      const dateStr = date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Draft'
      return {
        title,
        subtitle: `${author || 'Unknown author'} · ${dateStr}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
