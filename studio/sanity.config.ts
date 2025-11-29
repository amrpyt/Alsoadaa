import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {assist} from '@sanity/assist'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Alsoodaa',

  projectId: 'wptd4h7v',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // ✨ NEW: Centralized Products (recommended!)
            S.listItem()
              .title('🍊 Products')
              .schemaType('productCentralized')
              .child(
                S.documentTypeList('productCentralized')
                  .title('All Products')
                  .defaultOrdering([{field: 'titleEn', direction: 'asc'}])
              ),
            S.divider(),
            // 📦 OLD: Per-language products (legacy - will be removed)
            S.listItem()
              .title('📦 Products (Old - Legacy)')
              .child(
                S.list()
                  .title('Products by Language')
                  .items([
                    S.listItem()
                      .title('Arabic (العربية)')
                      .child(
                        S.documentTypeList('product')
                          .title('Arabic Products')
                          .filter('_type == "product" && language == "ar"')
                      ),
                    S.listItem()
                      .title('English')
                      .child(
                        S.documentTypeList('product')
                          .title('English Products')
                          .filter('_type == "product" && language == "en"')
                      ),
                    S.listItem()
                      .title('Russian (Русский)')
                      .child(
                        S.documentTypeList('product')
                          .title('Russian Products')
                          .filter('_type == "product" && language == "ru"')
                      ),
                  ])
              ),
            S.listItem()
              .title('Pages')
              .child(
                S.list()
                  .title('Pages by Language')
                  .items([
                    S.listItem()
                      .title('Arabic (العربية)')
                      .child(
                        S.documentTypeList('page')
                          .title('Arabic Pages')
                          .filter('_type == "page" && language == "ar"')
                      ),
                    S.listItem()
                      .title('English')
                      .child(
                        S.documentTypeList('page')
                          .title('English Pages')
                          .filter('_type == "page" && language == "en"')
                      ),
                    S.listItem()
                      .title('Russian (Русский)')
                      .child(
                        S.documentTypeList('page')
                          .title('Russian Pages')
                          .filter('_type == "page" && language == "ru"')
                      ),
                  ])
              ),
            S.listItem()
              .title('Services')
              .child(
                S.list()
                  .title('Services by Language')
                  .items([
                    S.listItem()
                      .title('Arabic (العربية)')
                      .child(
                        S.documentTypeList('service')
                          .title('Arabic Services')
                          .filter('_type == "service" && language == "ar"')
                      ),
                    S.listItem()
                      .title('English')
                      .child(
                        S.documentTypeList('service')
                          .title('English Services')
                          .filter('_type == "service" && language == "en"')
                      ),
                    S.listItem()
                      .title('Russian (Русский)')
                      .child(
                        S.documentTypeList('service')
                          .title('Russian Services')
                          .filter('_type == "service" && language == "ru"')
                      ),
                  ])
              ),
            S.divider(),
            S.documentTypeListItem('calendarEvent').title('Calendar Events'),
            S.divider(),
            S.documentTypeListItem('formSubmission').title('Form Submissions'),
            S.divider(),
            S.listItem()
              .title('Site Translations')
              .child(
                S.list()
                  .title('Translations by Language')
                  .items([
                    S.listItem()
                      .title('Arabic (العربية)')
                      .child(
                        S.documentTypeList('siteTranslation')
                          .title('Arabic Translations')
                          .filter('_type == "siteTranslation" && language == "ar"')
                      ),
                    S.listItem()
                      .title('English')
                      .child(
                        S.documentTypeList('siteTranslation')
                          .title('English Translations')
                          .filter('_type == "siteTranslation" && language == "en"')
                      ),
                    S.listItem()
                      .title('Russian (Русский)')
                      .child(
                        S.documentTypeList('siteTranslation')
                          .title('Russian Translations')
                          .filter('_type == "siteTranslation" && language == "ru"')
                      ),
                  ])
              ),
          ])
    }),
    visionTool(),
    assist({
      translate: {
        document: {
          languageField: 'language',
          documentTypes: ['product', 'page', 'service', 'siteTranslation'],
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
