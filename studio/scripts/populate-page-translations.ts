/**
 * Populate Page-Specific Translations (Packing, Sorting, Exporting)
 * 
 * Adds the 44 missing page-specific translations that were not included
 * in the original CMS migration.
 * 
 * Run: npx ts-node --esm studio/scripts/populate-page-translations.ts
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
// PAGE-SPECIFIC TRANSLATIONS
// Categories: packing, sorting, exporting
// ============================================
const translations = [
    // =====================
    // PACKING PAGE (13 keys)
    // =====================
    {
        _id: 'trans-packing-desc1',
        key: 'packingDesc1',
        category: 'packing',
        description: 'Packing page first description paragraph',
        valueAr: 'نقدم خدمات تعبئة وتغليف متطورة تضمن وصول منتجاتنا الزراعية طازجة وبأعلى جودة إلى وجهتها النهائية.',
        valueEn: 'We offer advanced packing and packaging services that ensure our agricultural products arrive fresh and at the highest quality to their final destination.',
        valueRu: 'Мы предлагаем передовые услуги по упаковке, которые гарантируют, что наша сельскохозяйственная продукция прибудет свежей и высочайшего качества в пункт назначения.',
    },
    {
        _id: 'trans-packing-desc2',
        key: 'packingDesc2',
        category: 'packing',
        description: 'Packing page second description paragraph',
        valueAr: 'نستخدم أحدث تقنيات التعبئة المعتمدة دولياً والمتوافقة مع معايير Global G.A.P و ISO 22000 لضمان سلامة الغذاء.',
        valueEn: 'We use the latest internationally certified packaging technologies compliant with Global G.A.P and ISO 22000 standards to ensure food safety.',
        valueRu: 'Мы используем новейшие международно сертифицированные технологии упаковки, соответствующие стандартам Global G.A.P и ISO 22000 для обеспечения безопасности пищевых продуктов.',
    },
    {
        _id: 'trans-packing-desc3',
        key: 'packingDesc3',
        category: 'packing',
        description: 'Packing page third description paragraph',
        valueAr: 'فريقنا المتخصص يضمن تعبئة دقيقة ومحكمة تحافظ على جودة المنتج طوال رحلة الشحن.',
        valueEn: 'Our specialized team ensures precise and secure packing that maintains product quality throughout the shipping journey.',
        valueRu: 'Наша специализированная команда обеспечивает точную и надежную упаковку, сохраняющую качество продукта на протяжении всего пути доставки.',
    },
    {
        _id: 'trans-packing-feature1-title',
        key: 'packingFeature1Title',
        category: 'packing',
        description: 'First packing feature title',
        valueAr: 'تغليف مخصص',
        valueEn: 'Custom Packaging',
        valueRu: 'Индивидуальная упаковка',
    },
    {
        _id: 'trans-packing-feature1-desc',
        key: 'packingFeature1Desc',
        category: 'packing',
        description: 'First packing feature description',
        valueAr: 'حلول تغليف مصممة خصيصاً لكل نوع من المنتجات',
        valueEn: 'Packaging solutions designed specifically for each product type',
        valueRu: 'Упаковочные решения, разработанные специально для каждого типа продукции',
    },
    {
        _id: 'trans-packing-feature2-title',
        key: 'packingFeature2Title',
        category: 'packing',
        description: 'Second packing feature title',
        valueAr: 'حماية متقدمة',
        valueEn: 'Advanced Protection',
        valueRu: 'Продвинутая защита',
    },
    {
        _id: 'trans-packing-feature2-desc',
        key: 'packingFeature2Desc',
        category: 'packing',
        description: 'Second packing feature description',
        valueAr: 'مواد تغليف متطورة تحمي من الصدمات والرطوبة',
        valueEn: 'Advanced packaging materials that protect against shock and moisture',
        valueRu: 'Передовые упаковочные материалы, защищающие от ударов и влаги',
    },
    {
        _id: 'trans-packing-feature3-title',
        key: 'packingFeature3Title',
        category: 'packing',
        description: 'Third packing feature title',
        valueAr: 'جاهز للتصدير',
        valueEn: 'Export Ready',
        valueRu: 'Готово к экспорту',
    },
    {
        _id: 'trans-packing-feature3-desc',
        key: 'packingFeature3Desc',
        category: 'packing',
        description: 'Third packing feature description',
        valueAr: 'تعبئة متوافقة مع متطلبات الشحن الدولي',
        valueEn: 'Packaging compliant with international shipping requirements',
        valueRu: 'Упаковка, соответствующая требованиям международной доставки',
    },
    {
        _id: 'trans-packing-standards',
        key: 'packingStandards',
        category: 'packing',
        description: 'Packing standards section title',
        valueAr: 'معايير التعبئة لدينا',
        valueEn: 'Our Packing Standards',
        valueRu: 'Наши стандарты упаковки',
    },
    {
        _id: 'trans-packing-standard1',
        key: 'packingStandard1',
        category: 'packing',
        description: 'First packing standard',
        valueAr: 'مواد تغليف معتمدة وآمنة غذائياً',
        valueEn: 'Certified and food-safe packaging materials',
        valueRu: 'Сертифицированные и безопасные для пищевых продуктов упаковочные материалы',
    },
    {
        _id: 'trans-packing-standard2',
        key: 'packingStandard2',
        category: 'packing',
        description: 'Second packing standard',
        valueAr: 'تتبع رقمي لكل شحنة',
        valueEn: 'Digital tracking for every shipment',
        valueRu: 'Цифровое отслеживание каждой отправки',
    },
    {
        _id: 'trans-packing-standard3',
        key: 'packingStandard3',
        category: 'packing',
        description: 'Third packing standard',
        valueAr: 'ملصقات متوافقة مع متطلبات الاتحاد الأوروبي',
        valueEn: 'Labels compliant with EU requirements',
        valueRu: 'Этикетки, соответствующие требованиям ЕС',
    },
    {
        _id: 'trans-packing-standard4',
        key: 'packingStandard4',
        category: 'packing',
        description: 'Fourth packing standard',
        valueAr: 'فحص جودة شامل قبل الشحن',
        valueEn: 'Comprehensive quality inspection before shipping',
        valueRu: 'Комплексная проверка качества перед отправкой',
    },
    {
        _id: 'trans-packing-image-caption',
        key: 'packingImageCaption',
        category: 'packing',
        description: 'Packing page image caption',
        valueAr: 'عمليات التعبئة والتغليف في منشآتنا الحديثة',
        valueEn: 'Packing and packaging operations at our modern facilities',
        valueRu: 'Операции по упаковке на наших современных предприятиях',
    },

    // =====================
    // SORTING PAGE (14 keys)
    // =====================
    {
        _id: 'trans-sorting-desc',
        key: 'sortingDesc',
        category: 'sorting',
        description: 'Sorting page main description',
        valueAr: 'نستخدم أحدث تقنيات الفرز والتصنيف لضمان أعلى معايير الجودة في كل منتج نصدره. خطوط الإنتاج المتطورة لدينا تضمن تصنيف دقيق حسب الحجم واللون والجودة.',
        valueEn: 'We use the latest sorting and grading technologies to ensure the highest quality standards in every product we export. Our advanced production lines ensure precise classification by size, color, and quality.',
        valueRu: 'Мы используем новейшие технологии сортировки и классификации для обеспечения высочайших стандартов качества в каждом экспортируемом продукте. Наши современные производственные линии обеспечивают точную классификацию по размеру, цвету и качеству.',
    },
    {
        _id: 'trans-sorting-stage1-title',
        key: 'sortingStage1Title',
        category: 'sorting',
        description: 'First sorting stage title',
        valueAr: 'المرحلة الأولى: الفحص البصري',
        valueEn: 'Stage 1: Visual Inspection',
        valueRu: 'Этап 1: Визуальный осмотр',
    },
    {
        _id: 'trans-sorting-stage1-desc',
        key: 'sortingStage1Desc',
        category: 'sorting',
        description: 'First sorting stage description',
        valueAr: 'فحص دقيق للمنتجات للكشف عن أي عيوب ظاهرية وإزالة المنتجات غير المطابقة للمواصفات.',
        valueEn: 'Careful inspection of products to detect any visible defects and remove non-conforming products.',
        valueRu: 'Тщательный осмотр продукции для выявления видимых дефектов и удаления несоответствующей продукции.',
    },
    {
        _id: 'trans-sorting-stage2-title',
        key: 'sortingStage2Title',
        category: 'sorting',
        description: 'Second sorting stage title',
        valueAr: 'المرحلة الثانية: التصنيف الآلي',
        valueEn: 'Stage 2: Automated Grading',
        valueRu: 'Этап 2: Автоматизированная классификация',
    },
    {
        _id: 'trans-sorting-stage2-desc',
        key: 'sortingStage2Desc',
        category: 'sorting',
        description: 'Second sorting stage description',
        valueAr: 'استخدام أحدث الأجهزة الآلية لتصنيف المنتجات حسب الحجم والوزن واللون بدقة عالية.',
        valueEn: 'Using the latest automated equipment to classify products by size, weight, and color with high precision.',
        valueRu: 'Использование новейшего автоматизированного оборудования для классификации продукции по размеру, весу и цвету с высокой точностью.',
    },
    {
        _id: 'trans-sorting-stage3-title',
        key: 'sortingStage3Title',
        category: 'sorting',
        description: 'Third sorting stage title',
        valueAr: 'المرحلة الثالثة: الفحص النهائي',
        valueEn: 'Stage 3: Final Inspection',
        valueRu: 'Этап 3: Финальная проверка',
    },
    {
        _id: 'trans-sorting-stage3-desc',
        key: 'sortingStage3Desc',
        category: 'sorting',
        description: 'Third sorting stage description',
        valueAr: 'مراجعة نهائية شاملة لضمان مطابقة المنتجات لمعايير الجودة العالمية قبل التعبئة.',
        valueEn: 'Comprehensive final review to ensure products meet international quality standards before packaging.',
        valueRu: 'Комплексная финальная проверка для обеспечения соответствия продукции международным стандартам качества перед упаковкой.',
    },
    {
        _id: 'trans-sorting-key-benefits',
        key: 'sortingKeyBenefits',
        category: 'sorting',
        description: 'Sorting key benefits section title',
        valueAr: 'المزايا الرئيسية',
        valueEn: 'Key Benefits',
        valueRu: 'Ключевые преимущества',
    },
    {
        _id: 'trans-sorting-benefit1',
        key: 'sortingBenefit1',
        category: 'sorting',
        description: 'First sorting benefit',
        valueAr: 'دقة تصنيف تصل إلى 99.5%',
        valueEn: 'Grading accuracy up to 99.5%',
        valueRu: 'Точность классификации до 99.5%',
    },
    {
        _id: 'trans-sorting-benefit2',
        key: 'sortingBenefit2',
        category: 'sorting',
        description: 'Second sorting benefit',
        valueAr: 'سرعة معالجة عالية - 10 طن/ساعة',
        valueEn: 'High processing speed - 10 tons/hour',
        valueRu: 'Высокая скорость обработки - 10 тонн/час',
    },
    {
        _id: 'trans-sorting-benefit3',
        key: 'sortingBenefit3',
        category: 'sorting',
        description: 'Third sorting benefit',
        valueAr: 'تقليل الفاقد بنسبة 95%',
        valueEn: '95% waste reduction',
        valueRu: 'Сокращение отходов на 95%',
    },
    {
        _id: 'trans-sorting-benefit4',
        key: 'sortingBenefit4',
        category: 'sorting',
        description: 'Fourth sorting benefit',
        valueAr: 'توثيق رقمي لكل دفعة إنتاج',
        valueEn: 'Digital documentation for every production batch',
        valueRu: 'Цифровая документация для каждой производственной партии',
    },
    {
        _id: 'trans-sorting-image-caption',
        key: 'sortingImageCaption',
        category: 'sorting',
        description: 'Sorting page image caption',
        valueAr: 'خطوط الفرز والتصنيف المتطورة في منشآتنا',
        valueEn: 'Advanced sorting and grading lines at our facilities',
        valueRu: 'Современные линии сортировки и классификации на наших предприятиях',
    },

    // =====================
    // EXPORTING PAGE (17 keys)
    // =====================
    {
        _id: 'trans-exporting-desc1',
        key: 'exportingDesc1',
        category: 'exporting',
        description: 'Exporting page first description',
        valueAr: 'نفخر بكوننا أحد أكبر مصدري المنتجات الزراعية المصرية الطازجة إلى أكثر من 25 دولة حول العالم.',
        valueEn: 'We are proud to be one of the largest exporters of fresh Egyptian agricultural products to over 25 countries worldwide.',
        valueRu: 'Мы гордимся тем, что являемся одним из крупнейших экспортеров свежей египетской сельскохозяйственной продукции в более чем 25 стран мира.',
    },
    {
        _id: 'trans-exporting-desc2',
        key: 'exportingDesc2',
        category: 'exporting',
        description: 'Exporting page second description',
        valueAr: 'شبكة لوجستية متكاملة تضمن وصول منتجاتنا طازجة خلال 48 ساعة إلى أي وجهة في العالم.',
        valueEn: 'An integrated logistics network that ensures our products arrive fresh within 48 hours to any destination in the world.',
        valueRu: 'Интегрированная логистическая сеть, гарантирующая доставку нашей продукции в свежем виде в течение 48 часов в любую точку мира.',
    },
    {
        _id: 'trans-exporting-desc3',
        key: 'exportingDesc3',
        category: 'exporting',
        description: 'Exporting page third description',
        valueAr: '15 عاماً من الخبرة في التصدير الدولي',
        valueEn: '15 years of international export experience',
        valueRu: '15 лет опыта международного экспорта',
    },
    {
        _id: 'trans-exporting-feature1-title',
        key: 'exportingFeature1Title',
        category: 'exporting',
        description: 'First exporting feature title',
        valueAr: 'شبكة عالمية',
        valueEn: 'Global Network',
        valueRu: 'Глобальная сеть',
    },
    {
        _id: 'trans-exporting-feature1-desc',
        key: 'exportingFeature1Desc',
        category: 'exporting',
        description: 'First exporting feature description',
        valueAr: 'شراكات استراتيجية مع موزعين في 25+ دولة',
        valueEn: 'Strategic partnerships with distributors in 25+ countries',
        valueRu: 'Стратегические партнерства с дистрибьюторами в 25+ странах',
    },
    {
        _id: 'trans-exporting-feature2-title',
        key: 'exportingFeature2Title',
        category: 'exporting',
        description: 'Second exporting feature title',
        valueAr: 'شحن سريع',
        valueEn: 'Fast Shipping',
        valueRu: 'Быстрая доставка',
    },
    {
        _id: 'trans-exporting-feature2-desc',
        key: 'exportingFeature2Desc',
        category: 'exporting',
        description: 'Second exporting feature description',
        valueAr: 'توصيل خلال 48 ساعة لأي وجهة أوروبية',
        valueEn: 'Delivery within 48 hours to any European destination',
        valueRu: 'Доставка в течение 48 часов в любую европейскую точку назначения',
    },
    {
        _id: 'trans-exporting-feature3-title',
        key: 'exportingFeature3Title',
        category: 'exporting',
        description: 'Third exporting feature title',
        valueAr: 'شهادات معتمدة',
        valueEn: 'Certified Standards',
        valueRu: 'Сертифицированные стандарты',
    },
    {
        _id: 'trans-exporting-feature3-desc',
        key: 'exportingFeature3Desc',
        category: 'exporting',
        description: 'Third exporting feature description',
        valueAr: 'ISO 9001, Global G.A.P, HACCP معتمدون',
        valueEn: 'ISO 9001, Global G.A.P, HACCP certified',
        valueRu: 'Сертификаты ISO 9001, Global G.A.P, HACCP',
    },
    {
        _id: 'trans-exporting-feature4-title',
        key: 'exportingFeature4Title',
        category: 'exporting',
        description: 'Fourth exporting feature title',
        valueAr: 'ضمان الجودة',
        valueEn: 'Quality Guarantee',
        valueRu: 'Гарантия качества',
    },
    {
        _id: 'trans-exporting-feature4-desc',
        key: 'exportingFeature4Desc',
        category: 'exporting',
        description: 'Fourth exporting feature description',
        valueAr: 'استبدال كامل في حال عدم المطابقة',
        valueEn: 'Full replacement in case of non-compliance',
        valueRu: 'Полная замена в случае несоответствия',
    },
    {
        _id: 'trans-exporting-capabilities',
        key: 'exportingCapabilities',
        category: 'exporting',
        description: 'Exporting capabilities section title',
        valueAr: 'قدراتنا التصديرية',
        valueEn: 'Our Export Capabilities',
        valueRu: 'Наши экспортные возможности',
    },
    {
        _id: 'trans-exporting-cap1',
        key: 'exportingCap1',
        category: 'exporting',
        description: 'First export capability',
        valueAr: 'طاقة تصديرية 500+ حاوية سنوياً',
        valueEn: 'Export capacity of 500+ containers annually',
        valueRu: 'Экспортная мощность 500+ контейнеров в год',
    },
    {
        _id: 'trans-exporting-cap2',
        key: 'exportingCap2',
        category: 'exporting',
        description: 'Second export capability',
        valueAr: 'شحن بحري وجوي إلى جميع القارات',
        valueEn: 'Sea and air freight to all continents',
        valueRu: 'Морские и воздушные перевозки на все континенты',
    },
    {
        _id: 'trans-exporting-cap3',
        key: 'exportingCap3',
        category: 'exporting',
        description: 'Third export capability',
        valueAr: 'مستودعات تبريد بسعة 5000 طن',
        valueEn: 'Cold storage warehouses with 5000-ton capacity',
        valueRu: 'Холодильные склады вместимостью 5000 тонн',
    },
    {
        _id: 'trans-exporting-cap4',
        key: 'exportingCap4',
        category: 'exporting',
        description: 'Fourth export capability',
        valueAr: 'تتبع الشحنات في الوقت الحقيقي',
        valueEn: 'Real-time shipment tracking',
        valueRu: 'Отслеживание отправлений в реальном времени',
    },
    {
        _id: 'trans-exporting-cap5',
        key: 'exportingCap5',
        category: 'exporting',
        description: 'Fifth export capability',
        valueAr: 'دعم عملاء متعدد اللغات 24/7',
        valueEn: '24/7 multilingual customer support',
        valueRu: 'Многоязычная поддержка клиентов 24/7',
    },
    {
        _id: 'trans-exporting-image-caption',
        key: 'exportingImageCaption',
        category: 'exporting',
        description: 'Exporting page image caption',
        valueAr: 'عمليات الشحن والتصدير الدولي',
        valueEn: 'International shipping and export operations',
        valueRu: 'Международные перевозки и экспортные операции',
    },
];

// ============================================
// MIGRATION FUNCTIONS
// ============================================

async function populateTranslations() {
    console.log('\n🌍 Populating Page-Specific Translations...\n');

    let created = 0;
    let updated = 0;
    let errors = 0;

    for (const translation of translations) {
        try {
            const doc = {
                _type: 'siteTranslationCentralized',
                _id: translation._id,
                key: translation.key,
                category: translation.category,
                description: translation.description,
                valueAr: translation.valueAr,
                valueEn: translation.valueEn,
                valueRu: translation.valueRu,
            };

            const existing = await client.getDocument(translation._id);

            if (existing) {
                await client.createOrReplace(doc);
                console.log(`  ✏️  Updated: ${translation.key}`);
                updated++;
            } else {
                await client.create(doc);
                console.log(`  ✅  Created: ${translation.key}`);
                created++;
            }
        } catch (error: any) {
            console.log(`  ❌  Error: ${translation.key} - ${error.message}`);
            errors++;
        }
    }

    console.log('\n📊 Summary:');
    console.log(`   Created: ${created}`);
    console.log(`   Updated: ${updated}`);
    console.log(`   Errors: ${errors}`);
    console.log(`   Total: ${translations.length}`);
}

// Run the migration
populateTranslations()
    .then(() => {
        console.log('\n✅ Page translations populated successfully!\n');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Failed to populate translations:', error);
        process.exit(1);
    });
