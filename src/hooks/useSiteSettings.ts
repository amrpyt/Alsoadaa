import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';
import type { Language } from '../lib/LanguageContext';
import { translations as fallbackTranslations } from '../lib/translations';

// Dynamic type for settings
type SiteSettings = Record<string, string>;

const CACHE_KEY = 'siteSettings';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export function useSiteSettings(language: Language) {
    const [sanityT, setSanityT] = useState<SiteSettings>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSettings() {
            try {
                // Check cache
                const cached = localStorage.getItem(`${CACHE_KEY}_${language}`);
                if (cached) {
                    const { data, timestamp } = JSON.parse(cached);
                    if (Date.now() - timestamp < CACHE_DURATION) {
                        setSanityT(data);
                        setLoading(false);
                        return;
                    }
                }

                // Fetch from Sanity siteSettings
                const data = await client.fetch<any>(
                    `*[_type == "siteSettings" && _id == "siteSettings"][0]`
                );

                // Fetch from Sanity siteTranslationCentralized
                const translationsData = await client.fetch<any[]>(
                    `*[_type == "siteTranslationCentralized"]`
                );

                const suffix = language === 'ar' ? 'Ar' : language === 'en' ? 'En' : 'Ru';
                const valueSuffix = language === 'ar' ? 'Ar' : language === 'en' ? 'En' : 'Ru';
                const settings: SiteSettings = {};

                // Map siteSettings fields
                if (data) {
                    Object.keys(data).forEach(key => {
                        if (key.endsWith(suffix)) {
                            const baseKey = key.slice(0, -suffix.length);
                            settings[baseKey] = data[key];
                        }
                    });
                }

                // Map siteTranslationCentralized
                if (translationsData) {
                    translationsData.forEach(trans => {
                        if (trans.key && trans[`value${valueSuffix}`]) {
                            // Convert dot notation keys to camelCase for compatibility
                            const key = trans.key.includes('.')
                                ? trans.key.split('.').pop() || trans.key
                                : trans.key;
                            settings[key] = trans[`value${valueSuffix}`];
                        }
                    });
                }

                setSanityT(settings);

                // Cache
                localStorage.setItem(`${CACHE_KEY}_${language}`, JSON.stringify({
                    data: settings,
                    timestamp: Date.now(),
                }));
            } catch (error) {
                console.error('Failed to fetch site settings:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchSettings();
    }, [language]);

    // Create a proxy that falls back to hardcoded translations
    const fallback = fallbackTranslations[language] || fallbackTranslations.en;

    const t = new Proxy(sanityT, {
        get(target, prop: string) {
            // If Sanity has the translation, use it
            if (prop in target && target[prop]) {
                return target[prop];
            }
            // Otherwise fall back to hardcoded translations
            if (prop in fallback) {
                return (fallback as any)[prop];
            }
            // Return empty string if not found anywhere
            return '';
        }
    });

    return { t: t as SiteSettings, loading };
}

