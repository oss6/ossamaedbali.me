import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
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
    structureTool(),
    visionTool(),
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
