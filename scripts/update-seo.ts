
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const projectId = process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET;
const token = process.env.VITE_SANITY_TOKEN;

if (!projectId || !dataset || !token) {
    console.error('Missing required environment variables (VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET, VITE_SANITY_TOKEN)');
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token,
    useCdn: false,
});

const translations = {
    en: {
        titleSuffix: '| Al Soadaa Export',
        buy: 'Buy Fresh',
        premium: 'Premium Egyptian',
        import: 'Import high-quality',
        from: 'from Egypt. Al Soadaa offers certified',
        delivery: 'with global delivery.',
        season: 'Season:',
        cta: 'Request a quote today.',
        categories: {
            citrus: 'Citrus',
            vegetables: 'Vegetables',
            berries: 'Berries',
            lemons: 'Lemons',
            grapes: 'Grapes',
        },
        seasons: {
            'in-season': 'In Season',
            'coming-soon': 'Coming Soon',
            'peak': 'Peak Season',
            'last-weeks': 'Last Weeks',
        }
    },
    ar: {
        titleSuffix: '| السعداء للتصدير',
        buy: 'شراء',
        premium: 'مصري فاخر',
        import: 'استورد',
        from: 'عالي الجودة من مصر. تقدم السعداء',
        delivery: 'معتمد مع شحن عالمي.',
        season: 'الموسم:',
        cta: 'اطلب عرض سعر اليوم.',
        categories: {
            citrus: 'موالح',
            vegetables: 'خضروات',
            berries: 'توت',
            lemons: 'ليمون',
            grapes: 'عنب',
        },
        seasons: {
            'in-season': 'في الموسم',
            'coming-soon': 'قريباً',
            'peak': 'موسم الذروة',
            'last-weeks': 'الأسابيع الأخيرة',
        }
    },
    ru: {
        titleSuffix: '| Al Soadaa Export',
        buy: 'Купить свежий',
        premium: 'Премиум Египетский',
        import: 'Импорт высококачественного',
        from: 'из Египта. Al Soadaa предлагает сертифицированные',
        delivery: 'с доставкой по всему миру.',
        season: 'Сезон:',
        cta: 'Запросите цену сегодня.',
        categories: {
            citrus: 'Цитрусовые',
            vegetables: 'Овощи',
            berries: 'Ягоды',
            lemons: 'Лимоны',
            grapes: 'Виноград',
        },
        seasons: {
            'in-season': 'В сезоне',
            'coming-soon': 'Скоро',
            'peak': 'Пик сезона',
            'last-weeks': 'Последние недели',
        }
    }
};

async function updateSEO() {
    try {
        console.log('Fetching products...');
        const products = await client.fetch('*[_type == "product"]');
        console.log(`Found ${products.length} products.`);

        for (const product of products) {
            const lang = product.language || 'ar';
            const t = translations[lang as keyof typeof translations] || translations.en;

            const category = t.categories[product.category as keyof typeof t.categories] || product.category;
            const season = product.season ? (t.seasons[product.season as keyof typeof t.seasons] || product.season) : '';

            let metaTitle = '';
            let metaDescription = '';

            if (lang === 'ar') {
                metaTitle = `${t.buy} ${product.title} - ${category} ${t.premium} ${t.titleSuffix}`;
                metaDescription = `${t.import} ${product.title} ${t.from} ${category} ${t.delivery} ${season ? `${t.season} ${season}.` : ''} ${t.cta}`;
            } else if (lang === 'ru') {
                metaTitle = `${t.buy} ${product.title} - ${t.premium} ${category} ${t.titleSuffix}`;
                metaDescription = `${t.import} ${product.title} ${t.from} ${category} ${t.delivery} ${season ? `${t.season} ${season}.` : ''} ${t.cta}`;
            } else {
                metaTitle = `${t.buy} ${product.title} - ${t.premium} ${category} ${t.titleSuffix}`;
                metaDescription = `${t.import} ${product.title} ${t.from} ${category} ${t.delivery} ${season ? `${t.season} ${season}.` : ''} ${t.cta}`;
            }

            // Ensure lengths are good
            if (metaTitle.length > 60) metaTitle = metaTitle.substring(0, 57) + '...';
            if (metaDescription.length > 160) metaDescription = metaDescription.substring(0, 157) + '...';

            console.log(`Updating Product [${lang}]: ${product.title}`);
            console.log(`  Title: ${metaTitle}`);
            console.log(`  Desc:  ${metaDescription}`);

            await client.patch(product._id).set({
                seo: {
                    metaTitle,
                    metaDescription
                }
            }).commit();
        }

        console.log('Fetching pages...');
        const pages = await client.fetch('*[_type == "page"]');
        console.log(`Found ${pages.length} pages.`);

        for (const page of pages) {
            const lang = page.language || 'ar';
            const t = translations[lang as keyof typeof translations] || translations.en;

            let metaTitle = `${page.title} ${t.titleSuffix}`;
            let metaDescription = '';

            // Simple description generation for pages
            if (lang === 'ar') {
                metaDescription = `اكتشف المزيد عن ${page.title} مع السعداء. نحن نقدم أفضل المنتجات الزراعية المصرية للعالم.`;
            } else if (lang === 'ru') {
                metaDescription = `Узнайте больше о ${page.title} с Al Soadaa. Мы поставляем лучшие египетские сельскохозяйственные продукты по всему миру.`;
            } else {
                metaDescription = `Learn more about ${page.title} with Al Soadaa. We provide the best Egyptian agricultural products to the world.`;
            }

            // Ensure lengths are good
            if (metaTitle.length > 60) metaTitle = metaTitle.substring(0, 57) + '...';
            if (metaDescription.length > 160) metaDescription = metaDescription.substring(0, 157) + '...';

            console.log(`Updating Page [${lang}]: ${page.title}`);
            console.log(`  Title: ${metaTitle}`);
            console.log(`  Desc:  ${metaDescription}`);

            await client.patch(page._id).set({
                seo: {
                    metaTitle,
                    metaDescription
                }
            }).commit();
        }

        console.log('SEO update complete!');

    } catch (error) {
        console.error('Error updating SEO:', error);
    }
}

updateSEO();
