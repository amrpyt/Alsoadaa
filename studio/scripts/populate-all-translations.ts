/**
 * Populate ALL Translations (Centralized Schema)
 * 
 * Migrates ALL ~400+ UI translations from src/lib/translations.ts to siteTranslationCentralized
 * Run: npx ts-node --esm studio/scripts/populate-all-translations.ts
 */

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID!,
    dataset: process.env.VITE_SANITY_DATASET!,
    apiVersion: '2024-01-01',
    token: process.env.VITE_SANITY_TOKEN!,
    useCdn: false,
});

// ============================================
// CATEGORY MAPPING
// Maps translation key patterns to categories
// ============================================
function getCategoryForKey(key: string): string {
    // Navigation
    if (['products', 'seasonalCalendar', 'processing', 'sorting', 'packing', 'exporting', 'aboutUs', 'contact', 'requestQuote'].includes(key)) {
        return 'navigation';
    }

    // Home page
    if (key.startsWith('hero') || key.startsWith('years') || key.startsWith('countries') || key.startsWith('certified') ||
        key.startsWith('containers') || key.startsWith('ourPremium') || key.startsWith('freshCertified') ||
        key.startsWith('viewAllProducts') || key.startsWith('whyChoose') || key.startsWith('quality') ||
        key.startsWith('reliable') || key.startsWith('freshGuarantee') || key.startsWith('whatClients') ||
        key.startsWith('readyToImport') || key.startsWith('getCustomized') || key.startsWith('getYourQuote') ||
        key.startsWith('testimonial')) {
        return 'home';
    }

    // About page
    if (key.startsWith('about') || key.startsWith('ourStory') || key.startsWith('ourMission') ||
        key.startsWith('ourVision') || key.startsWith('ourJourney') || key.startsWith('journey') ||
        key.startsWith('ourCertifications') || key.startsWith('iso9001') || key.startsWith('globalGap') ||
        key.startsWith('haccp') || key.startsWith('partnership') || key.startsWith('innovation') ||
        key.startsWith('trustAnd') || key.startsWith('sustainability') || (key.startsWith('globalReach') && !key.includes('Title'))) {
        return 'about';
    }

    // Contact page
    if (key.startsWith('getInTouch') || key.startsWith('contact') || key.startsWith('headOffice') ||
        key.startsWith('business') || key.startsWith('whatsapp') || key.startsWith('location') ||
        key.startsWith('exportProcessing') || key.startsWith('viewOnGoogle') || key.startsWith('howCanWeHelp') ||
        key.startsWith('chooseWay') || key.startsWith('callUs') || key.startsWith('speakWith') ||
        key.startsWith('emailUs') || key.startsWith('sendDetailed') || key.startsWith('backToContact') ||
        key.startsWith('serving') || key.startsWith('worldwide') || key.startsWith('experience') ||
        key.startsWith('isoCertified') || key.startsWith('harvestTo') || key.startsWith('reliableCold') ||
        key.startsWith('globalReachTitle')) {
        return 'contact';
    }

    // Products page
    if (key === 'specifications' || key === 'packaging' || key === 'sizes' || key === 'storage' ||
        key === 'shelfLife' || key === 'certifications' || key === 'availability' || key === 'gallery' ||
        key === 'relatedProducts' || key === 'quickInformation' || key === 'deliveryTimeline' ||
        key === 'storageRequirements' || key === 'availableSizes' || key === 'packagingOptions' ||
        key === 'productSpecifications' || key === 'shippingAndStorage' || key === 'filters' ||
        key === 'search' || key === 'searchPlaceholder' || key === 'category' || key === 'clearAllFilters' ||
        key === 'applyFilters' || key === 'showingProducts' || key === 'noProductsFoundMessage' ||
        key === 'clearFilters' || key === 'viewDetails' || key === 'swipeToExplore' ||
        (key.startsWith('product') && !key.startsWith('products'))) {
        return 'products';
    }

    // Calendar page
    if (key.startsWith('seasonal') || key.startsWith('planAhead') || key.startsWith('viewFull') ||
        key.startsWith('peakSeason') || key.startsWith('inSeason') || key.startsWith('productsAvailable') ||
        key.startsWith('viewCalendar') || key.startsWith('viewByMonth') || key === 'legend' ||
        key === 'available' || key === 'notAvailable' || key === 'noProductsAvailable' ||
        key === 'loadingCalendar' || key.startsWith('season') ||
        ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'].includes(key) ||
        ['citrus', 'vegetables', 'berries', 'lemons', 'grapes', 'oranges', 'pomegranates', 'strawberries'].includes(key)) {
        return 'calendar';
    }

    // Sorting page
    if (key.startsWith('sorting')) {
        return 'sorting';
    }

    // Packing page
    if (key.startsWith('packing')) {
        return 'packing';
    }

    // Exporting page
    if (key.startsWith('exporting')) {
        return 'exporting';
    }

    // Quote form
    if (key.includes('Step') || key.includes('Label') || key.includes('Placeholder') ||
        key.startsWith('company') || key.startsWith('email') || key.startsWith('phone') ||
        key.startsWith('country') || key.startsWith('message') || key.startsWith('fullName') ||
        key.startsWith('select') || key.startsWith('estimated') || (key.startsWith('delivery') && !key.startsWith('deliveryTimeline')) ||
        key.startsWith('additional') || key.startsWith('optional') || key.startsWith('back') ||
        key.startsWith('next') || key.startsWith('submit') || key.startsWith('clear') ||
        key.startsWith('quote') || key.startsWith('reference') || key.startsWith('save') ||
        key.startsWith('confirmation') || key.startsWith('response') || key.startsWith('yourSelection') ||
        (key.startsWith('products') && key.includes('Label')) || key.startsWith('quantity') ||
        key.startsWith('needHelp') || key.startsWith('contactSales') || (key.startsWith('loading') && key.includes('Products')) ||
        key.startsWith('unableToLoad') || (key.startsWith('noProducts') && !key.startsWith('noProductsAvailable')) ||
        key.startsWith('containers') || key.startsWith('resume') || key.startsWith('startFresh') ||
        key.startsWith('continue') || key === 'step' || key === 'of' || key === 'complete' ||
        key.startsWith('offline') || key.startsWith('online') || key.startsWith('request') ||
        key.startsWith('summary') || key.startsWith('share') || key.startsWith('submitting') ||
        key.startsWith('other') || key.startsWith('validation') || key.startsWith('fillAll') ||
        ['saudiArabia', 'russia', 'china', 'germany', 'unitedKingdom', 'france', 'italy', 'uae'].includes(key)) {
        return 'quote-form';
    }

    // Footer
    if (key.startsWith('footer') || key === 'copyright' || key === 'privacyPolicy' ||
        key === 'termsOfService' || key === 'cairoEgypt' || key === 'ourLocation' ||
        key === 'companyLocationTitle') {
        return 'footer';
    }

    // Errors & Validation
    if (key.startsWith('error') || key.startsWith('network') || key.startsWith('server') ||
        key.startsWith('auth') || key.startsWith('maxRetries') || key.startsWith('connection') ||
        key.startsWith('loadFailed') || key.startsWith('tryThese') || key.startsWith('refresh') ||
        key.startsWith('clearCache') || key.startsWith('tryLater') || key.startsWith('contactSupport') ||
        (key.startsWith('showing') && key.includes('Cached')) || key === 'retry' || key === 'error') {
        return 'errors';
    }

    // Common / Shared
    return 'common';
}

