import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID!,
  dataset: process.env.VITE_SANITY_DATASET!,
  apiVersion: process.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
  token: process.env.VITE_SANITY_TOKEN,
})

async function publishAllDocuments() {
  console.log('🚀 Publishing all documents...\n')

  try {
    // Get all draft documents
    const drafts = await client.fetch(`*[_id in path("drafts.**")]`)
    
    console.log(`📄 Found ${drafts.length} draft documents\n`)

    if (drafts.length === 0) {
      console.log('✅ No drafts to publish!')
      return
    }

    // Publish each draft
    for (const draft of drafts) {
      const publishedId = draft._id.replace('drafts.', '')
      
      try {
        // Create a published version
        await client
          .patch(publishedId)
          .set({ ...draft, _id: publishedId })
          .commit()
        
        console.log(`✅ Published: ${draft._type} - ${draft.title || draft.name || publishedId}`)
      } catch (error) {
        console.error(`❌ Failed to publish ${publishedId}:`, error)
      }
    }

    console.log('\n✅ All documents published successfully!')
  } catch (error) {
    console.error('❌ Error publishing documents:', error)
    process.exit(1)
  }
}

publishAllDocuments()
