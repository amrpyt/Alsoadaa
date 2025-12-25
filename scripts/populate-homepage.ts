/**
 * Populate Home Page Content
 * 
 * This script populates the Home page document with all necessary
 * text content from the translations file.
 * 
 * Run with: npx ts-node scripts/populate-homepage.ts
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const client = createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID || 'wptd4h7v',
    dataset: process.env.VITE_SANITY_DATASET || 'production',
    token: process.env.VITE_SANITY_TOKEN,
    apiVersion: process.env.VITE_SANITY_API_VERSION || '2024-01-01',
    useCdn: false,
})

// Home page content to populate
const homePageContent = {
    _id: 'page-home',
    _type: 'pageCentralized',

    // Settings
    pageType: 'home',
    isPublished: true,
    order: 0,
    slug: { _type: 'slug', current: 'home' },

    // Titles
    titleAr: 'الرئيسية',
    titleEn: 'Home',

    // Hero Section
    heroTitleAr: 'حمضيات مصرية طازجة إلى سوقك في 48 ساعة',
    heroTitleEn: 'Fresh Egyptian Citrus to Your Market in 48 Hours',
    heroSubtitleAr: 'مُصدِّر معتمد بشهادات ISO 9001 و Global G.A.P منذ 2009',
    heroSubtitleEn: 'ISO 9001 & Global G.A.P Certified Exporter Since 2009',

    // Trust Strip
    yearsExportingAr: 'سنوات في التصدير',
    yearsExportingEn: 'Years Exporting',
    countriesServedAr: 'دولة نخدمها',
    countriesServedEn: 'Countries Served',
    certifiedAr: 'معتمد ISO و GAP',
    certifiedEn: 'ISO & GAP Certified',
    containersPerYearAr: 'حاوية سنوياً',
    containersPerYearEn: 'Containers/Year',

    // Products Intro
    ourPremiumProductsAr: 'منتجاتنا المميزة',
    ourPremiumProductsEn: 'Our Premium Products',
    freshCertifiedDeliveredAr: 'طازجة، معتمدة، ومُسلَّمة بعناية',
    freshCertifiedDeliveredEn: 'Fresh, certified, and delivered with care',

    // Why Choose Us
    whyChooseUsAr: 'لماذا تختار السعداء؟',
    whyChooseUsEn: 'Why Choose Al Soadaa?',

    // Card 1: Quality
    qualityCertifiedAr: 'جودة معتمدة',
    qualityCertifiedEn: 'Quality Certified',
    qualityCertifiedDescAr: 'مرافق معتمدة بشهادات ISO 9001 و Global G.A.P تضمن أن كل منتج يلبي معايير الجودة الدولية.',
    qualityCertifiedDescEn: 'ISO 9001 and Global G.A.P certified facilities ensure every product meets international quality standards.',

    // Card 2: Delivery
    reliableDeliveryAr: 'توصيل موثوق',
    reliableDeliveryEn: 'Reliable Delivery',
    reliableDeliveryDescAr: 'خدمات لوجستية متقدمة وإدارة سلسلة التبريد تضمن توصيل طازج إلى أكثر من 50 دولة حول العالم.',
    reliableDeliveryDescEn: 'Advanced logistics and cold chain management guarantee fresh delivery to 50+ countries worldwide.',

    // Card 3: Fresh Guarantee
    freshGuaranteeAr: 'ضمان الطازجية',
    freshGuaranteeEn: 'Fresh Guarantee',
    freshGuaranteeDescAr: 'من الحصاد إلى التصدير في 48 ساعة. نضمن ذروة الطازجية وأقصى مدة صلاحية لعملائك.',
    freshGuaranteeDescEn: 'Harvest to export in 48 hours. We guarantee peak freshness and maximum shelf life for your customers.',

    // Testimonials Section
    whatClientsSayAr: 'ماذا يقول عملاؤنا',
    whatClientsSayEn: 'What Our Clients Say',

    // Testimonial 1
    testimonial1QuoteAr: 'السعداء كانوا موردنا الموثوق لأكثر من 5 سنوات. التزامهم بالجودة والتوصيل الموثوق لا مثيل له.',
    testimonial1QuoteEn: "Al Soadaa has been our trusted supplier for over 5 years. Their commitment to quality and reliable delivery is unmatched.",
    testimonial1AuthorAr: 'محمد الراشد',
    testimonial1AuthorEn: 'Mohammed Al-Rashid',
    testimonial1Company: 'Premium Foods Distribution',
    testimonial1Country: 'Saudi Arabia',

    // Testimonial 2
    testimonial2QuoteAr: 'جودة منتجاتهم من الحمضيات استثنائية. كل شحنة تصل طازجة وتلبي معاييرنا الصارمة.',
    testimonial2QuoteEn: 'The quality of their citrus products is exceptional. Every shipment arrives fresh and meets our strict standards.',
    testimonial2AuthorAr: 'إيلينا بوبوف',
    testimonial2AuthorEn: 'Elena Popov',
    testimonial2Company: 'Euro Fresh Imports',
    testimonial2Country: 'Russia',

    // Testimonial 3
    testimonial3QuoteAr: 'خدمة احترافية من البداية إلى النهاية. السعداء يفهمون احتياجات الأسواق الدولية.',
    testimonial3QuoteEn: 'Professional service from start to finish. Al Soadaa understands the needs of international markets.',
    testimonial3AuthorAr: 'ديفيد تشن',
    testimonial3AuthorEn: 'David Chen',
    testimonial3Company: 'Asian Markets Group',
    testimonial3Country: 'China',

    // CTA Section
    readyToImportAr: 'هل أنت مستعد لاستيراد منتجات مصرية ممتازة؟',
    readyToImportEn: 'Ready to Import Premium Egyptian Products?',
    getCustomizedQuoteAr: 'احصل على عرض سعر مخصص لاحتياجات عملك',
    getCustomizedQuoteEn: 'Get a customized quote for your business needs',
    getYourQuoteTodayAr: 'احصل على عرضك اليوم',
    getYourQuoteTodayEn: 'Get Your Quote Today',

    // SEO
    seo: {
        metaTitleAr: 'السعداء للتصدير الزراعي | حمضيات وخضروات مصرية',
        metaTitleEn: 'Al Soadaa Export | Egyptian Citrus & Vegetables',
        metaDescAr: 'شركة السعداء للاستيراد والتصدير - مُصدِّر رائد للحمضيات والخضروات المصرية الطازجة منذ 2009. معتمدون بـ ISO 9001 و Global G.A.P.',
        metaDescEn: 'Al Soadaa Import & Export - Leading exporter of fresh Egyptian citrus and vegetables since 2009. ISO 9001 & Global G.A.P certified.',
    }
}

async function populateHomePage() {
    console.log('🏠 Populating Home Page content...')

    try {
        // Check if document exists
        const existing = await client.fetch(`*[_id == "page-home"][0]`)

        if (existing) {
            console.log('📝 Updating existing document...')
            // Update existing document
            const result = await client
                .patch('page-home')
                .set(homePageContent)
                .commit()
            console.log('✅ Home page updated:', result._id)
        } else {
            console.log('📝 Creating new document...')
            // Create new document
            const result = await client.create(homePageContent)
            console.log('✅ Home page created:', result._id)
        }

        console.log('\n✨ Done! All Home page content has been populated.')
        console.log('🔄 Refresh the CMS and website to see changes.')

    } catch (error) {
        console.error('❌ Error:', error)
        process.exit(1)
    }
}

populateHomePage()
