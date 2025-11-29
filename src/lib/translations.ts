export type Language = 'en' | 'ar' | 'ru';

export interface Translations {
  // Header
  products: string;
  seasonalCalendar: string;
  processing: string;
  sorting: string;
  packing: string;
  exporting: string;
  aboutUs: string;
  contact: string;
  requestQuote: string;
  companyName: string;

  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  viewProducts: string;

  // Trust Indicators
  yearsExporting: string;
  countriesServed: string;
  certified: string;
  containersPerYear: string;

  // Products Section
  ourPremiumProducts: string;
  freshCertifiedDelivered: string;
  viewAllProducts: string;

  // Why Choose Us
  whyChooseUs: string;
  qualityCertified: string;
  qualityCertifiedDesc: string;
  reliableDelivery: string;
  reliableDeliveryDesc: string;
  freshGuarantee: string;
  freshGuaranteeDesc: string;

  // Seasonal Calendar
  seasonalAvailability: string;
  planAheadCalendar: string;
  viewFullCalendar: string;
  peakSeason: string;
  inSeason: string;

  // Testimonials
  whatClientsSay: string;

  // CTA
  readyToImport: string;
  getCustomizedQuote: string;
  getYourQuoteToday: string;

  // Product Detail
  specifications: string;
  packaging: string;
  sizes: string;
  storage: string;
  shelfLife: string;
  certifications: string;
  availability: string;
  gallery: string;

  // Calendar
  productsAvailableIn: string;
  viewCalendar: string;
  viewByMonth: string;
  legend: string;
  available: string;
  notAvailable: string;
  product: string;
  noProductsAvailable: string;

  // Contact
  getInTouch: string;
  contactDescription: string;
  fullName: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  message: string;
  sendMessage: string;
  howCanWeHelp: string;
  chooseWayToReach: string;
  requestAQuote: string;
  getCustomizedQuoteDesc: string;
  startQuoteRequest: string;
  callUsDirectly: string;
  speakWithSpecialists: string;
  emailUs: string;
  sendDetailedInquiry: string;
  contactInformation: string;
  headOffice: string;
  phoneNumbers: string;
  emailAddresses: string;
  businessHours: string;
  backToContactOptions: string;

  // Countries
  saudiArabia: string;
  russia: string;
  china: string;
  germany: string;
  unitedKingdom: string;
  france: string;
  italy: string;
  uae: string;

  // About
  aboutAlSoadaa: string;
  ourStory: string;
  ourMission: string;
  ourVision: string;

  // Quote Form
  contactInformationStep: string;
  productSelectionStep: string;
  additionalDetailsStep: string;
  companyNameLabel: string;
  contactPersonLabel: string;
  emailAddressLabel: string;
  phoneNumberLabel: string;
  selectCountryPlaceholder: string;
  selectProductsLabel: string;
  estimatedQuantityLabel: string;
  selectQuantityPlaceholder: string;
  deliveryTimeframeLabel: string;
  deliveryTimeframePlaceholder: string;
  additionalMessageLabel: string;
  optionalText: string;
  backButton: string;
  nextButton: string;
  submitButton: string;
  clearFormButton: string;
  quoteSubmittedTitle: string;
  quoteSubmittedMessage: string;
  referenceNumberLabel: string;
  saveReferenceText: string;
  confirmationEmailLabel: string;
  confirmationEmailMessage: string;
  responseTimeLabel: string;
  responseTimeMessage: string;
  yourSelectionLabel: string;
  productsLabel: string;
  quantityLabel: string;
  deliveryLabel: string;
  backToHomeButton: string;
  submitAnotherButton: string;
  needHelpText: string;
  contactSalesLink: string;
  errorTitle: string;
  errorWhatToDo: string;
  errorCheckConnection: string;
  errorVerifyFields: string;
  errorTryAgain: string;
  errorContactSupport: string;
  loadingProductsText: string;
  unableToLoadProductsTitle: string;
  unableToLoadProductsMessage: string;
  retryButton: string;
  noProductsTitle: string;
  noProductsMessage: string;
  refreshButton: string;
  containers1to5: string;
  containers5to20: string;
  containers20to50: string;
  containers50plus: string;
  deliveryImmediate: string;
  deliveryMonth: string;
  deliveryQuarter: string;
  deliveryFlexible: string;

  // New Keys
  resumeRequestTitle: string;
  resumeRequestMessage: string;
  startFreshButton: string;
  continueButton: string;
  step: string;
  of: string;
  complete: string;
  offlineMessage: string;
  online: string;
  offline: string;
  requestQuoteTitle: string;
  requestQuoteSubtitle: string;
  summaryTitle: string;
  shareRequirements: string;
  submitting: string;
  submitQuoteRequest: string;
  otherCountry: string;
  validationRequired: string;
  validationEmail: string;
  validationPhone: string;
  validationCompany: string;
  validationContact: string;
  validationCountry: string;
  validationQuantity: string;
  validationDelivery: string;
  noProductsFound: string;
  fillAllFields: string;
  networkError: string;
  serverError: string;
  authError: string;
  maxRetriesError: string;
  connectionError: string;
  loadFailed: string;
  tryTheseSteps: string;
  refreshPage: string;
  clearCache: string;
  tryLater: string;
  contactSupport: string;
  showingCached: string;

  // Months
  january: string;
  february: string;
  march: string;
  april: string;
  may: string;
  june: string;
  july: string;
  august: string;
  september: string;
  october: string;
  november: string;
  december: string;

  // Categories
  citrus: string;
  vegetables: string;
  berries: string;
  lemons: string;
  grapes: string;

  // Seasons
  seasonInSeason: string;
  seasonPeak: string;
  seasonComingSoon: string;
  seasonLastWeeks: string;

  // Common
  viewDetails: string;
  swipeToExplore: string;
  // New Keys for Phase 2
  loadingCalendar: string;
  loadingProduct: string;
  productNotFound: string;
  productNotFoundMessage: string;
  invalidProductData: string;
  invalidProductDataMessage: string;
  errorPreparingData: string;
  errorPreparingDataMessage: string;
  backToProducts: string;
  home: string;
  relatedProducts: string;
  quickInformation: string;
  deliveryTimeline: string;
  storageRequirements: string;
  availableSizes: string;
  packagingOptions: string;
  oranges: string;
  pomegranates: string;
  strawberries: string;
  storageRequirementsDesc: string;
  deliveryTimelineDesc: string;
  loading: string;
  error: string;
  retry: string;
  scheduleCallback: string;
  variousOptions: string;
  coldStorage: string;
  contactForDetails: string;
  shipping: string;
  productSpecifications: string;
  shippingAndStorage: string;
  filters: string;
  search: string;
  searchPlaceholder: string;
  category: string;
  clearAllFilters: string;
  applyFilters: string;
  showingProducts: string;
  noProductsFoundMessage: string;
  clearFilters: string;

  // About Page
  aboutHeroSubtitle: string;
  yearsOfExcellence: string;
  containersAnnually: string;
  customerSatisfaction: string;
  ourMissionAndValues: string;
  qualityFirst: string;
  qualityFirstDesc: string;
  globalReach: string;
  globalReachDesc: string;
  sustainability: string;
  sustainabilityDesc: string;
  partnership: string;
  partnershipDesc: string;
  innovation: string;
  innovationDesc: string;
  trustAndReliability: string;
  trustAndReliabilityDesc: string;
  ourCertifications: string;
  ourJourney: string;
  journey2009Title: string;
  journey2009Desc: string;
  journey2012Title: string;
  journey2012Desc: string;
  journey2015Title: string;
  journey2015Desc: string;
  journey2018Title: string;
  journey2018Desc: string;
  journey2021Title: string;
  journey2021Desc: string;
  journey2025Title: string;
  journey2025Desc: string;
  iso9001Desc: string;
  globalGapDesc: string;
  haccpDesc: string;

