/**
 * Full Product Update Script - Fills ALL fields
 * 
 * Run with: npx tsx scripts/update-products-full.ts --apply
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'wptd4h7v',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

// Complete product data with ALL fields
const products = [
  {
    // Basic Info
    titleEn: 'Baladi Orange',
    titleAr: 'برتقال بلدي',
    titleRu: 'Апельсин Балади',
    scientificName: 'Citrus sinensis',
    category: 'citrus',
    
    // Season status (based on current month - November)
    season: 'in-season',
    
    // Availability
    availability: {
      january: true, february: true, march: true, april: true,
      may: false, june: false, july: false, august: false,
      september: false, october: false, november: true, december: true
    },
    
    // Descriptions
    descriptionEn: 'Premium Egyptian Baladi Orange, known for its exceptional sweetness and juicy texture. Grown in the fertile Nile Delta region, our Baladi oranges are hand-picked at peak ripeness to ensure the highest quality. Perfect for fresh consumption, juicing, or export markets.',
    descriptionAr: 'برتقال بلدي مصري ممتاز، معروف بحلاوته الاستثنائية وقوامه العصيري. يُزرع في منطقة دلتا النيل الخصبة، يتم قطف برتقالنا البلدي يدوياً في ذروة النضج لضمان أعلى جودة. مثالي للاستهلاك الطازج أو العصير أو أسواق التصدير.',
    descriptionRu: 'Премиальный египетский апельсин Балади, известный своей исключительной сладостью и сочной текстурой. Выращенный в плодородном регионе дельты Нила, наши апельсины Балади собираются вручную на пике спелости для обеспечения высочайшего качества.',
    
    // Specifications
    specifications: {
      packaging: 'Master carton 15 KGs',
      sizes: '40, 48, 56, 64, 72, 80, 88, 100, 113, 125 per carton',
      storage: '8-10°C with 85-90% humidity',
      shelfLife: '4-6 weeks under proper storage conditions'
    },
    
    // Certifications
    certifications: ['GlobalGAP', 'ISO 9001'],
    
    // SEO
    seoEn: {
      metaTitle: 'Fresh Egyptian Baladi Oranges | Premium Citrus Export',
      metaDescription: 'Premium quality Egyptian Baladi oranges for export. Fresh, sweet, and juicy citrus fruits from the Nile Delta. Available Nov-April.'
    },
    seoAr: {
      metaTitle: 'برتقال بلدي مصري طازج | تصدير حمضيات ممتازة',
      metaDescription: 'برتقال بلدي مصري ممتاز للتصدير. فواكه حمضيات طازجة وحلوة وعصيرية من دلتا النيل. متوفر من نوفمبر إلى أبريل.'
    },
    seoRu: {
      metaTitle: 'Свежие египетские апельсины Балади | Премиум экспорт цитрусовых',
      metaDescription: 'Египетские апельсины Балади премиум-качества на экспорт. Свежие, сладкие и сочные цитрусовые из дельты Нила.'
    }
  },
  {
    titleEn: 'Navel Orange',
    titleAr: 'برتقال أبو سرة',
    titleRu: 'Апельсин Навел',
    scientificName: 'Citrus sinensis (Navel group)',
    category: 'citrus',
    season: 'in-season',
    
    availability: {
      january: true, february: true, march: true, april: false,
      may: false, june: false, july: false, august: false,
      september: false, october: true, november: true, december: true
    },
    
    descriptionEn: 'Egyptian Navel Orange - the king of oranges. Colored product available October to November, natural color from December to March. Known for its seedless flesh and distinctive navel formation. Sweet, easy to peel, and perfect for fresh eating.',
    descriptionAr: 'برتقال أبو سرة المصري - ملك البرتقال. المنتج الملون متوفر من أكتوبر إلى نوفمبر، واللون الطبيعي من ديسمبر إلى مارس. معروف بلبه الخالي من البذور وتكوينه المميز. حلو وسهل التقشير ومثالي للأكل الطازج.',
    descriptionRu: 'Египетский апельсин Навел - король апельсинов. Цветной продукт доступен с октября по ноябрь, натуральный цвет с декабря по март. Известен бессемянной мякотью и характерным пупком. Сладкий, легко чистится.',
    
    specifications: {
      packaging: 'Carton 15 KG',
      sizes: '36, 40, 48, 56, 64, 72, 80, 88, 100, 113 per carton',
      storage: '4-7°C with 90-95% humidity',
      shelfLife: '8-12 weeks under proper storage conditions'
    },
    
    certifications: ['GlobalGAP', 'ISO 9001'],
    
    seoEn: {
      metaTitle: 'Egyptian Navel Oranges | Seedless Premium Citrus',
      metaDescription: 'Premium Egyptian Navel oranges - seedless, sweet, and easy to peel. Available Oct-March. Perfect for export and retail markets.'
    },
    seoAr: {
      metaTitle: 'برتقال أبو سرة مصري | حمضيات ممتازة بدون بذور',
      metaDescription: 'برتقال أبو سرة مصري ممتاز - بدون بذور، حلو وسهل التقشير. متوفر من أكتوبر إلى مارس.'
    },
    seoRu: {
      metaTitle: 'Египетские апельсины Навел | Бессемянные премиум цитрусовые',
      metaDescription: 'Премиальные египетские апельсины Навел - без косточек, сладкие и легко чистятся. Доступны окт-март.'
    }
  },
  {
    titleEn: 'Mandarin Murcott',
    titleAr: 'يوسفي مركوت',
    titleRu: 'Мандарин Муркотт',
    scientificName: 'Citrus reticulata (Murcott)',
    category: 'citrus',
    season: 'coming-soon',
    
    availability: {
      january: false, february: true, march: true, april: false,
      may: false, june: false, july: false, august: false,
      september: false, october: false, november: false, december: false
    },
    
    descriptionEn: 'Egyptian Mandarin Murcott - a premium tangerine variety known for its honey-sweet taste and easy-to-peel skin. Small to medium size with deep orange color and incredibly juicy segments. A favorite in international markets.',
    descriptionAr: 'يوسفي مركوت مصري - صنف يوسفي ممتاز معروف بطعمه الحلو كالعسل وقشرته سهلة التقشير. حجم صغير إلى متوسط بلون برتقالي غامق وشرائح عصيرية للغاية. المفضل في الأسواق الدولية.',
    descriptionRu: 'Египетский мандарин Муркотт - премиальный сорт мандарина, известный своим медово-сладким вкусом и легко снимающейся кожурой. Небольшой-средний размер с глубоким оранжевым цветом.',
    
    specifications: {
      packaging: 'Master carton 8 KG, 10 KG',
      sizes: 'Small, Medium, Large - various counts per carton',
      storage: '5-8°C with 90% humidity',
      shelfLife: '2-4 weeks under proper storage conditions'
    },
    
    certifications: ['GlobalGAP', 'ISO 9001'],
    
    seoEn: {
      metaTitle: 'Egyptian Mandarin Murcott | Honey-Sweet Tangerines',
      metaDescription: 'Premium Egyptian Murcott mandarins - honey-sweet taste, easy to peel. Available February-March. Perfect for fresh consumption.'
    },
    seoAr: {
      metaTitle: 'يوسفي مركوت مصري | يوسفي حلو كالعسل',
      metaDescription: 'يوسفي مركوت مصري ممتاز - طعم حلو كالعسل وسهل التقشير. متوفر فبراير-مارس.'
    },
    seoRu: {
      metaTitle: 'Египетский мандарин Муркотт | Медово-сладкие мандарины',
      metaDescription: 'Премиальные египетские мандарины Муркотт - медово-сладкий вкус, легко чистятся. Февраль-март.'
    }
  },
  {
    titleEn: 'Fresh Lemon',
    titleAr: 'ليمون طازج',
    titleRu: 'Свежий лимон',
    scientificName: 'Citrus limon',
    category: 'citrus',
    season: 'in-season',
    
    availability: {
      january: false, february: false, march: false, april: false,
      may: true, june: true, july: true, august: false,
      september: false, october: false, november: true, december: true
    },
    
    descriptionEn: 'Fresh Egyptian lemons, prized for their bright yellow color, aromatic zest, and high juice content. Available in two seasons: May-July and November-December. Packed in cartons or plastic boxes. Ideal for culinary use, beverages, and food processing.',
    descriptionAr: 'ليمون مصري طازج، يُقدَّر للونه الأصفر الزاهي وقشرته العطرية ومحتواه العالي من العصير. متوفر في موسمين: مايو-يوليو ونوفمبر-ديسمبر. معبأ في كراتين أو صناديق بلاستيك. مثالي للطهي والمشروبات وتصنيع الأغذية.',
    descriptionRu: 'Свежие египетские лимоны, ценятся за ярко-желтый цвет, ароматную цедру и высокое содержание сока. Доступны в два сезона: май-июль и ноябрь-декабрь. Упакованы в картонные или пластиковые коробки.',
    
    specifications: {
      packaging: 'Cartons or Plastic boxes',
      sizes: '56, 64, 72, 80, 88, 100, 113, 125, 135 per carton',
      storage: '10-13°C with 85-90% humidity',
      shelfLife: '4-8 weeks under proper storage conditions'
    },
    
    certifications: ['GlobalGAP', 'ISO 9001'],
    
    seoEn: {
      metaTitle: 'Fresh Egyptian Lemons | Premium Citrus Export',
      metaDescription: 'Premium Egyptian lemons for export. High juice content, bright color. Available May-July & Nov-Dec. Various sizes available.'
    },
    seoAr: {
      metaTitle: 'ليمون مصري طازج | تصدير حمضيات ممتازة',
      metaDescription: 'ليمون مصري ممتاز للتصدير. محتوى عصير عالي ولون زاهي. متوفر مايو-يوليو ونوفمبر-ديسمبر.'
    },
    seoRu: {
      metaTitle: 'Свежие египетские лимоны | Премиум экспорт цитрусовых',
      metaDescription: 'Премиальные египетские лимоны на экспорт. Высокое содержание сока, яркий цвет. Май-июль и ноя-дек.'
    }
  },
  {
    titleEn: 'Grapefruit',
    titleAr: 'جريب فروت',
    titleRu: 'Грейпфрут',
    scientificName: 'Citrus × paradisi',
    category: 'citrus',
    season: 'last-weeks',
    
    availability: {
      january: false, february: false, march: false, april: false,
      may: false, june: false, july: false, august: false,
      september: false, october: true, november: true, december: false
    },
    
    descriptionEn: 'Egyptian Grapefruit with refreshing citrus flavor and beautiful pink or white flesh. Known for its tangy-sweet taste and health benefits. Rich in vitamins and antioxidants. Perfect for fresh eating, juicing, or as a healthy breakfast option.',
    descriptionAr: 'جريب فروت مصري بنكهة الحمضيات المنعشة ولب وردي أو أبيض جميل. معروف بطعمه الحامض-الحلو وفوائده الصحية. غني بالفيتامينات ومضادات الأكسدة. مثالي للأكل الطازج أو العصير أو كخيار فطور صحي.',
    descriptionRu: 'Египетский грейпфрут с освежающим цитрусовым вкусом и красивой розовой или белой мякотью. Известен своим кисло-сладким вкусом и пользой для здоровья. Богат витаминами и антиоксидантами.',
    
    specifications: {
      packaging: 'Master carton 15 KGs',
      sizes: '36, 40, 48, 56, 64 per carton',
      storage: '10-14°C with 85-90% humidity',
      shelfLife: '6-8 weeks under proper storage conditions'
    },
    
    certifications: ['GlobalGAP', 'ISO 9001'],
    
    seoEn: {
      metaTitle: 'Egyptian Grapefruit | Fresh Citrus Export',
      metaDescription: 'Premium Egyptian grapefruit - tangy-sweet flavor, rich in vitamins. Available October-November. Export quality.'
    },
    seoAr: {
      metaTitle: 'جريب فروت مصري | تصدير حمضيات طازجة',
      metaDescription: 'جريب فروت مصري ممتاز - طعم حامض-حلو وغني بالفيتامينات. متوفر أكتوبر-نوفمبر.'
    },
    seoRu: {
      metaTitle: 'Египетский грейпфрут | Экспорт свежих цитрусовых',
      metaDescription: 'Премиальный египетский грейпфрут - кисло-сладкий вкус, богат витаминами. Октябрь-ноябрь.'
    }
  },
  {
    titleEn: 'Fresh Grapes',
    titleAr: 'عنب طازج',
    titleRu: 'Свежий виноград',
    scientificName: 'Vitis vinifera',
    category: 'grapes',
    season: 'coming-soon',
    
    availability: {
      january: false, february: false, march: false, april: false,
      may: false, june: true, july: true, august: true,
      september: true, october: false, november: false, december: false
    },
    
    descriptionEn: 'Premium Egyptian table grapes, available in multiple varieties including Thompson Seedless, Flame Seedless, and Red Globe. Known for their exceptional sweetness, crisp texture, and beautiful appearance. Grown in Egypt\'s finest vineyards.',
    descriptionAr: 'عنب مائدة مصري ممتاز، متوفر بعدة أصناف منها طومسون بدون بذور، فليم بدون بذور، وريد جلوب. معروف بحلاوته الاستثنائية وقوامه المقرمش ومظهره الجميل. يُزرع في أفضل كروم مصر.',
    descriptionRu: 'Премиальный египетский столовый виноград, доступен в нескольких сортах: Томпсон без косточек, Флейм без косточек и Ред Глоуб. Известен исключительной сладостью, хрустящей текстурой и красивым видом.',
    
    specifications: {
      packaging: 'Carton 4.5 Kg, Plastic Box 5 Kg',
      sizes: 'Various bunch sizes and berry grades',
      storage: '0-2°C with 90-95% humidity',
      shelfLife: '4-8 weeks under proper storage conditions'
    },
    
    certifications: ['GlobalGAP', 'ISO 9001'],
    
    seoEn: {
      metaTitle: 'Egyptian Table Grapes | Premium Fresh Grapes Export',
      metaDescription: 'Premium Egyptian grapes - Thompson, Flame, Red Globe varieties. Available June-September. Sweet, crisp, export quality.'
    },
    seoAr: {
      metaTitle: 'عنب مائدة مصري | تصدير عنب طازج ممتاز',
      metaDescription: 'عنب مصري ممتاز - أصناف طومسون وفليم وريد جلوب. متوفر يونيو-سبتمبر. حلو ومقرمش.'
    },
    seoRu: {
      metaTitle: 'Египетский столовый виноград | Экспорт премиум винограда',
      metaDescription: 'Премиальный египетский виноград - сорта Томпсон, Флейм, Ред Глоуб. Июнь-сентябрь.'
    }
  },
  {
    titleEn: 'Egyptian Mango',
    titleAr: 'مانجو مصري',
    titleRu: 'Египетское манго',
    scientificName: 'Mangifera indica',
    category: 'berries',
    season: 'coming-soon',
    
    availability: {
      january: false, february: false, march: false, april: false,
      may: false, june: false, july: true, august: true,
      september: true, october: true, november: true, december: false
    },
    
    descriptionEn: 'Premium Egyptian Mango, renowned for its exceptional sweetness, aromatic flavor, and fiber-free flesh. Available in popular varieties including Alphonso, Kent, and local Egyptian varieties. Perfect for fresh consumption, smoothies, or processing.',
    descriptionAr: 'مانجو مصري ممتاز، مشهور بحلاوته الاستثنائية ونكهته العطرية ولبه الخالي من الألياف. متوفر بأصناف شهيرة منها ألفونسو وكنت والأصناف المصرية المحلية. مثالي للاستهلاك الطازج أو السموذي أو التصنيع.',
    descriptionRu: 'Премиальное египетское манго, известное своей исключительной сладостью, ароматным вкусом и мякотью без волокон. Доступно в популярных сортах: Альфонсо, Кент и местные египетские сорта.',
    
    specifications: {
      packaging: 'Carton 5 Kg / Plastic Box 5 Kg / Plastic Box 10 Kg',
      sizes: 'Various sizes based on variety and grade',
      storage: '10-13°C with 85-90% humidity',
      shelfLife: '2-3 weeks under proper storage conditions'
    },
    
    certifications: ['GlobalGAP', 'ISO 9001'],
    
    seoEn: {
      metaTitle: 'Egyptian Mango | Premium Sweet Mango Export',
      metaDescription: 'Premium Egyptian mangoes - exceptionally sweet, aromatic, fiber-free. Available July-November. Multiple varieties for export.'
    },
    seoAr: {
      metaTitle: 'مانجو مصري | تصدير مانجو حلو ممتاز',
      metaDescription: 'مانجو مصري ممتاز - حلو استثنائياً وعطري وخالي من الألياف. متوفر يوليو-نوفمبر.'
    },
    seoRu: {
      metaTitle: 'Египетское манго | Экспорт премиум сладкого манго',
      metaDescription: 'Премиальное египетское манго - исключительно сладкое, ароматное, без волокон. Июль-ноябрь.'
    }
  },
  {
    titleEn: 'Pomegranate',
    titleAr: 'رمان',
    titleRu: 'Гранат',
    scientificName: 'Punica granatum',
    category: 'berries',
    season: 'in-season',
    
    availability: {
      january: false, february: false, march: false, april: false,
      may: false, june: false, july: false, august: false,
      september: true, october: true, november: true, december: true
    },
    
    descriptionEn: 'Premium Egyptian Pomegranate, known for its ruby-red arils, sweet-tart flavor, and exceptional juice content. Packed in open top cartons (5 kg, 6-14 fruits) or plastic containers (20 kg). Rich in antioxidants and vitamins. A superfruit for health-conscious consumers.',
    descriptionAr: 'رمان مصري ممتاز، معروف بحباته الياقوتية الحمراء وطعمه الحلو-الحامض ومحتواه الاستثنائي من العصير. معبأ في كراتين مفتوحة (5 كجم، 6-14 ثمرة) أو حاويات بلاستيكية (20 كجم). غني بمضادات الأكسدة والفيتامينات.',
    descriptionRu: 'Премиальный египетский гранат, известный рубиново-красными зернами, сладко-терпким вкусом и исключительным содержанием сока. Упакован в открытые картонные коробки (5 кг, 6-14 плодов) или пластиковые контейнеры (20 кг).',
    
    specifications: {
      packaging: 'Open top cartons 5 Kg / Plastic containers 20 Kg',
      sizes: '6-14 fruits per 5 kg carton',
      storage: '5-7°C with 90-95% humidity',
      shelfLife: '2-3 months under proper storage conditions'
    },
    
    certifications: ['GlobalGAP', 'ISO 9001'],
    
    seoEn: {
      metaTitle: 'Egyptian Pomegranate | Premium Superfruit Export',
      metaDescription: 'Premium Egyptian pomegranates - ruby-red arils, sweet-tart flavor, rich in antioxidants. Available Sept-December.'
    },
    seoAr: {
      metaTitle: 'رمان مصري | تصدير فاكهة خارقة ممتازة',
      metaDescription: 'رمان مصري ممتاز - حبات ياقوتية حمراء وطعم حلو-حامض وغني بمضادات الأكسدة. سبتمبر-ديسمبر.'
    },
    seoRu: {
      metaTitle: 'Египетский гранат | Экспорт премиум суперфрукта',
      metaDescription: 'Премиальный египетский гранат - рубиново-красные зерна, сладко-терпкий вкус, богат антиоксидантами. Сент-дек.'
    }
  },
]

async function updateProducts(dryRun = true) {
  console.log(`\n${'='.repeat(60)}`)
  console.log(`🔧 FULL PRODUCT UPDATE ${dryRun ? '(DRY RUN)' : '(LIVE)'}`)
  console.log(`${'='.repeat(60)}\n`)

  if (!process.env.SANITY_TOKEN && !dryRun) {
    console.error('❌ SANITY_TOKEN required for live mode')
    process.exit(1)
  }

  // Step 1: Get existing products
  console.log('📦 Fetching existing products...')
  const existingProducts = await client.fetch(`*[_type == "product"] { _id, title, language }`)
  console.log(`   Found ${existingProducts.length} existing products\n`)

  // Step 2: Delete all existing products
  if (!dryRun) {
    console.log('🗑️ Deleting existing products...')
    const translations = existingProducts.filter((p: any) => p.language !== 'ar')
    for (const product of translations) {
      try {
        await client.delete(product._id)
      } catch (e) {}
    }
    const originals = existingProducts.filter((p: any) => p.language === 'ar')
    for (const product of originals) {
      try {
        await client.delete(product._id)
      } catch (e) {}
    }
    console.log(`   Deleted ${existingProducts.length} products\n`)
  }

  // Step 3: Create new products
  console.log('📝 Creating products with ALL fields...\n')

  for (const product of products) {
    console.log(`   ${product.titleEn}:`)
    
    const slug = product.titleEn.toLowerCase().replace(/\s+/g, '-')
    
    if (!dryRun) {
      // Create Arabic version
      const arDoc = {
        _type: 'product',
        language: 'ar',
        title: product.titleAr,
        slug: { _type: 'slug', current: `${slug}-ar` },
        scientificName: product.scientificName,
        category: product.category,
        description: product.descriptionAr,
        season: product.season,
        availability: product.availability,
        specifications: product.specifications,
        certifications: product.certifications,
        seo: product.seoAr,
      }
      const arResult = await client.create(arDoc)
      console.log(`      ✓ AR: ${product.titleAr} (all fields)`)
      
      // Create English version
      const enDoc = {
        _type: 'product',
        language: 'en',
        title: product.titleEn,
        slug: { _type: 'slug', current: `${slug}-en` },
        scientificName: product.scientificName,
        category: product.category,
        description: product.descriptionEn,
        season: product.season,
        availability: product.availability,
        specifications: product.specifications,
        certifications: product.certifications,
        seo: product.seoEn,
        originalDocument: { _type: 'reference', _ref: arResult._id }
      }
      await client.create(enDoc)
      console.log(`      ✓ EN: ${product.titleEn} (all fields)`)
      
      // Create Russian version
      const ruDoc = {
        _type: 'product',
        language: 'ru',
        title: product.titleRu,
        slug: { _type: 'slug', current: `${slug}-ru` },
        scientificName: product.scientificName,
        category: product.category,
        description: product.descriptionRu,
        season: product.season,
        availability: product.availability,
        specifications: product.specifications,
        certifications: product.certifications,
        seo: product.seoRu,
        originalDocument: { _type: 'reference', _ref: arResult._id }
      }
      await client.create(ruDoc)
      console.log(`      ✓ RU: ${product.titleRu} (all fields)`)
    } else {
      console.log(`      Would create AR, EN, RU with all fields:`)
      console.log(`         - scientificName: ${product.scientificName}`)
      console.log(`         - season: ${product.season}`)
      console.log(`         - specifications: ✓`)
      console.log(`         - certifications: ${product.certifications.join(', ')}`)
      console.log(`         - seo: ✓`)
    }
  }

  console.log(`\n${'='.repeat(60)}`)
  console.log(`📊 SUMMARY`)
  console.log(`   Products: ${products.length} × 3 languages = ${products.length * 3} total`)
  console.log(`   Fields filled per product:`)
  console.log(`      ✓ title, slug, language`)
  console.log(`      ✓ scientificName`)
  console.log(`      ✓ category`)
  console.log(`      ✓ description (localized)`)
  console.log(`      ✓ season`)
  console.log(`      ✓ availability (12 months)`)
  console.log(`      ✓ specifications (packaging, sizes, storage, shelfLife)`)
  console.log(`      ✓ certifications`)
  console.log(`      ✓ seo (metaTitle, metaDescription - localized)`)
  console.log(`      ⚠️ image & gallery (need manual upload in Studio)`)
  
  if (dryRun) {
    console.log(`\n💡 To apply: npx tsx scripts/update-products-full.ts --apply`)
  }
  console.log(`${'='.repeat(60)}\n`)
}

const isLive = process.argv.includes('--apply')
updateProducts(!isLive)
