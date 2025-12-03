/**
 * Populate Pages (Centralized Schema)
 * 
 * Adds production-ready page data to pageCentralized collection
 * Run: npx ts-node --esm studio/scripts/populate-pages.ts
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
// PAGES DATA - Production Ready
// ============================================
const pages = [
  {
    _id: 'page-home',
    slug: 'home',
    pageType: 'home',
    isPublished: true,
    order: 1,
    
    // Arabic
    titleAr: 'الرئيسية',
    seoAr: {
      metaTitle: 'السعداء للتصدير الزراعي | حمضيات وخضروات مصرية طازجة',
      metaDescription: 'السعداء شركة تصدير زراعي مصرية متخصصة في تصدير الحمضيات والخضروات الطازجة. معتمدون بشهادات ISO و GAP. نصدر لأكثر من 50 دولة.',
    },
    
    // English
    titleEn: 'Home',
    seoEn: {
      metaTitle: 'Al Soadaa Agricultural Export | Fresh Egyptian Citrus & Vegetables',
      metaDescription: 'Al Soadaa is an Egyptian agricultural export company specializing in fresh citrus and vegetables. ISO & GAP certified. Exporting to 50+ countries.',
    },
    
    // Russian
    titleRu: 'Главная',
    seoRu: {
      metaTitle: 'Al Soadaa Экспорт | Свежие египетские цитрусовые и овощи',
      metaDescription: 'Al Soadaa - египетская компания по экспорту сельхозпродукции. Сертификаты ISO и GAP. Экспорт в 50+ стран.',
    },
  },
  {
    _id: 'page-about',
    slug: 'about',
    pageType: 'about',
    isPublished: true,
    order: 2,
    
    titleAr: 'من نحن',
    seoAr: {
      metaTitle: 'من نحن | السعداء للتصدير الزراعي',
      metaDescription: 'تعرف على قصة السعداء، رؤيتنا ومهمتنا. شركة تصدير زراعي مصرية منذ 2009 بخبرة تزيد عن 15 عاماً.',
    },
    
    titleEn: 'About Us',
    seoEn: {
      metaTitle: 'About Us | Al Soadaa Agricultural Export',
      metaDescription: 'Learn about Al Soadaa\'s story, vision and mission. Egyptian agricultural export company since 2009 with 15+ years experience.',
    },
    
    titleRu: 'О нас',
    seoRu: {
      metaTitle: 'О нас | Al Soadaa Экспорт',
      metaDescription: 'Узнайте историю Al Soadaa, нашу миссию и видение. Египетская экспортная компания с 2009 года.',
    },
  },
  {
    _id: 'page-products',
    slug: 'products',
    pageType: 'products',
    isPublished: true,
    order: 3,
    
    titleAr: 'منتجاتنا',
    seoAr: {
      metaTitle: 'منتجاتنا | حمضيات وخضروات مصرية للتصدير | السعداء',
      metaDescription: 'استكشف مجموعة منتجاتنا من الحمضيات والخضروات المصرية الطازجة. برتقال، ليمون، عنب، ثوم، بصل وأكثر.',
    },
    
    titleEn: 'Our Products',
    seoEn: {
      metaTitle: 'Our Products | Egyptian Citrus & Vegetables for Export | Al Soadaa',
      metaDescription: 'Explore our range of fresh Egyptian citrus and vegetables. Oranges, lemons, grapes, garlic, onions and more.',
    },
    
    titleRu: 'Наша продукция',
    seoRu: {
      metaTitle: 'Наша продукция | Египетские цитрусовые и овощи | Al Soadaa',
      metaDescription: 'Ознакомьтесь с нашим ассортиментом свежих египетских цитрусовых и овощей.',
    },
  },
  {
    _id: 'page-services',
    slug: 'services',
    pageType: 'services',
    isPublished: true,
    order: 4,
    
    titleAr: 'خدماتنا',
    seoAr: {
      metaTitle: 'خدماتنا | فرز، تعبئة، تصدير | السعداء',
      metaDescription: 'نقدم خدمات متكاملة من الفرز والتعبئة وسلسلة التبريد والتصدير. جودة معتمدة وتسليم في الوقت المحدد.',
    },
    
    titleEn: 'Our Services',
    seoEn: {
      metaTitle: 'Our Services | Sorting, Packing, Export | Al Soadaa',
      metaDescription: 'We offer complete services from sorting, packing, cold chain, and export. Certified quality and on-time delivery.',
    },
    
    titleRu: 'Наши услуги',
    seoRu: {
      metaTitle: 'Наши услуги | Сортировка, упаковка, экспорт | Al Soadaa',
      metaDescription: 'Полный комплекс услуг: сортировка, упаковка, холодовая цепь и экспорт.',
    },
  },
  {
    _id: 'page-contact',
    slug: 'contact',
    pageType: 'contact',
    isPublished: true,
    order: 5,
    
    titleAr: 'اتصل بنا',
    seoAr: {
      metaTitle: 'اتصل بنا | السعداء للتصدير الزراعي',
      metaDescription: 'تواصل معنا للاستفسارات وطلبات الأسعار. فريقنا جاهز لمساعدتك على مدار الساعة.',
    },
    
    titleEn: 'Contact Us',
    seoEn: {
      metaTitle: 'Contact Us | Al Soadaa Agricultural Export',
      metaDescription: 'Get in touch for inquiries and quote requests. Our team is ready to help you 24/7.',
    },
    
    titleRu: 'Контакты',
    seoRu: {
      metaTitle: 'Контакты | Al Soadaa Экспорт',
      metaDescription: 'Свяжитесь с нами для запросов и предложений. Наша команда готова помочь.',
    },
  },
  {
    _id: 'page-calendar',
    slug: 'calendar',
    pageType: 'products',
    isPublished: true,
    order: 6,
    
    titleAr: 'التقويم الموسمي',
    seoAr: {
      metaTitle: 'التقويم الموسمي | مواعيد توفر المنتجات | السعداء',
      metaDescription: 'اطلع على تقويم توفر منتجاتنا الموسمية. خطط طلباتك مسبقاً لضمان الحصول على أفضل المنتجات.',
    },
    
    titleEn: 'Seasonal Calendar',
    seoEn: {
      metaTitle: 'Seasonal Calendar | Product Availability | Al Soadaa',
      metaDescription: 'View our seasonal product availability calendar. Plan your orders ahead for the best products.',
    },
    
    titleRu: 'Сезонный календарь',
    seoRu: {
      metaTitle: 'Сезонный календарь | Доступность продукции | Al Soadaa',
      metaDescription: 'Ознакомьтесь с календарем сезонной доступности нашей продукции.',
    },
  },
  {
    _id: 'page-privacy',
    slug: 'privacy-policy',
    pageType: 'legal',
    isPublished: true,
    order: 10,
    
    titleAr: 'سياسة الخصوصية',
    seoAr: {
      metaTitle: 'سياسة الخصوصية | السعداء',
      metaDescription: 'سياسة الخصوصية وحماية البيانات في السعداء للتصدير الزراعي.',
    },
    
    titleEn: 'Privacy Policy',
    seoEn: {
      metaTitle: 'Privacy Policy | Al Soadaa',
      metaDescription: 'Privacy policy and data protection at Al Soadaa Agricultural Export.',
    },
    
    titleRu: 'Политика конфиденциальности',
    seoRu: {
      metaTitle: 'Политика конфиденциальности | Al Soadaa',
      metaDescription: 'Политика конфиденциальности и защиты данных Al Soadaa.',
    },
  },
  {
    _id: 'page-terms',
    slug: 'terms-of-service',
    pageType: 'legal',
    isPublished: true,
    order: 11,
    
    titleAr: 'شروط الخدمة',
    seoAr: {
      metaTitle: 'شروط الخدمة | السعداء',
      metaDescription: 'شروط وأحكام استخدام موقع السعداء للتصدير الزراعي.',
    },
    
    titleEn: 'Terms of Service',
    seoEn: {
      metaTitle: 'Terms of Service | Al Soadaa',
      metaDescription: 'Terms and conditions for using Al Soadaa Agricultural Export website.',
    },
    
    titleRu: 'Условия использования',
    seoRu: {
      metaTitle: 'Условия использования | Al Soadaa',
      metaDescription: 'Условия использования сайта Al Soadaa.',
    },
  },
];

// ============================================
// MAIN FUNCTION
// ============================================
async function populatePages() {
  console.log('📄 Populating Pages (Centralized)...\n');
  
  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const page of pages) {
    try {
      const existing = await client.fetch(
        `*[_type == "pageCentralized" && _id == $id][0]`,
        { id: page._id }
      );

      const doc = {
        _type: 'pageCentralized',
        ...page,
        slug: { _type: 'slug', current: page.slug },
      };

      if (existing) {
        await client.patch(page._id).set(doc).commit();
        console.log(`  ✏️  Updated: ${page.titleEn}`);
        updated++;
      } else {
        await client.create(doc);
        console.log(`  ✅ Created: ${page.titleEn}`);
        created++;
      }
    } catch (error: any) {
      console.error(`  ❌ Error: ${page.titleEn} - ${error.message}`);
      errors++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   Created: ${created}`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Total: ${pages.length}`);
}

populatePages().catch(console.error);
