# Design: Complete CMS Integration and Localization

## Architecture

### Data Fetching
- Use `client.fetch` with GROQ queries for all dynamic content.
- Ensure `lang` parameter is passed to all queries to fetch localized content if available (though currently products seem to be language-agnostic in schema, but `translations` are separate).
- Wait, `ProductDetailPage` uses `lang` in `productBySlugQuery`. I need to check if Sanity schema supports localized fields for products or if we just rely on UI translations.
- If products have localized fields (e.g. description), we need to ensure the query fetches the correct language.

### Localization Strategy
- **Static Text**: Use `translations.ts` (and Sanity translations via `useSanityTranslations`).
- **Dynamic Content**: Fetch from Sanity.
- **Strict Mode**: Ensure `translations.ts` has no missing keys.

## Trade-offs
- **Local vs Sanity Translations**: We are keeping `translations.ts` as a fallback and source of truth for now, but `content-localization` spec says we should use Sanity. We will ensure `translations.ts` is complete first, then migration script can push to Sanity.
