import { useEffect, useState } from 'react';
import { client } from '../lib/sanity';
import { translations as fallbackTranslations, Language } from '../lib/translations';
import type { Translations } from '../lib/translations';

interface SanityTranslationCentralized {
  key: string;
  valueAr: string;
  valueEn: string;
  valueRu: string;
}

// Cache duration: 1 hour
const CACHE_DURATION = 60 * 60 * 1000;
const CACHE_KEY_PREFIX = 'cms-translations-';

function getCachedTranslations(language: Language): Translations | null {
  try {
    const cacheKey = CACHE_KEY_PREFIX + language;
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is still valid
    if (now - timestamp < CACHE_DURATION) {
      console.log('📦 Using cached translations for', language);
      return data;
    }

    // Cache expired
    localStorage.removeItem(cacheKey);
    return null;
  } catch (error) {
    console.error('Error reading translation cache:', error);
    return null;
  }
}

function setCachedTranslations(language: Language, data: Translations): void {
  try {
    const cacheKey = CACHE_KEY_PREFIX + language;
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error caching translations:', error);
  }
}

export function useSanityTranslations(language: Language) {
  const [translations, setTranslations] = useState<Translations>(() => {
    // Try to load from cache first
    const cached = getCachedTranslations(language);
    return cached || fallbackTranslations[language];
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTranslations() {
      try {
        // Check cache first
        const cached = getCachedTranslations(language);
        if (cached) {
          setTranslations(cached);
          setLoading(false);
          return;
        }

        console.log('🌍 Fetching translations from CMS for', language);

        // Fetch all translations from centralized schema
        const sanityTranslations = await client.fetch<SanityTranslationCentralized[]>(
          `*[_type == "siteTranslationCentralized"] {
            key,
            valueAr,
            valueEn,
            valueRu
          }`
        );

        if (!sanityTranslations || sanityTranslations.length === 0) {
          console.warn('⚠️ No translations found in CMS, using fallback');
          setTranslations(fallbackTranslations[language]);
          setLoading(false);
          return;
        }

        // Convert array to object based on current language
        const translationsObject = sanityTranslations.reduce((acc, t) => {
          // Get value for current language
          const value = language === 'ar' ? t.valueAr : language === 'ru' ? (t.valueRu || t.valueEn) : t.valueEn;

          return {
            ...acc,
            [t.key]: value
          };
        }, {} as Record<string, string>);

        // Merge with fallback translations (fallback takes precedence for missing keys)
        const merged = {
          ...fallbackTranslations[language],
          ...translationsObject
        };

        setTranslations(merged as Translations);

        // Cache the translations
        setCachedTranslations(language, merged as Translations);

        console.log(`✅ Loaded ${sanityTranslations.length} translations from CMS`);
      } catch (error) {
        console.error('❌ Error fetching translations from CMS:', error);
        // Keep fallback translations on error
        setTranslations(fallbackTranslations[language]);
      } finally {
        setLoading(false);
      }
    }

    fetchTranslations();
  }, [language]);

  return { translations, loading };
}
