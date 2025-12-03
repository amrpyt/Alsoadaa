/**
 * Populate Services (Centralized Schema)
 * 
 * Adds production-ready service data to serviceCentralized collection
 * Run: npx ts-node --esm studio/scripts/populate-services.ts
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
// SERVICES DATA - Production Ready
// ============================================
const services = [
  {
    _id: 'service-sorting',
    slug: 'sorting',
    icon: 'ClipboardCheck',
    order: 1,
    isActive: true,
    
    // Arabic
    nameAr: 'الفرز والتصنيف',
    descriptionAr: 'نستخدم أحدث تقنيات الفرز والتصنيف لضمان جودة موحدة لجميع منتجاتنا. يتم فرز كل منتج حسب الحجم واللون ومستوى النضج لتلبية معايير التصدير الدولية.',
    featuresAr: [
      'فرز بصري متقدم بالذكاء الاصطناعي',
      'تصنيف حسب الحجم واللون والجودة',
      'فحص جودة متعدد المراحل',
      'معايير دولية للتصنيف',
      'تتبع كامل للمنتج',
    ],
    
    // English
    nameEn: 'Sorting & Grading',
    descriptionEn: 'We use the latest sorting and grading technologies to ensure consistent quality across all our products. Every product is sorted by size, color, and ripeness level to meet international export standards.',
    featuresEn: [
      'AI-powered optical sorting',
      'Grading by size, color, and quality',
      'Multi-stage quality inspection',
      'International grading standards',
      'Full product traceability',
    ],
    
    // Russian
    nameRu: 'Сортировка и калибровка',
    descriptionRu: 'Мы используем новейшие технологии сортировки и калибровки для обеспечения стабильного качества всей продукции. Каждый продукт сортируется по размеру, цвету и степени зрелости.',
    featuresRu: [
      'Оптическая сортировка с ИИ',
      'Калибровка по размеру, цвету и качеству',
      'Многоступенчатый контроль качества',
      'Международные стандарты сортировки',
      'Полная прослеживаемость продукции',
    ],
  },
  {
    _id: 'service-packing',
    slug: 'packing',
    icon: 'Package',
    order: 2,
    isActive: true,
    
    nameAr: 'التعبئة والتغليف',
    descriptionAr: 'تعبئة احترافية تحمي المنتجات وتحافظ على نضارتها. نستخدم مواد تغليف صديقة للبيئة ومعتمدة دولياً تناسب متطلبات كل سوق.',
    featuresAr: [
      'مواد تغليف صديقة للبيئة',
      'تصاميم تغليف مخصصة للعميل',
      'تغليف يحافظ على النضارة',
      'ملصقات وعلامات تجارية حسب الطلب',
      'تغليف متوافق مع معايير التصدير',
    ],
    
    nameEn: 'Packing & Packaging',
    descriptionEn: 'Professional packaging that protects products and maintains freshness. We use eco-friendly, internationally certified packaging materials suited to each market\'s requirements.',
    featuresEn: [
      'Eco-friendly packaging materials',
      'Custom packaging designs',
      'Freshness-preserving packaging',
      'Custom labels and branding',
      'Export-compliant packaging',
    ],
    
    nameRu: 'Упаковка',
    descriptionRu: 'Профессиональная упаковка, защищающая продукцию и сохраняющая свежесть. Мы используем экологичные, сертифицированные материалы.',
    featuresRu: [
      'Экологичные упаковочные материалы',
      'Индивидуальный дизайн упаковки',
      'Упаковка, сохраняющая свежесть',
      'Индивидуальная маркировка',
      'Упаковка для экспорта',
    ],
  },
  {
    _id: 'service-cold-chain',
    slug: 'cold-chain',
    icon: 'Snowflake',
    order: 3,
    isActive: true,
    
    nameAr: 'سلسلة التبريد',
    descriptionAr: 'نضمن سلسلة تبريد متكاملة من المزرعة إلى وجهتك النهائية. مستودعات تبريد حديثة وشاحنات مبردة تحافظ على جودة المنتجات طوال الرحلة.',
    featuresAr: [
      'مستودعات تبريد بسعة كبيرة',
      'مراقبة درجة الحرارة على مدار الساعة',
      'شاحنات وحاويات مبردة',
      'تقارير تتبع درجة الحرارة',
      'معايير HACCP للسلامة الغذائية',
    ],
    
    nameEn: 'Cold Chain',
    descriptionEn: 'We ensure a complete cold chain from farm to your final destination. Modern cold storage facilities and refrigerated trucks maintain product quality throughout the journey.',
    featuresEn: [
      'Large-capacity cold storage',
      '24/7 temperature monitoring',
      'Refrigerated trucks and containers',
      'Temperature tracking reports',
      'HACCP food safety standards',
    ],
    
    nameRu: 'Холодовая цепь',
    descriptionRu: 'Мы обеспечиваем полную холодовую цепь от фермы до конечного пункта назначения. Современные холодильные склады и рефрижераторный транспорт.',
    featuresRu: [
      'Холодильные склады большой емкости',
      'Круглосуточный мониторинг температуры',
      'Рефрижераторный транспорт',
      'Отчеты о температурном контроле',
      'Стандарты безопасности HACCP',
    ],
  },
  {
    _id: 'service-exporting',
    slug: 'exporting',
    icon: 'Globe',
    order: 4,
    isActive: true,
    
    nameAr: 'التصدير والشحن',
    descriptionAr: 'خدمات تصدير متكاملة تشمل التخليص الجمركي والشحن البحري والجوي. نصدر إلى أكثر من 50 دولة حول العالم مع ضمان التسليم في الوقت المحدد.',
    featuresAr: [
      'تصدير لأكثر من 50 دولة',
      'شحن بحري وجوي',
      'تخليص جمركي سريع',
      'توثيق وشهادات التصدير',
      'تتبع الشحنات في الوقت الفعلي',
    ],
    
    nameEn: 'Export & Shipping',
    descriptionEn: 'Complete export services including customs clearance and sea/air freight. We export to 50+ countries worldwide with guaranteed on-time delivery.',
    featuresEn: [
      'Export to 50+ countries',
      'Sea and air freight',
      'Fast customs clearance',
      'Export documentation and certificates',
      'Real-time shipment tracking',
    ],
    
    nameRu: 'Экспорт и доставка',
    descriptionRu: 'Полный комплекс экспортных услуг, включая таможенное оформление и морские/воздушные перевозки. Экспорт в 50+ стран.',
    featuresRu: [
      'Экспорт в 50+ стран',
      'Морские и воздушные перевозки',
      'Быстрое таможенное оформление',
      'Экспортная документация',
      'Отслеживание в реальном времени',
    ],
  },
  {
    _id: 'service-quality-control',
    slug: 'quality-control',
    icon: 'Shield',
    order: 5,
    isActive: true,
    
    nameAr: 'ضمان الجودة',
    descriptionAr: 'نظام جودة شامل معتمد بشهادات ISO 9001 و Global G.A.P. فحوصات جودة متعددة المراحل تضمن وصول أفضل المنتجات فقط إلى عملائنا.',
    featuresAr: [
      'شهادة ISO 9001',
      'شهادة Global G.A.P',
      'فحوصات مختبرية للمبيدات',
      'فريق جودة متخصص',
      'تقارير جودة لكل شحنة',
    ],
    
    nameEn: 'Quality Assurance',
    descriptionEn: 'Comprehensive quality system certified with ISO 9001 and Global G.A.P. Multi-stage quality checks ensure only the best products reach our customers.',
    featuresEn: [
      'ISO 9001 certification',
      'Global G.A.P certification',
      'Laboratory pesticide testing',
      'Dedicated quality team',
      'Quality reports per shipment',
    ],
    
    nameRu: 'Контроль качества',
    descriptionRu: 'Комплексная система качества, сертифицированная по ISO 9001 и Global G.A.P. Многоступенчатые проверки гарантируют высшее качество.',
    featuresRu: [
      'Сертификат ISO 9001',
      'Сертификат Global G.A.P',
      'Лабораторные тесты на пестициды',
      'Специализированная команда',
      'Отчеты о качестве каждой партии',
    ],
  },
  {
    _id: 'service-processing',
    slug: 'processing',
    icon: 'Factory',
    order: 6,
    isActive: true,
    
    nameAr: 'المعالجة والتجهيز',
    descriptionAr: 'خدمات معالجة متقدمة تشمل الغسيل والتشميع والتجفيف. نستخدم أحدث المعدات لتجهيز المنتجات حسب متطلبات كل سوق.',
    featuresAr: [
      'غسيل وتنظيف متقدم',
      'تشميع وتلميع الفواكه',
      'معالجة ما بعد الحصاد',
      'تجهيز حسب طلب العميل',
      'مواد معالجة آمنة غذائياً',
    ],
    
    nameEn: 'Processing & Treatment',
    descriptionEn: 'Advanced processing services including washing, waxing, and drying. We use state-of-the-art equipment to prepare products according to each market\'s requirements.',
    featuresEn: [
      'Advanced washing and cleaning',
      'Fruit waxing and polishing',
      'Post-harvest treatment',
      'Custom processing per client',
      'Food-safe treatment materials',
    ],
    
    nameRu: 'Обработка',
    descriptionRu: 'Современные услуги обработки, включая мойку, вощение и сушку. Мы используем новейшее оборудование для подготовки продукции.',
    featuresRu: [
      'Современная мойка и очистка',
      'Вощение и полировка фруктов',
      'Послеуборочная обработка',
      'Индивидуальная обработка',
      'Безопасные материалы обработки',
    ],
  },
];

// ============================================
// MAIN FUNCTION
// ============================================
async function populateServices() {
  console.log('⚙️ Populating Services (Centralized)...\n');
  
  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const service of services) {
    try {
      const existing = await client.fetch(
        `*[_type == "serviceCentralized" && _id == $id][0]`,
        { id: service._id }
      );

      const doc = {
        _type: 'serviceCentralized',
        ...service,
        slug: { _type: 'slug', current: service.slug },
      };

      if (existing) {
        await client.patch(service._id).set(doc).commit();
        console.log(`  ✏️  Updated: ${service.nameEn}`);
        updated++;
      } else {
        await client.create(doc);
        console.log(`  ✅ Created: ${service.nameEn}`);
        created++;
      }
    } catch (error: any) {
      console.error(`  ❌ Error: ${service.nameEn} - ${error.message}`);
      errors++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   Created: ${created}`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Total: ${services.length}`);
}

populateServices().catch(console.error);
