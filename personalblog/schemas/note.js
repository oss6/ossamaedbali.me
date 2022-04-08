export default {
  name: 'note',
  title: 'Note',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [{type: 'reference', to: {type: 'note'}}],
    },
    {
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{type: 'reference', to: {type: 'topic'}}],
    },
  ],
}
