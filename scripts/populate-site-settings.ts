/**
 * Populate Site Settings
 * 
 * This script populates the siteSettings document with button texts,
 * footer content, and other global settings.
 * 
 * Run with: npx ts-node scripts/populate-site-settings.ts
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

// Site Settings content
const siteSettingsContent = {
    _id: 'siteSettings',
    _type: 'siteSettings',

    // Company Names
    companyNameAr: 'السعداء للتصدير',
    companyNameEn: 'Al Soadaa Export',
    companyNameRu: 'Аль Саудаа Экспорт',

    // Contact Info
    email: 'info@alsoadaa-export.com',
    phone: '+20 48 260 4777',
    whatsapp: '+201234567890',

    // Addresses
    addressAr: 'قطعة 21 - منطقة المطورين - مدينة السادات، المنوفية - مصر',
    addressEn: 'Plot 21 - Developers Zone - Sadat City, Menoufia - Egypt',
    addressRu: 'Участок 21 - Зона разработчиков - Садат Сити, Менуфия - Египет',

    // Social Links
    socialLinks: [
        { platform: 'Facebook', url: 'https://facebook.com/alsoadaa' },
        { platform: 'Instagram', url: 'https://instagram.com/alsoadaa' },
        { platform: 'LinkedIn', url: 'https://linkedin.com/company/alsoadaa' },
    ],

    // Footer
    footerDescAr: 'مُصدِّر زراعي مصري ممتاز منذ 2009. نوصل منتجات طازجة ومعتمدة للأسواق حول العالم.',
    footerDescEn: 'Premium Egyptian agricultural exporter since 2009. Delivering fresh, certified products to markets worldwide.',
    copyrightAr: '© 2025 السعداء للتصدير. جميع الحقوق محفوظة.',
    copyrightEn: '© 2025 Al Soadaa Export. All rights reserved.',

    // Global SEO
    defaultSeoAr: {
        metaTitle: 'السعداء للتصدير الزراعي | حمضيات وخضروات مصرية',
        metaDescription: 'شركة السعداء للاستيراد والتصدير - مُصدِّر رائد للحمضيات والخضروات المصرية الطازجة. معتمدون بـ ISO 9001 و Global G.A.P.',
    },
    defaultSeoEn: {
        metaTitle: 'Al Soadaa Export | Egyptian Citrus & Vegetables',
        metaDescription: 'Al Soadaa Import & Export - Leading exporter of fresh Egyptian citrus and vegetables. ISO 9001 & Global G.A.P certified.',
    },
    defaultSeoRu: {
        metaTitle: 'Аль Саудаа Экспорт | Египетские цитрусовые и овощи',
        metaDescription: 'Аль Саудаа Импорт и Экспорт - ведущий экспортер свежих египетских цитрусовых и овощей. Сертификаты ISO 9001 и Global G.A.P.',
    },

    // Button texts (stored as translations for easy access)
    requestQuoteAr: 'طلب عرض سعر',
    requestQuoteEn: 'Request Quote',
    viewProductsAr: 'عرض المنتجات',
    viewProductsEn: 'View Products',
    viewAllProductsAr: 'عرض جميع المنتجات',
    viewAllProductsEn: 'View All Products',
}

async function populateSiteSettings() {
    console.log('⚙️ Populating Site Settings...')

    try {
        // Check if document exists
        const existing = await client.fetch(`*[_id == "siteSettings"][0]`)

        if (existing) {
            console.log('📝 Updating existing Site Settings...')
            const result = await client
                .patch('siteSettings')
                .set(siteSettingsContent)
                .commit()
            console.log('✅ Site Settings updated:', result._id)
        } else {
            console.log('📝 Creating new Site Settings document...')
            const result = await client.create(siteSettingsContent)
            console.log('✅ Site Settings created:', result._id)
        }

        console.log('\n✨ Done! All Site Settings have been populated.')
        console.log('🔄 Refresh the CMS and website to see changes.')

    } catch (error) {
        console.error('❌ Error:', error)
        process.exit(1)
    }
}

populateSiteSettings()
