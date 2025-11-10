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

interface Product {
  _id: string;
  _type: 'product';
  title: string;
  slug: { current: string };
  scientificName?: string;
  category: string;
  description: string;
  season: string;
  image: any;
  gallery?: any[];
  availability: string;
  specifications?: Array<{ label: string; value: string }>;
  certifications: string[];
  language: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

// Simple translation function (you can replace with Google Translate API or other service)
async function translateText(text: string, targetLang: 'en' | 'ru'): Promise<string> {
  // For now, we'll use a simple mapping for common terms
  // In production, you should use a proper translation API
  
  const translations: Record<string, Record<string, string>> = {
    en: {
      // Categories
      'Citrus': 'Citrus',
      'Vegetables': 'Vegetables',
      'Berries': 'Berries',
      'Lemons': 'Lemons',
      'Grapes': 'Grapes',
      
      // Availability
      'peak': 'peak',
      'in-season': 'in-season',
      'coming-soon': 'coming-soon',
      'last-weeks': 'last-weeks',
      
      // Certifications
      'ISO 9001': 'ISO 9001',
      'Global G.A.P': 'Global G.A.P',
      
      // Common terms
      'برتقال': 'Orange',
      'جريب فروت': 'Grapefruit',
      'رمان': 'Pomegranate',
      'عنب': 'Grapes',
      'ليمون': 'Lemon',
      'خضروات': 'Vegetables',
      'ثوم': 'Garlic',
      'بصل ذهبي': 'Golden Onion',
      'فاصوليا خضراء': 'Green Beans',
      'خس': 'Lettuce',
      'مانجو': 'Mango',
      'بصل أحمر': 'Red Onion',
      'فراولة': 'Strawberries',
      'فلفل ملون': 'Colored Peppers',
    },
    ru: {
      // Categories
      'Citrus': 'Цитрусовые',
      'Vegetables': 'Овощи',
      'Berries': 'Ягоды',
      'Lemons': 'Лимоны',
      'Grapes': 'Виноград',
      
      // Availability
      'peak': 'пик',
      'in-season': 'в сезоне',
      'coming-soon': 'скоро',
      'last-weeks': 'последние недели',
      
      // Certifications
      'ISO 9001': 'ISO 9001',
      'Global G.A.P': 'Global G.A.P',
      
      // Common terms
      'برتقال': 'Апельсин',
      'جريب فروت': 'Грейпфрут',
      'رمان': 'Гранат',
      'عنب': 'Виноград',
      'ليمون': 'Лимон',
      'خضروات': 'Овощи',
      'ثوم': 'Чеснок',
      'بصل ذهبي': 'Золотой лук',
      'فاصوليا خضراء': 'Зеленая фасоль',
      'خس': 'Салат',
      'مانجو': 'Манго',
      'بصل أحمر': 'Красный лук',
      'فراولة': 'Клубника',
      'فلفل ملون': 'Цветной перец',
    }
  };

  // Try to find exact match first
  if (translations[targetLang][text]) {
    return translations[targetLang][text];
  }

  // For longer text, try to translate word by word
  const words = text.split(' ');
  const translatedWords = words.map(word => {
    return translations[targetLang][word] || word;
  });

  return translatedWords.join(' ');
}

async function translateProduct(
  product: Product,
  targetLang: 'en' | 'ru'
): Promise<Partial<Product>> {
  console.log(`Translating "${product.title}" to ${targetLang}...`);

  const translatedTitle = await translateText(product.title, targetLang);
  const translatedDescription = await translateText(product.description, targetLang);
  const translatedCategory = await translateText(product.category, targetLang);

  // Translate specifications if they exist
  const translatedSpecifications = Array.isArray(product.specifications) 
    ? product.specifications.map(spec => ({
        label: spec.label, // Keep labels in English for consistency
        value: spec.value,
      }))
    : undefined;

  return {
    _type: 'product',
    title: translatedTitle,
    slug: {
      current: `${product.slug.current}-${targetLang}`,
    },
    scientificName: product.scientificName, // Keep scientific names as is
    category: translatedCategory,
    description: translatedDescription,
    season: product.season,
    image: product.image,
    gallery: product.gallery,
    availability: product.availability,
    specifications: translatedSpecifications,
    certifications: product.certifications,
    language: targetLang,
    originalDocument: {
      _type: 'reference',
      _ref: product._id,
    },
    seo: product.seo ? {
      metaTitle: await translateText(product.seo.metaTitle || product.title, targetLang),
      metaDescription: product.seo.metaDescription 
        ? await translateText(product.seo.metaDescription, targetLang)
        : undefined,
      keywords: product.seo.keywords,
    } : undefined,
  };
}

async function main() {
  try {
    console.log('🚀 Starting translation process...\n');

    // Fetch all Arabic products
    const arabicProducts = await client.fetch<Product[]>(
      `*[_type == "product" && language == "ar"] | order(title asc)`
    );

    console.log(`Found ${arabicProducts.length} Arabic products\n`);

    const targetLanguages: Array<'en' | 'ru'> = ['en', 'ru'];

    for (const targetLang of targetLanguages) {
      console.log(`\n📝 Translating to ${targetLang === 'en' ? 'English' : 'Russian'}...\n`);

      for (const product of arabicProducts) {
        // Check if translation already exists
        const existingTranslation = await client.fetch(
          `*[_type == "product" && slug.current == $slug && language == $lang][0]`,
          {
            slug: `${product.slug.current}-${targetLang}`,
            lang: targetLang,
          }
        );

        if (existingTranslation) {
          console.log(`⏭️  Skipping "${product.title}" - ${targetLang} translation already exists`);
          continue;
        }

        // Translate the product
        const translatedProduct = await translateProduct(product, targetLang);

        // Create the translated product in Sanity
        const result = await client.create(translatedProduct);
        console.log(`✅ Created ${targetLang} translation: ${result._id}`);

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    console.log('\n🎉 Translation completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Arabic products: ${arabicProducts.length}`);
    console.log(`   - English translations: ${arabicProducts.length}`);
    console.log(`   - Russian translations: ${arabicProducts.length}`);
    console.log(`   - Total products: ${arabicProducts.length * 3}`);

  } catch (error) {
    console.error('❌ Error during translation:', error);
    process.exit(1);
  }
}

main();
