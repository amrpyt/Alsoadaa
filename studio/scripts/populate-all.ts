/**
 * Populate All CMS Data (Centralized Schemas)
 * 
 * Runs all population scripts in the correct order
 * Run: npx ts-node --esm studio/scripts/populate-all.ts
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
// ALL DATA IMPORTS
// ============================================

// PRODUCTS DATA
const products = [
  {
    _id: 'product-navel-orange',
    slug: 'navel-orange',
    scientificName: 'Citrus sinensis',
    category: 'citrus',
    titleAr: 'برتقال نافل',
    descriptionAr: 'برتقال نافل مصري طازج، معروف بحلاوته وخلوه من البذور. يتم حصاده في موسم الذروة لضمان أفضل جودة ونكهة.',
    seoAr: { metaTitle: 'برتقال نافل مصري - تصدير عالي الجودة | السعداء', metaDescription: 'برتقال نافل مصري ممتاز، خالي من البذور وحلو المذاق. معتمد ISO و GAP.' },
    titleEn: 'Navel Orange',
    descriptionEn: 'Fresh Egyptian Navel Orange, known for its sweetness and seedless nature. Harvested at peak season.',
    seoEn: { metaTitle: 'Fresh Egyptian Navel Orange - Premium Export | Al Soadaa', metaDescription: 'Premium Egyptian Navel Oranges, seedless and sweet. ISO & GAP certified.' },
    titleRu: 'Апельсин Навел',
    descriptionRu: 'Свежий египетский апельсин Навел, известный своей сладостью и отсутствием косточек.',
    seoRu: { metaTitle: 'Египетский апельсин Навел - Премиум экспорт | Al Soadaa', metaDescription: 'Премиум египетские апельсины Навел, без косточек.' },
    season: 'peak',
    packaging: '15kg carton boxes',
    sizes: '56-88mm diameter',
    storage: 'Cold storage at 5°C',
    shelfLife: '30-45 days',
    certifications: ['ISO 9001', 'Global G.A.P', 'HACCP'],
    availability: { january: true, february: true, march: true, april: false, may: false, june: false, july: false, august: false, september: false, october: false, november: true, december: true },
  },
  {
    _id: 'product-valencia-orange',
    slug: 'valencia-orange',
    scientificName: 'Citrus sinensis',
    category: 'citrus',
    titleAr: 'برتقال فالنسيا',
    descriptionAr: 'برتقال فالنسيا مصري طازج، مثالي للعصير بفضل كمية العصير العالية.',
    seoAr: { metaTitle: 'برتقال فالنسيا مصري | السعداء', metaDescription: 'برتقال فالنسيا المصري الممتاز، مثالي للعصير.' },
    titleEn: 'Valencia Orange',
    descriptionEn: 'Fresh Egyptian Valencia Orange, perfect for juicing with high juice content.',
    seoEn: { metaTitle: 'Egyptian Valencia Orange | Al Soadaa', metaDescription: 'Premium Valencia Oranges from Egypt, perfect for juice.' },
    titleRu: 'Апельсин Валенсия',
    descriptionRu: 'Свежий египетский апельсин Валенсия, идеален для сока.',
    seoRu: { metaTitle: 'Египетский апельсин Валенсия | Al Soadaa', metaDescription: 'Премиум апельсины Валенсия из Египта.' },
    season: 'in-season',
    packaging: '15kg carton boxes',
    sizes: '60-80mm diameter',
    storage: 'Cold storage at 5-7°C',
    shelfLife: '45-60 days',
    certifications: ['ISO 9001', 'Global G.A.P'],
    availability: { january: true, february: true, march: true, april: true, may: true, june: false, july: false, august: false, september: false, october: false, november: false, december: true },
  },
  {
    _id: 'product-grapefruit',
    slug: 'grapefruit',
    scientificName: 'Citrus paradisi',
    category: 'citrus',
    titleAr: 'جريب فروت',
    descriptionAr: 'جريب فروت مصري طازج بنكهة منعشة ومميزة. غني بفيتامين C.',
    seoAr: { metaTitle: 'جريب فروت مصري | السعداء', metaDescription: 'جريب فروت مصري ممتاز، غني بفيتامين C.' },
    titleEn: 'Grapefruit',
    descriptionEn: 'Fresh Egyptian Grapefruit with refreshing and distinctive flavor. Rich in Vitamin C.',
    seoEn: { metaTitle: 'Fresh Egyptian Grapefruit | Al Soadaa', metaDescription: 'Premium Egyptian Grapefruit, rich in Vitamin C.' },
    titleRu: 'Грейпфрут',
    descriptionRu: 'Свежий египетский грейпфрут с освежающим вкусом.',
    seoRu: { metaTitle: 'Египетский грейпфрут | Al Soadaa', metaDescription: 'Премиум египетский грейпфрут.' },
    season: 'in-season',
    packaging: '17kg carton boxes',
    sizes: '70-110mm diameter',
    storage: 'Cold storage at 5°C',
    shelfLife: '40-60 days',
    certifications: ['ISO 9001', 'Global G.A.P'],
    availability: { january: true, february: true, march: true, april: false, may: false, june: false, july: false, august: false, september: false, october: true, november: true, december: true },
  },
  {
    _id: 'product-lemons',
    slug: 'lemons',
    scientificName: 'Citrus limon',
    category: 'lemons',
    titleAr: 'ليمون مصري',
    descriptionAr: 'ليمون مصري طازج بنكهة حامضة مميزة. غني بفيتامين C.',
    seoAr: { metaTitle: 'ليمون مصري | السعداء', metaDescription: 'ليمون مصري ممتاز، طازج ومعتمد.' },
    titleEn: 'Egyptian Lemons',
    descriptionEn: 'Fresh Egyptian Lemons with distinctive sour flavor. Rich in Vitamin C.',
    seoEn: { metaTitle: 'Fresh Egyptian Lemons | Al Soadaa', metaDescription: 'Premium Egyptian Lemons, fresh and certified.' },
    titleRu: 'Египетские лимоны',
    descriptionRu: 'Свежие египетские лимоны с характерным кислым вкусом.',
    seoRu: { metaTitle: 'Египетские лимоны | Al Soadaa', metaDescription: 'Премиум египетские лимоны.' },
    season: 'in-season',
    packaging: '10kg carton boxes',
    sizes: '45-70mm diameter',
    storage: 'Cold storage at 8-10°C',
    shelfLife: '60-90 days',
    certifications: ['ISO 9001', 'Global G.A.P'],
    availability: { january: true, february: true, march: true, april: true, may: true, june: true, july: true, august: true, september: true, october: true, november: true, december: true },
  },
  {
    _id: 'product-pomegranates',
    slug: 'pomegranates',
    scientificName: 'Punica granatum',
    category: 'berries',
    titleAr: 'رمان',
    descriptionAr: 'رمان مصري طازج بحبات حمراء لامعة ونكهة حلوة. غني بمضادات الأكسدة.',
    seoAr: { metaTitle: 'رمان مصري | السعداء', metaDescription: 'رمان مصري ممتاز، غني بمضادات الأكسدة.' },
    titleEn: 'Pomegranates',
    descriptionEn: 'Fresh Egyptian Pomegranates with shiny red arils and sweet flavor.',
    seoEn: { metaTitle: 'Fresh Egyptian Pomegranates | Al Soadaa', metaDescription: 'Premium Egyptian Pomegranates, rich in antioxidants.' },
    titleRu: 'Гранат',
    descriptionRu: 'Свежий египетский гранат с блестящими красными зернами.',
    seoRu: { metaTitle: 'Египетский гранат | Al Soadaa', metaDescription: 'Премиум египетский гранат.' },
    season: 'peak',
    packaging: '4-5kg carton boxes',
    sizes: '250-450g per fruit',
    storage: 'Cold storage at 5°C',
    shelfLife: '60-90 days',
    certifications: ['ISO 9001', 'Global G.A.P'],
    availability: { january: false, february: false, march: false, april: false, may: false, june: false, july: false, august: true, september: true, october: true, november: true, december: false },
  },
  {
    _id: 'product-grapes-flame',
    slug: 'grapes-flame',
    scientificName: 'Vitis vinifera',
    category: 'grapes',
    titleAr: 'عنب فليم الأحمر',
    descriptionAr: 'عنب فليم أحمر مصري طازج، خالي من البذور وحلو المذاق.',
    seoAr: { metaTitle: 'عنب فليم أحمر | السعداء', metaDescription: 'عنب فليم أحمر مصري ممتاز.' },
    titleEn: 'Flame Red Grapes',
    descriptionEn: 'Fresh Egyptian Flame Red Grapes, seedless and sweet.',
    seoEn: { metaTitle: 'Egyptian Flame Red Grapes | Al Soadaa', metaDescription: 'Premium Flame Red Grapes from Egypt.' },
    titleRu: 'Красный виноград Флейм',
    descriptionRu: 'Свежий египетский красный виноград Флейм, без косточек.',
    seoRu: { metaTitle: 'Египетский виноград Флейм | Al Soadaa', metaDescription: 'Премиум красный виноград Флейм.' },
    season: 'peak',
    packaging: '4.5kg carton boxes',
    sizes: '18-22mm berry size',
    storage: 'Cold storage at 0-2°C',
    shelfLife: '30-45 days',
    certifications: ['ISO 9001', 'Global G.A.P'],
    availability: { january: false, february: false, march: false, april: false, may: true, june: true, july: true, august: true, september: true, october: false, november: false, december: false },
  },
  {
    _id: 'product-grapes-thompson',
    slug: 'grapes-thompson',
    scientificName: 'Vitis vinifera',
    category: 'grapes',
    titleAr: 'عنب طومسون الأخضر',
    descriptionAr: 'عنب طومسون أخضر مصري طازج، خالي من البذور.',
    seoAr: { metaTitle: 'عنب طومسون أخضر | السعداء', metaDescription: 'عنب طومسون أخضر مصري ممتاز.' },
    titleEn: 'Thompson Green Grapes',
    descriptionEn: 'Fresh Egyptian Thompson Green Grapes, seedless with sweet flavor.',
    seoEn: { metaTitle: 'Egyptian Thompson Green Grapes | Al Soadaa', metaDescription: 'Premium Thompson Green Grapes from Egypt.' },
    titleRu: 'Зеленый виноград Томпсон',
    descriptionRu: 'Свежий египетский зеленый виноград Томпсон, без косточек.',
    seoRu: { metaTitle: 'Египетский виноград Томпсон | Al Soadaa', metaDescription: 'Премиум зеленый виноград Томпсон.' },
    season: 'in-season',
    packaging: '4.5kg carton boxes',
    sizes: '16-20mm berry size',
    storage: 'Cold storage at 0-2°C',
    shelfLife: '30-45 days',
    certifications: ['ISO 9001', 'Global G.A.P'],
    availability: { january: false, february: false, march: false, april: false, may: true, june: true, july: true, august: true, september: true, october: false, november: false, december: false },
  },
  {
    _id: 'product-strawberries',
    slug: 'strawberries',
    scientificName: 'Fragaria × ananassa',
    category: 'berries',
    titleAr: 'فراولة مصرية',
    descriptionAr: 'فراولة مصرية طازجة بنكهة حلوة ورائحة مميزة.',
    seoAr: { metaTitle: 'فراولة مصرية | السعداء', metaDescription: 'فراولة مصرية ممتازة بنكهة حلوة.' },
    titleEn: 'Egyptian Strawberries',
    descriptionEn: 'Fresh Egyptian Strawberries with sweet flavor and distinctive aroma.',
    seoEn: { metaTitle: 'Fresh Egyptian Strawberries | Al Soadaa', metaDescription: 'Premium Egyptian Strawberries with sweet flavor.' },
    titleRu: 'Египетская клубника',
    descriptionRu: 'Свежая египетская клубника со сладким вкусом.',
    seoRu: { metaTitle: 'Египетская клубника | Al Soadaa', metaDescription: 'Премиум египетская клубника.' },
    season: 'peak',
    packaging: '250g-500g punnets in cartons',
    sizes: '15-35g per berry',
    storage: 'Cold storage at 2-4°C',
    shelfLife: '7-10 days',
    certifications: ['ISO 9001', 'Global G.A.P'],
    availability: { january: true, february: true, march: true, april: true, may: false, june: false, july: false, august: false, september: false, october: false, november: true, december: true },
  },
  {
    _id: 'product-garlic',
    slug: 'garlic',
    scientificName: 'Allium sativum',
    category: 'vegetables',
    titleAr: 'ثوم مصري',
    descriptionAr: 'ثوم مصري طازج عالي الجودة، معروف بنكهته القوية.',
    seoAr: { metaTitle: 'ثوم مصري | السعداء', metaDescription: 'ثوم مصري ممتاز بنكهة قوية.' },
    titleEn: 'Egyptian Garlic',
    descriptionEn: 'Fresh high-quality Egyptian Garlic, known for its strong flavor.',
    seoEn: { metaTitle: 'Fresh Egyptian Garlic | Al Soadaa', metaDescription: 'Premium Egyptian Garlic with strong flavor.' },
    titleRu: 'Египетский чеснок',
    descriptionRu: 'Свежий высококачественный египетский чеснок.',
    seoRu: { metaTitle: 'Египетский чеснок | Al Soadaa', metaDescription: 'Премиум египетский чеснок.' },
    season: 'in-season',
    packaging: '10kg mesh bags or cartons',
    sizes: '4.5-6.5cm diameter',
    storage: 'Cool dry storage',
    shelfLife: '6-8 months',
    certifications: ['ISO 9001', 'Global G.A.P'],
    availability: { january: true, february: true, march: true, april: true, may: true, june: true, july: true, august: true, september: true, october: true, november: true, december: true },
  },
  {
    _id: 'product-onions',
    slug: 'golden-onions',
    scientificName: 'Allium cepa',
    category: 'vegetables',
    titleAr: 'بصل ذهبي مصري',
    descriptionAr: 'بصل ذهبي مصري طازج، معروف بجودته العالية.',
    seoAr: { metaTitle: 'بصل ذهبي مصري | السعداء', metaDescription: 'بصل ذهبي مصري ممتاز.' },
    titleEn: 'Egyptian Golden Onions',
    descriptionEn: 'Fresh Egyptian Golden Onions, known for high quality.',
    seoEn: { metaTitle: 'Egyptian Golden Onions | Al Soadaa', metaDescription: 'Premium Egyptian Golden Onions.' },
    titleRu: 'Египетский золотой лук',
    descriptionRu: 'Свежий египетский золотой лук, известный высоким качеством.',
    seoRu: { metaTitle: 'Египетский золотой лук | Al Soadaa', metaDescription: 'Премиум египетский золотой лук.' },
    season: 'in-season',
    packaging: '20-25kg mesh bags',
    sizes: '50-80mm diameter',
    storage: 'Cool dry storage',
    shelfLife: '6-9 months',
    certifications: ['ISO 9001', 'Global G.A.P'],
    availability: { january: true, february: true, march: true, april: true, may: true, june: true, july: true, august: true, september: true, october: true, november: true, december: true },
  },
];

// SERVICES DATA
const services = [
  { _id: 'service-sorting', slug: 'sorting', icon: 'ClipboardCheck', order: 1, isActive: true, nameAr: 'الفرز والتصنيف', descriptionAr: 'نستخدم أحدث تقنيات الفرز والتصنيف لضمان جودة موحدة.', featuresAr: ['فرز بصري متقدم', 'تصنيف حسب الحجم واللون', 'فحص جودة متعدد المراحل'], nameEn: 'Sorting & Grading', descriptionEn: 'We use the latest sorting and grading technologies.', featuresEn: ['AI-powered optical sorting', 'Grading by size and color', 'Multi-stage quality inspection'], nameRu: 'Сортировка', descriptionRu: 'Мы используем новейшие технологии сортировки.', featuresRu: ['Оптическая сортировка с ИИ', 'Калибровка по размеру', 'Многоступенчатый контроль'] },
  { _id: 'service-packing', slug: 'packing', icon: 'Package', order: 2, isActive: true, nameAr: 'التعبئة والتغليف', descriptionAr: 'تعبئة احترافية تحمي المنتجات وتحافظ على نضارتها.', featuresAr: ['مواد صديقة للبيئة', 'تصاميم مخصصة', 'تغليف للنضارة'], nameEn: 'Packing & Packaging', descriptionEn: 'Professional packaging that protects and preserves freshness.', featuresEn: ['Eco-friendly materials', 'Custom designs', 'Freshness-preserving'], nameRu: 'Упаковка', descriptionRu: 'Профессиональная упаковка, защищающая продукцию.', featuresRu: ['Экологичные материалы', 'Индивидуальный дизайн', 'Сохранение свежести'] },
  { _id: 'service-cold-chain', slug: 'cold-chain', icon: 'Snowflake', order: 3, isActive: true, nameAr: 'سلسلة التبريد', descriptionAr: 'نضمن سلسلة تبريد متكاملة من المزرعة إلى وجهتك.', featuresAr: ['مستودعات تبريد كبيرة', 'مراقبة 24/7', 'شاحنات مبردة'], nameEn: 'Cold Chain', descriptionEn: 'Complete cold chain from farm to your destination.', featuresEn: ['Large-capacity cold storage', '24/7 monitoring', 'Refrigerated trucks'], nameRu: 'Холодовая цепь', descriptionRu: 'Полная холодовая цепь от фермы до пункта назначения.', featuresRu: ['Холодильные склады', 'Круглосуточный мониторинг', 'Рефрижераторный транспорт'] },
  { _id: 'service-exporting', slug: 'exporting', icon: 'Globe', order: 4, isActive: true, nameAr: 'التصدير والشحن', descriptionAr: 'خدمات تصدير متكاملة تشمل التخليص الجمركي والشحن.', featuresAr: ['تصدير لأكثر من 50 دولة', 'شحن بحري وجوي', 'تخليص جمركي سريع'], nameEn: 'Export & Shipping', descriptionEn: 'Complete export services including customs clearance.', featuresEn: ['Export to 50+ countries', 'Sea and air freight', 'Fast customs clearance'], nameRu: 'Экспорт и доставка', descriptionRu: 'Полный комплекс экспортных услуг.', featuresRu: ['Экспорт в 50+ стран', 'Морские и воздушные перевозки', 'Быстрое таможенное оформление'] },
  { _id: 'service-quality-control', slug: 'quality-control', icon: 'Shield', order: 5, isActive: true, nameAr: 'ضمان الجودة', descriptionAr: 'نظام جودة شامل معتمد بشهادات ISO و GAP.', featuresAr: ['شهادة ISO 9001', 'شهادة Global G.A.P', 'فريق جودة متخصص'], nameEn: 'Quality Assurance', descriptionEn: 'Comprehensive quality system with ISO & GAP certification.', featuresEn: ['ISO 9001 certification', 'Global G.A.P certification', 'Dedicated quality team'], nameRu: 'Контроль качества', descriptionRu: 'Комплексная система качества ISO и GAP.', featuresRu: ['Сертификат ISO 9001', 'Сертификат Global G.A.P', 'Специализированная команда'] },
  { _id: 'service-processing', slug: 'processing', icon: 'Factory', order: 6, isActive: true, nameAr: 'المعالجة والتجهيز', descriptionAr: 'خدمات معالجة متقدمة تشمل الغسيل والتشميع.', featuresAr: ['غسيل متقدم', 'تشميع الفواكه', 'معالجة ما بعد الحصاد'], nameEn: 'Processing & Treatment', descriptionEn: 'Advanced processing including washing and waxing.', featuresEn: ['Advanced washing', 'Fruit waxing', 'Post-harvest treatment'], nameRu: 'Обработка', descriptionRu: 'Современные услуги обработки.', featuresRu: ['Современная мойка', 'Вощение фруктов', 'Послеуборочная обработка'] },
];

// PAGES DATA
const pages = [
  { _id: 'page-home', slug: 'home', pageType: 'home', isPublished: true, order: 1, titleAr: 'الرئيسية', seoAr: { metaTitle: 'السعداء للتصدير الزراعي | حمضيات وخضروات مصرية', metaDescription: 'السعداء شركة تصدير زراعي مصرية. معتمدون ISO و GAP.' }, titleEn: 'Home', seoEn: { metaTitle: 'Al Soadaa Agricultural Export | Fresh Egyptian Citrus', metaDescription: 'Al Soadaa is an Egyptian agricultural export company. ISO & GAP certified.' }, titleRu: 'Главная', seoRu: { metaTitle: 'Al Soadaa Экспорт | Египетские цитрусовые', metaDescription: 'Al Soadaa - египетская экспортная компания. Сертификаты ISO и GAP.' } },
  { _id: 'page-about', slug: 'about', pageType: 'about', isPublished: true, order: 2, titleAr: 'من نحن', seoAr: { metaTitle: 'من نحن | السعداء', metaDescription: 'تعرف على قصة السعداء.' }, titleEn: 'About Us', seoEn: { metaTitle: 'About Us | Al Soadaa', metaDescription: 'Learn about Al Soadaa\'s story.' }, titleRu: 'О нас', seoRu: { metaTitle: 'О нас | Al Soadaa', metaDescription: 'Узнайте историю Al Soadaa.' } },
  { _id: 'page-products', slug: 'products', pageType: 'products', isPublished: true, order: 3, titleAr: 'منتجاتنا', seoAr: { metaTitle: 'منتجاتنا | السعداء', metaDescription: 'استكشف منتجاتنا من الحمضيات والخضروات.' }, titleEn: 'Our Products', seoEn: { metaTitle: 'Our Products | Al Soadaa', metaDescription: 'Explore our fresh citrus and vegetables.' }, titleRu: 'Наша продукция', seoRu: { metaTitle: 'Наша продукция | Al Soadaa', metaDescription: 'Ознакомьтесь с нашим ассортиментом.' } },
  { _id: 'page-services', slug: 'services', pageType: 'services', isPublished: true, order: 4, titleAr: 'خدماتنا', seoAr: { metaTitle: 'خدماتنا | السعداء', metaDescription: 'نقدم خدمات متكاملة من الفرز للتصدير.' }, titleEn: 'Our Services', seoEn: { metaTitle: 'Our Services | Al Soadaa', metaDescription: 'Complete services from sorting to export.' }, titleRu: 'Наши услуги', seoRu: { metaTitle: 'Наши услуги | Al Soadaa', metaDescription: 'Полный комплекс услуг.' } },
  { _id: 'page-contact', slug: 'contact', pageType: 'contact', isPublished: true, order: 5, titleAr: 'اتصل بنا', seoAr: { metaTitle: 'اتصل بنا | السعداء', metaDescription: 'تواصل معنا للاستفسارات.' }, titleEn: 'Contact Us', seoEn: { metaTitle: 'Contact Us | Al Soadaa', metaDescription: 'Get in touch for inquiries.' }, titleRu: 'Контакты', seoRu: { metaTitle: 'Контакты | Al Soadaa', metaDescription: 'Свяжитесь с нами.' } },
  { _id: 'page-calendar', slug: 'calendar', pageType: 'products', isPublished: true, order: 6, titleAr: 'التقويم الموسمي', seoAr: { metaTitle: 'التقويم الموسمي | السعداء', metaDescription: 'مواعيد توفر المنتجات.' }, titleEn: 'Seasonal Calendar', seoEn: { metaTitle: 'Seasonal Calendar | Al Soadaa', metaDescription: 'Product availability calendar.' }, titleRu: 'Сезонный календарь', seoRu: { metaTitle: 'Сезонный календарь | Al Soadaa', metaDescription: 'Календарь доступности продукции.' } },
];

// ============================================
// POPULATE FUNCTIONS
// ============================================
async function populateProducts() {
  console.log('🍊 Populating Products...');
  let count = 0;
  for (const product of products) {
    try {
      const doc = { _type: 'productCentralized', ...product, slug: { _type: 'slug', current: product.slug } };
      await client.createOrReplace(doc);
      count++;
    } catch (error: any) {
      console.error(`   ❌ ${product.titleEn}: ${error.message}`);
    }
  }
  console.log(`   ✅ ${count} products created`);
}

async function populateServices() {
  console.log('⚙️ Populating Services...');
  let count = 0;
  for (const service of services) {
    try {
      const doc = { _type: 'serviceCentralized', ...service, slug: { _type: 'slug', current: service.slug } };
      await client.createOrReplace(doc);
      count++;
    } catch (error: any) {
      console.error(`   ❌ ${service.nameEn}: ${error.message}`);
    }
  }
  console.log(`   ✅ ${count} services created`);
}

async function populatePages() {
  console.log('📄 Populating Pages...');
  let count = 0;
  for (const page of pages) {
    try {
      const doc = { _type: 'pageCentralized', ...page, slug: { _type: 'slug', current: page.slug } };
      await client.createOrReplace(doc);
      count++;
    } catch (error: any) {
      console.error(`   ❌ ${page.titleEn}: ${error.message}`);
    }
  }
  console.log(`   ✅ ${count} pages created`);
}

// ============================================
// MAIN
// ============================================
async function populateAll() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 CMS Data Population Script');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  await populateProducts();
  await populateServices();
  await populatePages();

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ All data populated successfully!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n📊 Summary:');
  console.log(`   • Products: ${products.length}`);
  console.log(`   • Services: ${services.length}`);
  console.log(`   • Pages: ${pages.length}`);
  console.log('\n🔗 View in Sanity Studio: https://alsoadaa.sanity.studio/');
}

populateAll().catch(console.error);