  // Testimonials
  testimonial1Quote: string;
  testimonial1Author: string;
  testimonial1Company: string;
  testimonial1Country: string;
  testimonial2Quote: string;
  testimonial2Author: string;
  testimonial2Company: string;
  testimonial2Country: string;
  testimonial3Quote: string;
  testimonial3Author: string;
  testimonial3Company: string;
  testimonial3Country: string;

  // Footer
  footerDescription: string;
  cairoEgypt: string;
  ourLocation: string;
  companyLocationTitle: string;
  copyright: string;
  privacyPolicy: string;
  termsOfService: string;
  errorLoadingImage: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    products: 'Products',
    seasonalCalendar: 'Seasonal Calendar',
    processing: 'Processing',
    sorting: 'Sorting',
    packing: 'Packing',
    exporting: 'Exporting',
    aboutUs: 'About Us',
    contact: 'Contact',
    requestQuote: 'Request Quote',
    companyName: 'Al Soadaa',

    // Hero Section
    heroTitle: 'Fresh Egyptian Citrus to Your Market in 48 Hours',
    heroSubtitle: 'ISO 9001 & Global G.A.P Certified Exporter Since 2009',
    viewProducts: 'View Products',

    // Trust Indicators
    yearsExporting: 'Years Exporting',
    countriesServed: 'Countries Served',
    certified: 'ISO & GAP Certified',
    containersPerYear: 'Containers/Year',

    // Products Section
    ourPremiumProducts: 'Our Premium Products',
    freshCertifiedDelivered: 'Fresh, certified, and delivered with care',
    viewAllProducts: 'View All Products',

    // Why Choose Us
    whyChooseUs: 'Why Choose Al Soadaa?',
    qualityCertified: 'Quality Certified',
    qualityCertifiedDesc: 'ISO 9001 and Global G.A.P certified facilities ensure every product meets international quality standards.',
    reliableDelivery: 'Reliable Delivery',
    reliableDeliveryDesc: 'Advanced logistics and cold chain management guarantee fresh delivery to 50+ countries worldwide.',
    freshGuarantee: 'Fresh Guarantee',
    freshGuaranteeDesc: 'Harvest to export in 48 hours. We guarantee peak freshness and maximum shelf life for your customers.',

    // Seasonal Calendar
    seasonalAvailability: 'Seasonal Availability',
    planAheadCalendar: 'Plan ahead with our seasonal harvest calendar',
    viewFullCalendar: 'View Full Calendar',
    peakSeason: 'Peak Season',
    inSeason: 'In Season',

    // Testimonials
    whatClientsSay: 'What Our Clients Say',

    // CTA
    readyToImport: 'Ready to Import Premium Egyptian Products?',
    getCustomizedQuote: 'Get a customized quote for your business needs',
    getYourQuoteToday: 'Get Your Quote Today',

    // Product Detail
    specifications: 'Specifications',
    packaging: 'Packaging',
    sizes: 'Sizes',
    storage: 'Storage',
    shelfLife: 'Shelf Life',
    certifications: 'Certifications',
    availability: 'Availability',
    gallery: 'Gallery',

    // Calendar
    productsAvailableIn: 'Products Available in',
    viewCalendar: 'View Calendar',
    viewByMonth: 'View by Month',
    legend: 'Legend',
    available: 'Available',
    notAvailable: 'Not Available',
    product: 'Product',
    noProductsAvailable: 'No products available in',

    // Contact
    getInTouch: 'Get in Touch',
    contactDescription: 'Have questions or ready to place an order? Contact us today.',
    fullName: 'Full Name',
    email: 'Email',
    company: 'Company',
    phone: 'Phone',
    country: 'Country',
    message: 'Message',
    sendMessage: 'Send Message',
    howCanWeHelp: 'How Can We Help You?',
    chooseWayToReach: 'Choose the best way to reach us. Our team is ready to assist with your inquiries.',
    requestAQuote: 'Request a Quote',
    getCustomizedQuoteDesc: 'Get a customized quote for your specific needs. Fill out our multi-step form and we\'ll respond within 24 hours.',
    startQuoteRequest: 'Start Quote Request →',
    callUsDirectly: 'Call Us Directly',
    speakWithSpecialists: 'Speak with our export specialists immediately.',
    emailUs: 'Email Us',
    sendDetailedInquiry: 'Send us a detailed inquiry at your convenience.',
    contactInformation: 'Contact Information',
    headOffice: 'Head Office',
    phoneNumbers: 'Phone Numbers',
    emailAddresses: 'Email Addresses',
    businessHours: 'Business Hours',
    backToContactOptions: '← Back to Contact Options',

    // About
    aboutAlSoadaa: 'About Al Soadaa',
    ourStory: 'Our Story',
    ourMission: 'Our Mission',
    ourVision: 'Our Vision',

    // Quote Form
    contactInformationStep: 'Contact Information',
    productSelectionStep: 'Product Selection',
    additionalDetailsStep: 'Additional Details',
    companyNameLabel: 'Company Name *',
    contactPersonLabel: 'Contact Person *',
    emailAddressLabel: 'Email Address *',
    phoneNumberLabel: 'Phone Number *',
    selectCountryPlaceholder: 'Select your country',
    selectProductsLabel: 'Select Products of Interest *',
    estimatedQuantityLabel: 'Estimated Quantity *',
    selectQuantityPlaceholder: 'Select quantity range',
    deliveryTimeframeLabel: 'Preferred Delivery Timeframe *',
    deliveryTimeframePlaceholder: 'When do you need delivery?',
    additionalMessageLabel: 'Additional Message (Optional)',
    optionalText: 'Optional',
    backButton: 'Back',
    nextButton: 'Next',
    submitButton: 'Submit',
    clearFormButton: 'Clear Form',
    quoteSubmittedTitle: 'Quote Request Submitted!',
    quoteSubmittedMessage: 'Thank you for your interest in our products. We\'ve received your request and will review it shortly.',
    referenceNumberLabel: 'Reference Number',
    saveReferenceText: 'Save this number for your records',
    confirmationEmailLabel: 'Confirmation Email',
    confirmationEmailMessage: 'A confirmation email has been sent to',
    responseTimeLabel: 'Response Time',
    responseTimeMessage: 'Our team will respond within 24-48 hours',
    yourSelectionLabel: 'Your Selection',
    productsLabel: 'Products',
    quantityLabel: 'Quantity',
    deliveryLabel: 'Delivery',
    backToHomeButton: 'Back to Home',
    submitAnotherButton: 'Submit Another Request',
    needHelpText: 'Need immediate assistance?',
    contactSalesLink: 'Contact our sales team',
    errorTitle: 'Error',
    errorWhatToDo: 'What to do:',
    errorCheckConnection: 'Check your internet connection',
    errorVerifyFields: 'Verify all required fields are filled',
    errorTryAgain: 'Try submitting again',
    errorContactSupport: 'If the problem persists, contact support',
    loadingProductsText: 'Loading Products...',
    unableToLoadProductsTitle: 'Unable to Load Products',
    unableToLoadProductsMessage: 'Please check your internet connection and try again.',
    retryButton: 'Retry',
    noProductsTitle: 'No Products Available',
    noProductsMessage: 'There are currently no products available for your language selection.',
    refreshButton: 'Refresh',
    containers1to5: '1-5 containers',
    containers5to20: '5-20 containers',
    containers20to50: '20-50 containers',
    containers50plus: '50+ containers',
    deliveryImmediate: 'Immediate (within 2 weeks)',
    deliveryMonth: 'Within 1 month',
    deliveryQuarter: 'Within 3 months',
    deliveryFlexible: 'Flexible',

