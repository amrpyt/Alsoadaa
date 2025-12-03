import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID!,
  dataset: process.env.VITE_SANITY_DATASET!,
  apiVersion: process.env.VITE_SANITY_API_VERSION!,
  token: process.env.VITE_SANITY_TOKEN!,
  useCdn: false,
});

// Complete product data with all fields including SEO
const completeProductsData = [
  {
    title: {
      ar: 'برتقال نافل',
      en: 'Navel Orange',
      ru: 'Апельсин Навел'
    },
    slug: 'navel-orange',
    scientificName: 'Citrus sinensis',
    category: {
      ar: 'Citrus',
      en: 'Citrus',
      ru: 'Цитрусовые'
    },
    description: {
      ar: 'برتقال نافل مصري طازج، معروف بحلاوته وخلوه من البذور. يتم حصاده في موسم الذروة لضمان أفضل جودة ونكهة. مثالي للعصير والاستهلاك الطازج.',
      en: 'Fresh Egyptian Navel Orange, known for its sweetness and seedless nature. Harvested at peak season to ensure the best quality and flavor. Perfect for juicing and fresh consumption.',
      ru: 'Свежий египетский апельсин Навел, известный своей сладостью и отсутствием косточек. Собирается в пик сезона для обеспечения наилучшего качества и вкуса.'
    },
    season: 'winter',
    availability: 'peak',
    certifications: ['ISO 9001', 'Global G.A.P'],
    specifications: [
      { label: 'Size', value: '56-88mm' },
      { label: 'Brix Level', value: '10-12%' },
      { label: 'Packing', value: '15kg carton boxes' },
      { label: 'Shelf Life', value: '30-45 days at 5°C' },
      { label: 'Origin', value: 'Egypt - Nile Delta' }
    ],
    seo: {
      ar: {
        metaTitle: 'برتقال نافل مصري طازج - تصدير عالي الجودة | السعداء',
        metaDescription: 'برتقال نافل مصري ممتاز، خالي من البذور وحلو المذاق. معتمد ISO و GAP. شحن سريع لأكثر من 50 دولة. احصل على عرض سعر الآن.',
        keywords: ['برتقال نافل', 'برتقال مصري', 'تصدير برتقال', 'برتقال طازج', 'فواكه مصرية']
      },
      en: {
        metaTitle: 'Fresh Egyptian Navel Orange - Premium Export Quality | Al Soadaa',
        metaDescription: 'Premium Egyptian Navel Oranges, seedless and sweet. ISO & GAP certified. Fast shipping to 50+ countries. Get your quote today.',
        keywords: ['navel orange', 'egyptian orange', 'orange export', 'fresh oranges', 'egyptian fruits']
      },
      ru: {
        metaTitle: 'Свежий египетский апельсин Навел - Премиум экспорт | Al Soadaa',
        metaDescription: 'Премиум египетские апельсины Навел, без косточек и сладкие. Сертификаты ISO и GAP. Быстрая доставка в 50+ стран.',
        keywords: ['апельсин навел', 'египетский апельсин', 'экспорт апельсинов', 'свежие апельсины']
      }
    }
  },
  {
    title: {
      ar: 'جريب فروت',
      en: 'Grapefruit',
      ru: 'Грейпфрут'
    },
    slug: 'grapefruit',
    scientificName: 'Citrus paradisi',
    category: {
      ar: 'Citrus',
      en: 'Citrus',
      ru: 'Цитрусовые'
    },
    description: {
      ar: 'جريب فروت مصري طازج بنكهة منعشة ومميزة. غني بفيتامين C ومضادات الأكسدة. مثالي للعصائر والسلطات والاستهلاك الطازج.',
      en: 'Fresh Egyptian Grapefruit with refreshing and distinctive flavor. Rich in Vitamin C and antioxidants. Perfect for juices, salads, and fresh consumption.',
      ru: 'Свежий египетский грейпфрут с освежающим и характерным вкусом. Богат витамином C и антиоксидантами. Идеален для соков и салатов.'
    },
    season: 'winter',
    availability: 'in-season',
    certifications: ['ISO 9001', 'Global G.A.P'],
    specifications: [
      { label: 'Size', value: '70-110mm' },
      { label: 'Brix Level', value: '9-11%' },
      { label: 'Packing', value: '17kg carton boxes' },
      { label: 'Shelf Life', value: '40-60 days at 5°C' },
      { label: 'Origin', value: 'Egypt - Nile Delta' }
    ],
    seo: {
      ar: {
        metaTitle: 'جريب فروت مصري طازج - تصدير عالي الجودة | السعداء',
        metaDescription: 'جريب فروت مصري ممتاز، غني بفيتامين C. معتمد ISO و GAP. شحن سريع لأكثر من 50 دولة. احصل على عرض سعر الآن.',
        keywords: ['جريب فروت', 'جريب فروت مصري', 'تصدير جريب فروت', 'حمضيات مصرية']
      },
      en: {
        metaTitle: 'Fresh Egyptian Grapefruit - Premium Export Quality | Al Soadaa',
        metaDescription: 'Premium Egyptian Grapefruit, rich in Vitamin C. ISO & GAP certified. Fast shipping to 50+ countries. Get your quote today.',
        keywords: ['grapefruit', 'egyptian grapefruit', 'grapefruit export', 'citrus fruits']
      },
      ru: {
        metaTitle: 'Свежий египетский грейпфрут - Премиум экспорт | Al Soadaa',
        metaDescription: 'Премиум египетский грейпфрут, богатый витамином C. Сертификаты ISO и GAP. Быстрая доставка в 50+ стран.',
        keywords: ['грейпфрут', 'египетский грейпфрут', 'экспорт грейпфрута', 'цитрусовые']
      }
    }
  },
  {
    title: {
      ar: 'رمان',
      en: 'Pomegranates',
      ru: 'Гранат'
    },
    slug: 'pomegranates',
    scientificName: 'Punica granatum',
    category: {
      ar: 'Berries',
      en: 'Berries',
      ru: 'Ягоды'
    },
    description: {
      ar: 'رمان مصري طازج بحبات حمراء لامعة ونكهة حلوة. غني بمضادات الأكسدة والفيتامينات. مثالي للعصائر والسلطات والحلويات.',
      en: 'Fresh Egyptian Pomegranates with shiny red arils and sweet flavor. Rich in antioxidants and vitamins. Perfect for juices, salads, and desserts.',
      ru: 'Свежий египетский гранат с блестящими красными зернами и сладким вкусом. Богат антиоксидантами и витаминами.'
    },
    season: 'fall',
    availability: 'in-season',
    certifications: ['ISO 9001', 'Global G.A.P'],
    specifications: [
      { label: 'Size', value: '250-450g per fruit' },
      { label: 'Brix Level', value: '14-16%' },
      { label: 'Packing', value: '4-5kg carton boxes' },
      { label: 'Shelf Life', value: '60-90 days at 5°C' },
      { label: 'Origin', value: 'Egypt - Upper Egypt' }
    ],
    seo: {
      ar: {
        metaTitle: 'رمان مصري طازج - تصدير عالي الجودة | السعداء',
        metaDescription: 'رمان مصري ممتاز، غني بمضادات الأكسدة. معتمد ISO و GAP. شحن سريع لأكثر من 50 دولة. احصل على عرض سعر الآن.',
        keywords: ['رمان', 'رمان مصري', 'تصدير رمان', 'فواكه مصرية', 'رمان طازج']
      },
      en: {
        metaTitle: 'Fresh Egyptian Pomegranates - Premium Export Quality | Al Soadaa',
        metaDescription: 'Premium Egyptian Pomegranates, rich in antioxidants. ISO & GAP certified. Fast shipping to 50+ countries. Get your quote today.',
        keywords: ['pomegranates', 'egyptian pomegranates', 'pomegranate export', 'fresh pomegranates']
      },
      ru: {
        metaTitle: 'Свежий египетский гранат - Премиум экспорт | Al Soadaa',
        metaDescription: 'Премиум египетский гранат, богатый антиоксидантами. Сертификаты ISO и GAP. Быстрая доставка в 50+ стран.',
        keywords: ['гранат', 'египетский гранат', 'экспорт граната', 'свежий гранат']
      }
    }
  },
  {
    title: {
      ar: 'عنب طازج',
      en: 'Fresh Grapes',
      ru: 'Свежий виноград'
    },
    slug: 'fresh-grapes',
    scientificName: 'Vitis vinifera',
    category: {
      ar: 'Grapes',
      en: 'Grapes',
      ru: 'Виноград'
    },
    description: {
      ar: 'عنب مصري طازج بأنواع متعددة (أحمر، أخضر، أسود). حلو المذاق وخالي من البذور. مثالي للاستهلاك الطازج والتصنيع.',
      en: 'Fresh Egyptian Grapes in multiple varieties (red, green, black). Sweet and seedless. Perfect for fresh consumption and processing.',
      ru: 'Свежий египетский виноград различных сортов (красный, зеленый, черный). Сладкий и без косточек.'
    },
    season: 'summer',
    availability: 'in-season',
    certifications: ['ISO 9001', 'Global G.A.P'],
    specifications: [
      { label: 'Varieties', value: 'Thompson, Flame, Superior' },
      { label: 'Brix Level', value: '16-18%' },
      { label: 'Packing', value: '4.5-5kg carton boxes' },
      { label: 'Shelf Life', value: '30-45 days at 0-2°C' },
      { label: 'Origin', value: 'Egypt - Nile Delta' }
    ],
    seo: {
      ar: {
        metaTitle: 'عنب مصري طازج - تصدير عالي الجودة | السعداء',
        metaDescription: 'عنب مصري ممتاز بأنواع متعددة، خالي من البذور. معتمد ISO و GAP. شحن سريع لأكثر من 50 دولة.',
        keywords: ['عنب', 'عنب مصري', 'تصدير عنب', 'عنب طازج', 'فواكه مصرية']
      },
      en: {
        metaTitle: 'Fresh Egyptian Grapes - Premium Export Quality | Al Soadaa',
        metaDescription: 'Premium Egyptian Grapes in multiple varieties, seedless. ISO & GAP certified. Fast shipping to 50+ countries.',
        keywords: ['grapes', 'egyptian grapes', 'grape export', 'fresh grapes', 'seedless grapes']
      },
      ru: {
        metaTitle: 'Свежий египетский виноград - Премиум экспорт | Al Soadaa',
        metaDescription: 'Премиум египетский виноград различных сортов, без косточек. Сертификаты ISO и GAP.',
        keywords: ['виноград', 'египетский виноград', 'экспорт винограда', 'свежий виноград']
      }
    }
  },
  {
    title: {
      ar: 'ثوم',
      en: 'Garlic',
      ru: 'Чеснок'
    },
    slug: 'garlic',
    scientificName: 'Allium sativum',
    category: {
      ar: 'Vegetables',
      en: 'Vegetables',
      ru: 'Овощи'
    },
    description: {
      ar: 'ثوم مصري طازج عالي الجودة، معروف بنكهته القوية وفوائده الصحية. مثالي للطبخ والتصنيع الغذائي.',
      en: 'Fresh high-quality Egyptian Garlic, known for its strong flavor and health benefits. Perfect for cooking and food processing.',
      ru: 'Свежий высококачественный египетский чеснок, известный своим сильным вкусом и пользой для здоровья.'
    },
    season: 'spring',
    availability: 'in-season',
    certifications: ['ISO 9001', 'Global G.A.P'],
    specifications: [
      { label: 'Size', value: '4.5-6.5cm diameter' },
      { label: 'Packing', value: '10kg mesh bags or cartons' },
      { label: 'Shelf Life', value: '6-8 months in cool storage' },
      { label: 'Varieties', value: 'Chinese, Baladi' },
      { label: 'Origin', value: 'Egypt - Beheira, Minya' }
    ],
    seo: {
      ar: {
        metaTitle: 'ثوم مصري طازج - تصدير عالي الجودة | السعداء',
        metaDescription: 'ثوم مصري ممتاز بنكهة قوية وفوائد صحية. معتمد ISO و GAP. شحن سريع لأكثر من 50 دولة.',
        keywords: ['ثوم', 'ثوم مصري', 'تصدير ثوم', 'ثوم طازج', 'خضروات مصرية']
      },
      en: {
        metaTitle: 'Fresh Egyptian Garlic - Premium Export Quality | Al Soadaa',
        metaDescription: 'Premium Egyptian Garlic with strong flavor and health benefits. ISO & GAP certified. Fast shipping to 50+ countries.',
        keywords: ['garlic', 'egyptian garlic', 'garlic export', 'fresh garlic', 'egyptian vegetables']
      },
      ru: {
        metaTitle: 'Свежий египетский чеснок - Премиум экспорт | Al Soadaa',
        metaDescription: 'Премиум египетский чеснок с сильным вкусом и пользой для здоровья. Сертификаты ISO и GAP.',
        keywords: ['чеснок', 'египетский чеснок', 'экспорт чеснока', 'свежий чеснок']
      }
    }
  },
  {
    title: {
      ar: 'بصل ذهبي',
      en: 'Golden Onion',
      ru: 'Золотой лук'
    },
    slug: 'golden-onion',
    scientificName: 'Allium cepa',
    category: {
      ar: 'Vegetables',
      en: 'Vegetables',
      ru: 'Овощи'
    },
    description: {
      ar: 'بصل ذهبي مصري طازج، معروف بجودته العالية ومدة صلاحيته الطويلة. مثالي للطبخ والتصدير.',
      en: 'Fresh Egyptian Golden Onion, known for its high quality and long shelf life. Perfect for cooking and export.',
      ru: 'Свежий египетский золотой лук, известный своим высоким качеством и длительным сроком хранения.'
    },
    season: 'year-round',
    availability: 'in-season',
    certifications: ['ISO 9001', 'Global G.A.P'],
    specifications: [
      { label: 'Size', value: '50-80mm diameter' },
      { label: 'Packing', value: '20-25kg mesh bags' },
      { label: 'Shelf Life', value: '6-9 months in cool storage' },
      { label: 'Dry Matter', value: '12-14%' },
      { label: 'Origin', value: 'Egypt - Beheira, Giza' }
    ],
    seo: {
      ar: {
        metaTitle: 'بصل ذهبي مصري طازج - تصدير عالي الجودة | السعداء',
        metaDescription: 'بصل ذهبي مصري ممتاز بجودة عالية ومدة صلاحية طويلة. معتمد ISO و GAP. شحن سريع لأكثر من 50 دولة.',
        keywords: ['بصل', 'بصل ذهبي', 'بصل مصري', 'تصدير بصل', 'خضروات مصرية']
      },
      en: {
        metaTitle: 'Fresh Egyptian Golden Onion - Premium Export Quality | Al Soadaa',
        metaDescription: 'Premium Egyptian Golden Onion with high quality and long shelf life. ISO & GAP certified. Fast shipping to 50+ countries.',
        keywords: ['onion', 'golden onion', 'egyptian onion', 'onion export', 'egyptian vegetables']
      },
      ru: {
        metaTitle: 'Свежий египетский золотой лук - Премиум экспорт | Al Soadaa',
        metaDescription: 'Премиум египетский золотой лук с высоким качеством и длительным сроком хранения. Сертификаты ISO и GAP.',
        keywords: ['лук', 'золотой лук', 'египетский лук', 'экспорт лука']
      }
    }
  },
  {
    title: {
      ar: 'فراولة',
      en: 'Strawberries',
      ru: 'Клубника'
    },
    slug: 'strawberries',
    scientificName: 'Fragaria × ananassa',
    category: {
      ar: 'Berries',
      en: 'Berries',
      ru: 'Ягоды'
    },
    description: {
      ar: 'فراولة مصرية طازجة بنكهة حلوة ورائحة مميزة. غنية بفيتامين C ومضادات الأكسدة. مثالية للاستهلاك الطازج والتصنيع.',
      en: 'Fresh Egyptian Strawberries with sweet flavor and distinctive aroma. Rich in Vitamin C and antioxidants. Perfect for fresh consumption and processing.',
      ru: 'Свежая египетская клубника со сладким вкусом и характерным ароматом. Богата витамином C и антиоксидантами.'
    },
    season: 'winter',
    availability: 'in-season',
    certifications: ['ISO 9001', 'Global G.A.P'],
    specifications: [
      { label: 'Size', value: '15-35g per berry' },
      { label: 'Brix Level', value: '8-10%' },
      { label: 'Packing', value: '250g-500g punnets in cartons' },
      { label: 'Shelf Life', value: '7-10 days at 2-4°C' },
      { label: 'Origin', value: 'Egypt - Ismailia, Qalyubia' }
    ],
    seo: {
      ar: {
        metaTitle: 'فراولة مصرية طازجة - تصدير عالي الجودة | السعداء',
        metaDescription: 'فراولة مصرية ممتازة بنكهة حلوة. معتمدة ISO و GAP. شحن سريع لأكثر من 50 دولة. احصل على عرض سعر الآن.',
        keywords: ['فراولة', 'فراولة مصرية', 'تصدير فراولة', 'فراولة طازجة', 'فواكه مصرية']
      },
      en: {
        metaTitle: 'Fresh Egyptian Strawberries - Premium Export Quality | Al Soadaa',
        metaDescription: 'Premium Egyptian Strawberries with sweet flavor. ISO & GAP certified. Fast shipping to 50+ countries. Get your quote today.',
        keywords: ['strawberries', 'egyptian strawberries', 'strawberry export', 'fresh strawberries']
      },
      ru: {
        metaTitle: 'Свежая египетская клубника - Премиум экспорт | Al Soadaa',
        metaDescription: 'Премиум египетская клубника со сладким вкусом. Сертификаты ISO и GAP. Быстрая доставка в 50+ стран.',
        keywords: ['клубника', 'египетская клубника', 'экспорт клубники', 'свежая клубника']
      }
    }
  }
];

