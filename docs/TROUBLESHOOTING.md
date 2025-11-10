# Troubleshooting Guide - Alsoadaa Sanity CMS Integration

## Common Issues and Solutions

### 1. Build Errors

#### TypeScript Errors
**Problem**: `Cannot find name 'X'` or `X is declared but never used`

**Solution**:
```bash
# Run TypeScript check
npm run build

# If variables are unused, remove them
# If imports are missing, add them
```

#### Vite Build Fails
**Problem**: Build fails with module resolution errors

**Solution**:
1. Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. Check environment variables are set in `.env.local`
3. Verify all dependencies are installed

---

### 2. Sanity Connection Issues

#### Missing Environment Variables
**Problem**: `Missing VITE_SANITY_PROJECT_ID environment variable`

**Solution**:
Create or update `.env.local`:
```env
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_SANITY_TOKEN=your-token (optional for write operations)
```

**Important**: Restart dev server after adding environment variables

#### CORS Errors
**Problem**: `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solution**:
1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project
3. Go to Settings → API
4. Add your domain to CORS origins:
   - Development: `http://localhost:5173`
   - Production: `https://yourdomain.com`

#### 401 Unauthorized Errors
**Problem**: API requests fail with 401 status

**Solution**:
1. Check if you need authentication for the operation
2. Verify `VITE_SANITY_TOKEN` is set correctly
3. Generate new token in Sanity dashboard if needed
4. For read operations, ensure dataset is public or token has read permissions

---

### 3. Data Fetching Issues

#### No Data Returned
**Problem**: Queries return empty arrays or null

**Solution**:
1. **Check data exists in Sanity Studio**:
   - Log into studio and verify documents are published (not drafts)
   
2. **Test query in Vision**:
   - Open Sanity Studio → Vision tab
   - Run your GROQ query:
   ```groq
   *[_type == "product" && language == "ar"]
   ```
   
3. **Check language filter**:
   - Ensure documents have the `language` field set
   - Match the language code exactly (`ar`, `en`, `ru`)

4. **Verify document structure**:
   - Check field names match your queries
   - Ensure required fields are populated

#### Slow Query Performance
**Problem**: Queries take too long to return data

**Solution**:
1. **Optimize GROQ queries**:
   ```groq
   // ❌ Bad - fetches full asset details
   *[_type == "product"]{ image-> }
   
   // ✅ Good - fetches only reference
   *[_type == "product"]{ image }
   ```

2. **Use projections** to fetch only needed fields:
   ```groq
   *[_type == "product"]{
     _id,
     title,
     image
   }
   ```

3. **Add indexes** in Sanity Studio schema (for large datasets)

---

### 4. Image Loading Issues

#### Images Not Displaying
**Problem**: Image URLs return 404 or images don't load

**Solution**:
1. **Check image reference**:
   ```typescript
   // Verify image has asset reference
   console.log(product.image?.asset?._ref)
   ```

2. **Verify urlFor function**:
   ```typescript
   import { urlFor } from '@/lib/sanity'
   
   const imageUrl = urlFor(product.image)?.url()
   console.log('Image URL:', imageUrl)
   ```

3. **Check Sanity CDN**:
   - Images should be at `cdn.sanity.io`
   - Verify project ID in URL matches your project

#### Broken Image Thumbnails
**Problem**: Image thumbnails show broken icon

**Solution**:
1. Re-upload images in Sanity Studio
2. Clear browser cache
3. Check image file format is supported (JPG, PNG, WebP, GIF)

---

### 5. Form Submission Issues

#### Form Submission Fails
**Problem**: Quote/Contact form doesn't submit

**Solution**:
1. **Check write permissions**:
   - Ensure `VITE_SANITY_TOKEN` is set
   - Token must have write permissions for `formSubmission` documents

2. **Verify schema matches**:
   ```typescript
   // Check formSubmission schema in studio/schemaTypes/formSubmission.ts
   // Ensure field names match your form data
   ```

3. **Check validation**:
   - Open browser console for validation errors
   - Verify all required fields are filled

4. **Test in Sanity Studio**:
   - Manually create a formSubmission document
   - If manual creation works, issue is with client submission

#### Submissions Not Appearing in Studio
**Problem**: Forms submit successfully but don't appear in Studio

**Solution**:
1. Check correct dataset (production vs development)
2. Verify document is created (check browser console for `_id`)
3. Refresh Sanity Studio
4. Check Studio desk structure includes `formSubmission` type

---

### 6. Translation Issues

#### AI Assist Not Working
**Problem**: Translation button doesn't appear or fails

**Solution**:
1. **Verify AI Assist is installed**:
   ```bash
   cd studio
   npm list @sanity/assist
   ```

2. **Check configuration**:
   ```typescript
   // studio/sanity.config.ts
   import { assist } from '@sanity/assist'
   
   plugins: [
     assist({
       translate: {
         document: {
           languageField: 'language',
           documentTypes: ['product', 'page', 'service'],
         },
       },
     }),
   ]
   ```

3. **Ensure language field exists**:
   - All translatable documents must have `language` field
   - Field must be required in schema

#### Translations Incomplete
**Problem**: Some fields not translated

**Solution**:
1. Review AI translation and manually fix
2. Check if fields are marked as translatable
3. Protected phrases might need manual translation
4. Re-run translation for specific fields

---

### 7. Deployment Issues

#### Production Build Fails
**Problem**: `npm run build` fails in production

