/**
 * Comprehensive Category Mapping
 * Maps ALL 435 translation keys to proper categories
 */

export function getCategoryForKey(key: string): string {
    // Convert dot notation to camelCase first for comparison
    const camelKey = key.split('.').map((part, i) =>
        i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
    ).join('');

    // =====================================
    // NAVIGATION (Site Settings)
    // =====================================
    if (['products', 'seasonalCalendar', 'processing', 'sorting', 'packing', 'exporting', 'aboutUs', 'contact', 'requestQuote'].includes(camelKey)) {
        return 'navigation';
    }

    // =====================================
    // COMMON SITE SETTINGS
    // =====================================
    if (camelKey === 'companyName') return 'navigation'; // Company info

    // Common Buttons
    if ([
        'viewProducts', 'viewAllProducts', 'viewFullCalendar', 'viewCalendar', 'viewByMonth',
        'backButton', 'nextButton', 'submitButton', 'clearFormButton', 'retryButton', 'refreshButton',
        'startQuoteRequest', 'backToHomeButton', 'submitAnotherButton', 'startFreshButton', 'continueButton',
        'backToContactOptions', 'viewOnGoogleMaps', 'contactSalesLink'
    ].includes(camelKey)) {
        return 'buttons'; // Site Settings - buttons section
    }

    // Form Labels (Site Settings)
    if ([
        'fullName', 'email', 'company', 'phone', 'country', 'message',
        'companyNameLabel', 'contactPersonLabel', 'emailAddressLabel', 'phoneNumberLabel',
        'selectCountryPlaceholder', 'selectProductsLabel', 'estimatedQuantityLabel', 'selectQuantityPlaceholder',
        'deliveryTimeframeLabel', 'deliveryTimeframePlaceholder', 'additionalMessageLabel',
        'optionalText', 'sendMessage'
    ].includes(camelKey)) {
        return 'forms'; // Site Settings - forms section
    }

    // Error Messages (Site Settings)
    if (camelKey.startsWith('error') || [
        'offlineMessage', 'online', 'offline', 'unableToLoadProductsTitle',
        'unableToLoadProductsMessage', 'loadingProductsText', 'noProductsTitle', 'noProductsMessage'
    ].includes(camelKey)) {
        return 'errors'; // Site Settings - errors section
    }

    // =====================================
    // HOME PAGE
    // =====================================
    if ([
        'heroTitle', 'heroSubtitle',
        'yearsExporting', 'countriesServed', 'certified', 'containersPerYear',
        'ourPremiumProducts', 'freshCertifiedDelivered',
        'whyChooseUs', 'qualityCertified', 'qualityCertifiedDesc',
        'reliableDelivery', 'reliableDeliveryDesc',
        'freshGuarantee', 'freshGuaranteeDesc',
        'whatClientsSay',
        'readyToImport', 'getCustomizedQuote', 'getYourQuoteToday'
    ].includes(camelKey) || camelKey.startsWith('testimonial')) {
        return 'home';
    }

    // =====================================
    // ABOUT PAGE
    // =====================================
    if ([
        'aboutAlSoadaa', 'ourStory', 'ourMission', 'ourVision'
    ].includes(camelKey) || camelKey.startsWith('journey') || camelKey.startsWith('about')) {
        return 'about';
    }

    // =====================================
    // CONTACT PAGE
    // =====================================
    if ([
        'getInTouch', 'contactDescription', 'howCanWeHelp', 'chooseWayToReach',
        'requestAQuote', 'getCustomizedQuoteDesc', 'callUsDirectly', 'speakWithSpecialists',
        'emailUs', 'sendDetailedInquiry', 'contactInformation', 'headOffice',
        'phoneNumbers', 'emailAddresses', 'businessHours', 'business HoursValue', 'cairoTimeZone',
        'whatsappAvailable', 'locationMenoufia', 'exportProcessingZone', 'contactAssistMessage',
        'globalReachTitle', 'serving50Countries', 'worldwideLogistics',
        'experience15Years', 'isoCertified', 'harvestToExport48', 'reliableColdChain'
    ].includes(camelKey) || camelKey.startsWith('contact')) {
        return 'contact';
    }

    // Countries (used in Contact/Quote Form)
    if (['saudiArabia', 'russia', 'china', 'germany', 'unitedKingdom', 'france', 'italy', 'uae'].includes(camelKey)) {
        return 'quote_form'; // Countries selector in quote form
    }

    // =====================================
    // PRODUCTS PAGE
    // =====================================
    if ([
        'specifications', 'packaging', 'sizes', 'storage', 'shelfLife', 'certifications',
        'availability', 'gallery', 'product', 'relatedProducts', 'quickInformation',
        'deliveryTimeline', 'storageRequirements', 'availableSizes', 'packagingOptions',
        'productSpecifications', 'shippingAndStorage', 'filters', 'search',
        'searchPlaceholder', 'category', 'clearAllFilters', 'applyFilters',
        'showingProducts', 'noProductsFoundMessage', 'clearFilters', 'swipeToExplore'
    ].includes(camelKey) || (camelKey.startsWith('product') && !camelKey.startsWith('products'))) {
        return 'products';
    }

    // =====================================
    // CALENDAR PAGE
    // =====================================
    if ([
        'seasonalAvailability', 'planAheadCalendar', 'peakSeason', 'inSeason',
        'productsAvailableIn', 'legend', 'available', 'notAvailable', 'noProductsAvailable',
        'loadingCalendar',
        // Month names
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december',
        // Product categories
        'citrus', 'vegetables', 'berries', 'lemons', 'grapes', 'oranges',
        'pomegranates', 'strawberries'
    ].includes(camelKey) || camelKey.startsWith('seasonal') || camelKey.startsWith('season')) {
        return 'calendar';
    }

    // =====================================
    // PROCESSING PAGES
    // =====================================
    if (camelKey.startsWith('sorting')) return 'sorting';
    if (camelKey.startsWith('packing')) return 'packing';
    if (camelKey.startsWith('exporting')) return 'exporting';

    // =====================================
    // QUOTE FORM
    // =====================================
    if ([
        'contactInformationStep', 'productSelectionStep', 'additionalDetailsStep',
        'quoteSubmittedTitle', 'quoteSubmittedMessage', 'referenceNumberLabel',
        'saveReferenceText', 'confirmationEmailLabel', 'confirmationEmailMessage',
        'responseTimeLabel', 'responseTimeMessage', 'yourSelectionLabel',
        'productsLabel', 'quantityLabel', 'deliveryLabel', 'needHelpText',
        'resumeRequestTitle', 'resumeRequestMessage', 'step', 'of', 'complete',
        'containers1to5', 'containers5to20', 'containers20to50', 'containers50plus',
        'deliveryImmediate', 'deliveryMonth', 'deliveryQuarter', 'deliveryFlexible',
        'requestSummaryTitle', 'shareQuote', 'downloadPdf', 'submittingRequest',
        'validationError', 'fillAllRequired', 'other'
    ].includes(camelKey) || camelKey.includes('Step') || camelKey.includes('Label') ||
        camelKey.startsWith('quote') || camelKey.startsWith('quantity') || camelKey.startsWith('delivery')) {
        return 'quote_form';
    }

    // =====================================
    // FOOTER (Site Settings)
    // =====================================
    if ([
        'footerDescription', 'copyright', 'privacyPolicy', 'termsOfService',
        'cairoEgypt', 'ourLocation', 'companyLocationTitle'
    ].includes(camelKey) || camelKey.startsWith('footer')) {
        return 'footer';
    }

    // =====================================
    // DEFAULT: If not categorized above, it's common/shared
    // =====================================
    return 'common';
}
