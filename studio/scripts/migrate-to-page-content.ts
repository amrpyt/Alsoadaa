/**
 * Migrate to Page Content - Complete Version
 * 
 * Migrates ALL translations using comprehensive category mapping
 * 
 * Run: npx ts-node --esm studio/scripts/migrate-to-page-content.ts
 */

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID!,
    dataset: process.env.VITE_SANITY_DATASET!,
    apiVersion: '2024-01-01',
    token: process.env.VITE_SANITY_TOKEN!,
    useCdn: false,
});

// Page slug mapping  
const PAGE_SLUGS: Record<string, string> = {
    'home': '/',
    'about': '/about',
    'contact': '/contact',
    'products': '/products',
    'calendar': '/calendar',
    'sorting': '/sorting',
    'packing': '/packing',
    'exporting': '/exporting',
    'quote_form': '/quote',
};

// Helper to convert dot notation to camelCase
function dotToCamelCase(key: string): string {
    return key.split('.').map((part, i) =>
        i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
    ).join('');
}

// Comprehensive category mapping
function getCategoryForKey(key: string): string {
    const camelKey = dotToCamelCase(key);

    // Navigation
    if (['products', 'seasonalCalendar', 'processing', 'sorting', 'packing', 'exporting', 'aboutUs', 'contact', 'requestQuote', 'companyName'].includes(camelKey)) return 'navigation';

    // Buttons (Site Settings)
    if (['viewProducts', 'viewAllProducts', 'viewFullCalendar', 'viewCalendar', 'viewByMonth', 'backButton', 'nextButton', 'submitButton', 'clearFormButton', 'retryButton', 'refreshButton', 'startQuoteRequest', 'backToHomeButton', 'submitAnotherButton', 'startFreshButton', 'continueButton', 'backToContactOptions', 'viewOnGoogleMaps', 'contactSalesLink', 'sendMessage'].includes(camelKey)) return 'buttons';

    // Forms (Site Settings)
    if (['fullName', 'email', 'company', 'phone', 'country', 'message', 'companyNameLabel', 'contactPersonLabel', 'emailAddressLabel', 'phoneNumberLabel', 'selectCountryPlaceholder', 'selectProductsLabel', 'estimatedQuantityLabel', 'selectQuantityPlaceholder', 'deliveryTimeframeLabel', 'deliveryTimeframePlaceholder', 'additionalMessageLabel', 'optionalText'].includes(camelKey)) return 'forms';

    // Errors (Site Settings)
    if (camelKey.startsWith('error') || ['offlineMessage', 'online', 'offline', 'unableToLoadProductsTitle', 'unableToLoadProductsMessage', 'loadingProductsText', 'noProductsTitle', 'noProductsMessage', 'loadingCalendar'].includes(camelKey)) return 'errors';

    // Footer (Site Settings)
    if (['footerDescription', 'copyright', 'privacyPolicy', 'termsOfService', 'cairoEgypt', 'ourLocation', 'companyLocationTitle'].includes(camelKey) || camelKey.startsWith('footer')) return 'footer';

    // Home Page
    if (['heroTitle', 'heroSubtitle', 'yearsExporting', 'countriesServed', 'certified', 'containersPerYear', 'ourPremiumProducts', 'freshCertifiedDelivered', 'whyChooseUs', 'qualityCertified', 'qualityCertifiedDesc', 'reliableDelivery', 'reliableDeliveryDesc', 'freshGuarantee', 'freshGuaranteeDesc', 'whatClientsSay', 'readyToImport', 'getCustomizedQuote', 'getYourQuoteToday', 'yearsOfExcellence', 'containersAnnually'].includes(camelKey) || camelKey.startsWith('testimonial')) return 'home';

    // About Page
    if (['aboutAlSoadaa', 'ourStory', 'ourMission', 'ourVision', 'aboutHeroSubtitle', 'ourMissionAndValues'].includes(camelKey) || camelKey.startsWith('journey') || camelKey.startsWith('about')) return 'about';

    // Contact Page
    if (['getInTouch', 'contactDescription', 'howCanWeHelp', 'chooseWayToReach', 'requestAQuote', 'getCustomizedQuoteDesc', 'callUsDirectly', 'speakWithSpecialists', 'emailUs', 'sendDetailedInquiry', 'contactInformation', 'headOffice', 'phoneNumbers', 'emailAddresses', 'businessHours', 'businessHoursValue', 'cairoTimeZone', 'whatsappAvailable', 'locationMenoufia', 'exportProcessingZone', 'contactAssistMessage', 'globalReachTitle', 'serving50Countries', 'worldwideLogistics', 'experience15Years', 'isoCertified', 'harvestToExport48', 'reliableColdChain'].includes(camelKey) || camelKey.startsWith('contact')) return 'contact';

    // Products Page
    if (['specifications', 'packaging', 'sizes', 'storage', 'shelfLife', 'certifications', 'availability', 'gallery', 'product', 'relatedProducts', 'quickInformation', 'deliveryTimeline', 'storageRequirements', 'availableSizes', 'packagingOptions', 'productSpecifications', 'shippingAndStorage', 'filters', 'search', 'searchPlaceholder', 'category', 'clearAllFilters', 'applyFilters', 'showingProducts', 'noProductsFoundMessage', 'clearFilters', 'swipeToExplore'].includes(camelKey) || (camelKey.startsWith('product') && !camelKey.startsWith('products'))) return 'products';

    // Calendar Page
    if (['seasonalAvailability', 'planAheadCalendar', 'peakSeason', 'inSeason', 'productsAvailableIn', 'legend', 'available', 'notAvailable', 'noProductsAvailable', 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december', 'citrus', 'vegetables', 'berries', 'lemons', 'grapes', 'oranges', 'pomegranates', 'strawberries'].includes(camelKey) || camelKey.startsWith('seasonal') || camelKey.startsWith('season')) return 'calendar';

    // Processing Pages
    if (camelKey.startsWith('sorting')) return 'sorting';
    if (camelKey.startsWith('packing')) return 'packing';
    if (camelKey.startsWith('exporting')) return 'exporting';

    // Quote Form
    if (['contactInformationStep', 'productSelectionStep', 'additionalDetailsStep', 'quoteSubmittedTitle', 'quoteSubmittedMessage', 'referenceNumberLabel', 'saveReferenceText', 'confirmationEmailLabel', 'confirmationEmailMessage', 'responseTimeLabel', 'responseTimeMessage', 'yourSelectionLabel', 'productsLabel', 'quantityLabel', 'deliveryLabel', 'needHelpText', 'resumeRequestTitle', 'resumeRequestMessage', 'step', 'of', 'complete', 'containers1to5', 'containers5to20', 'containers20to50', 'containers50plus', 'deliveryImmediate', 'deliveryMonth', 'deliveryQuarter', 'deliveryFlexible', 'saudiArabia', 'russia', 'china', 'germany', 'unitedKingdom', 'france', 'italy', 'uae', 'requestSummaryTitle', 'shareQuote', 'downloadPdf', 'submittingRequest', 'validationError', 'fillAllRequired', 'other'].includes(camelKey) || camelKey.includes('Step') || camelKey.includes('Label') || camelKey.startsWith('quote') || camelKey.startsWith('quantity') || camelKey.startsWith('delivery')) return 'quote_form';

    return 'common';
}

async function migrateToPageContent() {
    console.log('🔄 Migrating ALL translations to Page Content...\n');

    try {
        const translations = await client.fetch<any[]>(
            `*[_type == "siteTranslationCentralized"] { key, valueAr, valueEn, valueRu }`
        );

        console.log(`📊 Found ${translations.length} total translations\n`);

        // Group by category
        const byCategory: Record<string, any[]> = {};
        translations.forEach(t => {
            const cat = getCategoryForKey(t.key);
            if (!byCategory[cat]) byCategory[cat] = [];
            byCategory[cat].push(t);
        });

        console.log('📊 Translations by category:');
        Object.entries(byCategory).sort((a, b) => b[1].length - a[1].length).forEach(([cat, trans]) => {
            console.log(`   ${cat.padEnd(15)}: ${trans.length} translations`);
        });
        console.log('');

        let created = 0, updated = 0;

        for (const [category, slug] of Object.entries(PAGE_SLUGS)) {
            const categoryTrans = byCategory[category] || [];

            if (categoryTrans.length === 0) {
                console.log(`⏭️  Skipping ${category} (no translations)`);
                continue;
            }

            console.log(`📝 Processing ${category} (${slug}) - ${categoryTrans.length} translations`);

            const doc: any = {
                _type: 'pageContentCentralized',
                _id: `pageContent_${category}`,
                pageSlug: slug,
            };

            categoryTrans.forEach(t => {
                const camelKey = dotToCamelCase(t.key);
                doc[`${camelKey}Ar`] = t.valueAr;
                doc[`${camelKey}En`] = t.valueEn;
                doc[`${camelKey}Ru`] = t.valueRu;
            });

            const existing = await client.fetch(
                `*[_type == "pageContentCentralized" && _id == $id][0]`,
                { id: doc._id }
            );

            if (existing) {
                await client.patch(doc._id).set(doc).commit();
                updated++;
                console.log(`   ✅ Updated ${category}`);
            } else {
                await client.create(doc);
                created++;
                console.log(`   ✅ Created ${category}`);
            }
        }

        const pageTotal = Object.values(PAGE_SLUGS).reduce((sum, slug) =>
            sum + (byCategory[slug.replace('/', '') || 'home']?.length || 0), 0
        );
        const nonPageCategories = ['buttons', 'forms', 'errors', 'footer', 'navigation', 'common'];
        const settingsTotal = nonPageCategories.reduce((sum, cat) =>
            sum + (byCategory[cat]?.length || 0), 0
        );

        console.log('\n🎉 Migration to Page Content complete!');
        console.log(`📊 Created: ${created}, Updated: ${updated}`);
        console.log(`\n📈 Coverage:`);
        console.log(`   Page Content: ${Object.entries(PAGE_SLUGS).reduce((s, [cat]) => s + (byCategory[cat]?.length || 0), 0)} translations`);
        console.log(`   Site Settings: ${settingsTotal} translations`);
        console.log(`   Common/Uncategorized: ${byCategory.common?.length || 0} translations`);

    } catch (error: any) {
        console.error('❌ Migration failed:', error.message);
        console.error(error);
        process.exit(1);
    }
}

migrateToPageContent();
