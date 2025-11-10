import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { translations } from '../src/lib/translations';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID!,
  dataset: process.env.VITE_SANITY_DATASET!,
  apiVersion: process.env.VITE_SANITY_API_VERSION!,
  token: process.env.VITE_SANITY_TOKEN!,
  useCdn: false,
});

// Map translation keys to categories
const categorizeKey = (key: string): string => {
  if (key.startsWith('products') || key.includes('Product') || ['citrus', 'vegetables', 'berries', 'lemons', 'grapes'].includes(key)) {
    return 'categories';
  }
  if (key.startsWith('season')) {
    return 'seasons';
  }
  if (key.startsWith('hero')) {
    return 'hero';
  }
  if (key.includes('nav') || ['products', 'seasonalCalendar', 'processing', 'aboutUs', 'contact', 'requestQuote'].includes(key)) {
    return 'navigation';
  }
  if (key.includes('contact') || key.includes('email') || key.includes('phone')) {
    return 'contact';
  }
  if (key.includes('calendar') || ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'].includes(key)) {
    return 'calendar';
  }
  if (key.includes('quote') || key.includes('Form') || key.includes('Button') || key.includes('Label')) {
    return 'forms';
  }
  if (key.includes('about')) {
    return 'about';
  }
  return 'common';
};

async function importTranslations() {
  try {
    console.log('🚀 Starting translations import to Sanity...\n');

    const languages = ['ar', 'en', 'ru'] as const;
    let totalImported = 0;

    for (const lang of languages) {
      console.log(`\n📝 Processing ${lang.toUpperCase()} translations...`);
      
      const langTranslations = translations[lang];
      const keys = Object.keys(langTranslations);
      
      for (const key of keys) {
        // Check if translation already exists
        const existing = await client.fetch(
          `*[_type == "siteTranslation" && key == $key && language == $lang][0]`,
          { key, lang }
        );

        const value = (langTranslations as any)[key];
        const category = categorizeKey(key);

        if (existing) {
          // Update existing translation
          await client
            .patch(existing._id)
            .set({
              value,
              category,
            })
            .commit();
          console.log(`  ✅ Updated: ${key}`);
        } else {
          // Create new translation
          await client.create({
            _type: 'siteTranslation',
            key,
            language: lang,
            value,
            category,
            description: `Automatically imported from translations.ts`,
          });
          console.log(`  ✨ Created: ${key}`);
        }

        totalImported++;
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }

    console.log('\n\n🎉 Translations import completed successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`   - Total translations imported: ${totalImported}`);
    console.log(`   - Languages: Arabic, English, Russian`);
    console.log(`\n✅ You can now manage these translations in Sanity Studio!`);
    console.log(`   Visit: http://localhost:3333`);

  } catch (error) {
    console.error('❌ Error importing translations:', error);
    process.exit(1);
  }
}

importTranslations();
