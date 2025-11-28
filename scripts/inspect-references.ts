import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID,
    dataset: process.env.VITE_SANITY_DATASET,
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.VITE_SANITY_TOKEN,
});

async function inspectProducts() {
    console.log('🔍 Inspecting products for translation references...');

    const products = await client.fetch(`
    *[_type == "product"] {
      _id,
      title,
      slug,
      language,
      originalDocument
    }
  `);

    console.log(`📦 Found ${products.length} products.`);

    const arProducts = products.filter((p: any) => p.language === 'ar');
    const enProducts = products.filter((p: any) => p.language === 'en');
    const ruProducts = products.filter((p: any) => p.language === 'ru');

    console.log(`AR: ${arProducts.length}, EN: ${enProducts.length}, RU: ${ruProducts.length}`);

    console.log('\n--- Checking References ---');

    let missingRefs = 0;

    enProducts.forEach((p: any) => {
        if (!p.originalDocument) {
            console.log(`⚠️ [EN] Missing reference: ${p.title} (${p.slug.current})`);
            missingRefs++;
        } else {
            // console.log(`✅ [EN] Has reference: ${p.title}`);
        }
    });

    ruProducts.forEach((p: any) => {
        if (!p.originalDocument) {
            console.log(`⚠️ [RU] Missing reference: ${p.title} (${p.slug.current})`);
            missingRefs++;
        } else {
            // console.log(`✅ [RU] Has reference: ${p.title}`);
        }
    });

    if (missingRefs === 0) {
        console.log('✅ All translated products have references!');
    } else {
        console.log(`❌ Found ${missingRefs} products missing references.`);
    }
}

inspectProducts();
