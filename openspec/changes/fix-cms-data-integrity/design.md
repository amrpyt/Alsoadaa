# Design: Fix CMS Data Integrity

## Context

الـ CMS بيستخدم Sanity.io مع نظام ترجمة manual:
- كل document له `language` field (ar, en, ru)
- الترجمات بتتربط بالأصل عن طريق `originalDocument` reference
- العربي هو الـ source of truth

### Current Problems
```
Product A (AR) - id: abc123
Product A (EN) - id: xyz789, originalDocument: null ❌ (should reference abc123)
Product A (EN) - id: def456, originalDocument: abc123 ✓ (duplicate!)
Product B (AR) - id: ghi012
Product B (EN) - missing! ❌
```

## Decisions

### Decision 1: Arabic as Source of Truth
- **What**: كل المنتجات العربية هي الأصل
- **Why**: العميل مصري والمحتوى الأصلي عربي
- **Alternatives**: استخدام ID محايد أو أول document تم إنشاؤه

### Decision 2: Use Audit Scripts (not manual fixes)
- **What**: هنعمل scripts تلقائية للتحليل والإصلاح
- **Why**: البيانات كتير ومحتاجة consistency
- **Alternatives**: إصلاح يدوي في Studio (بطيء وعرضة للأخطاء)

### Decision 3: Soft Delete Before Hard Delete
- **What**: نعلّم الـ duplicates أولاً، ثم نحذف بعد المراجعة
- **Why**: تجنب فقدان البيانات
- **Alternatives**: حذف مباشر (خطر)

## Architecture

### Audit Script Flow
```
1. Fetch all products from Sanity
2. Group by title (normalized)
3. For each group:
   - Find AR version (source)
   - Find EN/RU versions
   - Check originalDocument links
   - Report: missing, broken, duplicate
4. Output JSON report
```

### Fix Script Flow
```
1. Load audit report
2. Backup current state
3. For each issue:
   - MISSING: Create translation from AR
   - BROKEN: Update originalDocument reference
   - DUPLICATE: Merge/delete (with confirmation)
4. Verify fixes
```

### Data Model
```typescript
interface AuditResult {
  products: {
    ar: ProductDoc[];
    en: ProductDoc[];
    ru: ProductDoc[];
  };
  issues: {
    missingTranslations: { arId: string; missingLangs: string[] }[];
    brokenReferences: { id: string; issue: string }[];
    duplicates: { title: string; docs: ProductDoc[] }[];
  };
}
```

## Risks / Trade-offs

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Data loss | Medium | High | Full backup before any changes |
| Breaking queries | Low | Medium | Test thoroughly before deploy |
| Missing translations after fix | Low | Low | Manual review of audit report |

## Migration Plan

1. **Preparation** (Day 1)
   - Create and test audit script locally
   - Run audit on production data
   - Review report with client

2. **Backup** (Day 2)
   - Export full Sanity dataset
   - Store in safe location

3. **Fixes** (Day 2-3)
   - Run fix script in batches
   - Review each batch before committing
   - Update frontend code if needed

4. **Verification** (Day 3)
   - Run audit again (should show 0 issues)
   - Manual testing of website
   - Client sign-off

5. **Rollback** (if needed)
   - Restore from backup
   - Revert code changes

## Open Questions

1. هل المنتجات المكررة محتوية على بيانات مختلفة؟ لازم نراجع كل حالة
2. هل الـ Calendar Events محتاجة ترجمة؟ حالياً مربوطة بالمنتج بس
3. هل محتاجين Russian translations كلها؟ ولا EN كافية حالياً؟
