import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'radumitrea-portfolio',
  title: 'Radu Mitrea — Portfolio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Posts')
              .child(S.documentList().title('All Posts').filter('_type == "post"')),
            S.listItem()
              .title('Authors')
              .child(S.documentList().title('All Authors').filter('_type == "author"')),
            S.listItem()
              .title('Categories')
              .child(S.documentList().title('All Categories').filter('_type == "category"')),
          ]),
    }),
    visionTool(),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})
