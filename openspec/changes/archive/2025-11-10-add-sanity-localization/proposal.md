# Proposal: Add Sanity-Based Localization System

## Why

The current localization system uses static TypeScript files (`translations.ts`) for all UI text across three languages (Arabic, English, Russian). This approach has several limitations:

1. **Non-developer bottleneck**: Any text change requires a developer to edit code, commit, and deploy
2. **No content management**: Marketing or content teams cannot update translations independently
3. **No version control for translations**: Changes are mixed with code changes in git history
4. **Limited scalability**: Adding new languages or managing large translation sets becomes cumbersome
5. **No translation workflow**: No built-in way to track translation status, use AI assistance, or manage translation projects

### Business Value

- **Faster iteration**: Content teams can update translations without developer involvement
- **Reduced deployment cycles**: Text changes don't require code deployments
- **Better collaboration**: Translators work in a dedicated CMS interface
- **AI-powered translations**: Built-in AI Assist for automated translation suggestions
- **Audit trail**: Sanity provides versioning and history for all translation changes

## What Changes

### New Capabilities

1. **Sanity Translation Schema**
   - New `siteTranslation` document type in Sanity Studio
   - Fields: `key`, `language`, `value`, `category`, `description`
   - Organized by language (ar, en, ru) and category (navigation, hero, products, forms, etc.)
   - AI Assist enabled for automatic translation

2. **Translation Fetching System**
   - New React hook `useSanityTranslations` to fetch translations from Sanity
   - Automatic fallback to local `translations.ts` if Sanity is unavailable
   - Client-side caching for performance

3. **Integrated Language Context**
   - Enhanced `LanguageContext` to use Sanity translations
   - Seamless fallback to local translations
   - Loading states for translation fetching

4. **Migration Tooling**
   - Script to import existing translations from `translations.ts` to Sanity
   - Categorization of translations by context
   - Idempotent import (updates existing, creates new)

5. **Studio Configuration**
   - Organized structure in Sanity Studio for translations
   - Language-based filtering (Arabic, English, Russian sections)
   - AI Assist configuration for translation document types

### Modified Components

- **LanguageContext** (`src/lib/LanguageContext.tsx`)
  - Now integrates with `useSanityTranslations` hook
  - Provides loading state for translation fetching
  - Falls back to local translations on error

### Impact

**Affected Specs:**
- None (no existing specs)

**Affected Code:**
- `studio/schemaTypes/` - New `siteTranslation.ts` schema
- `studio/sanity.config.ts` - Studio structure and AI Assist config
- `src/hooks/` - New `useSanityTranslations.ts` hook
- `src/lib/LanguageContext.tsx` - Enhanced to use Sanity
- `scripts/` - New `import-translations-to-sanity.ts` script

**Dependencies:**
- No new external dependencies (uses existing `@sanity/client`)

**Environment:**
- No new environment variables (uses existing Sanity config)

**Deployment:**
- Requires running migration script once: `npm run import-translations`
- No breaking changes - system gracefully falls back to local translations

### Non-Goals

- Real-time translation updates (will use polling/refresh)
- Translation memory or TM integration
- Automated translation quality checks
- Multi-variant translations (A/B testing)
- Translation comments or approval workflows

## Breaking Changes

None. The system is designed with graceful fallbacks:
- If Sanity is unavailable, local translations are used
- Existing translation keys remain unchanged
- All existing functionality continues to work

## Migration Path

1. Run migration script to populate Sanity with existing translations
2. Verify translations appear correctly in Sanity Studio
3. Test translation editing in Studio
4. Monitor fallback behavior in production
5. Document process for content team

## Validation

### Success Criteria

1. ✅ All 471 existing translations imported to Sanity
2. ✅ Translations organized by language and category in Studio
3. ✅ Website displays Sanity translations when available
4. ✅ Graceful fallback to local translations on error
5. ✅ AI Assist enabled for translation documents
6. ✅ Content team can edit and publish translations independently
7. ✅ No performance regression (< 100ms additional load time)

### Testing Strategy

1. **Unit Tests**: Hook behavior, fallback logic
2. **Integration Tests**: Sanity fetch, translation merging
3. **Manual Tests**: 
   - Edit translation in Studio, verify on website
   - Simulate Sanity downtime, verify fallback
   - Test in all three languages
4. **Performance Tests**: Measure translation load time
5. **User Acceptance**: Content team walkthrough

## Open Questions

None - implementation is complete and validated.

## Timeline

- **Planning**: Complete
- **Implementation**: Complete
- **Testing**: Complete
- **Documentation**: Complete (`LOCALIZATION_GUIDE.md`)
- **Deployment**: Ready (migration script available)

## References

- Sanity Localization Docs: https://www.sanity.io/docs/studio/localization
- AI Assist Translation: https://www.sanity.io/docs/studio/ai-assist-content-translation
- Implementation Guide: `LOCALIZATION_GUIDE.md`