// ============================================
// MAIN FUNCTION
// ============================================
async function populateAllTranslations() {
    console.log('🌍 Populating ALL Translations to CMS...\n');

    // Read translations file
    const translationsPath = path.join(process.cwd(), 'src', 'lib', 'translations.ts');
    const translationsContent = fs.readFileSync(translationsPath, 'utf-8');

    // Extract translations object using regex
    const match = translationsContent.match(/export const translations[^{]*=\s*({[\s\S]*});/);
    if (!match) {
        throw new Error('Could not parse translations file');
    }

    // Use eval to parse the object (safe in this context as we control the file)
    const translationsObj = eval(`(${match[1]})`);

    const enTranslations = translationsObj.en;
    const arTranslations = translationsObj.ar;
    const ruTranslations = translationsObj.ru;

    const keys = Object.keys(enTranslations);
    console.log(`📊 Found ${keys.length} translation keys\n`);

    let created = 0;
    let updated = 0;
    let errors = 0;
    const categoryCount: Record<string, number> = {};

    for (const key of keys) {
        const category = getCategoryForKey(key);
        categoryCount[category] = (categoryCount[category] || 0) + 1;

        const translationId = `trans-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;

        try {
            const existing = await client.fetch(
                `*[_type == "siteTranslationCentralized" && _id == $id][0]`,
                { id: translationId }
            );

            const doc = {
                _type: 'siteTranslationCentralized',
                _id: translationId,
                key: key,
                category: category,
                description: `Translation for ${key}`,
                valueAr: arTranslations[key] || '',
                valueEn: enTranslations[key] || '',
                valueRu: ruTranslations[key] || '',
            };

            if (existing) {
                await client.patch(translationId).set(doc).commit();
                updated++;
            } else {
                await client.create(doc);
                created++;
            }

            // Log progress every 50 items
            if ((created + updated) % 50 === 0) {
                console.log(`  📝 Processed ${created + updated} translations...`);
            }
        } catch (error: any) {
            console.error(`  ❌ Error: ${key} - ${error.message}`);
            errors++;
        }
    }

    console.log('\n📊 Summary by Category:');
    Object.entries(categoryCount)
        .sort((a, b) => b[1] - a[1])
        .forEach(([cat, count]) => {
            console.log(`   ${cat.padEnd(15)} : ${count}`);
        });

    console.log('\n📊 Overall Summary:');
    console.log(`   Created: ${created}`);
    console.log(`   Updated: ${updated}`);
    console.log(`   Errors: ${errors}`);
    console.log(`   Total: ${keys.length}`);
}

populateAllTranslations().catch(console.error);
