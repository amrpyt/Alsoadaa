# Change: Fix CMS Data Integrity and Translation Linking

## Why

الـ CMS فيه مشاكل كتير في البيانات:
1. **منتجات مش مترجمة**: بعض المنتجات موجودة بلغة واحدة بس (عربي مثلاً) ومفيش ترجمة ليها
2. **منتجات مكررة**: نفس المنتج موجود أكتر من مرة بدون ربط صحيح
3. **`originalDocument` مش صح**: الترجمات مش مربوطة بالنسخة الأصلية (العربي)
4. **Calendar Events**: ممكن تكون مربوطة بمنتجات بلغة غلط

## What Changes

### Phase 1: Audit & Analysis
- عمل audit script لتحليل كل البيانات في Sanity
- تحديد المنتجات المكررة والمفقودة
- تحديد المراجع المكسورة

### Phase 2: Data Cleanup
- حذف/دمج المنتجات المكررة
- إصلاح `originalDocument` references
- التأكد من أن كل منتج عربي له ترجمة EN و RU

### Phase 3: Sanity Studio Improvements
- إضافة validation للتأكد من عدم التكرار
- تحسين الـ preview للتمييز بين اللغات
- إضافة custom action لإنشاء ترجمات تلقائية

### Phase 4: Query & Frontend Fixes
- تحسين queries للتعامل مع البيانات الناقصة
- إضافة fallback للمنتجات بدون ترجمة

## Impact

- **Affected Specs**: `content-management`, `content-localization`
- **Affected Code**:
  - `studio/schemaTypes/*.ts` - Schema validation
  - `src/lib/queries.ts` - GROQ queries
  - `studio/scripts/` - Migration/audit scripts (new)
- **Data Changes**: سيتم تنظيف البيانات في Sanity

## Risks

- **Data Loss**: ممكن نحذف بيانات بالغلط
  - **Mitigation**: عمل backup قبل أي تغيير
- **Breaking Changes**: الـ queries ممكن ترجع نتائج مختلفة
  - **Mitigation**: اختبار شامل قبل deploy

## Success Criteria

- [ ] كل منتج عربي له ترجمة EN و RU
- [ ] كل `originalDocument` reference صحيح
- [ ] مفيش منتجات مكررة
- [ ] Calendar events كلها مربوطة صح
- [ ] الموقع يعرض المحتوى صح بكل اللغات
