/**
 * Generate Site Settings Schema
 * 
 * Auto-generates the siteSettings.ts schema file including ALL global translations.
 * 
 * Run: npx ts-node --esm studio/scripts/generate-site-settings-schema.ts
 */

import { createClient } from '@sanity/client';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

    // Page specific (we filter these out later, EXCEPT common ones we want globally)
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

    return 'common';
}

async function generateSchema() {
    console.log('🔄 Generating siteSettings.ts schema...');

    const translations = await client.fetch(
        `*[_type == "siteTranslationCentralized"] { key }`
    );

    const siteGroups: Record<string, string[]> = {
        navigation: [],
        buttons: [],
        forms: [],
        errors: [],
        footer: [],
        common: []
    };

    // Sort keys into groups
    translations.forEach((t: any) => {
        const cat = getCategoryForKey(t.key);
        if (siteGroups[cat]) {
            siteGroups[cat].push(t.key);
        }
    });

    console.log('📊 Field counts:');
    Object.entries(siteGroups).forEach(([cat, keys]) => {
        console.log(`   ${cat}: ${keys.length}`);
    });

    let schema = `import { defineType, defineField } from 'sanity'

/**
 * Site Settings - Singleton Document
 * Auto-generated by studio/scripts/generate-site-settings-schema.ts
 */
export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: '⚙️ Site Settings',
  type: 'document',
  groups: [
    { name: 'navigation', title: '🧭 Navigation', default: true },
    { name: 'buttons', title: '🔘 Buttons' },
    { name: 'forms', title: '📝 Forms' },
    { name: 'errors', title: '❌ Errors' },
    { name: 'footer', title: '👣 Footer' },
    { name: 'common', title: '🌐 Common' },
  ],
  fields: [
`;

    // Generate fields
    Object.entries(siteGroups).forEach(([group, keys]) => {
        if (keys.length === 0) return;

        schema += `    // ${group.toUpperCase()}\n`;

        keys.forEach(key => {
            const camelKey = dotToCamelCase(key);
            const title = camelKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

            ['Ar', 'En', 'Ru'].forEach(lang => {
                const langCode = lang.toLowerCase();
                const langTitle = lang === 'Ar' ? 'Arabic' : lang === 'En' ? 'English' : 'Russian';

                schema += `    defineField({
      name: '${camelKey}${lang}',
      title: '${title} (${langTitle})',
      type: 'string',
      group: '${group}',
    }),\n`;
            });
            schema += '\n';
        });
    });

    schema += `  ],
  preview: {
    prepare() {
      return {
        title: '⚙️ Site Settings',
        subtitle: 'Global content & settings',
      }
    },
  },
})
`;

    const outputPath = path.join(__dirname, '../schemaTypes/siteSettings.ts');
    fs.writeFileSync(outputPath, schema);

    console.log(`✅ Schema written to ${outputPath}`);
}

generateSchema().catch(err => {
    console.error(err);
    process.exit(1);
});