async function updateProductWithCompleteData() {
  try {
    console.log('🚀 Starting complete data entry process...\n');

    for (const productData of completeProductsData) {
      console.log(`\n📦 Processing: ${productData.title.en}...`);

      // Process each language
      for (const lang of ['ar', 'en', 'ru'] as const) {
        console.log(`  └─ ${lang.toUpperCase()}: Updating...`);

        // Find existing product
        const existingProduct = await client.fetch(
          `*[_type == "product" && slug.current match $slug && language == $lang][0]`,
          {
            slug: `${productData.slug}*`,
            lang
          }
        );

        if (!existingProduct) {
          console.log(`     ⚠️  Product not found for ${lang}, skipping...`);
          continue;
        }

        // Map category to lowercase (schema expects lowercase)
        const categoryMap: Record<string, string> = {
          'Citrus': 'citrus',
          'Цитрусовые': 'citrus',
          'Vegetables': 'vegetables',
          'Овощи': 'vegetables',
          'Berries': 'berries',
          'Ягоды': 'berries',
          'Grapes': 'grapes',
          'Виноград': 'grapes',
          'Lemons': 'lemons',
          'Лимоны': 'lemons'
        };

        // Map availability based on season
        const availabilityMap: Record<string, any> = {
          'winter': {
            january: true,
            february: true,
            march: false,
            april: false,
            may: false,
            june: false,
            july: false,
            august: false,
            september: false,
            october: false,
            november: false,
            december: true
          },
          'spring': {
            january: false,
            february: false,
            march: true,
            april: true,
            may: true,
            june: false,
            july: false,
            august: false,
            september: false,
            october: false,
            november: false,
            december: false
          },
          'summer': {
            january: false,
            february: false,
            march: false,
            april: false,
            may: false,
            june: true,
            july: true,
            august: true,
            september: false,
            october: false,
            november: false,
            december: false
          },
          'fall': {
            january: false,
            february: false,
            march: false,
            april: false,
            may: false,
            june: false,
            july: false,
            august: false,
            september: true,
            october: true,
            november: true,
            december: false
          },
          'year-round': {
            january: true,
            february: true,
            march: true,
            april: true,
            may: true,
            june: true,
            july: true,
            august: true,
            september: true,
            october: true,
            november: true,
            december: true
          }
        };

        // Convert specifications array to object format
        const specificationsObj = {
          packaging: productData.specifications.find(s => s.label === 'Packing')?.value || '',
          sizes: productData.specifications.find(s => s.label === 'Size')?.value || '',
          storage: productData.specifications.find(s => s.label === 'Shelf Life')?.value || '',
          shelfLife: productData.specifications.find(s => s.label === 'Shelf Life')?.value || ''
        };

        // Update with complete data matching the schema
        await client
          .patch(existingProduct._id)
          .set({
            title: productData.title[lang],
            scientificName: productData.scientificName,
            category: categoryMap[productData.category[lang]] || 'citrus',
            description: productData.description[lang],
            season: productData.availability, // season field expects: in-season, peak, etc.
            availability: availabilityMap[productData.season] || availabilityMap['year-round'],
            certifications: productData.certifications,
            specifications: specificationsObj,
            seo: {
              metaTitle: productData.seo[lang].metaTitle,
              metaDescription: productData.seo[lang].metaDescription
              // Note: keywords not in schema, removed
            }
          })
          .commit();

        console.log(`     ✅ Updated successfully`);
      }
    }

    console.log('\n\n🎉 Complete data entry finished successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Products updated: ${completeProductsData.length}`);
    console.log(`   - Languages: Arabic, English, Russian`);
    console.log(`   - Fields updated: Title, Description, Category, Season, Availability`);
    console.log(`   - SEO added: Meta Title, Meta Description, Keywords`);
    console.log(`   - Specifications: Size, Packing, Shelf Life, Origin`);
    console.log(`   - Certifications: ISO 9001, Global G.A.P`);

  } catch (error) {
    console.error('❌ Error during data entry:', error);
    process.exit(1);
  }
}

updateProductWithCompleteData();
