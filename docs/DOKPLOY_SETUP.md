# Dokploy Deployment Guide (Git-based, No Docker)

## Overview

This guide shows how to deploy Alsoadaa website on Dokploy using **Git-based deployment** (similar to Vercel) without Docker containers.

## Prerequisites

- ✅ Dokploy instance running on your server
- ✅ GitHub repository: `amrpyt/alsoadaa-website`
- ✅ Node.js support enabled in Dokploy
- ✅ Sanity CMS configured and ready

---

## Step 1: Push to GitHub

Ensure your latest changes are pushed to GitHub:

```bash
# Commit any pending changes
git add .
git commit -m "feat: prepare for Dokploy deployment"

# Push to GitHub
git push origin deployment/dokploy-github

# Or push to main branch
git push origin main
```

**Authentication Options:**
- Personal Access Token (recommended)
- SSH keys
- GitHub Desktop

---

## Step 2: Create Project in Dokploy

### 1. Login to Dokploy Dashboard
Access your Dokploy instance at `https://your-dokploy-domain.com`

### 2. Create New Application

1. Click **"New Application"** or **"Create Project"**
2. **Application Type:** Select **"Node.js"** or **"Static Site"**
3. **Application Name:** `alsoadaa-website` (or your preferred name)

### 3. Connect GitHub Repository

1. **Source:** Select **"GitHub"**
2. **Connect GitHub Account** (if not already connected)
   - Authorize Dokploy to access your GitHub repositories
3. **Select Repository:** `amrpyt/alsoadaa-website`
4. **Select Branch:** `main` (or `deployment/dokploy-github`)

---

## Step 3: Configure Build Settings

### Build Configuration

```yaml
# Build Command
npm install && npm run build

# Output Directory
dist

# Install Command (if different)
npm install

# Node Version
18.x or 20.x (LTS recommended)
```

### In Dokploy UI:

1. **Build Command:** `npm install && npm run build`
2. **Output Directory:** `dist`
3. **Install Command:** `npm install` (or leave auto-detect)
4. **Node.js Version:** Select `18.x` or `20.x`
5. **Package Manager:** `npm` (auto-detected from package-lock.json)

---

## Step 4: Configure Environment Variables

Add these environment variables in Dokploy:

### Required Variables:

```env
VITE_SANITY_PROJECT_ID=wptd4h7v
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_SANITY_USE_CDN=true
VITE_SANITY_TOKEN=your-production-token
```

### How to Add in Dokploy:

1. Go to **"Environment Variables"** section
2. Click **"Add Variable"**
3. Add each variable:
   - **Key:** `VITE_SANITY_PROJECT_ID`
   - **Value:** `wptd4h7v`
   - Check **"Build Time"** (environment variables needed during build)
4. Repeat for all variables

**Important:** Get your production token from Sanity dashboard at https://www.sanity.io/manage/personal/tokens

---

## Step 5: Configure Domain (Optional)

### Using Custom Domain:

