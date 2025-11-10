# إضافة متغيرات البيئة في Dokploy

## المتغيرات المطلوبة

أضف هذه المتغيرات في Dokploy:

```
VITE_SANITY_PROJECT_ID = wptd4h7v
VITE_SANITY_DATASET = production
VITE_SANITY_API_VERSION = 2024-01-01
VITE_SANITY_USE_CDN = true
VITE_SANITY_TOKEN = [احصل عليه من Sanity]
```

## خطوات الإضافة

1. اذهب إلى Dokploy dashboard
2. اختر التطبيق `alsoadaa-website`
3. اذهب إلى **Environment Variables**
4. أضف كل متغير:
   - Key: `VITE_SANITY_PROJECT_ID`
   - Value: `wptd4h7v`
   - ✅ تأكد من تفعيل **Build Time**
5. كرر لكل المتغيرات الأخرى

## الحصول على Token من Sanity

1. اذهب إلى: https://www.sanity.io/manage/personal/tokens
2. اختر production token أو أنشئ واحد جديد
3. انسخ القيمة وضعها في `VITE_SANITY_TOKEN`

## تأكيد الإضافة

بعد إضافة المتغيرات:
- اضغط **Deploy** في Dokploy
- تحقق من Build logs
- تأكد من عدم وجود أخطاء

---

**ملاحظة:** جميع المتغيرات يجب أن تكون مفعلة **Build Time** لأن Vite يحتاجها أثناء البناء.
