import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Roots Dental Speciality Clinic',

  projectId: '0i5dsfwt',
  dataset: 'production',

  // Media = bulk upload library in the Studio menu
  // Gallery multi-select is wired on Service → Gallery images (GalleryImagesInput)
  plugins: [structureTool(), visionTool(), media()],

  schema: {
    types: schemaTypes,
  },
})
