# Migration Scripts

This directory contains scripts for migrating data to Sanity CMS.

## migrate-to-sanity.ts

Migrates mock data from `src/lib/mockData.ts` to Sanity CMS.

### Prerequisites

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables in `.env.local`:**
   ```env
   VITE_SANITY_PROJECT_ID=your-project-id
   VITE_SANITY_DATASET=production
   VITE_SANITY_TOKEN=your-write-token
   VITE_SANITY_API_VERSION=2024-01-01
   VITE_SANITY_USE_CDN=true
   ```

   **How to get your Sanity token:**
   - Go to https://www.sanity.io/manage
   - Select your project
   - Go to "API" → "Tokens"
   - Click "Add API token"
   - Give it a name (e.g., "Migration Script")
   - Set permissions to "Editor" or "Administrator"
   - Copy the token and add it to `.env.local`

### Usage

Run the migration script:

```bash
npm run migrate
```

### What it does

1. **Imports Products**: Creates product documents in Arabic (ar) from mockData.ts
2. **Uploads Images**: Downloads external images and uploads local images to Sanity assets
3. **Creates Pages**: Sets up initial page content (About, Contact) in Arabic
4. **Creates Services**: Adds service documents in Arabic

### After Migration

1. **Verify Data**: Open Sanity Studio and check that all data was imported correctly
2. **Translate Content**: Use AI Assist in Sanity Studio to translate products to English and Russian
   - Open a product document
   - Click "Translate" button (AI Assist feature)
   - Select target language (English or Russian)
   - Review and adjust the translation
   - Save the translated document
3. **Link Translations**: Ensure translated documents reference the original Arabic document via `originalDocument` field
4. **Test Application**: Run the application and verify content displays correctly in all languages

### Troubleshooting

**Error: Missing environment variables**
- Make sure all required variables are set in `.env.local`
- Restart your terminal/IDE after adding variables

**Error: Failed to upload image**
- Check that the image URL is accessible
- For local images, verify they exist in the `/public` directory
- Check your internet connection for external URLs

**Error: Permission denied**
- Verify your Sanity token has write permissions
- Check that you're using the correct project ID and dataset

**Error: Document already exists**
- If you need to re-run the migration, delete existing documents in Sanity Studio first
- Or modify the script to update existing documents instead of creating new ones

### Notes

- The script creates documents with Arabic (ar) as the default language
- Images are uploaded to Sanity's asset CDN
- Product slugs are suffixed with language code (e.g., `navel-orange-ar`)
- All data is created in the specified dataset (usually `production`)
