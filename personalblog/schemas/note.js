import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'note',
  title: 'Note',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'note'}})],
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'topic'}})],
    }),
  ],
})
