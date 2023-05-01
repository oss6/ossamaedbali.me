import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { codeInput } from '@sanity/code-input'
import { latexInput } from 'sanity-plugin-latex-input'
import post from './schemas/post'
import author from './schemas/author'
import category from './schemas/category'
import note from './schemas/note'
import topic from './schemas/topic'
import blockContent from './schemas/blockContent'

export default defineConfig({
  name: 'default',
  title: 'Personal blog',
  projectId: 'stxb7yu3',
  dataset: 'production',
  plugins: [
    deskTool(),
    codeInput(),
    latexInput()
  ],
  schema: {
    types: [
      post,
      author,
      category,
      note,
      topic,
      blockContent
    ]
  }
})
