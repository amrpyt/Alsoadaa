/**
 * Populate Translations (Centralized Schema)
 * 
 * Migrates key UI translations from src/lib/translations.ts to siteTranslationCentralized
 * Run: npx ts-node --esm studio/scripts/populate-translations.ts
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

// ============================================
// TRANSLATION DATA - Key UI Translations
// Categories: navigation, hero, products, forms, contact, about, common, calendar, categories, seasons, system
// ============================================
const translations = [
    // =====================
    // NAVIGATION
    // =====================
    {
        _id: 'trans-nav-products',
        key: 'nav.products',
        category: 'navigation',
        description: 'Main navigation link to products page',
        valueAr: 'المنتجات',
        valueEn: 'Products',
        valueRu: 'Продукты',
    },
    {
        _id: 'trans-nav-seasonal-calendar',
        key: 'nav.seasonalCalendar',
        category: 'navigation',
        description: 'Main navigation link to seasonal calendar',
        valueAr: 'التقويم الموسمي',
        valueEn: 'Seasonal Calendar',
        valueRu: 'Сезонный календарь',
    },
    {
        _id: 'trans-nav-processing',
        key: 'nav.processing',
        category: 'navigation',
        description: 'Main navigation link to processing page',
        valueAr: 'المعالجة',
        valueEn: 'Processing',
        valueRu: 'Обработка',
    },
    {
        _id: 'trans-nav-sorting',
        key: 'nav.sorting',
        category: 'navigation',
        description: 'Navigation link to sorting page',
        valueAr: 'الفرز',
        valueEn: 'Sorting',
        valueRu: 'Сортировка',
    },
    {
        _id: 'trans-nav-packing',
        key: 'nav.packing',
        category: 'navigation',
        description: 'Navigation link to packing page',
        valueAr: 'التعبئة',
        valueEn: 'Packing',
        valueRu: 'Упаковка',
    },
    {
        _id: 'trans-nav-exporting',
        key: 'nav.exporting',
        category: 'navigation',
        description: 'Navigation link to exporting page',
        valueAr: 'التصدير',
        valueEn: 'Exporting',
        valueRu: 'Экспорт',
    },
    {
        _id: 'trans-nav-about',
        key: 'nav.aboutUs',
        category: 'navigation',
        description: 'Navigation link to about us page',
        valueAr: 'من نحن',
        valueEn: 'About Us',
        valueRu: 'О нас',
    },
    {
        _id: 'trans-nav-contact',
        key: 'nav.contact',
        category: 'navigation',
        description: 'Navigation link to contact page',
        valueAr: 'اتصل بنا',
        valueEn: 'Contact',
        valueRu: 'Контакты',
    },
    {
        _id: 'trans-nav-request-quote',
        key: 'nav.requestQuote',
        category: 'navigation',
        description: 'CTA button for requesting a quote',
        valueAr: 'طلب عرض سعر',
        valueEn: 'Request Quote',
        valueRu: 'Запросить цену',
    },

    // =====================
    // HERO SECTION
    // =====================
    {
        _id: 'trans-hero-title',
        key: 'hero.title',
        category: 'hero',
        description: 'Main hero section headline',
        valueAr: 'حمضيات مصرية طازجة إلى سوقك في 48 ساعة',
        valueEn: 'Fresh Egyptian Citrus to Your Market in 48 Hours',
        valueRu: 'Свежие египетские цитрусовые на ваш рынок за 48 часов',
    },
    {
        _id: 'trans-hero-subtitle',
        key: 'hero.subtitle',
        category: 'hero',
        description: 'Hero section subtitle',
        valueAr: 'مُصدّر معتمد بشهادة ISO 9001 و Global G.A.P منذ 2009',
        valueEn: 'ISO 9001 & Global G.A.P Certified Exporter Since 2009',
        valueRu: 'Сертифицированный экспортер ISO 9001 и Global G.A.P с 2009 года',
    },
    {
        _id: 'trans-hero-view-products',
        key: 'hero.viewProducts',
        category: 'hero',
        description: 'Hero CTA button text',
        valueAr: 'عرض المنتجات',
        valueEn: 'View Products',
        valueRu: 'Посмотреть продукты',
    },

    // =====================
    // PRODUCTS SECTION
    // =====================
    {
        _id: 'trans-products-title',
        key: 'products.ourPremiumProducts',
        category: 'products',
        description: 'Products section title',
        valueAr: 'منتجاتنا المميزة',
        valueEn: 'Our Premium Products',
        valueRu: 'Наши премиальные продукты',
    },
    {
        _id: 'trans-products-subtitle',
        key: 'products.freshCertifiedDelivered',
        category: 'products',
        description: 'Products section subtitle',
        valueAr: 'طازجة، معتمدة، ومُسلّمة بعناية',
        valueEn: 'Fresh, certified, and delivered with care',
        valueRu: 'Свежие, сертифицированные и доставленные с заботой',
    },
    {
        _id: 'trans-products-view-all',
        key: 'products.viewAllProducts',
        category: 'products',
        description: 'View all products button',
        valueAr: 'عرض جميع المنتجات',
        valueEn: 'View All Products',
        valueRu: 'Посмотреть все продукты',
    },
    {
        _id: 'trans-products-specifications',
        key: 'products.specifications',
        category: 'products',
        description: 'Product specifications label',
        valueAr: 'المواصفات',
        valueEn: 'Specifications',
        valueRu: 'Характеристики',
    },
    {
        _id: 'trans-products-packaging',
        key: 'products.packaging',
        category: 'products',
        description: 'Product packaging label',
        valueAr: 'التعبئة',
        valueEn: 'Packaging',
        valueRu: 'Упаковка',
    },
    {
        _id: 'trans-products-sizes',
        key: 'products.sizes',
        category: 'products',
        description: 'Product sizes label',
        valueAr: 'الأحجام',
        valueEn: 'Sizes',
        valueRu: 'Размеры',
    },
    {
        _id: 'trans-products-storage',
        key: 'products.storage',
        category: 'products',
        description: 'Product storage label',
        valueAr: 'التخزين',
        valueEn: 'Storage',
        valueRu: 'Хранение',
    },
    {
        _id: 'trans-products-shelf-life',
        key: 'products.shelfLife',
        category: 'products',
        description: 'Product shelf life label',
        valueAr: 'فترة الصلاحية',
        valueEn: 'Shelf Life',
        valueRu: 'Срок годности',
    },

    // =====================
    // FORMS
    // =====================
    {
        _id: 'trans-form-full-name',
        key: 'form.fullName',
        category: 'forms',
        description: 'Full name form field label',
        valueAr: 'الاسم الكامل',
        valueEn: 'Full Name',
        valueRu: 'Полное имя',
    },
    {
        _id: 'trans-form-email',
        key: 'form.email',
        category: 'forms',
        description: 'Email form field label',
        valueAr: 'البريد الإلكتروني',
        valueEn: 'Email',
        valueRu: 'Электронная почта',
    },
    {
        _id: 'trans-form-company',
        key: 'form.company',
        category: 'forms',
        description: 'Company form field label',
        valueAr: 'الشركة',
        valueEn: 'Company',
        valueRu: 'Компания',
    },
    {
        _id: 'trans-form-phone',
        key: 'form.phone',
        category: 'forms',
        description: 'Phone form field label',
        valueAr: 'الهاتف',
        valueEn: 'Phone',
        valueRu: 'Телефон',
    },
    {
        _id: 'trans-form-country',
        key: 'form.country',
        category: 'forms',
        description: 'Country form field label',
        valueAr: 'الدولة',
        valueEn: 'Country',
        valueRu: 'Страна',
    },
    {
        _id: 'trans-form-message',
        key: 'form.message',
        category: 'forms',
        description: 'Message form field label',
        valueAr: 'الرسالة',
        valueEn: 'Message',
        valueRu: 'Сообщение',
    },
    {
        _id: 'trans-form-send-message',
        key: 'form.sendMessage',
        category: 'forms',
        description: 'Send message button text',
        valueAr: 'إرسال الرسالة',
        valueEn: 'Send Message',
        valueRu: 'Отправить сообщение',
    },
    {
        _id: 'trans-form-submit',
        key: 'form.submit',
        category: 'forms',
        description: 'Submit button text',
        valueAr: 'إرسال',
        valueEn: 'Submit',
        valueRu: 'Отправить',
    },
    {
        _id: 'trans-form-back',
        key: 'form.back',
        category: 'forms',
        description: 'Back button text',
        valueAr: 'رجوع',
        valueEn: 'Back',
        valueRu: 'Назад',
    },
    {
        _id: 'trans-form-next',
        key: 'form.next',
        category: 'forms',
        description: 'Next button text',
        valueAr: 'التالي',
        valueEn: 'Next',
        valueRu: 'Далее',
    },

    // =====================
    // CONTACT
    // =====================
    {
        _id: 'trans-contact-get-in-touch',
        key: 'contact.getInTouch',
        category: 'contact',
        description: 'Contact page title',
        valueAr: 'تواصل معنا',
        valueEn: 'Get in Touch',
        valueRu: 'Свяжитесь с нами',
    },
    {
        _id: 'trans-contact-description',
        key: 'contact.description',
        category: 'contact',
        description: 'Contact page description',
        valueAr: 'هل لديك أسئلة أو مستعد لتقديم طلب؟ اتصل بنا اليوم.',
        valueEn: 'Have questions or ready to place an order? Contact us today.',
        valueRu: 'Есть вопросы или готовы сделать заказ? Свяжитесь с нами сегодня.',
    },
    {
        _id: 'trans-contact-head-office',
        key: 'contact.headOffice',
        category: 'contact',
        description: 'Head office label',
        valueAr: 'المكتب الرئيسي',
        valueEn: 'Head Office',
        valueRu: 'Главный офис',
    },
    {
        _id: 'trans-contact-phone-numbers',
        key: 'contact.phoneNumbers',
        category: 'contact',
        description: 'Phone numbers label',
        valueAr: 'أرقام الهواتف',
        valueEn: 'Phone Numbers',
        valueRu: 'Телефонные номера',
    },
    {
        _id: 'trans-contact-email-addresses',
        key: 'contact.emailAddresses',
        category: 'contact',
        description: 'Email addresses label',
        valueAr: 'عناوين البريد الإلكتروني',
        valueEn: 'Email Addresses',
        valueRu: 'Адреса электронной почты',
    },
    {
        _id: 'trans-contact-business-hours',
        key: 'contact.businessHours',
        category: 'contact',
        description: 'Business hours label',
        valueAr: 'ساعات العمل',
        valueEn: 'Business Hours',
        valueRu: 'Часы работы',
    },

    // =====================
    // ABOUT
    // =====================
    {
        _id: 'trans-about-title',
        key: 'about.aboutAlSoadaa',
        category: 'about',
        description: 'About page title',
        valueAr: 'عن السعداء',
        valueEn: 'About Al Soadaa',
        valueRu: 'О Al Soadaa',
    },
    {
        _id: 'trans-about-our-story',
        key: 'about.ourStory',
        category: 'about',
        description: 'Our story section title',
        valueAr: 'قصتنا',
        valueEn: 'Our Story',
        valueRu: 'Наша история',
    },
    {
        _id: 'trans-about-our-mission',
        key: 'about.ourMission',
        category: 'about',
        description: 'Our mission section title',
        valueAr: 'مهمتنا',
        valueEn: 'Our Mission',
        valueRu: 'Наша миссия',
    },
    {
        _id: 'trans-about-our-vision',
        key: 'about.ourVision',
        category: 'about',
        description: 'Our vision section title',
        valueAr: 'رؤيتنا',
        valueEn: 'Our Vision',
        valueRu: 'Наше видение',
    },
    {
        _id: 'trans-about-why-choose-us',
        key: 'about.whyChooseUs',
        category: 'about',
        description: 'Why choose us section title',
        valueAr: 'لماذا تختار السعداء؟',
        valueEn: 'Why Choose Al Soadaa?',
        valueRu: 'Почему выбирают Al Soadaa?',
    },

    // =====================
    // COMMON
    // =====================
    {
        _id: 'trans-common-view-details',
        key: 'common.viewDetails',
        category: 'common',
        description: 'View details button text',
        valueAr: 'عرض التفاصيل',
        valueEn: 'View Details',
        valueRu: 'Посмотреть детали',
    },
    {
        _id: 'trans-common-loading',
        key: 'common.loading',
        category: 'common',
        description: 'Loading state text',
        valueAr: 'جاري التحميل...',
        valueEn: 'Loading...',
        valueRu: 'Загрузка...',
    },
    {
        _id: 'trans-common-error',
        key: 'common.error',
        category: 'common',
        description: 'Error state text',
        valueAr: 'خطأ',
        valueEn: 'Error',
        valueRu: 'Ошибка',
    },
    {
        _id: 'trans-common-retry',
        key: 'common.retry',
        category: 'common',
        description: 'Retry button text',
        valueAr: 'إعادة المحاولة',
        valueEn: 'Retry',
        valueRu: 'Повторить',
    },
    {
        _id: 'trans-common-home',
        key: 'common.home',
        category: 'common',
        description: 'Home link text',
        valueAr: 'الرئيسية',
        valueEn: 'Home',
        valueRu: 'Главная',
    },
    {
        _id: 'trans-common-company-name',
        key: 'common.companyName',
        category: 'common',
        description: 'Company name',
        valueAr: 'السعداء',
        valueEn: 'Al Soadaa',
        valueRu: 'Al Soadaa',
    },

    // =====================
    // CALENDAR
    // =====================
    {
        _id: 'trans-calendar-seasonal-availability',
        key: 'calendar.seasonalAvailability',
        category: 'calendar',
        description: 'Seasonal availability section title',
        valueAr: 'التوفر الموسمي',
        valueEn: 'Seasonal Availability',
        valueRu: 'Сезонная доступность',
    },
    {
        _id: 'trans-calendar-view-full',
        key: 'calendar.viewFullCalendar',
        category: 'calendar',
        description: 'View full calendar button',
        valueAr: 'عرض التقويم الكامل',
        valueEn: 'View Full Calendar',
        valueRu: 'Посмотреть полный календарь',
    },
    {
        _id: 'trans-calendar-available',
        key: 'calendar.available',
        category: 'calendar',
        description: 'Available status label',
        valueAr: 'متاح',
        valueEn: 'Available',
        valueRu: 'Доступно',
    },
    {
        _id: 'trans-calendar-not-available',
        key: 'calendar.notAvailable',
        category: 'calendar',
        description: 'Not available status label',
        valueAr: 'غير متاح',
        valueEn: 'Not Available',
        valueRu: 'Недоступно',
    },

    // =====================
    // CATEGORIES
    // =====================
    {
        _id: 'trans-category-citrus',
        key: 'category.citrus',
        category: 'categories',
        description: 'Citrus category label',
        valueAr: 'حمضيات',
        valueEn: 'Citrus',
        valueRu: 'Цитрусовые',
    },
    {
        _id: 'trans-category-vegetables',
        key: 'category.vegetables',
        category: 'categories',
        description: 'Vegetables category label',
        valueAr: 'خضروات',
        valueEn: 'Vegetables',
        valueRu: 'Овощи',
    },
    {
        _id: 'trans-category-berries',
        key: 'category.berries',
        category: 'categories',
        description: 'Berries category label',
        valueAr: 'توت',
        valueEn: 'Berries',
        valueRu: 'Ягоды',
    },
    {
        _id: 'trans-category-grapes',
        key: 'category.grapes',
        category: 'categories',
        description: 'Grapes category label',
        valueAr: 'عنب',
        valueEn: 'Grapes',
        valueRu: 'Виноград',
    },
    {
        _id: 'trans-category-lemons',
        key: 'category.lemons',
        category: 'categories',
        description: 'Lemons category label',
        valueAr: 'ليمون',
        valueEn: 'Lemons',
        valueRu: 'Лимоны',
    },

    // =====================
    // SEASONS
    // =====================
    {
        _id: 'trans-season-in-season',
        key: 'season.inSeason',
        category: 'seasons',
        description: 'In season status label',
        valueAr: 'في الموسم',
        valueEn: 'In Season',
        valueRu: 'В сезоне',
    },
    {
        _id: 'trans-season-peak',
        key: 'season.peak',
        category: 'seasons',
        description: 'Peak season status label',
        valueAr: 'موسم الذروة',
        valueEn: 'Peak Season',
        valueRu: 'Пиковый сезон',
    },
    {
        _id: 'trans-season-coming-soon',
        key: 'season.comingSoon',
        category: 'seasons',
        description: 'Coming soon status label',
        valueAr: 'قريباً',
        valueEn: 'Coming Soon',
        valueRu: 'Скоро',
    },
    {
        _id: 'trans-season-last-weeks',
        key: 'season.lastWeeks',
        category: 'seasons',
        description: 'Last weeks status label',
        valueAr: 'الأسابيع الأخيرة',
        valueEn: 'Last Weeks',
        valueRu: 'Последние недели',
    },

    // =====================
    // MONTHS
    // =====================
    {
        _id: 'trans-month-january',
        key: 'month.january',
        category: 'calendar',
        description: 'January month name',
        valueAr: 'يناير',
        valueEn: 'January',
        valueRu: 'Январь',
    },
    {
        _id: 'trans-month-february',
        key: 'month.february',
        category: 'calendar',
        description: 'February month name',
        valueAr: 'فبراير',
        valueEn: 'February',
        valueRu: 'Февраль',
    },
    {
        _id: 'trans-month-march',
        key: 'month.march',
        category: 'calendar',
        description: 'March month name',
        valueAr: 'مارس',
        valueEn: 'March',
        valueRu: 'Март',
    },
    {
        _id: 'trans-month-april',
        key: 'month.april',
        category: 'calendar',
        description: 'April month name',
        valueAr: 'أبريل',
        valueEn: 'April',
        valueRu: 'Апрель',
    },
    {
        _id: 'trans-month-may',
        key: 'month.may',
        category: 'calendar',
        description: 'May month name',
        valueAr: 'مايو',
        valueEn: 'May',
        valueRu: 'Май',
    },
    {
        _id: 'trans-month-june',
        key: 'month.june',
        category: 'calendar',
        description: 'June month name',
        valueAr: 'يونيو',
        valueEn: 'June',
        valueRu: 'Июнь',
    },
    {
        _id: 'trans-month-july',
        key: 'month.july',
        category: 'calendar',
        description: 'July month name',
        valueAr: 'يوليو',
        valueEn: 'July',
        valueRu: 'Июль',
    },
    {
        _id: 'trans-month-august',
        key: 'month.august',
        category: 'calendar',
        description: 'August month name',
        valueAr: 'أغسطس',
        valueEn: 'August',
        valueRu: 'Август',
    },
    {
        _id: 'trans-month-september',
        key: 'month.september',
        category: 'calendar',
        description: 'September month name',
        valueAr: 'سبتمبر',
        valueEn: 'September',
        valueRu: 'Сентябрь',
    },
    {
        _id: 'trans-month-october',
        key: 'month.october',
        category: 'calendar',
        description: 'October month name',
        valueAr: 'أكتوبر',
        valueEn: 'October',
        valueRu: 'Октябрь',
    },
    {
        _id: 'trans-month-november',
        key: 'month.november',
        category: 'calendar',
        description: 'November month name',
        valueAr: 'نوفمبر',
        valueEn: 'November',
        valueRu: 'Ноябрь',
    },
    {
        _id: 'trans-month-december',
        key: 'month.december',
        category: 'calendar',
        description: 'December month name',
        valueAr: 'ديسمبر',
        valueEn: 'December',
        valueRu: 'Декабрь',
    },

    // =====================
    // FOOTER
    // =====================
    {
        _id: 'trans-footer-description',
        key: 'footer.description',
        category: 'common',
        description: 'Footer company description',
        valueAr: 'مُصدّر زراعي مصري متميز منذ عام 2009. نقدم منتجات طازجة ومعتمدة للأسواق العالمية.',
        valueEn: 'Premium Egyptian agricultural exporter since 2009. Delivering fresh, certified products to markets worldwide.',
        valueRu: 'Премиум египетский сельскохозяйственный экспортер с 2009 года. Доставка свежих, сертифицированных продуктов на рынки по всему миру.',
    },
    {
        _id: 'trans-footer-copyright',
        key: 'footer.copyright',
        category: 'common',
        description: 'Footer copyright text',
        valueAr: '© 2025 السعداء للتصدير. جميع الحقوق محفوظة.',
        valueEn: '© 2025 Al Soadaa Export. All rights reserved.',
        valueRu: '© 2025 Al Soadaa Export. Все права защищены.',
    },
    {
        _id: 'trans-footer-privacy-policy',
        key: 'footer.privacyPolicy',
        category: 'common',
        description: 'Privacy policy link text',
        valueAr: 'سياسة الخصوصية',
        valueEn: 'Privacy Policy',
        valueRu: 'Политика конфиденциальности',
    },
    {
        _id: 'trans-footer-terms',
        key: 'footer.termsOfService',
        category: 'common',
        description: 'Terms of service link text',
        valueAr: 'شروط الخدمة',
        valueEn: 'Terms of Service',
        valueRu: 'Условия использования',
    },

    // =====================
    // TRUST INDICATORS
    // =====================
    {
        _id: 'trans-trust-years-exporting',
        key: 'trust.yearsExporting',
        category: 'hero',
        description: 'Years exporting indicator',
        valueAr: 'سنوات من التصدير',
        valueEn: 'Years Exporting',
        valueRu: 'Лет экспорта',
    },
    {
        _id: 'trans-trust-countries-served',
        key: 'trust.countriesServed',
        category: 'hero',
        description: 'Countries served indicator',
        valueAr: 'دولة نخدمها',
        valueEn: 'Countries Served',
        valueRu: 'Обслуживаемых стран',
    },
    {
        _id: 'trans-trust-certified',
        key: 'trust.certified',
        category: 'hero',
        description: 'Certification indicator',
        valueAr: 'معتمد ISO و GAP',
        valueEn: 'ISO & GAP Certified',
        valueRu: 'Сертификат ISO и GAP',
    },
    {
        _id: 'trans-trust-containers',
        key: 'trust.containersPerYear',
        category: 'hero',
        description: 'Containers per year indicator',
        valueAr: 'حاوية/سنة',
        valueEn: 'Containers/Year',
        valueRu: 'Контейнеров/год',
    },

    // =====================
    // CTA
    // =====================
    {
        _id: 'trans-cta-ready-to-import',
        key: 'cta.readyToImport',
        category: 'common',
        description: 'CTA section title',
        valueAr: 'هل أنت مستعد لاستيراد منتجات مصرية مميزة؟',
        valueEn: 'Ready to Import Premium Egyptian Products?',
        valueRu: 'Готовы импортировать премиальные египетские продукты?',
    },
    {
        _id: 'trans-cta-get-quote',
        key: 'cta.getYourQuoteToday',
        category: 'common',
        description: 'CTA button text',
        valueAr: 'احصل على عرضك اليوم',
        valueEn: 'Get Your Quote Today',
        valueRu: 'Получите предложение сегодня',
    },
];

// ============================================
// MAIN FUNCTION
// ============================================
async function populateTranslations() {
    console.log('🌍 Populating Translations (Centralized)...\n');

    let created = 0;
    let updated = 0;
    let errors = 0;

    for (const translation of translations) {
        try {
            const existing = await client.fetch(
                `*[_type == "siteTranslationCentralized" && _id == $id][0]`,
                { id: translation._id }
            );

            const doc = {
                _type: 'siteTranslationCentralized',
                ...translation,
            };

            if (existing) {
                await client.patch(translation._id).set(doc).commit();
                console.log(`  ✏️  Updated: ${translation.key}`);
                updated++;
            } else {
                await client.create(doc);
                console.log(`  ✅ Created: ${translation.key}`);
                created++;
            }
        } catch (error: any) {
            console.error(`  ❌ Error: ${translation.key} - ${error.message}`);
            errors++;
        }
    }

    console.log('\n📊 Summary:');
    console.log(`   Created: ${created}`);
    console.log(`   Updated: ${updated}`);
    console.log(`   Errors: ${errors}`);
    console.log(`   Total: ${translations.length}`);
}

populateTranslations().catch(console.error);
