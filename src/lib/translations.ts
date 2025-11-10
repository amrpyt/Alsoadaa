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
  },
};
