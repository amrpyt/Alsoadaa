# Design: Sanity-Based Localization System

## Architecture Overview

The system integrates Sanity CMS as a translation source while maintaining local translations as fallback.

## Key Design Decisions

### 1. Hybrid Approach: Sanity + Local Fallback

**Decision**: Use Sanity as primary source with automatic fallback to local translations.

**Rationale**:
- Reliability: If Sanity is down/slow, website remains functional
- Performance: Local translations provide instant fallback
- Developer Experience: Can develop offline with local translations
- Gradual Migration: Can deploy before migrating all translations

**Trade-offs**:
- Slight complexity in translation resolution logic
- Need to maintain two sources initially
- Small performance overhead for Sanity fetch

### 2. React Hook for Translation Fetching

**Decision**: Create `useSanityTranslations` hook instead of modifying Sanity client directly.

**Rationale**:
- Separation of Concerns: Translation logic isolated in dedicated hook
- Reusability: Hook can be used anywhere, not just in LanguageContext
- Testing: Easier to mock and test hook behavior
- React Patterns: Follows React best practices for data fetching

### 3. Key Naming Convention

**Decision**: Use dot notation in Sanity, convert to camelCase in code.

**Rationale**:
- Sanity: Dot notation is more readable (hero.title, nav.products)
- Code: camelCase matches TypeScript conventions
- Organization: Dot notation naturally groups related translations
- AI Assist: Works better with semantic dot notation

**Conversion Logic**:
```
hero.title → heroTitle
nav.products → navProducts
form.submit.button → formSubmitButton
```

### 4. Category-Based Organization

**Decision**: Add category field to organize translations by context.

**Rationale**:
- Studio UX: Easier to find translations in organized groups
- Scalability: Can filter/search by category as translations grow
- Bulk Operations: Can update entire categories at once
- Documentation: Natural grouping for localization guides

**Categories**: navigation, hero, products, forms, contact, about, common, calendar, categories, seasons

### 5. Idempotent Migration Script

**Decision**: Migration script updates existing translations rather than creating duplicates.

**Rationale**:
- Safe Re-runs: Can run script multiple times without errors
- Iterative Updates: Can add new translations and re-import
- Preservation: Manual edits in Sanity are not overwritten
- Debugging: Easy to verify migration by re-running

### 6. AI Assist Integration

**Decision**: Enable AI Assist for siteTranslation document type.

**Rationale**:
- Productivity: Content teams can auto-translate new text
- Quality: AI provides good baseline translations
- Cost: Free tier covers expected usage
- Workflow: Natural integration with Sanity Studio

## Data Flow

### Translation Resolution Flow

1. User changes language or component mounts
2. `useSanityTranslations` hook executes
3. Fetch translations from Sanity for current language
4. Convert keys from dot notation to camelCase
5. Merge with local fallback translations (Sanity overwrites)
6. Update context state
7. Components re-render with new translations

### Error Handling Flow

1. Sanity fetch fails (network, timeout, etc.)
2. Error logged to console
3. Hook returns local translations
4. User experience unaffected
5. Loading state set to false

## Performance Considerations

### Optimization Strategies

1. **Single Fetch Per Language**: All translations fetched at once
2. **Client-Side Caching**: Translations cached in React state
3. **Fallback Skip**: If Sanity fails, don't retry on every render
4. **Lazy Loading**: Translations loaded only when needed

### Performance Targets

- Initial translation load: < 100ms
- Language switch: < 200ms (including fetch)
- Fallback activation: < 10ms (synchronous)
- Memory footprint: < 50KB (all languages)

## Scalability

### Current Scale

- 471 translations (157 per language)
- 3 languages (ar, en, ru)
- 10 categories
- ~15KB payload per language

### Growth Path

**System can handle**:
- 10,000+ translations
- 20+ languages
- 50+ categories
- Complex nested translations

**Scaling Strategies**:
- Add pagination if translations exceed 5,000
- Implement translation caching service
- Use Sanity CDN for faster delivery
- Split translations by page/route

## Security Considerations

### Data Protection

- **Read-Only Access**: Frontend only reads translations
- **Token Scoping**: Sanity token has minimal permissions
- **No PII**: Translations contain no user data
- **Validation**: All translations validated before save

### Content Security

- **Version Control**: Sanity tracks all changes
- **Rollback**: Can revert to previous versions
- **Audit Trail**: Full history of who changed what
- **Access Control**: Studio access restricted to content team

## Testing Strategy

### Unit Tests

- Hook behavior (fetch, merge, error handling)
- Key conversion logic
- Fallback mechanism

### Integration Tests

- Sanity client integration
- Context provider behavior
- Language switching

### Manual Tests

- Edit translation in Studio, verify on website
- Simulate Sanity downtime, verify fallback
- Test in all three languages
- Verify AI Assist translations

### Performance Tests

- Measure translation load time
- Monitor memory usage
- Check for memory leaks on language switch

## Migration Strategy

### Phase 1: Setup (Complete)

- Create Sanity schema
- Build fetching infrastructure
- Implement fallback logic

### Phase 2: Import (Complete)

- Run migration script
- Verify all translations imported
- Test Studio organization

### Phase 3: Validation (Complete)

- Test translation display
- Verify fallback behavior
- Check performance metrics

### Phase 4: Deployment (Ready)

- Deploy with migration script
- Monitor error rates
- Gather user feedback

### Phase 5: Optimization (Future)

- Add real-time updates
- Implement advanced caching
- Add translation workflows

## Rollback Plan

### If Issues Arise

1. **Immediate**: System auto-falls back to local translations
2. **Manual**: Remove Sanity integration from LanguageContext
3. **Recovery**: Re-run migration script to fix data issues
4. **Worst Case**: Revert to pre-localization code (no data loss)

### Rollback Steps

```bash
# 1. Revert LanguageContext changes
git revert <commit-hash>

# 2. Local translations still work
# No data migration needed

# 3. Fix issues and retry
npm run import-translations
```

## Future Enhancements

### Planned

- Real-time translation updates (Sanity webhooks)
- Translation coverage reporting
- Missing translation detection
- Bulk translation operations

### Under Consideration

- Translation memory integration
- Automated quality checks
- A/B testing for translations
- Translation approval workflows
- Community translation contributions

## Conclusion

This design provides a robust, scalable localization system that:
- Maintains reliability through graceful fallbacks
- Empowers non-developers to manage translations
- Leverages AI for productivity
- Follows React and TypeScript best practices
- Scales to future requirements
