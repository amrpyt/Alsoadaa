# Deploy Alsoadaa Website to Dokploy - Step by Step

## Prerequisites Checklist

Before starting, make sure you have:

- [ ] Dokploy server URL (e.g., `https://dokploy.yourdomain.com`)
- [ ] Dokploy login credentials
- [ ] GitHub repo: `https://github.com/amrpyt/Alsoadaa`
- [ ] Sanity Project ID: `wptd4h7v`
- [ ] Sanity API Token (from https://sanity.io/manage)

---

## Part 1: Deploy the Website (Main App)

### Step 1: Login to Dokploy

1. Go to your Dokploy dashboard
2. Login with your credentials

### Step 2: Create New Application

1. Click **"Create Application"** or **"New Project"**
2. Choose **"Application"** type
3. Select **"Git Provider"** → **"GitHub"**

### Step 3: Connect GitHub Repository

1. **Repository:** Select `amrpyt/Alsoadaa`
2. **Branch:** Select `main`
3. **Auto Deploy:** Enable (deploys automatically on push)

### Step 4: Configure Build Settings

**Build Configuration:**
```
Build Command: npm install && npm run build
Output Directory: dist
Node.js Version: 18.x or 20.x
```

### Step 5: Add Environment Variables

Click **"Environment Variables"** and add these (mark all as "Build Time"):

```env
VITE_SANITY_PROJECT_ID=wptd4h7v
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_SANITY_USE_CDN=true
VITE_SANITY_TOKEN=your-sanity-token-here
```

**Where to get VITE_SANITY_TOKEN:**
1. Go to https://sanity.io/manage/personal/project/wptd4h7v
2. Click **API** → **Tokens**
3. Create new token with **Editor** permissions
4. Copy and paste here

### Step 6: Deploy

1. Click **"Deploy"** or **"Save & Deploy"**
2. Wait for build to complete (3-5 minutes)
3. Check build logs for errors

### Step 7: Get Your Website URL

After deployment:
- Dokploy will give you a URL like: `https://alsoadaa-website-xxx.dokploy.app`
- Or configure custom domain in Dokploy settings

---

## Part 2: Deploy Sanity Studio (CMS)

### Option A: Deploy to Sanity Cloud (Recommended - Easiest)

1. **Open terminal in project folder:**
   ```bash
   cd studio
   npm install
   npm run deploy
   ```

2. **Follow prompts:**
   - Studio hostname: `alsoadaa-studio` (or your choice)
   - Confirm deployment

3. **Access Studio:**
   - URL: `https://alsoadaa-studio.sanity.studio`
   - Login with your Sanity account

### Option B: Deploy Studio to Dokploy (Advanced)

1. Create another Dokploy application
2. **Repository:** Same `amrpyt/Alsoadaa`
3. **Branch:** `main`
4. **Build Command:** `cd studio && npm install && npm run build`
5. **Output Directory:** `studio/dist`
6. **Port:** 3333

---

## Part 3: Configure CORS in Sanity

**After you have your production URL:**

1. Go to https://sanity.io/manage/personal/project/wptd4h7v
2. Click **API** → **CORS Origins**
3. Click **"Add CORS Origin"**
4. Add your Dokploy URL: `https://alsoadaa-website-xxx.dokploy.app`
5. Check **"Allow credentials"**
6. Click **Save**

---

## Part 4: Verify Deployment

### Test Website

1. Open your Dokploy URL
2. Check:
   - [ ] Website loads
   - [ ] Products display correctly
   - [ ] Images load from Sanity CDN
   - [ ] Language switcher works
   - [ ] Forms submit successfully

### Test Studio

1. Open Studio URL
2. Check:
   - [ ] Can login
   - [ ] Can see products
   - [ ] Can edit content
   - [ ] Changes appear on website

### Check Browser Console

1. Open website
2. Press F12 (Developer Tools)
3. Check Console tab for errors
4. Should see no CORS errors

---

## Troubleshooting

### Build Fails

**Error:** "Module not found"
- **Fix:** Check package.json dependencies

**Error:** "Environment variable not set"
- **Fix:** Add all VITE_SANITY_* variables in Dokploy

### Website Loads but No Products

**Error:** CORS error in console
- **Fix:** Add your domain to Sanity CORS origins

**Error:** "Failed to fetch"
- **Fix:** Check VITE_SANITY_PROJECT_ID is correct

### Forms Don't Submit

**Error:** 401 Unauthorized
- **Fix:** Check VITE_SANITY_TOKEN is valid

---

## Next Steps After Deployment

1. **Configure Custom Domain** (optional)
   - Add domain in Dokploy settings
   - Update DNS records
   - Add domain to Sanity CORS

2. **Enable Auto-Deploy**
   - Already enabled if you checked it
   - Every push to `main` = automatic deployment

3. **Monitor Performance**
   - Check Dokploy logs
   - Monitor Sanity usage dashboard

---

## Quick Commands Reference

```bash
# Check current branch
git branch

# Push to GitHub (triggers auto-deploy)
git push origin main

# Deploy Studio to Sanity Cloud
cd studio && npm run deploy

# Test build locally
npm run build

# Preview production build locally
npm run preview
```

---

## Support

**If you get stuck:**
1. Check Dokploy build logs
2. Check browser console (F12)
3. Check Sanity API status
4. Review `docs/TROUBLESHOOTING.md`

**Common Issues:** See `docs/TROUBLESHOOTING.md`

---

**Status:** Ready to deploy! 🚀

**Estimated Time:** 15-20 minutes total
