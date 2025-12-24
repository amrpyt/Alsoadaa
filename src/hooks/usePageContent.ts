import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';
import type { Language } from '../lib/LanguageContext';

const CACHE_KEY = 'pageContent';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export function usePageContent(slug: string, language: Language) {
    const [content, setContent] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchContent() {
            try {
                // Check cache
                const cacheKey = `${CACHE_KEY}_${slug}_${language}`;
                const cached = localStorage.getItem(cacheKey);
                if (cached) {
                    const { data, timestamp } = JSON.parse(cached);
                    if (Date.now() - timestamp < CACHE_DURATION) {
                        setContent(data);
                        setLoading(false);
                        return;
                    }
                }

                // Fetch from Sanity
                const data = await client.fetch<any>(
                    `*[_type == "pageCentralized" && (slug.current == $slug || pageType == $slug)][0]`,
                    { slug }
                );

                if (data) {
                    const suffix = language === 'ar' ? 'Ar' : language === 'en' ? 'En' : 'Ru';

                    // Extract fields: first generic (image, slug), then localized (suffix)
                    const contentObj: Record<string, any> = {};
                    Object.keys(data).forEach(key => {
                        if (key.endsWith(suffix)) {
                            // Localized fields: remove suffix for use in component
                            const baseKey = key.slice(0, -suffix.length);
                            contentObj[baseKey] = data[key];
                        } else if (!key.startsWith('_') && !['slug', 'pageType', 'isPublished', 'order'].includes(key)) {
                            // Generic fields (like heroImage)
                            contentObj[key] = data[key];
                        }
                    });

                    setContent(contentObj);

                    // Cache
                    localStorage.setItem(cacheKey, JSON.stringify({
                        data: contentObj,
                        timestamp: Date.now(),
                    }));
                }
            } catch (error) {
                console.error(`Failed to fetch page content for ${slug}:`, error);
            } finally {
                setLoading(false);
            }
        }

        fetchContent();
    }, [slug, language]);

    return { content, loading };
}
