/**
 * Populate Calendar Events (Centralized Schema)
 * 
 * Creates calendar events linking products to their monthly availability
 * Run: npx ts-node --esm studio/scripts/populate-calendar.ts
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
// TYPES
// ============================================
const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
] as const;

type Month = typeof months[number];

interface SanityProduct {
    _id: string;
    titleEn: string;
    slug: { current: string };
    availability?: Record<Month, boolean>;
    season?: string;
}

// ============================================
// PEAK SEASON MAPPING
// Maps product slugs to their peak months
// ============================================
const peakMonthsBySlug: Record<string, Month[]> = {
    'navel-orange': ['december', 'january', 'february'],
    'valencia-orange': ['march', 'april', 'may'],
    'blood-orange': ['january', 'february'],
    'baladi-orange': ['december', 'january', 'february'],
    'grapefruit': ['november', 'december', 'january'],
    'lemons': [],
    'fresh-lemon': [],
    'pomegranates': ['september', 'october'],
    'pomegranate': ['september', 'october'],
    'grapes-flame': ['june', 'july', 'august'],
    'grapes-thompson': ['june', 'july', 'august'],
    'fresh-grapes': ['june', 'july', 'august'],
    'strawberries': ['december', 'january', 'february', 'march'],
    'garlic': [],
    'golden-onions': [],
    'mandarin-murcott': ['december', 'january'],
    'egyptian-mango': ['june', 'july', 'august', 'september'],
};

// Peak season notes by slug
const notesBySlug: Record<string, { ar: string; en: string; ru: string }> = {
    'navel-orange': {
        ar: 'موسم الذروة - أفضل جودة ونكهة',
        en: 'Peak season - Best quality and flavor',
        ru: 'Пиковый сезон - Лучшее качество и вкус',
    },
    'valencia-orange': {
        ar: 'مثالي للعصير - نسبة عصير عالية',
        en: 'Perfect for juicing - High juice content',
        ru: 'Идеален для сока - Высокое содержание сока',
    },
    'baladi-orange': {
        ar: 'برتقال بلدي مصري أصيل',
        en: 'Authentic Egyptian Baladi Orange',
        ru: 'Настоящий египетский апельсин Балади',
    },
    'grapefruit': {
        ar: 'غني بفيتامين C ومضادات الأكسدة',
        en: 'Rich in Vitamin C and antioxidants',
        ru: 'Богат витамином C и антиоксидантами',
    },
    'pomegranate': {
        ar: 'غني بمضادات الأكسدة - موسم قصير',
        en: 'Rich in antioxidants - Short season',
        ru: 'Богат антиоксидантами - Короткий сезон',
    },
    'fresh-grapes': {
        ar: 'عنب طازج من مصر',
        en: 'Fresh grapes from Egypt',
        ru: 'Свежий виноград из Египта',
    },
    'mandarin-murcott': {
        ar: 'يوسفي مصري حلو',
        en: 'Sweet Egyptian Mandarin',
        ru: 'Сладкий египетский мандарин',
    },
    'egyptian-mango': {
        ar: 'مانجو مصري فاخر',
        en: 'Premium Egyptian Mango',
        ru: 'Премиум египетское манго',
    },
};

// ============================================
// HELPER FUNCTION
// ============================================
function getStatus(isAvailable: boolean, isPeak: boolean): string {
    if (!isAvailable) return 'unavailable';
    if (isPeak) return 'peak';
    return 'available';
}

function slugify(title: string): string {
    return title.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
}

// ============================================
// MAIN FUNCTION
// ============================================
async function populateCalendar() {
    console.log('📅 Populating Calendar Events (Centralized)...\n');

    // Fetch all products from Sanity
    console.log('🔍 Fetching products from Sanity...');
    const products: SanityProduct[] = await client.fetch(
        `*[_type == "productCentralized"]{_id, titleEn, slug, availability, season}`
    );

    console.log(`   Found ${products.length} products\n`);

    const currentYear = new Date().getFullYear();
    let created = 0;
    let updated = 0;
    let errors = 0;
    let skipped = 0;

    for (const product of products) {
        const slug = product.slug?.current || slugify(product.titleEn);
        console.log(`\n📦 Processing: ${product.titleEn} (${slug})`);

        // Get availability from product or use default (all months available)
        const availability = product.availability || {
            january: true, february: true, march: true,
            april: true, may: true, june: true,
            july: true, august: true, september: true,
            october: true, november: true, december: true,
        };

        // Get peak months for this product
        const peakMonths = peakMonthsBySlug[slug] || [];
        const notes = notesBySlug[slug];

        for (const month of months) {
            const isAvailable = availability[month] ?? true;
            const isPeak = peakMonths.includes(month);

            // Skip months where product is not available
            if (!isAvailable) {
                skipped++;
                continue;
            }

            const eventId = `calendar-${slug}-${month}-${currentYear}`;
            const status = getStatus(isAvailable, isPeak);

            try {
                const existing = await client.fetch(
                    `*[_type == "calendarEventCentralized" && _id == $id][0]`,
                    { id: eventId }
                );

                const doc: any = {
                    _type: 'calendarEventCentralized',
                    _id: eventId,
                    product: { _type: 'reference', _ref: product._id },
                    month: month,
                    year: currentYear,
                    status: status,
                };

                // Add notes for peak months
                if (isPeak && notes) {
                    doc.notesAr = notes.ar;
                    doc.notesEn = notes.en;
                    doc.notesRu = notes.ru;
                }

                if (existing) {
                    await client.patch(eventId).set(doc).commit();
                    console.log(`  ✏️  Updated: ${month} (${status})`);
                    updated++;
                } else {
                    await client.create(doc);
                    console.log(`  ✅ Created: ${month} (${status})`);
                    created++;
                }
            } catch (error: any) {
                console.error(`  ❌ Error: ${month} - ${error.message}`);
                errors++;
            }
        }
    }

    console.log('\n📊 Summary:');
    console.log(`   Created: ${created}`);
    console.log(`   Updated: ${updated}`);
    console.log(`   Skipped (not available): ${skipped}`);
    console.log(`   Errors: ${errors}`);
    console.log(`   Total Products: ${products.length}`);
}

populateCalendar().catch(console.error);
