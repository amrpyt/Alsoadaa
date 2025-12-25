import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { assist } from '@sanity/assist'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'السعداء - CMS',

  projectId: 'wptd4h7v',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('📂 Content Management')
          .items([
            // ============================================
            // 🏠 MAIN PAGES (Singletons)
            // ============================================
            S.listItem()
              .title('🏠 Home Page')
              .child(
                S.document()
                  .schemaType('pageCentralized')
                  .documentId('page-home') // Points to existing document
                  .title('Home Page')
              ),
            S.listItem()
              .title('ℹ️ About Page')
              .child(
                S.document()
                  .schemaType('pageCentralized')
                  .documentId('page-about') // Points to existing document
                  .title('About Page')
              ),
            S.divider(),

            // ============================================
            // 📦 COLLECTIONS
            // ============================================
            S.listItem()
              .title('🍊 Products')
              .schemaType('productCentralized')
              .child(
                S.documentTypeList('productCentralized')
                  .title('All Products')
                  .defaultOrdering([{ field: 'titleEn', direction: 'asc' }])
              ),
            S.listItem()
              .title('⚙️ Services')
              .schemaType('serviceCentralized')
              .child(
                S.documentTypeList('serviceCentralized')
                  .title('All Services')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),
            S.listItem()
              .title('📄 Other Pages')
              .schemaType('pageCentralized')
              .child(
                S.documentTypeList('pageCentralized')
                  .title('Generic Pages')
                  .filter('_type == "pageCentralized" && !(_id in ["page-home", "page-about", "drafts.page-home", "drafts.page-about"])')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),
            S.divider(),

            // ============================================
            // 🌍 TRANSLATIONS & CALENDAR
            // ============================================
            S.listItem()
              .title('🌍 Translations')
              .schemaType('siteTranslationCentralized')
              .child(
                S.documentTypeList('siteTranslationCentralized')
                  .title('All Translations')
                  .defaultOrdering([{ field: 'category', direction: 'asc' }, { field: 'key', direction: 'asc' }])
              ),
            S.listItem()
              .title('📅 Calendar Events')
              .schemaType('calendarEventCentralized')
              .child(
                S.documentTypeList('calendarEventCentralized')
                  .title('Calendar Events')
                  .defaultOrdering([{ field: 'month', direction: 'asc' }])
              ),
            S.divider(),

            // ============================================
            // 📥 FORM SUBMISSIONS
            // ============================================
            S.listItem()
              .title('📥 Form Submissions')
              .icon(() => '📨')
              .child(
                S.list()
                  .title('Form Submissions')
                  .items([
                    S.listItem()
                      .title('🆕 New')
                      .child(
                        S.documentTypeList('formSubmission')
                          .title('New Submissions')
                          .filter('_type == "formSubmission" && status == "new"')
                          .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('👀 Reviewed')
                      .child(
                        S.documentTypeList('formSubmission')
                          .title('Reviewed')
                          .filter('_type == "formSubmission" && status == "reviewed"')
                      ),
                    S.listItem()
                      .title('✅ Responded')
                      .child(
                        S.documentTypeList('formSubmission')
                          .title('Responded')
                          .filter('_type == "formSubmission" && status == "responded"')
                      ),
                    S.listItem()
                      .title('📁 Archived')
                      .child(
                        S.documentTypeList('formSubmission')
                          .title('Archived')
                          .filter('_type == "formSubmission" && status == "archived"')
                      ),
                    S.divider(),
                    S.listItem()
                      .title('📋 All Submissions')
                      .child(
                        S.documentTypeList('formSubmission')
                          .title('All Form Submissions')
                          .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
                      ),
                  ])
              ),
            S.divider(),

            // ============================================
            // ⚙️ GLOBAL SETTINGS
            // ============================================
            S.listItem()
              .title('⚙️ Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
          ])
    }),
    visionTool(),
    assist(),
  ],

  schema: {
    types: schemaTypes,
  },
})
