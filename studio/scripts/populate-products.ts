/**
 * Populate Products (Centralized Schema)
 * 
 * Adds production-ready product data to productCentralized collection
 * Run: npx ts-node --esm studio/scripts/populate-products.ts
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
// PRODUCT DATA - Production Ready
// ============================================
const products = [
  {
    _id: 'product-navel-orange',
    slug: 'navel-orange',
    scientificName: 'Citrus sinensis',
    category: 'citrus',
    
    // Arabic
    titleAr: 'برتقال نافل',
    descriptionAr: 'برتقال نافل مصري طازج، معروف بحلاوته وخلوه من البذور. يتم حصاده في موسم الذروة لضمان أفضل جودة ونكهة. مثالي للعصير والاستهلاك الطازج.',
    seoAr: {
      metaTitle: 'برتقال نافل مصري طازج - تصدير عالي الجودة | السعداء',
      metaDescription: 'برتقال نافل مصري ممتاز، خالي من البذور وحلو المذاق. معتمد ISO و GAP. شحن سريع لأكثر من 50 دولة.',
    },
    
    // English
    titleEn: 'Navel Orange',
    descriptionEn: 'Fresh Egyptian Navel Orange, known for its sweetness and seedless nature. Harvested at peak season to ensure the best quality and flavor. Perfect for juicing and fresh consumption.',
    seoEn: {
      metaTitle: 'Fresh Egyptian Navel Orange - Premium Export | Al Soadaa',
      metaDescription: 'Premium Egyptian Navel Oranges, seedless and sweet. ISO & GAP certified. Fast shipping to 50+ countries.',
    },
    
    // Russian
    titleRu: 'Апельсин Навел',
    descriptionRu: 'Свежий египетский апельсин Навел, известный своей сладостью и отсутствием косточек. Собирается в пик сезона для обеспечения наилучшего качества.',
    seoRu: {
      metaTitle: 'Египетский апельсин Навел - Премиум экспорт | Al Soadaa',
      metaDescription: 'Премиум египетские апельсины Навел, без косточек. Сертификаты ISO и GAP. Доставка в 50+ стран.',
    },
    
    // Shared
    season: 'peak',
    packaging: '15kg carton boxes',
    sizes: '56-88mm diameter',
    storage: 'Cold storage at 5°C',
    shelfLife: '30-45 days',
    certifications: ['ISO 9001', 'Global G.A.P', 'HACCP'],
    availability: {
      january: true, february: true, march: true,
      april: false, may: false, june: false,
      july: false, august: false, september: false,
      october: false, november: true, december: true,
    },
  },
  {
    _id: 'product-valencia-orange',
    slug: 'valencia-orange',
    scientificName: 'Citrus sinensis',
    category: 'citrus',
    
    titleAr: 'برتقال فالنسيا',
    descriptionAr: 'برتقال فالنسيا مصري طازج، مثالي للعصير بفضل كمية العصير العالية. نكهة غنية وحلوة مع حموضة متوازنة.',
    seoAr: {
      metaTitle: 'برتقال فالنسيا مصري - أفضل برتقال للعصير | السعداء',
      metaDescription: 'برتقال فالنسيا المصري الممتاز، مثالي للعصير. معتمد دولياً وجاهز للتصدير.',
    },
    
    titleEn: 'Valencia Orange',
    descriptionEn: 'Fresh Egyptian Valencia Orange, perfect for juicing with high juice content. Rich and sweet flavor with balanced acidity.',
    seoEn: {
      metaTitle: 'Egyptian Valencia Orange - Best Juicing Orange | Al Soadaa',
      metaDescription: 'Premium Valencia Oranges from Egypt, perfect for juice. Internationally certified and export-ready.',
    },
    
    titleRu: 'Апельсин Валенсия',
    descriptionRu: 'Свежий египетский апельсин Валенсия, идеален для сока благодаря высокому содержанию сока.',
    seoRu: {
      metaTitle: 'Египетский апельсин Валенсия - Лучший для сока | Al Soadaa',
      metaDescription: 'Премиум апельсины Валенсия из Египта, идеальны для сока. Сертифицированы и готовы к экспорту.',
    },
    
    season: 'in-season',
    packaging: '15kg carton boxes',
    sizes: '60-80mm diameter',
    storage: 'Cold storage at 5-7°C',
    shelfLife: '45-60 days',
    certifications: ['ISO 9001', 'Global G.A.P'],
    availability: {
      january: true, february: true, march: true,
      april: true, may: true, june: false,
      july: false, august: false, september: false,
      october: false, november: false, december: true,
    },
  },
  {
    _id: 'product-grapefruit',
    slug: 'grapefruit',
    scientificName: 'Citrus paradisi',
    category: 'citrus',
    
    titleAr: 'جريب فروت',
    descriptionAr: 'جريب فروت مصري طازج بنكهة منعشة ومميزة. غني بفيتامين C ومضادات الأكسدة. مثالي للعصائر والسلطات.',
    seoAr: {
      metaTitle: 'جريب فروت مصري طازج - تصدير عالي الجودة | السعداء',
      metaDescription: 'جريب فروت مصري ممتاز، غني بفيتامين C. معتمد ISO و GAP. شحن سريع لأكثر من 50 دولة.',
    },
    
    titleEn: 'Grapefruit',
    descriptionEn: 'Fresh Egyptian Grapefruit with refreshing and distinctive flavor. Rich in Vitamin C and antioxidants. Perfect for juices and salads.',
    seoEn: {
      metaTitle: 'Fresh Egyptian Grapefruit - Premium Export | Al Soadaa',
      metaDescription: 'Premium Egyptian Grapefruit, rich in Vitamin C. ISO & GAP certified. Fast shipping worldwide.',
    },
    
    titleRu: 'Грейпфрут',
    descriptionRu: 'Свежий египетский грейпфрут с освежающим вкусом. Богат витамином C и антиоксидантами.',
    seoRu: {
      metaTitle: 'Египетский грейпфрут - Премиум экспорт | Al Soadaa',
      metaDescription: 'Премиум египетский грейпфрут, богатый витамином C. Сертификаты ISO и GAP.',
    },
    
    season: 'in-season',
    packaging: '17kg carton boxes',
    sizes: '70-110mm diameter',
    storage: 'Cold storage at 5°C',
    shelfLife: '40-60 days',
    certifications: ['ISO 9001', 'Global G.A.P'],
    availability: {
      january: true, february: true, march: true,
      april: false, may: false, june: false,
      july: false, august: false, september: false,
      october: true, november: true, december: true,
    },
  },
  {
    _id: 'product-lemons',
    slug: 'lemons',
    scientificName: 'Citrus limon',
    category: 'lemons',
    
    titleAr: 'ليمون مصري',
    descriptionAr: 'ليمون مصري طازج بنكهة حامضة مميزة. غني بفيتامين C. مثالي للطبخ والمشروبات والتصنيع الغذائي.',
    seoAr: {
      metaTitle: 'ليمون مصري طازج - تصدير عالي الجودة | السعداء',
      metaDescription: 'ليمون مصري ممتاز، طازج ومعتمد دولياً. شحن سريع لجميع أنحاء العالم.',
    },
    
    titleEn: 'Egyptian Lemons',
    descriptionEn: 'Fresh Egyptian Lemons with distinctive sour flavor. Rich in Vitamin C. Perfect for cooking, beverages, and food processing.',
    seoEn: {
      metaTitle: 'Fresh Egyptian Lemons - Premium Export | Al Soadaa',
      metaDescription: 'Premium Egyptian Lemons, fresh and internationally certified. Fast worldwide shipping.',
    },
    
    titleRu: 'Египетские лимоны',
    descriptionRu: 'Свежие египетские лимоны с характерным кислым вкусом. Богаты витамином C.',
    seoRu: {
      metaTitle: 'Египетские лимоны - Премиум экспорт | Al Soadaa',
      metaDescription: 'Премиум египетские лимоны, свежие и сертифицированные. Быстрая доставка по миру.',
    },
    
    season: 'in-season',
    packaging: '10kg carton boxes',
    sizes: '45-70mm diameter',
    storage: 'Cold storage at 8-10°C',
    shelfLife: '60-90 days',
    certifications: ['ISO 9001', 'Global G.A.P'],
    availability: {
      january: true, february: true, march: true,
      april: true, may: true, june: true,
      july: true, august: true, september: true,
      october: true, november: true, december: true,
    },
  },
  {
    _id: 'product-pomegranates',
    slug: 'pomegranates',
    scientificName: 'Punica granatum',
    category: 'berries',
    
    titleAr: 'رمان',
    descriptionAr: 'رمان مصري طازج بحبات حمراء لامعة ونكهة حلوة. غني بمضادات الأكسدة والفيتامينات. مثالي للعصائر والسلطات والحلويات.',
    seoAr: {
      metaTitle: 'رمان مصري طازج - تصدير عالي الجودة | السعداء',
      metaDescription: 'رمان مصري ممتاز، غني بمضادات الأكسدة. معتمد ISO و GAP. شحن سريع لأكثر من 50 دولة.',
    },
    
    titleEn: 'Pomegranates',
    descriptionEn: 'Fresh Egyptian Pomegranates with shiny red arils and sweet flavor. Rich in antioxidants and vitamins. Perfect for juices, salads, and desserts.',
    seoEn: {
      metaTitle: 'Fresh Egyptian Pomegranates - Premium Export | Al Soadaa',
      metaDescription: 'Premium Egyptian Pomegranates, rich in antioxidants. ISO & GAP certified. Fast shipping worldwide.',
    },
    
    titleRu: 'Гранат',
    descriptionRu: 'Свежий египетский гранат с блестящими красными зернами и сладким вкусом. Богат антиоксидантами.',
    seoRu: {
      metaTitle: 'Египетский гранат - Премиум экспорт | Al Soadaa',
      metaDescription: 'Премиум египетский гранат, богатый антиоксидантами. Сертификаты ISO и GAP.',
    },
    
    season: 'peak',
    packaging: '4-5kg carton boxes',
    sizes: '250-450g per fruit',
    storage: 'Cold storage at 5°C',
    shelfLife: '60-90 days',
    certifications: ['ISO 9001', 'Global G.A.P'],
    availability: {
      january: false, february: false, march: false,
      april: false, may: false, june: false,
      july: false, august: true, september: true,
      october: true, november: true, december: false,
    },
  },
  {
    _id: 'product-grapes-flame',
    slug: 'grapes-flame',
    scientificName: 'Vitis vinifera',
    category: 'grapes',
    
    titleAr: 'عنب فليم الأحمر',
    descriptionAr: 'عنب فليم أحمر مصري طازج، خالي من البذور وحلو المذاق. لون أحمر جذاب ونكهة مميزة.',
    seoAr: {
      metaTitle: 'عنب فليم أحمر مصري - تصدير عالي الجودة | السعداء',
      metaDescription: 'عنب فليم أحمر مصري ممتاز، خالي من البذور. معتمد ISO و GAP. شحن سريع عالمي.',
    },
    
    titleEn: 'Flame Red Grapes',
    descriptionEn: 'Fresh Egyptian Flame Red Grapes, seedless and sweet. Attractive red color and distinctive flavor.',
    seoEn: {
      metaTitle: 'Egyptian Flame Red Grapes - Premium Export | Al Soadaa',
      metaDescription: 'Premium Flame Red Grapes from Egypt, seedless. ISO & GAP certified. Fast global shipping.',
    },
    
    titleRu: 'Красный виноград Флейм',
    descriptionRu: 'Свежий египетский красный виноград Флейм, без косточек и сладкий. Привлекательный красный цвет.',
    seoRu: {
      metaTitle: 'Египетский виноград Флейм - Премиум экспорт | Al Soadaa',
      metaDescription: 'Премиум красный виноград Флейм из Египта, без косточек. Сертификаты ISO и GAP.',
    },
    
    season: 'peak',
    packaging: '4.5kg carton boxes',
    sizes: '18-22mm berry size',
    storage: 'Cold storage at 0-2°C',
    shelfLife: '30-45 days',
    certifications: ['ISO 9001', 'Global G.A.P'],
    availability: {
      january: false, february: false, march: false,
      april: false, may: true, june: true,
      july: true, august: true, september: true,
      october: false, november: false, december: false,
    },
  },
  {
    _id: 'product-grapes-thompson',
    slug: 'grapes-thompson',
    scientificName: 'Vitis vinifera',
    category: 'grapes',
    
    titleAr: 'عنب طومسون الأخضر',
    descriptionAr: 'عنب طومسون أخضر مصري طازج، خالي من البذور بنكهة حلوة منعشة. مثالي للاستهلاك الطازج والتصدير.',
    seoAr: {
      metaTitle: 'عنب طومسون أخضر مصري - تصدير عالي الجودة | السعداء',
      metaDescription: 'عنب طومسون أخضر مصري ممتاز، خالي من البذور. معتمد ISO و GAP. شحن سريع.',
    },
    
    titleEn: 'Thompson Green Grapes',
    descriptionEn: 'Fresh Egyptian Thompson Green Grapes, seedless with sweet refreshing flavor. Perfect for fresh consumption and export.',
    seoEn: {
      metaTitle: 'Egyptian Thompson Green Grapes - Premium Export | Al Soadaa',
      metaDescription: 'Premium Thompson Green Grapes from Egypt, seedless. ISO & GAP certified. Fast shipping.',
    },
    
    titleRu: 'Зеленый виноград Томпсон',
    descriptionRu: 'Свежий египетский зеленый виноград Томпсон, без косточек со сладким освежающим вкусом.',
    seoRu: {
      metaTitle: 'Египетский виноград Томпсон - Премиум экспорт | Al Soadaa',
      metaDescription: 'Премиум зеленый виноград Томпсон из Египта, без косточек. Сертификаты ISO и GAP.',
    },
    
    season: 'in-season',
    packaging: '4.5kg carton boxes',
    sizes: '16-20mm berry size',
    storage: 'Cold storage at 0-2°C',
    shelfLife: '30-45 days',
    certifications: ['ISO 9001', 'Global G.A.P'],
    availability: {
      january: false, february: false, march: false,
      april: false, may: true, june: true,
      july: true, august: true, september: true,
      october: false, november: false, december: false,
    },
  },
  {
    _id: 'product-strawberries',
    slug: 'strawberries',
    scientificName: 'Fragaria × ananassa',
    category: 'berries',
    
    titleAr: 'فراولة مصرية',
    descriptionAr: 'فراولة مصرية طازجة بنكهة حلوة ورائحة مميزة. غنية بفيتامين C ومضادات الأكسدة. مثالية للاستهلاك الطازج والتصنيع.',
    seoAr: {
      metaTitle: 'فراولة مصرية طازجة - تصدير عالي الجودة | السعداء',
      metaDescription: 'فراولة مصرية ممتازة بنكهة حلوة. معتمدة ISO و GAP. شحن سريع لأكثر من 50 دولة.',
    },
    
    titleEn: 'Egyptian Strawberries',
    descriptionEn: 'Fresh Egyptian Strawberries with sweet flavor and distinctive aroma. Rich in Vitamin C and antioxidants. Perfect for fresh consumption and processing.',
    seoEn: {
      metaTitle: 'Fresh Egyptian Strawberries - Premium Export | Al Soadaa',
      metaDescription: 'Premium Egyptian Strawberries with sweet flavor. ISO & GAP certified. Fast shipping to 50+ countries.',
    },
    
    titleRu: 'Египетская клубника',
    descriptionRu: 'Свежая египетская клубника со сладким вкусом и характерным ароматом. Богата витамином C.',
    seoRu: {
      metaTitle: 'Египетская клубника - Премиум экспорт | Al Soadaa',
      metaDescription: 'Премиум египетская клубника со сладким вкусом. Сертификаты ISO и GAP.',
    },
    
    season: 'peak',
    packaging: '250g-500g punnets in cartons',
    sizes: '15-35g per berry',
    storage: 'Cold storage at 2-4°C',
    shelfLife: '7-10 days',
    certifications: ['ISO 9001', 'Global G.A.P'],
    availability: {
      january: true, february: true, march: true,
      april: true, may: false, june: false,
      july: false, august: false, september: false,
      october: false, november: true, december: true,
    },
  },
  {
    _id: 'product-garlic',
    slug: 'garlic',
    scientificName: 'Allium sativum',
    category: 'vegetables',
    
    titleAr: 'ثوم مصري',
    descriptionAr: 'ثوم مصري طازج عالي الجودة، معروف بنكهته القوية وفوائده الصحية. مثالي للطبخ والتصنيع الغذائي.',
    seoAr: {
      metaTitle: 'ثوم مصري طازج - تصدير عالي الجودة | السعداء',
      metaDescription: 'ثوم مصري ممتاز بنكهة قوية وفوائد صحية. معتمد ISO و GAP. شحن سريع لأكثر من 50 دولة.',
    },
    
    titleEn: 'Egyptian Garlic',
    descriptionEn: 'Fresh high-quality Egyptian Garlic, known for its strong flavor and health benefits. Perfect for cooking and food processing.',
    seoEn: {
      metaTitle: 'Fresh Egyptian Garlic - Premium Export | Al Soadaa',
      metaDescription: 'Premium Egyptian Garlic with strong flavor and health benefits. ISO & GAP certified. Fast worldwide shipping.',
    },
    
    titleRu: 'Египетский чеснок',
    descriptionRu: 'Свежий высококачественный египетский чеснок, известный своим сильным вкусом и пользой для здоровья.',
    seoRu: {
      metaTitle: 'Египетский чеснок - Премиум экспорт | Al Soadaa',
      metaDescription: 'Премиум египетский чеснок с сильным вкусом. Сертификаты ISO и GAP. Быстрая доставка.',
    },
    
    season: 'in-season',
    packaging: '10kg mesh bags or cartons',
    sizes: '4.5-6.5cm diameter',
    storage: 'Cool dry storage',
    shelfLife: '6-8 months',
    certifications: ['ISO 9001', 'Global G.A.P'],
    availability: {
      january: true, february: true, march: true,
      april: true, may: true, june: true,
      july: true, august: true, september: true,
      october: true, november: true, december: true,
    },
  },
  {
    _id: 'product-onions',
    slug: 'golden-onions',
    scientificName: 'Allium cepa',
    category: 'vegetables',
    
    titleAr: 'بصل ذهبي مصري',
    descriptionAr: 'بصل ذهبي مصري طازج، معروف بجودته العالية ومدة صلاحيته الطويلة. مثالي للطبخ والتصدير.',
    seoAr: {
      metaTitle: 'بصل ذهبي مصري - تصدير عالي الجودة | السعداء',
      metaDescription: 'بصل ذهبي مصري ممتاز بجودة عالية. معتمد ISO و GAP. شحن سريع لأكثر من 50 دولة.',
    },
    
    titleEn: 'Egyptian Golden Onions',
    descriptionEn: 'Fresh Egyptian Golden Onions, known for high quality and long shelf life. Perfect for cooking and export.',
    seoEn: {
      metaTitle: 'Egyptian Golden Onions - Premium Export | Al Soadaa',
      metaDescription: 'Premium Egyptian Golden Onions with high quality. ISO & GAP certified. Fast worldwide shipping.',
    },
    
    titleRu: 'Египетский золотой лук',
    descriptionRu: 'Свежий египетский золотой лук, известный высоким качеством и длительным сроком хранения.',
    seoRu: {
      metaTitle: 'Египетский золотой лук - Премиум экспорт | Al Soadaa',
      metaDescription: 'Премиум египетский золотой лук высокого качества. Сертификаты ISO и GAP.',
    },
    
    season: 'in-season',
    packaging: '20-25kg mesh bags',
    sizes: '50-80mm diameter',
    storage: 'Cool dry storage',
    shelfLife: '6-9 months',
    certifications: ['ISO 9001', 'Global G.A.P'],
    availability: {
      january: true, february: true, march: true,
      april: true, may: true, june: true,
      july: true, august: true, september: true,
      october: true, november: true, december: true,
    },
  },
  {
    _id: 'product-blood-orange',
    slug: 'blood-orange',
    scientificName: 'Citrus sinensis',
    category: 'citrus',
    
    titleAr: 'برتقال دموي',
    descriptionAr: 'برتقال دموي مصري طازج بلون أحمر داكن مميز ونكهة حلوة مع لمسة من التوت. غني بمضادات الأكسدة.',
    seoAr: {
      metaTitle: 'برتقال دموي مصري - تصدير عالي الجودة | السعداء',
      metaDescription: 'برتقال دموي مصري ممتاز بنكهة فريدة. معتمد ISO و GAP. شحن سريع لأكثر من 50 دولة.',
    },
    
    titleEn: 'Blood Orange',
    descriptionEn: 'Fresh Egyptian Blood Orange with distinctive dark red color and sweet flavor with berry hints. Rich in antioxidants.',
    seoEn: {
      metaTitle: 'Egyptian Blood Orange - Premium Export | Al Soadaa',
      metaDescription: 'Premium Egyptian Blood Oranges with unique flavor. ISO & GAP certified. Fast worldwide shipping.',
    },
    
    titleRu: 'Кровавый апельсин',
    descriptionRu: 'Свежий египетский кровавый апельсин с характерным темно-красным цветом и сладким вкусом с ягодными нотками.',
    seoRu: {
      metaTitle: 'Египетский кровавый апельсин - Премиум экспорт | Al Soadaa',
      metaDescription: 'Премиум египетский кровавый апельсин с уникальным вкусом. Сертификаты ISO и GAP.',
    },
    
    season: 'peak',
    packaging: '15kg carton boxes',
    sizes: '55-75mm diameter',
    storage: 'Cold storage at 5°C',
    shelfLife: '30-40 days',
    certifications: ['ISO 9001', 'Global G.A.P'],
    availability: {
      january: true, february: true, march: true,
      april: false, may: false, june: false,
      july: false, august: false, september: false,
      october: false, november: false, december: true,
    },
  },
];

// ============================================
// MAIN FUNCTION
// ============================================
async function populateProducts() {
  console.log('🍊 Populating Products (Centralized)...\n');
  
  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const product of products) {
    try {
      // Check if exists
      const existing = await client.fetch(
        `*[_type == "productCentralized" && _id == $id][0]`,
        { id: product._id }
      );

      const doc = {
        _type: 'productCentralized',
        ...product,
        slug: { _type: 'slug', current: product.slug },
      };

      if (existing) {
        await client.patch(product._id).set(doc).commit();
        console.log(`  ✏️  Updated: ${product.titleEn}`);
        updated++;
      } else {
        await client.create(doc);
        console.log(`  ✅ Created: ${product.titleEn}`);
        created++;
      }
    } catch (error: any) {
      console.error(`  ❌ Error: ${product.titleEn} - ${error.message}`);
      errors++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   Created: ${created}`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Total: ${products.length}`);
}

populateProducts().catch(console.error);