    // New Keys
    resumeRequestTitle: 'Resume Previous Request?',
    resumeRequestMessage: 'You have an unfinished quote request. Would you like to continue where you left off?',
    startFreshButton: 'Start Fresh',
    continueButton: 'Continue',
    step: 'Step',
    of: 'of',
    complete: 'Complete',
    offlineMessage: "You're offline. Some features may be limited.",
    online: 'Online',
    offline: 'Offline',
    requestQuoteTitle: 'Request a Quote',
    requestQuoteSubtitle: 'Get a customized quote for premium Egyptian products',
    summaryTitle: 'Summary',
    shareRequirements: 'Share any specific requirements or questions',
    submitting: 'Submitting...',
    submitQuoteRequest: 'Submit Quote Request',
    otherCountry: 'Other',
    validationRequired: 'is required',
    validationEmail: 'Please enter a valid email address',
    validationPhone: 'Please enter a valid phone number',
    validationCompany: 'Company name must be at least 2 characters',
    validationContact: 'Contact person name must be at least 2 characters',
    validationCountry: 'Please select a country',
    validationQuantity: 'Please select a quantity range',
    validationDelivery: 'Please select a delivery timeframe',
    noProductsFound: 'No products found. Please select products again.',
    fillAllFields: 'Please fill in all required fields before submitting.',
    networkError: 'Network connection issue. Please check your internet and try again.',
    serverError: 'Our servers are experiencing issues. Please try again in a few minutes.',
    authError: 'Authentication error. Please refresh the page and try again.',
    maxRetriesError: 'Failed to load products after multiple attempts.',
    connectionError: 'Unable to connect. Please check your internet connection.',
    loadFailed: 'Failed to load products. Please try again.',
    tryTheseSteps: 'Try these steps:',
    refreshPage: 'Refresh the page',
    clearCache: 'Clear your browser cache',
    tryLater: 'Try again in a few minutes',
    contactSupport: 'Contact Support',
    showingCached: 'Showing Cached Products (Limited)',

    // Months
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December',

    // Categories
    citrus: 'Citrus',
    vegetables: 'Vegetables',
    berries: 'Berries',
    lemons: 'Lemons',
    grapes: 'Grapes',

    // Seasons
    seasonInSeason: 'In Season',
    seasonPeak: 'Peak Season',
    seasonComingSoon: 'Coming Soon',
    seasonLastWeeks: 'Last Weeks',

    // Common
    viewDetails: 'View Details',
    swipeToExplore: 'Swipe to explore',


    // New Keys for Phase 2
    loadingCalendar: 'Loading calendar...',
    loadingProduct: 'Loading product...',
    productNotFound: 'Product Not Found',
    productNotFoundMessage: "The product you're looking for doesn't exist.",
    invalidProductData: 'Invalid Product Data',
    invalidProductDataMessage: 'Product data is incomplete.',
    errorPreparingData: 'Error Preparing Data',
    errorPreparingDataMessage: 'Something went wrong while preparing the product data.',
    backToProducts: 'Back to Products',
    home: 'Home',
    relatedProducts: 'Related Products',
    quickInformation: 'Quick Information',
    deliveryTimeline: 'Delivery Timeline',
    storageRequirements: 'Storage Requirements',
    availableSizes: 'Available Sizes',
    packagingOptions: 'Packaging Options',
    oranges: 'Oranges',
    pomegranates: 'Pomegranates',
    strawberries: 'Strawberries',
    storageRequirementsDesc: 'Cold storage recommended',
    deliveryTimelineDesc: 'Fresh harvest to export in 48 hours with cold chain management.',
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    scheduleCallback: 'Schedule Callback',
    variousOptions: 'Various options',
    coldStorage: 'Cold storage',
    contactForDetails: 'Contact for details',
    shipping: 'Shipping',
    productSpecifications: 'Product Specifications',
    shippingAndStorage: 'Shipping & Storage',
    filters: 'Filters',
    search: 'Search',
    searchPlaceholder: 'Search products...',
    category: 'Category',
    clearAllFilters: 'Clear All Filters',
    applyFilters: 'Apply Filters',
    showingProducts: 'Showing {count} of {total} products',
    noProductsFoundMessage: 'Try adjusting your filters or search term',
    clearFilters: 'Clear Filters',

    // About Page
    aboutHeroSubtitle: 'Trusted Egyptian Exporter Since 2009',
    yearsOfExcellence: 'Years of Excellence',
    containersAnnually: 'Containers Annually',
    customerSatisfaction: 'Customer Satisfaction',
    ourMissionAndValues: 'Our Mission & Values',
    qualityFirst: 'Quality First',
    qualityFirstDesc: 'We never compromise on quality. Every product undergoes rigorous inspection to meet international standards.',
    globalReach: 'Global Reach',
    globalReachDesc: 'Serving customers across Europe, Asia, and the Middle East with reliable logistics and timely delivery.',
    sustainability: 'Sustainability',
    sustainabilityDesc: 'We promote sustainable farming practices that protect the environment for future generations.',
    partnership: 'Partnership',
    partnershipDesc: 'We build long-term relationships with farmers, ensuring fair prices and sustainable livelihoods.',
    innovation: 'Innovation',
    innovationDesc: 'Continuously improving our processes and adopting new technologies to serve you better.',
    trustAndReliability: 'Trust & Reliability',
    trustAndReliabilityDesc: 'Transparency in all our dealings and consistent delivery on our promises.',
    ourCertifications: 'Our Certifications',
    ourJourney: 'Our Journey',
    journey2009Title: 'Company Founded',
    journey2009Desc: 'Al Soadaa Export begins operations with a focus on citrus fruits.',
    journey2012Title: 'ISO 9001 Certification',
    journey2012Desc: 'Achieved ISO 9001 certification, establishing quality management systems.',
    journey2015Title: 'Global G.A.P Certified',
    journey2015Desc: 'Obtained Global G.A.P certification for sustainable agricultural practices.',
    journey2018Title: 'Expanded Product Range',
    journey2018Desc: 'Added vegetables and pomegranates to our export portfolio.',
    journey2021Title: '50 Countries Milestone',
    journey2021Desc: 'Reached the milestone of exporting to 50+ countries worldwide.',
    journey2025Title: 'Digital Transformation',
    journey2025Desc: 'Launched modern website and digital platform for better customer service.',
    iso9001Desc: 'Quality Management System certification ensuring consistent quality control and customer satisfaction.',
    globalGapDesc: 'Good Agricultural Practices certification guaranteeing safe and sustainable agricultural production.',
    haccpDesc: 'Hazard Analysis and Critical Control Points certification for food safety management.',

    // Testimonials
    testimonial1Quote: "Al Soadaa has been our trusted supplier for over 5 years. Their commitment to quality and reliable delivery is unmatched.",
    testimonial1Author: "Mohammed Al-Rashid",
    testimonial1Company: "Premium Foods Distribution",
    testimonial1Country: "Saudi Arabia",
    testimonial2Quote: "The quality of their citrus products is exceptional. Every shipment arrives fresh and meets our strict standards.",
    testimonial2Author: "Elena Popov",
    testimonial2Company: "Euro Fresh Imports",
    testimonial2Country: "Russia",
    testimonial3Quote: "Professional service from start to finish. Al Soadaa understands the needs of international markets.",
    testimonial3Author: "David Chen",
    testimonial3Company: "Asian Markets Group",
    testimonial3Country: "China",

