import { useState, useEffect, useMemo } from 'react';
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

    // Merge fallback translations with Sanity - fallback first, then Sanity overrides
    const t = useMemo(() => {
        const fallback = fallbackTranslations[language] || fallbackTranslations.en;
        // Spread fallback first (as base), then Sanity data overrides
        return { ...fallback, ...sanityT } as SiteSettings;
    }, [language, sanityT]);

    return { t, loading };
}