1. Go to **"Domains"** section
2. Click **"Add Custom Domain"**
3. Enter your domain: `alsoadaa.com` or `www.alsoadaa.com`
4. Follow DNS configuration instructions
5. SSL/HTTPS will be automatically configured (Let's Encrypt)

### Using Dokploy Subdomain:

Dokploy will provide a default URL like:
- `alsoadaa-website.your-dokploy-domain.com`

---

## Step 6: Deploy

1. Review all settings
2. Click **"Deploy"** button
3. Monitor build logs in real-time

### Expected Build Output

```
✓ 1952 modules transformed.
dist/index.html                   0.48 kB │ gzip:   0.31 kB
dist/assets/index-*.css          84.85 kB │ gzip:  14.40 kB
dist/assets/index-*.js          516.11 kB │ gzip: 155.79 kB
✓ built in 4-5s
```

---

## Step 7: Configure Auto-Deploy (Optional)

### Enable Automatic Deployments:

1. Go to **"Deployment Settings"**
2. Enable **"Auto Deploy on Push"**
3. Select branch: `main`
4. Save settings

**Now:** Every `git push` to `main` will trigger a new deployment automatically!

---

### 1. Verify Deployment

**Immediate Checks (First 5 minutes):**
- [ ] Application loads at Dokploy URL
- [ ] No console errors in browser
- [ ] Products display in default language (Arabic)
- [ ] Images load from Sanity CDN
- [ ] Navigation works (all pages accessible)

**Functional Tests (First 30 minutes):**
- [ ] Language switcher works (test all 3 languages: Arabic, English, Russian)
- [ ] Product filtering by category works
- [ ] Calendar displays correctly
- [ ] Quote request form loads
- [ ] Contact form accessible

### 2. Test Form Submissions

1. Submit a test quote request
2. Verify submission appears in Sanity Studio
3. Check form validation works
4. Test email notifications (if configured)

### 3. Configure Sanity CORS

**Important:** Add your Dokploy domain to Sanity CORS origins:

1. Go to https://www.sanity.io/manage/personal/project/wptd4h7v
2. Navigate to **Settings → API → CORS Origins**
3. Click **"Add CORS Origin"**
4. Add your Dokploy URL: `https://alsoadaa-website.your-domain.com`
5. Check **"Allow credentials"**
6. Save changes

### 4. Monitor Performance

- Check build time (should be 2-5 minutes)
- Check initial load time (target: < 3s)
- Monitor Sanity API usage in dashboard
- Check application logs in Dokploy

---

## Troubleshooting

### Build Fails

**Check Dokploy build logs for specific errors:**

1. **Missing dependencies:**
   ```bash
   # Ensure all dependencies are in package.json
   npm install
   ```

2. **TypeScript errors:**
   ```bash
   # Run TypeScript check locally
   npm run build
   ```

3. **Environment variables missing:**
   - Verify all `VITE_*` variables are set in Dokploy
   - Ensure "Build Time" is checked for each variable

4. **Package-lock.json issues:**
   ```bash
   # Regenerate lock file if needed
   rm package-lock.json
   npm install
   git add package-lock.json
   git commit -m "fix: regenerate package-lock.json"
   git push
   ```

### Application Won't Start

1. **Check Dokploy application logs**
2. **Verify build output:**
   - Ensure `dist/` folder is created
   - Check `dist/index.html` exists
3. **Verify Node.js version:** Should be 18.x or 20.x

### Pages Don't Load

1. **Browser console errors:**
   - Check for missing assets
   - Verify base URL configuration

2. **Sanity connection issues:**
   - Verify CORS is configured correctly
   - Check Sanity token is valid
   - Test Sanity API manually:
   ```bash
   curl "https://wptd4h7v.api.sanity.io/v2024-01-01/data/query/production?query=*[_type=='product'][0]"
   ```

3. **Environment variables:**
   - Ensure all `VITE_SANITY_*` variables are set
   - Values must match `.env.local` (except token)

### Images Not Loading

1. **Check Sanity CDN:**
   - Images should load from `cdn.sanity.io`
   - Verify image references in Sanity Studio

2. **CORS issues:**
   - Add Dokploy domain to Sanity CORS origins

### Forms Don't Submit

1. **Check Sanity write token:**
   - Token must have write permissions
   - Generate new token if needed

2. **Check browser console** for submission errors

3. **Verify form schema** in Sanity Studio matches form data

---

## Rollback Strategy

### Quick Rollback (2 minutes)

If deployment has issues:

1. Go to Dokploy dashboard
2. Navigate to **"Deployments"** tab
3. Find previous successful deployment
4. Click **"Redeploy"** on previous version

### Git-based Rollback (5 minutes)

```bash
# Find previous working commit
git log --oneline

# Revert to previous commit
git revert HEAD

# Or reset to specific commit (if needed)
git reset --hard <commit-hash>

# Push changes
git push origin main
```

Dokploy will auto-deploy the reverted version.

---

## Quick Reference

### Repository
- **GitHub:** https://github.com/amrpyt/alsoadaa-website
- **Main Branch:** `main`
- **Deployment Branch:** `deployment/dokploy-github`

### Build Configuration
- **Build Command:** `npm install && npm run build`
- **Output Directory:** `dist`
- **Node.js Version:** 18.x or 20.x
- **Package Manager:** npm

### Environment Variables
```env
VITE_SANITY_PROJECT_ID=wptd4h7v
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_SANITY_USE_CDN=true
VITE_SANITY_TOKEN=<your-token>
```

### Local Testing
```bash
# Install dependencies
npm install

# Build project
npm run build

# Preview production build
npm run preview
# Visit: http://localhost:4173
```

---

## Monitoring & Maintenance

### Daily Checks
- Monitor Dokploy deployment status
- Check application is accessible
- Review error logs

### Weekly Checks
- Check Sanity API usage (free tier: 10k documents, 5GB assets)
- Monitor performance metrics
- Review form submissions in Sanity Studio

### Monthly Tasks
- Update dependencies (if needed)
- Review and optimize images
- Check SSL certificate renewal
- Backup Sanity data

---

## Support & Resources

### Documentation
- **Deployment Checklist:** `DEPLOYMENT_CHECKLIST.md`
- **Troubleshooting:** `TROUBLESHOOTING.md`
- **Rollback Strategy:** `ROLLBACK_STRATEGY.md`
- **Sanity Setup:** `README.md`

### External Resources
- **Dokploy Docs:** https://docs.dokploy.com
- **Sanity Docs:** https://www.sanity.io/docs
- **Vite Docs:** https://vitejs.dev

### Support Contacts
- **Application Issues:** GitHub repository
- **Dokploy Issues:** Dokploy support or community
- **Sanity Issues:** https://slack.sanity.io

---

## Next Steps After Deployment

1. ✅ Test all pages and functionality
2. ✅ Configure Sanity CORS for production domain
3. ✅ Set up custom domain (if needed)
4. ✅ Enable HTTPS/SSL (automatic in Dokploy)
5. ✅ Configure auto-deploy on main branch
6. ✅ Set up monitoring and alerts
7. ✅ Document deployment process for team
8. ✅ Train content editors on Sanity Studio

---

## Congratulations! 🎉

Your Alsoadaa website is now deployed on Dokploy with:
- ✅ Git-based deployment (no Docker)
- ✅ Automatic builds from GitHub
- ✅ Sanity CMS integration
- ✅ Multi-language support (Arabic, English, Russian)
- ✅ Optimized image delivery
- ✅ SSL/HTTPS enabled
- ✅ Zero-downtime deployments

**Your application is production-ready!** 🚀
