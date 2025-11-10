# Sanity CORS Configuration

## Task 19.2: Configure CORS for Production Domain

### What is CORS?
CORS (Cross-Origin Resource Sharing) allows your website to fetch data from Sanity API.

### Steps to Configure

1. **Go to Sanity Dashboard**
   - URL: https://www.sanity.io/manage/personal/project/wptd4h7v
   - Login with your Sanity account

2. **Navigate to API Settings**
   - Click **Settings** (gear icon)
   - Go to **API** section
   - Find **CORS Origins**

3. **Add Your Production Domain**
   - Click **Add CORS Origin**
   - Enter your domain: `https://yourdomain.com`
   - Check **Allow credentials**
   - Click **Save**

4. **Add Dokploy Domain (if using Dokploy)**
   - Add: `https://alsoadaa-website.your-dokploy-domain.com`
   - Check **Allow credentials**
   - Click **Save**

5. **Test CORS**
   - Go to your production website
   - Open browser console (F12)
   - Check for CORS errors
   - Products should load without errors

### Common CORS Errors

**Error:** "Access to XMLHttpRequest blocked by CORS policy"
- **Solution:** Add your domain to CORS origins in Sanity

**Error:** "Origin not allowed"
- **Solution:** Make sure domain matches exactly (including https://)

### Domains to Add

| Environment | Domain | Status |
|-------------|--------|--------|
| Development | http://localhost:5173 | ✅ Auto-allowed |
| Dokploy | https://alsoadaa-website.your-domain.com | ⏳ Manual |
| Production | https://yourdomain.com | ⏳ Manual |

### Verification

After adding CORS origins:

```bash
# Test from your domain
curl -H "Origin: https://yourdomain.com" \
  "https://wptd4h7v.api.sanity.io/v2024-01-01/data/query/production?query=*[_type=='product'][0]"
```

Should return product data without CORS errors.

---

**Status:** ⏳ Pending - Waiting for production domain

**Next Step:** Once you have production domain, follow steps 1-5 above.