    // Footer
    footerDescription: 'Premium Egyptian agricultural exporter since 2009. Delivering fresh, certified products to markets worldwide.',
    cairoEgypt: 'Cairo, Egypt',
    ourLocation: 'Our Location',
    companyLocationTitle: 'Al Soadaa Company Location',
    copyright: '© 2025 Al Soadaa Export. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    errorLoadingImage: 'Error loading image',

    // Countries
    saudiArabia: 'Saudi Arabia',
    russia: 'Russia',
    china: 'China',
    germany: 'Germany',
    unitedKingdom: 'United Kingdom',
    france: 'France',
    italy: 'Italy',
    uae: 'UAE',
  },
  ar: {
    // Header
    products: 'المنتجات',
    seasonalCalendar: 'التقويم الموسمي',
    processing: 'المعالجة',
    sorting: 'الفرز',
    packing: 'التعبئة',
    exporting: 'التصدير',
    aboutUs: 'من نحن',
    contact: 'اتصل بنا',
    requestQuote: 'طلب عرض سعر',
    companyName: 'الصعداء',

    // Hero Section
    heroTitle: 'حمضيات مصرية طازجة إلى سوقك في 48 ساعة',
    heroSubtitle: 'مُصدّر معتمد بشهادة ISO 9001 و Global G.A.P منذ 2009',
    viewProducts: 'عرض المنتجات',

    // Trust Indicators
    yearsExporting: 'سنوات من التصدير',
    countriesServed: 'دولة نخدمها',
    certified: 'معتمد ISO و GAP',
    containersPerYear: 'حاوية/سنة',

    // Products Section
    ourPremiumProducts: 'منتجاتنا المميزة',
    freshCertifiedDelivered: 'طازجة، معتمدة، ومُسلّمة بعناية',
    viewAllProducts: 'عرض جميع المنتجات',

    // Why Choose Us
    whyChooseUs: 'لماذا تختار الصعداء؟',
    qualityCertified: 'جودة معتمدة',
    qualityCertifiedDesc: 'مرافق معتمدة بشهادة ISO 9001 و Global G.A.P تضمن أن كل منتج يلبي معايير الجودة الدولية.',
    reliableDelivery: 'توصيل موثوق',
    reliableDeliveryDesc: 'الخدمات اللوجستية المتقدمة وإدارة السلسلة الباردة تضمن التوصيل الطازج إلى أكثر من 50 دولة حول العالم.',
    freshGuarantee: 'ضمان النضارة',
    freshGuaranteeDesc: 'من الحصاد إلى التصدير في 48 ساعة. نضمن أقصى درجات النضارة وأطول فترة صلاحية لعملائك.',

    // Seasonal Calendar
    seasonalAvailability: 'التوفر الموسمي',
    planAheadCalendar: 'خطط مسبقاً مع تقويم الحصاد الموسمي',
    viewFullCalendar: 'عرض التقويم الكامل',
    peakSeason: 'موسم الذروة',
    inSeason: 'في الموسم',

    // Testimonials
    whatClientsSay: 'ماذا يقول عملاؤنا',

    // CTA
    readyToImport: 'هل أنت مستعد لاستيراد منتجات مصرية مميزة؟',
    getCustomizedQuote: 'احصل على عرض سعر مخصص لاحتياجات عملك',
    getYourQuoteToday: 'احصل على عرضك اليوم',

    // Product Detail
    specifications: 'المواصفات',
    packaging: 'التعبئة',
    sizes: 'الأحجام',
    storage: 'التخزين',
    shelfLife: 'فترة الصلاحية',
    certifications: 'الشهادات',
    availability: 'التوفر',
    gallery: 'المعرض',

    // Calendar
    productsAvailableIn: 'المنتجات المتاحة في',
    viewCalendar: 'عرض التقويم',
    viewByMonth: 'عرض حسب الشهر',
    legend: 'وسيلة الإيضاح',
    available: 'متاح',
    notAvailable: 'غير متاح',
    product: 'المنتج',
    noProductsAvailable: 'لا توجد منتجات متاحة في',

    // Contact
    getInTouch: 'تواصل معنا',
    contactDescription: 'هل لديك أسئلة أو مستعد لتقديم طلب؟ اتصل بنا اليوم.',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    company: 'الشركة',
    phone: 'الهاتف',
    country: 'الدولة',
    message: 'الرسالة',
    sendMessage: 'إرسال الرسالة',
    howCanWeHelp: 'كيف يمكننا مساعدتك؟',
    chooseWayToReach: 'اختر أفضل طريقة للتواصل معنا. فريقنا جاهز للمساعدة في استفساراتك.',
    requestAQuote: 'طلب عرض سعر',
    getCustomizedQuoteDesc: 'احصل على عرض سعر مخصص لاحتياجاتك المحددة. املأ نموذجنا متعدد الخطوات وسنرد خلال 24 ساعة.',
    startQuoteRequest: 'بدء طلب العرض ←',
    callUsDirectly: 'اتصل بنا مباشرة',
    speakWithSpecialists: 'تحدث مع متخصصي التصدير لدينا فوراً.',
    emailUs: 'راسلنا عبر البريد الإلكتروني',
    sendDetailedInquiry: 'أرسل لنا استفساراً مفصلاً في الوقت المناسب لك.',
    contactInformation: 'معلومات الاتصال',
    headOffice: 'المكتب الرئيسي',
    phoneNumbers: 'أرقام الهواتف',
    emailAddresses: 'عناوين البريد الإلكتروني',
    businessHours: 'ساعات العمل',
    backToContactOptions: '→ العودة إلى خيارات الاتصال',

    // About
    aboutAlSoadaa: 'عن الصعداء',
    ourStory: 'قصتنا',
    ourMission: 'مهمتنا',
    ourVision: 'رؤيتنا',

    // Months
    january: 'يناير',
    february: 'فبراير',
    march: 'مارس',
    april: 'أبريل',
    may: 'مايو',
    june: 'يونيو',
    july: 'يوليو',
    august: 'أغسطس',
    september: 'سبتمبر',
    october: 'أكتوبر',
    november: 'نوفمبر',
    december: 'ديسمبر',

    // Categories
    citrus: 'حمضيات',
    vegetables: 'خضروات',
    berries: 'توت',
    lemons: 'ليمون',
    grapes: 'عنب',

    // Seasons
    seasonInSeason: 'في الموسم',
    seasonPeak: 'موسم الذروة',
    seasonComingSoon: 'قريباً',
    seasonLastWeeks: 'الأسابيع الأخيرة',

    // Common
    viewDetails: 'عرض التفاصيل',
    swipeToExplore: 'اسحب لاستكشاف',

    // New Keys (Arabic)
    resumeRequestTitle: 'استكمال الطلب السابق؟',
    resumeRequestMessage: 'لديك طلب عرض سعر غير مكتمل. هل ترغب في المتابعة من حيث توقفت؟',
    startFreshButton: 'بدء جديد',
    continueButton: 'متابعة',
    step: 'خطوة',
    of: 'من',
    complete: 'مكتمل',
    offlineMessage: "أنت غير متصل بالإنترنت. قد تكون بعض الميزات محدودة.",
    online: 'متصل',
    offline: 'غير متصل',
    requestQuoteTitle: 'طلب عرض سعر',
    requestQuoteSubtitle: 'احصل على عرض سعر مخصص للمنتجات المصرية المميزة',
    summaryTitle: 'الملخص',
    shareRequirements: 'شارك أي متطلبات أو أسئلة محددة',
    submitting: 'جاري الإرسال...',
    submitQuoteRequest: 'إرسال طلب العرض',
    otherCountry: 'أخرى',
    validationRequired: 'مطلوب',
    validationEmail: 'يرجى إدخال عنوان بريد إلكتروني صالح',
    validationPhone: 'يرجى إدخال رقم هاتف صالح',
    validationCompany: 'يجب أن يكون اسم الشركة حرفين على الأقل',
    validationContact: 'يجب أن يكون اسم الشخص المسؤول حرفين على الأقل',
    validationCountry: 'يرجى اختيار دولة',
    validationQuantity: 'يرجى اختيار نطاق الكمية',
    validationDelivery: 'يرجى اختيار إطار زمني للتسليم',
    noProductsFound: 'لم يتم العثور على منتجات. يرجى اختيار المنتجات مرة أخرى.',
    fillAllFields: 'يرجى ملء جميع الحقول المطلوبة قبل الإرسال.',
    networkError: 'مشكلة في الاتصال بالشبكة. يرجى التحقق من الإنترنت والمحاولة مرة أخرى.',
    serverError: 'تواجه خوادمنا مشاكل. يرجى المحاولة مرة أخرى بعد بضع دقائق.',
    authError: 'خطأ في المصادقة. يرجى تحديث الصفحة والمحاولة مرة أخرى.',
    maxRetriesError: 'فشل تحميل المنتجات بعد عدة محاولات.',
    connectionError: 'تعذر الاتصال. يرجى التحقق من اتصال الإنترنت الخاص بك.',
    loadFailed: 'فشل تحميل المنتجات. يرجى المحاولة مرة أخرى.',
    tryTheseSteps: 'جرب هذه الخطوات:',
    refreshPage: 'تحديث الصفحة',
    clearCache: 'مسح ذاكرة التخزين المؤقت للمتصفح',
    tryLater: 'حاول مرة أخرى بعد بضع دقائق',
    contactSupport: 'اتصل بالدعم',
    showingCached: 'عرض المنتجات المحفوظة (محدود)',

    // Quote Form (missing from ar)
    contactInformationStep: 'معلومات الاتصال',
    productSelectionStep: 'اختيار المنتجات',
    additionalDetailsStep: 'تفاصيل إضافية',
    companyNameLabel: 'اسم الشركة *',
    contactPersonLabel: 'الشخص المسؤول *',
    emailAddressLabel: 'البريد الإلكتروني *',
    phoneNumberLabel: 'رقم الهاتف *',
    selectCountryPlaceholder: 'اختر دولتك',
    selectProductsLabel: 'اختر المنتجات المهتم بها *',
    estimatedQuantityLabel: 'الكمية المقدرة *',
    selectQuantityPlaceholder: 'اختر نطاق الكمية',
    deliveryTimeframeLabel: 'الإطار الزمني المفضل للتسليم *',
    deliveryTimeframePlaceholder: 'متى تحتاج التسليم؟',
    additionalMessageLabel: 'رسالة إضافية (اختياري)',
    optionalText: 'اختياري',
    backButton: 'رجوع',
    nextButton: 'التالي',
    submitButton: 'إرسال',
    clearFormButton: 'مسح النموذج',
    quoteSubmittedTitle: 'تم إرسال طلب العرض!',
    quoteSubmittedMessage: 'شكراً لاهتمامك بمنتجاتنا. لقد استلمنا طلبك وسنراجعه قريباً.',
    referenceNumberLabel: 'الرقم المرجعي',
    saveReferenceText: 'احفظ هذا الرقم لسجلاتك',
    confirmationEmailLabel: 'بريد التأكيد',
    confirmationEmailMessage: 'تم إرسال بريد تأكيد إلى',
    responseTimeLabel: 'وقت الرد',
    responseTimeMessage: 'سيرد فريقنا خلال 24-48 ساعة',
    yourSelectionLabel: 'اختيارك',
    productsLabel: 'المنتجات',
    quantityLabel: 'الكمية',
    deliveryLabel: 'التسليم',
    backToHomeButton: 'العودة للرئيسية',
    submitAnotherButton: 'إرسال طلب آخر',
    needHelpText: 'تحتاج مساعدة فورية؟',
    contactSalesLink: 'اتصل بفريق المبيعات',
    errorTitle: 'خطأ',
    errorWhatToDo: 'ماذا تفعل:',
    errorCheckConnection: 'تحقق من اتصالك بالإنترنت',
    errorVerifyFields: 'تحقق من ملء جميع الحقول المطلوبة',
    errorTryAgain: 'حاول الإرسال مرة أخرى',
    errorContactSupport: 'إذا استمرت المشكلة، اتصل بالدعم',
    loadingProductsText: 'جاري تحميل المنتجات...',
    unableToLoadProductsTitle: 'تعذر تحميل المنتجات',
    unableToLoadProductsMessage: 'يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.',
    retryButton: 'إعادة المحاولة',
    noProductsTitle: 'لا توجد منتجات متاحة',
    noProductsMessage: 'لا توجد حالياً منتجات متاحة لاختيار اللغة الخاص بك.',
    refreshButton: 'تحديث',
    containers1to5: '1-5 حاويات',
    containers5to20: '5-20 حاوية',
    containers20to50: '20-50 حاوية',
    containers50plus: '50+ حاوية',
    deliveryImmediate: 'فوري (خلال أسبوعين)',
    deliveryMonth: 'خلال شهر',
    deliveryQuarter: 'خلال 3 أشهر',
    deliveryFlexible: 'مرن',


    // New Keys for Phase 2
    loadingCalendar: 'جاري تحميل التقويم...',
    loadingProduct: 'جاري تحميل المنتج...',
    productNotFound: 'المنتج غير موجود',
    productNotFoundMessage: 'المنتج الذي تبحث عنه غير موجود.',
    invalidProductData: 'بيانات المنتج غير صالحة',
    invalidProductDataMessage: 'بيانات المنتج غير مكتملة.',
    errorPreparingData: 'خطأ في تجهيز البيانات',
    errorPreparingDataMessage: 'حدث خطأ ما أثناء تجهيز بيانات المنتج.',
    backToProducts: 'العودة للمنتجات',
    home: 'الرئيسية',
    relatedProducts: 'منتجات ذات صلة',
    quickInformation: 'معلومات سريعة',
    deliveryTimeline: 'جدول التسليم',
    storageRequirements: 'متطلبات التخزين',
    availableSizes: 'الأحجام المتاحة',
    packagingOptions: 'خيارات التعبئة',
    oranges: 'برتقال',
    pomegranates: 'رمان',
    strawberries: 'فراولة',
    storageRequirementsDesc: 'يوصى بالتخزين البارد',
    deliveryTimelineDesc: 'من الحصاد للتصدير في 48 ساعة مع إدارة السلسلة الباردة.',
    loading: 'جاري التحميل...',
    error: 'خطأ',
    retry: 'إعادة المحاولة',
    scheduleCallback: 'جدولة اتصال',
    variousOptions: 'خيارات متعددة',
    coldStorage: 'تخزين بارد',
    contactForDetails: 'اتصل للتفاصيل',
    shipping: 'الشحن',
    productSpecifications: 'مواصفات المنتج',
    shippingAndStorage: 'الشحن والتخزين',
    filters: 'تصفية',
    search: 'بحث',
    searchPlaceholder: 'بحث عن منتجات...',
    category: 'الفئة',
    clearAllFilters: 'مسح جميع الفلاتر',
    applyFilters: 'تطبيق الفلاتر',
    showingProducts: 'عرض {count} من {total} منتج',
    noProductsFoundMessage: 'حاول تعديل الفلاتر أو مصطلح البحث',
    clearFilters: 'مسح الفلاتر',

    // About Page
    aboutHeroSubtitle: 'مُصدّر مصري موثوق منذ 2009',
    yearsOfExcellence: 'سنوات من التميز',
    containersAnnually: 'حاوية سنوياً',
    customerSatisfaction: 'رضا العملاء',
    ourMissionAndValues: 'مهمتنا وقيمنا',
    qualityFirst: 'الجودة أولاً',
    qualityFirstDesc: 'لا نساوم أبداً على الجودة. يخضع كل منتج لفحص دقيق لتلبية المعايير الدولية.',
    globalReach: 'الوصول العالمي',
    globalReachDesc: 'خدمة العملاء في جميع أنحاء أوروبا وآسيا والشرق الأوسط مع خدمات لوجستية موثوقة وتسليم في الوقت المناسب.',
    sustainability: 'الاستدامة',
    sustainabilityDesc: 'نحن نشجع ممارسات الزراعة المستدامة التي تحمي البيئة للأجيال القادمة.',
    partnership: 'الشراكة',
    partnershipDesc: 'نبني علاقات طويلة الأمد مع المزارعين، مما يضمن أسعاراً عادلة وسبل عيش مستدامة.',
    innovation: 'الابتكار',
    innovationDesc: 'نعمل باستمرار على تحسين عملياتنا واعتماد تقنيات جديدة لخدمتكم بشكل أفضل.',
    trustAndReliability: 'الثقة والموثوقية',
    trustAndReliabilityDesc: 'الشفافية في جميع تعاملاتنا والوفاء المستمر بوعودنا.',
    ourCertifications: 'شهاداتنا',
    ourJourney: 'رحلتنا',
    journey2009Title: 'تأسيس الشركة',
    journey2009Desc: 'بدأت الصعداء للتصدير عملياتها بالتركيز على الحمضيات.',
    journey2012Title: 'شهادة ISO 9001',
    journey2012Desc: 'الحصول على شهادة ISO 9001، وتأسيس أنظمة إدارة الجودة.',
    journey2015Title: 'شهادة Global G.A.P',
    journey2015Desc: 'الحصول على شهادة Global G.A.P للممارسات الزراعية المستدامة.',
    journey2018Title: 'توسيع نطاق المنتجات',
    journey2018Desc: 'إضافة الخضروات والرمان إلى محفظة التصدير لدينا.',
    journey2021Title: 'إنجاز 50 دولة',
    journey2021Desc: 'الوصول إلى إنجاز التصدير إلى أكثر من 50 دولة حول العالم.',
    journey2025Title: 'التحول الرقمي',
    journey2025Desc: 'إطلاق موقع ويب حديث ومنصة رقمية لخدمة عملاء أفضل.',
    iso9001Desc: 'شهادة نظام إدارة الجودة تضمن مراقبة الجودة المستمرة ورضا العملاء.',
    globalGapDesc: 'شهادة الممارسات الزراعية الجيدة تضمن إنتاجاً زراعياً آمناً ومستداماً.',
    haccpDesc: 'شهادة تحليل المخاطر ونقاط التحكم الحرجة لإدارة سلامة الغذاء.',

    // Testimonials
    testimonial1Quote: "كانت الصعداء موردنا الموثوق لأكثر من 5 سنوات. التزامهم بالجودة والتسليم الموثوق لا مثيل له.",
    testimonial1Author: "محمد الراشد",
    testimonial1Company: "توزيع الأغذية المميزة",
    testimonial1Country: "المملكة العربية السعودية",
    testimonial2Quote: "جودة منتجات الحمضيات لديهم استثنائية. كل شحنة تصل طازجة وتلبي معاييرنا الصارمة.",
    testimonial2Author: "إيلينا بوبوف",
    testimonial2Company: "يورو فريش للاستيراد",
    testimonial2Country: "روسيا",
    testimonial3Quote: "خدمة احترافية من البداية للنهاية. تفهم الصعداء احتياجات الأسواق الدولية.",
    testimonial3Author: "ديفيد تشين",
    testimonial3Company: "مجموعة الأسواق الآسيوية",
    testimonial3Country: "الصين",

    // Footer
    footerDescription: 'مُصدّر زراعي مصري متميز منذ عام 2009. نقدم منتجات طازجة ومعتمدة للأسواق العالمية.',
    cairoEgypt: 'القاهرة، مصر',
    ourLocation: 'موقعنا',
    companyLocationTitle: 'موقع شركة الصعداء',
    copyright: '© 2025 الصعداء للتصدير. جميع الحقوق محفوظة.',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
    errorLoadingImage: 'خطأ في تحميل الصورة',

    // Countries
    saudiArabia: 'المملكة العربية السعودية',
    russia: 'روسيا',
    china: 'الصين',
    germany: 'ألمانيا',
    unitedKingdom: 'المملكة المتحدة',
    france: 'فرنسا',
    italy: 'إيطاليا',
    uae: 'الإمارات العربية المتحدة',
  },
  ru: {
    // Header
    products: 'Продукты',
    seasonalCalendar: 'Сезонный календарь',
    processing: 'Обработка',
    sorting: 'Сортировка',
    packing: 'Упаковка',
    exporting: 'Экспорт',
    aboutUs: 'О нас',
    contact: 'Контакты',
    requestQuote: 'Запросить цену',
    companyName: 'Al Soadaa',

    // Hero Section
    heroTitle: 'Свежие египетские цитрусовые на ваш рынок за 48 часов',
    heroSubtitle: 'Сертифицированный экспортер ISO 9001 и Global G.A.P с 2009 года',
    viewProducts: 'Посмотреть продукты',

    // Trust Indicators
    yearsExporting: 'Лет экспорта',
    countriesServed: 'Обслуживаемых стран',
    certified: 'Сертификат ISO и GAP',
    containersPerYear: 'Контейнеров/год',

    // Products Section
    ourPremiumProducts: 'Наши премиальные продукты',
    freshCertifiedDelivered: 'Свежие, сертифицированные и доставленные с заботой',
    viewAllProducts: 'Посмотреть все продукты',

    // Why Choose Us
    whyChooseUs: 'Почему выбирают Al Soadaa?',
    qualityCertified: 'Сертифицированное качество',
    qualityCertifiedDesc: 'Сертифицированные по ISO 9001 и Global G.A.P объекты гарантируют, что каждый продукт соответствует международным стандартам качества.',
    reliableDelivery: 'Надежная доставка',
    reliableDeliveryDesc: 'Передовая логистика и управление холодовой цепью гарантируют свежую доставку в более чем 50 стран мира.',
    freshGuarantee: 'Гарантия свежести',
    freshGuaranteeDesc: 'От сбора урожая до экспорта за 48 часов. Мы гарантируем максимальную свежесть и срок хранения для ваших клиентов.',

    // Seasonal Calendar
    seasonalAvailability: 'Сезонная доступность',
    planAheadCalendar: 'Планируйте заранее с нашим календарем сезонного урожая',
    viewFullCalendar: 'Посмотреть полный календарь',
    peakSeason: 'Пиковый сезон',
    inSeason: 'В сезоне',

    // Testimonials
    whatClientsSay: 'Что говорят наши клиенты',

    // CTA
    readyToImport: 'Готовы импортировать премиальные египетские продукты?',
    getCustomizedQuote: 'Получите индивидуальное предложение для вашего бизнеса',
    getYourQuoteToday: 'Получите предложение сегодня',

    // Product Detail
    specifications: 'Характеристики',
    packaging: 'Упаковка',
    sizes: 'Размеры',
    storage: 'Хранение',
    shelfLife: 'Срок годности',
    certifications: 'Сертификаты',
    availability: 'Доступность',
    gallery: 'Галерея',

    // Calendar
    productsAvailableIn: 'Продукты доступны в',
    viewCalendar: 'Посмотреть календарь',
    viewByMonth: 'Посмотреть по месяцам',
    legend: 'Легенда',
    available: 'Доступно',
    notAvailable: 'Недоступно',
    product: 'Продукт',
    noProductsAvailable: 'Нет доступных продуктов в',

    // Contact
    getInTouch: 'Свяжитесь с нами',
    contactDescription: 'Есть вопросы или готовы сделать заказ? Свяжитесь с нами сегодня.',
    fullName: 'Полное имя',
    email: 'Электронная почта',
    company: 'Компания',
    phone: 'Телефон',
    country: 'Страна',
    message: 'Сообщение',
    sendMessage: 'Отправить сообщение',
    howCanWeHelp: 'Как мы можем вам помочь?',
    chooseWayToReach: 'Выберите лучший способ связаться с нами. Наша команда готова помочь с вашими запросами.',
    requestAQuote: 'Запросить цену',
    getCustomizedQuoteDesc: 'Получите индивидуальное предложение для ваших конкретных потребностей. Заполните нашу многоэтапную форму, и мы ответим в течение 24 часов.',
    startQuoteRequest: 'Начать запрос предложения →',
    callUsDirectly: 'Позвоните нам напрямую',
    speakWithSpecialists: 'Поговорите с нашими специалистами по экспорту немедленно.',
    emailUs: 'Напишите нам',
    sendDetailedInquiry: 'Отправьте нам подробный запрос в удобное для вас время.',
    contactInformation: 'Контактная информация',
    headOffice: 'Главный офис',
    phoneNumbers: 'Телефонные номера',
    emailAddresses: 'Адреса электронной почты',
    businessHours: 'Часы работы',
    backToContactOptions: '← Вернуться к вариантам контакта',

    // About
    aboutAlSoadaa: 'О Al Soadaa',
    ourStory: 'Наша история',
    ourMission: 'Наша миссия',
    ourVision: 'Наше видение',

    // Months
    january: 'Январь',
    february: 'Февраль',
    march: 'Март',
    april: 'Апрель',
    may: 'Май',
    june: 'Июнь',
    july: 'Июль',
    august: 'Август',
    september: 'Сентябрь',
    october: 'Октябрь',
    november: 'Ноябрь',
    december: 'Декабрь',

    // Categories
    citrus: 'Цитрусовые',
    vegetables: 'Овощи',
    berries: 'Ягоды',
    lemons: 'Лимоны',
    grapes: 'Виноград',

    // Seasons
    seasonInSeason: 'В сезоне',
    seasonPeak: 'Пиковый сезон',
    seasonComingSoon: 'Скоро',
    seasonLastWeeks: 'Последние недели',

    // Common
    viewDetails: 'Посмотреть детали',
    swipeToExplore: 'Проведите, чтобы изучить',

    // Quote Form (missing from ru)
    contactInformationStep: 'Контактная информация',
    productSelectionStep: 'Выбор продуктов',
    additionalDetailsStep: 'Дополнительные детали',
    companyNameLabel: 'Название компании *',
    contactPersonLabel: 'Контактное лицо *',
    emailAddressLabel: 'Адрес электронной почты *',
    phoneNumberLabel: 'Номер телефона *',
    selectCountryPlaceholder: 'Выберите вашу страну',
    selectProductsLabel: 'Выберите интересующие продукты *',
    estimatedQuantityLabel: 'Ориентировочное количество *',
    selectQuantityPlaceholder: 'Выберите диапазон количества',
    deliveryTimeframeLabel: 'Предпочтительные сроки доставки *',
    deliveryTimeframePlaceholder: 'Когда вам нужна доставка?',
    additionalMessageLabel: 'Дополнительное сообщение (необязательно)',
    optionalText: 'Необязательно',
    backButton: 'Назад',
    nextButton: 'Далее',
    submitButton: 'Отправить',
    clearFormButton: 'Очистить форму',
    quoteSubmittedTitle: 'Запрос предложения отправлен!',
    quoteSubmittedMessage: 'Спасибо за ваш интерес к нашим продуктам. Мы получили ваш запрос и скоро его рассмотрим.',
    referenceNumberLabel: 'Номер ссылки',
    saveReferenceText: 'Сохраните этот номер для ваших записей',
    confirmationEmailLabel: 'Подтверждение по электронной почте',
    confirmationEmailMessage: 'Письмо с подтверждением отправлено на',
    responseTimeLabel: 'Время ответа',
    responseTimeMessage: 'Наша команда ответит в течение 24-48 часов',
    yourSelectionLabel: 'Ваш выбор',
    productsLabel: 'Продукты',
    quantityLabel: 'Количество',
    deliveryLabel: 'Доставка',
    backToHomeButton: 'Вернуться на главную',
    submitAnotherButton: 'Отправить еще один запрос',
    needHelpText: 'Нужна немедленная помощь?',
    contactSalesLink: 'Свяжитесь с нашим отделом продаж',
    errorTitle: 'Ошибка',
    errorWhatToDo: 'Что делать:',
    errorCheckConnection: 'Проверьте подключение к интернету',
    errorVerifyFields: 'Убедитесь, что все обязательные поля заполнены',
    errorTryAgain: 'Попробуйте отправить снова',
    errorContactSupport: 'Если проблема сохраняется, обратитесь в службу поддержки',
    loadingProductsText: 'Загрузка продуктов...',
    unableToLoadProductsTitle: 'Не удалось загрузить продукты',
    unableToLoadProductsMessage: 'Пожалуйста, проверьте подключение к интернету и попробуйте снова.',
    retryButton: 'Повторить',
    noProductsTitle: 'Нет доступных продуктов',
    noProductsMessage: 'В настоящее время нет доступных продуктов для выбранного вами языка.',
    refreshButton: 'Обновить',
    containers1to5: '1-5 контейнеров',
    containers5to20: '5-20 контейнеров',
    containers20to50: '20-50 контейнеров',
    containers50plus: '50+ контейнеров',
    deliveryImmediate: 'Немедленно (в течение 2 недель)',
    deliveryMonth: 'В течение 1 месяца',
    deliveryQuarter: 'В течение 3 месяцев',
    deliveryFlexible: 'Гибко',
    // New Keys
    resumeRequestTitle: 'Resume Previous Request?',
    resumeRequestMessage: 'You have an unfinished quote request. Would you like to continue where you left off?',
    startFreshButton: 'Start Fresh',
    continueButton: 'Continue',
    step: 'Step',
    of: 'of',
    complete: 'Complete',
    offlineMessage: "You're offline. Some features may be limited.",
    online: 'Online',
    offline: 'Offline',
    requestQuoteTitle: 'Request a Quote',
    requestQuoteSubtitle: 'Get a customized quote for premium Egyptian products',
    summaryTitle: 'Summary',
    shareRequirements: 'Share any specific requirements or questions',
    submitting: 'Submitting...',
    submitQuoteRequest: 'Submit Quote Request',
    otherCountry: 'Other',
    validationRequired: 'is required',
    validationEmail: 'Please enter a valid email address',
    validationPhone: 'Please enter a valid phone number',
    validationCompany: 'Company name must be at least 2 characters',
    validationContact: 'Contact person name must be at least 2 characters',
    validationCountry: 'Please select a country',
    validationQuantity: 'Please select a quantity range',
    validationDelivery: 'Please select a delivery timeframe',
    noProductsFound: 'No products found. Please select products again.',
    fillAllFields: 'Please fill in all required fields before submitting.',
    networkError: 'Network connection issue. Please check your internet and try again.',
    serverError: 'Our servers are experiencing issues. Please try again in a few minutes.',
    authError: 'Authentication error. Please refresh the page and try again.',
    maxRetriesError: 'Failed to load products after multiple attempts.',
    connectionError: 'Unable to connect. Please check your internet connection.',
    loadFailed: 'Failed to load products. Please try again.',
    tryTheseSteps: 'Try these steps:',
    refreshPage: 'Refresh the page',
    clearCache: 'Clear your browser cache',
    tryLater: 'Try again in a few minutes',
    contactSupport: 'Contact Support',
    showingCached: 'Showing Cached Products (Limited)',

    // New Keys for Phase 2
    loadingCalendar: 'Загрузка календаря...',
    loadingProduct: 'Загрузка продукта...',
    productNotFound: 'Продукт не найден',
    productNotFoundMessage: 'Продукт, который вы ищете, не существует.',
    invalidProductData: 'Неверные данные о продукте',
    invalidProductDataMessage: 'Данные о продукте неполные.',
    errorPreparingData: 'Ошибка подготовки данных',
    errorPreparingDataMessage: 'Что-то пошло не так при подготовке данных о продукте.',
    backToProducts: 'Назад к продуктам',
    home: 'Главная',
    relatedProducts: 'Похожие продукты',
    quickInformation: 'Краткая информация',
    deliveryTimeline: 'Сроки доставки',
    storageRequirements: 'Требования к хранению',
    availableSizes: 'Доступные размеры',
    packagingOptions: 'Варианты упаковки',
    oranges: 'Апельсины',
    pomegranates: 'Гранаты',
    strawberries: 'Клубника',
    storageRequirementsDesc: 'Рекомендуется холодное хранение',
    deliveryTimelineDesc: 'Свежий урожай на экспорт за 48 часов с управлением холодовой цепью.',
    loading: 'Загрузка...',
    error: 'Ошибка',
    retry: 'Повторить',
    scheduleCallback: 'Заказать звонок',
    variousOptions: 'Различные варианты',
    coldStorage: 'Холодное хранение',
    contactForDetails: 'Свяжитесь для деталей',
    shipping: 'Доставка',
    productSpecifications: 'Характеристики продукта',
    shippingAndStorage: 'Доставка и хранение',
    filters: 'Фильтры',
    search: 'Поиск',
    searchPlaceholder: 'Поиск продуктов...',
    category: 'Категория',
    clearAllFilters: 'Очистить все фильтры',
    applyFilters: 'Применить фильтры',
    showingProducts: 'Показано {count} из {total} продуктов',
    noProductsFoundMessage: 'Попробуйте изменить фильтры или поисковый запрос',
    clearFilters: 'Очистить фильтры',

    // About Page
    aboutHeroSubtitle: 'Надежный египетский экспортер с 2009 года',
    yearsOfExcellence: 'Лет совершенства',
    containersAnnually: 'Контейнеров ежегодно',
    customerSatisfaction: 'Удовлетворенность клиентов',
    ourMissionAndValues: 'Наша миссия и ценности',
    qualityFirst: 'Качество прежде всего',
    qualityFirstDesc: 'Мы никогда не идем на компромисс в вопросах качества. Каждый продукт проходит строгую проверку.',
    globalReach: 'Глобальный охват',
    globalReachDesc: 'Обслуживание клиентов в Европе, Азии и на Ближнем Востоке с надежной логистикой.',
    sustainability: 'Устойчивое развитие',
    sustainabilityDesc: 'Мы продвигаем устойчивые методы ведения сельского хозяйства, защищающие окружающую среду.',
    partnership: 'Партнерство',
    partnershipDesc: 'Мы строим долгосрочные отношения с фермерами, обеспечивая справедливые цены.',
    innovation: 'Инновации',
    innovationDesc: 'Постоянное совершенствование наших процессов и внедрение новых технологий.',
    trustAndReliability: 'Доверие и надежность',
    trustAndReliabilityDesc: 'Прозрачность во всех наших сделках и последовательное выполнение обещаний.',
    ourCertifications: 'Наши сертификаты',
    ourJourney: 'Наш путь',
    journey2009Title: 'Основание компании',
    journey2009Desc: 'Al Soadaa Export начинает работу с фокусом на цитрусовые.',
    journey2012Title: 'Сертификация ISO 9001',
    journey2012Desc: 'Получение сертификата ISO 9001, создание систем управления качеством.',
    journey2015Title: 'Сертификация Global G.A.P',
    journey2015Desc: 'Получение сертификата Global G.A.P для устойчивых сельскохозяйственных практик.',
    journey2018Title: 'Расширение ассортимента',
    journey2018Desc: 'Добавление овощей и гранатов в наш экспортный портфель.',
    journey2021Title: 'Рубеж в 50 стран',
    journey2021Desc: 'Достижение рубежа экспорта в 50+ стран по всему миру.',
    journey2025Title: 'Цифровая трансформация',
    journey2025Desc: 'Запуск современного веб-сайта и цифровой платформы для лучшего обслуживания.',
    iso9001Desc: 'Сертификация системы менеджмента качества, обеспечивающая постоянный контроль качества.',
    globalGapDesc: 'Сертификация надлежащей сельскохозяйственной практики, гарантирующая безопасное производство.',
    haccpDesc: 'Сертификация анализа рисков и критических контрольных точек для управления безопасностью пищевых продуктов.',

    // Testimonials
    testimonial1Quote: "Al Soadaa является нашим надежным поставщиком более 5 лет. Их приверженность качеству непревзойденна.",
    testimonial1Author: "Мохаммед Аль-Рашид",
    testimonial1Company: "Premium Foods Distribution",
    testimonial1Country: "Саудовская Аравия",
    testimonial2Quote: "Качество их цитрусовых исключительное. Каждая партия прибывает свежей.",
    testimonial2Author: "Елена Попова",
    testimonial2Company: "Euro Fresh Imports",
    testimonial2Country: "Россия",
    testimonial3Quote: "Профессиональное обслуживание от начала до конца. Al Soadaa понимает потребности международных рынков.",
    testimonial3Author: "Дэвид Чен",
    testimonial3Company: "Asian Markets Group",
    testimonial3Country: "Китай",

    // Footer
    footerDescription: 'Премиальный египетский сельскохозяйственный экспортер с 2009 года. Поставка свежих сертифицированных продуктов на мировые рынки.',
    cairoEgypt: 'Каир, Египет',
    ourLocation: 'Наше местоположение',
    companyLocationTitle: 'Местоположение компании Al Soadaa',
    copyright: '© 2025 Al Soadaa Export. Все права защищены.',
    privacyPolicy: 'Политика конфиденциальности',
    termsOfService: 'Условия обслуживания',
    errorLoadingImage: 'Ошибка загрузки изображения',

    // Countries
    saudiArabia: 'Саудовская Аравия',
    russia: 'Россия',
    china: 'Китай',
    germany: 'Германия',
    unitedKingdom: 'Великобритания',
    france: 'Франция',
    italy: 'Италия',
    uae: 'ОАЭ',
  },
};