**Solution**:
1. **Check environment variables** in deployment platform
2. **Test build locally**:
   ```bash
   npm run build
   npm run preview
   ```
3. **Review build logs** for specific errors

#### Environment Variables Not Working
**Problem**: App can't connect to Sanity in production

**Solution**:
1. **Verify all VITE_* variables are set** in deployment platform
2. **Restart deployment** after adding variables
3. **Check variable names** (must start with `VITE_`)
4. **Inspect build output** for environment variable values (sanitize sensitive data)

#### Docker Build Issues
**Problem**: Docker build fails or app doesn't work in container

**Solution**:
1. **Check Dockerfile** includes environment variables:
   ```dockerfile
   ARG VITE_SANITY_PROJECT_ID
   ENV VITE_SANITY_PROJECT_ID=$VITE_SANITY_PROJECT_ID
   ```

2. **Pass build args**:
   ```bash
   docker build \
     --build-arg VITE_SANITY_PROJECT_ID=xxx \
     --build-arg VITE_SANITY_DATASET=production \
     -t alsoadaa .
   ```

3. **Verify nginx.conf** serves static files correctly

---

### 8. Language Switching Issues

#### Language Not Persisting
**Problem**: Selected language resets on page reload

**Solution**:
1. Check localStorage is working:
   ```javascript
   // Browser console
   localStorage.getItem('language')
   ```

2. Verify LanguageContext is set up correctly
3. Check browser privacy settings allow localStorage

#### RTL/LTR Not Switching
**Problem**: Text direction doesn't change for Arabic

**Solution**:
1. **Check document direction**:
   ```javascript
   // Should be 'rtl' for Arabic
   console.log(document.documentElement.dir)
   ```

2. **Verify CSS**:
   ```css
   /* In globals.css */
   [dir="rtl"] {
     /* RTL-specific styles */
   }
   ```

3. **Test with**:
   ```typescript
   document.documentElement.dir = 'rtl'
   document.documentElement.lang = 'ar'
   ```

---

### 9. Performance Issues

#### Slow Initial Load
**Problem**: First page load takes too long

**Solution**:
1. **Enable CDN** (production only):
   ```typescript
   // src/lib/sanity.ts
   useCdn: true
   ```

2. **Optimize queries** with projections
3. **Implement caching** with React Query or SWR
4. **Use lazy loading** for images
5. **Code split** large components

#### Memory Leaks
**Problem**: Browser becomes slow over time

**Solution**:
1. **Check for cleanup** in useEffect:
   ```typescript
   useEffect(() => {
     const subscription = client.listen(query)
     return () => subscription.unsubscribe()
   }, [])
   ```

2. **Limit loaded data** with pagination
3. **Clear intervals/timeouts** on unmount

---

### 10. Development Issues

#### Hot Reload Not Working
**Problem**: Changes don't reflect in browser

**Solution**:
1. **Restart dev server**:
   ```bash
   npm run dev
   ```

2. **Clear browser cache**: Ctrl+Shift+R (hard refresh)
3. **Check Vite config** for HMR settings
4. **Disable browser extensions** that might interfere

#### Studio Not Loading
**Problem**: Sanity Studio shows blank page or errors

**Solution**:
1. **Check Studio dependencies**:
   ```bash
   cd studio
   npm install
   ```

2. **Verify sanity.config.ts** is correct
3. **Check console** for errors
4. **Clear Studio cache**:
   ```bash
   rm -rf studio/.sanity
   npm run dev
   ```

---

## Debugging Tips

### Enable Debug Logging

**Client-side**:
```typescript
// src/lib/sanity.ts
export const client = createClient({
  // ... other config
  useCdn: false, // Disable CDN to see latest data
})

// Add logging to queries
const result = await client.fetch(query)
console.log('Query result:', result)
```

**Sanity Vision**:
- Use Vision tab in Studio to test GROQ queries
- Check query response structure

### Common Console Commands

```javascript
// Check environment variables
console.log(import.meta.env)

// Test Sanity client
import { client } from './lib/sanity'
client.fetch('*[_type == "product"][0]').then(console.log)

// Check language context
console.log(localStorage.getItem('language'))

// Verify document structure
console.log(document.documentElement.dir, document.documentElement.lang)
```

---

## Getting Help

### Resources
- **Sanity Documentation**: https://www.sanity.io/docs
- **Sanity Community**: https://slack.sanity.io
- **GROQ Cheat Sheet**: https://www.sanity.io/docs/query-cheat-sheet
- **Vite Documentation**: https://vitejs.dev

### Support Channels
1. Check Sanity Studio's built-in help
2. Search Sanity's GitHub issues
3. Ask in Sanity Community Slack
4. Review this project's README and AGENTS.md

### Before Asking for Help
1. Check this troubleshooting guide
2. Review console errors and logs
3. Test queries in Vision
4. Verify environment variables
5. Try in a fresh browser/incognito window
6. Check if issue persists after restart

---

## Quick Fixes Checklist

When something doesn't work, try these in order:

- [ ] Check browser console for errors
- [ ] Verify environment variables are set
- [ ] Restart development server
- [ ] Clear browser cache (hard refresh)
- [ ] Check Sanity Studio has data
- [ ] Test query in Vision
- [ ] Verify CORS settings
- [ ] Check document language field
- [ ] Confirm write token permissions
- [ ] Rebuild and test production build
