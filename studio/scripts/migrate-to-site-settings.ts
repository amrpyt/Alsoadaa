/**
 * Migrate to Site Settings - Complete Version
 * 
 * Migrates ALL non-page translations to Site Settings (including common)
 * 
 * Run: npx ts-node --esm studio/scripts/migrate-to-site-settings.ts
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

function dotToCamelCase(key: string): string {
    return key.split('.').map((part, i) =>
        i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
    ).join('');
}

function getCategoryForKey(key: string): string {
    const camelKey = dotToCamelCase(key);

    if (['products', 'seasonalCalendar', 'processing', 'sorting', 'packing', 'exporting', 'aboutUs', 'contact', 'requestQuote', 'companyName'].includes(camelKey)) return 'navigation';
    if (['viewProducts', 'viewAllProducts', 'viewFullCalendar', 'viewCalendar', 'viewByMonth', 'backButton', 'nextButton', 'submitButton', 'clearFormButton', 'retryButton', 'refreshButton', 'startQuoteRequest', 'backToHomeButton', 'submitAnotherButton', 'startFreshButton', 'continueButton', 'backToContactOptions', 'viewOnGoogleMaps', 'contactSalesLink', 'sendMessage'].includes(camelKey)) return 'buttons';
    if (['fullName', 'email', 'company', 'phone', 'country', 'message', 'companyNameLabel', 'contactPersonLabel', 'emailAddressLabel', 'phoneNumberLabel', 'selectCountryPlaceholder', 'selectProductsLabel', 'estimatedQuantityLabel', 'selectQuantityPlaceholder', 'deliveryTimeframeLabel', 'deliveryTimeframePlaceholder', 'additionalMessageLabel', 'optionalText'].includes(camelKey)) return 'forms';
    if (camelKey.startsWith('error') || ['offlineMessage', 'online', 'offline', 'unableToLoadProductsTitle', 'unableToLoadProductsMessage', 'loadingProductsText', 'noProductsTitle', 'noProductsMessage', 'loadingCalendar'].includes(camelKey)) return 'errors';
    if (['footerDescription', 'copyright', 'privacyPolicy', 'termsOfService', 'cairoEgypt', 'ourLocation', 'companyLocationTitle'].includes(camelKey) || camelKey.startsWith('footer')) return 'footer';

    // Page specific (we filter these out, except shared)
    if (['seasonalAvailability', 'planAheadCalendar', 'peakSeason', 'inSeason', 'productsAvailableIn', 'legend', 'available', 'notAvailable', 'noProductsAvailable'].includes(camelKey) || camelKey.startsWith('seasonal') || camelKey.startsWith('season')) return 'page_calendar';

    // Shared Terms (Months, Fruits, etc) - Move to COMMON
    if (['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december', 'citrus', 'vegetables', 'berries', 'lemons', 'grapes', 'oranges', 'pomegranates', 'strawberries'].includes(camelKey)) return 'common';

    if (['heroTitle', 'heroSubtitle', 'yearsExporting', 'countriesServed', 'certified', 'containersPerYear', 'ourPremiumProducts', 'freshCertifiedDelivered', 'whyChooseUs', 'qualityCertified', 'qualityCertifiedDesc', 'reliableDelivery', 'reliableDeliveryDesc', 'freshGuarantee', 'freshGuaranteeDesc', 'whatClientsSay', 'readyToImport', 'getCustomizedQuote', 'getYourQuoteToday', 'yearsOfExcellence', 'containersAnnually'].includes(camelKey) || camelKey.startsWith('testimonial')) return 'page_home';
    if (['aboutAlSoadaa', 'ourStory', 'ourMission', 'ourVision', 'aboutHeroSubtitle', 'ourMissionAndValues'].includes(camelKey) || camelKey.startsWith('journey') || camelKey.startsWith('about')) return 'page_about';
    if (['getInTouch', 'contactDescription', 'howCanWeHelp', 'chooseWayToReach', 'requestAQuote', 'getCustomizedQuoteDesc', 'callUsDirectly', 'speakWithSpecialists', 'emailUs', 'sendDetailedInquiry', 'contactInformation', 'headOffice', 'phoneNumbers', 'emailAddresses', 'businessHours', 'businessHoursValue', 'cairoTimeZone', 'whatsappAvailable', 'locationMenoufia', 'exportProcessingZone', 'contactAssistMessage', 'globalReachTitle', 'serving50Countries', 'worldwideLogistics', 'experience15Years', 'isoCertified', 'harvestToExport48', 'reliableColdChain'].includes(camelKey) || camelKey.startsWith('contact')) return 'page_contact';
    if (['specifications', 'packaging', 'sizes', 'storage', 'shelfLife', 'certifications', 'availability', 'gallery', 'product', 'relatedProducts', 'quickInformation', 'deliveryTimeline', 'storageRequirements', 'availableSizes', 'packagingOptions', 'productSpecifications', 'shippingAndStorage', 'filters', 'search', 'searchPlaceholder', 'category', 'clearAllFilters', 'applyFilters', 'showingProducts', 'noProductsFoundMessage', 'clearFilters', 'swipeToExplore'].includes(camelKey) || (camelKey.startsWith('product') && !camelKey.startsWith('products'))) return 'page_products';

    if (camelKey.startsWith('sorting')) return 'page_sorting';
    if (camelKey.startsWith('packing')) return 'page_packing';
    if (camelKey.startsWith('exporting')) return 'page_exporting';
    if (['contactInformationStep', 'productSelectionStep', 'additionalDetailsStep', 'quoteSubmittedTitle', 'quoteSubmittedMessage', 'referenceNumberLabel', 'saveReferenceText', 'confirmationEmailLabel', 'confirmationEmailMessage', 'responseTimeLabel', 'responseTimeMessage', 'yourSelectionLabel', 'productsLabel', 'quantityLabel', 'deliveryLabel', 'needHelpText', 'resumeRequestTitle', 'resumeRequestMessage', 'step', 'of', 'complete', 'containers1to5', 'containers5to20', 'containers20to50', 'containers50plus', 'deliveryImmediate', 'deliveryMonth', 'deliveryQuarter', 'deliveryFlexible', 'saudiArabia', 'russia', 'china', 'germany', 'unitedKingdom', 'france', 'italy', 'uae', 'requestSummaryTitle', 'shareQuote', 'downloadPdf', 'submittingRequest', 'validationError', 'fillAllRequired', 'other'].includes(camelKey) || camelKey.includes('Step') || camelKey.includes('Label') || camelKey.startsWith('quote') || camelKey.startsWith('quantity') || camelKey.startsWith('delivery')) return 'page_quote_form';

    // Everything else falls to common
    return 'common';
}

async function migrateToSiteSettings() {
    console.log('🔄 Migrating ALL non-page translations to Site Settings...\n');

    try {
        const translations = await client.fetch<any[]>(
            `*[_type == "siteTranslationCentralized"] { key, valueAr, valueEn, valueRu }`
        );

        console.log(`📊 Found ${translations.length} total translations`);

        // Include common category now!
        const siteSettingsCategories = ['navigation', 'buttons', 'forms', 'errors', 'footer', 'common'];

        const siteSettingsTranslations = translations.filter(t => {
            const cat = getCategoryForKey(t.key);
            return siteSettingsCategories.includes(cat);
        });

        console.log(`📊 ${siteSettingsTranslations.length} translations for Site Settings\n`);

        const byCategory: Record<string, any[]> = {};
        siteSettingsTranslations.forEach(t => {
            const cat = getCategoryForKey(t.key);
            if (!byCategory[cat]) byCategory[cat] = [];
            byCategory[cat].push(t);
        });

        console.log('📊 Breakdown:');
        Object.entries(byCategory).forEach(([cat, trans]) => {
            console.log(`   ${cat.padEnd(15)}: ${trans.length} translations`);
        });
        console.log('');

        const siteSettingsDoc: any = {
            _type: 'siteSettings',
            _id: 'siteSettings',
        };

        let mappedCount = 0;

        siteSettingsTranslations.forEach(t => {
            const camelKey = dotToCamelCase(t.key);
            siteSettingsDoc[`${camelKey}Ar`] = t.valueAr;
            siteSettingsDoc[`${camelKey}En`] = t.valueEn;
            siteSettingsDoc[`${camelKey}Ru`] = t.valueRu;
            mappedCount++;
        });

        console.log(`✅ Mapped ${mappedCount} translations`);
        console.log(`📝 Total fields: ${Object.keys(siteSettingsDoc).length - 2}\n`);

        const existing = await client.fetch(
            `*[_type == "siteSettings" && _id == "siteSettings"][0]`
        );

        if (existing) {
            console.log('📝 Updating Site Settings...');
            await client.patch('siteSettings').set(siteSettingsDoc).commit();
            console.log('✅ Updated successfully');
        } else {
            console.log('📝 Creating Site Settings...');
            await client.create(siteSettingsDoc);
            console.log('✅ Created successfully');
        }

        console.log('\n🎉 Migration complete!');
        console.log(`📊 Total: ${mappedCount} translations migrated`);

    } catch (error: any) {
        console.error('❌ Migration failed:', error.message);
        console.error(error);
        process.exit(1);
    }
}

migrateToSiteSettings();
