import { useEffect, useState } from 'react';
import { client } from '../lib/sanity';
import { translations as fallbackTranslations, Language } from '../lib/translations';
import type { Translations } from '../lib/translations';

interface SanityTranslation {
  key: string;
  value: string;
  language: string;
}

export function useSanityTranslations(language: Language) {
  const [translations, setTranslations] = useState<Translations>(
    fallbackTranslations[language]
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTranslations() {
      try {
        // Fetch all translations for current language from Sanity
        const sanityTranslations = await client.fetch<SanityTranslation[]>(
          `*[_type == "siteTranslation" && language == $lang] {
            key,
            value,
            language
          }`,
          { lang: language }
        );

        // Convert array to object
        // Convert keys like "hero.title" to camelCase like "heroTitle"
        const translationsObject = sanityTranslations.reduce((acc, t) => {
          // Convert dot notation to camelCase
          const camelCaseKey = t.key
            .split('.')
            .map((part, index) => 
              index === 0 
                ? part 
                : part.charAt(0).toUpperCase() + part.slice(1)
            )
            .join('');
          
          return {
            ...acc,
            [camelCaseKey]: t.value
          };
        }, {});

        // Merge with fallback translations
        const merged = {
          ...fallbackTranslations[language],
          ...translationsObject
        };

        setTranslations(merged as Translations);
      } catch (error) {
        console.error('Error fetching translations:', error);
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
