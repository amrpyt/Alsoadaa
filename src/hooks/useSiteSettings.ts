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

                // Fetch from Sanity siteSettings singleton
                const data = await client.fetch<any>(
                    `*[_type == "siteSettings" && _id == "siteSettings"][0]`
                );

                const suffix = language === 'ar' ? 'Ar' : language === 'en' ? 'En' : 'Ru';
                const settings: SiteSettings = {};

                if (data) {
                    Object.keys(data).forEach(key => {
                        if (key.endsWith(suffix)) {
                            // Localized strings
                            const baseKey = key.slice(0, -suffix.length);
                            settings[baseKey] = data[key];
                        } else if (!key.startsWith('_') && typeof data[key] === 'string') {
                            // Generic strings (email, phone, etc.)
                            settings[key] = data[key];
                        }
                    });

                    // Flatten social links for easy use
                    if (data.socialLinks && Array.isArray(data.socialLinks)) {
                        data.socialLinks.forEach((link: any) => {
                            if (link.platform && link.url) {
                                settings[`social_${link.platform.toLowerCase()}`] = link.url;
                            }
                        });
                    }
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

