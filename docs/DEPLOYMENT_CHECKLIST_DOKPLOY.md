# Deployment Checklist - Dokploy Git-based Deployment

## Pre-Deployment Checklist

### 1. Code & Build
- [ ] All changes committed to Git
- [ ] TypeScript build passes locally: `npm run build`
- [ ] No console errors in development: `npm run dev`
- [ ] All tests passing (if applicable)
- [ ] Package-lock.json is up to date and committed

### 2. Environment Variables
- [ ] All Sanity environment variables documented:
  - `VITE_SANITY_PROJECT_ID` = `wptd4h7v`
  - `VITE_SANITY_DATASET` = `production`
  - `VITE_SANITY_API_VERSION` = `2024-01-01`
  - `VITE_SANITY_USE_CDN` = `true`
  - `VITE_SANITY_TOKEN` = Production token from Sanity dashboard

- [ ] Environment variables ready to add in Dokploy UI

### 3. Sanity CMS
- [ ] Sanity Studio deployed and accessible
- [ ] All content published (not drafts)
- [ ] Products exist in all languages (ar, en, ru)
- [ ] Test form submission in Sanity Studio works
- [ ] Sanity token has write permissions for form submissions

### 4. GitHub Repository
- [ ] Repository: `amrpyt/alsoadaa-website`
- [ ] Latest changes pushed to GitHub
- [ ] Branch: `main` or `deployment/dokploy-github`
- [ ] Repository accessible from Dokploy

---

## Deployment Steps

### Step 1: Push Latest Changes

```bash
# Ensure you're on the correct branch
git checkout main  # or deployment/dokploy-github

# Pull latest changes (if working in team)
git pull origin main

# Push your changes
git push origin main
```

### Step 2: Login to Dokploy

1. Access Dokploy dashboard: `https://your-dokploy-instance.com`
2. Login with your credentials

### Step 3: Create New Application

1. Click **"New Application"** or **"Add Project"**
2. **Application Name:** `alsoadaa-website`
3. **Application Type:** Node.js / Static Site
4. Click **"Create"**

### Step 4: Connect GitHub

1. **Source:** Select **"GitHub"**
2. **Authorize Dokploy** (if first time)
3. **Select Repository:** `amrpyt/alsoadaa-website`
4. **Select Branch:** `main` (or your deployment branch)
5. Click **"Connect"**

### Step 5: Configure Build Settings

1. **Build Command:** `npm install && npm run build`
2. **Output Directory:** `dist`
3. **Install Command:** `npm install` (auto-detected)
4. **Node.js Version:** `18.x` or `20.x` (LTS)
5. **Package Manager:** `npm`

### Step 6: Add Environment Variables

For each variable, click **"Add Environment Variable"**:

| Key | Value | Build Time |
|-----|-------|------------|
| `VITE_SANITY_PROJECT_ID` | `wptd4h7v` | ✅ Yes |
| `VITE_SANITY_DATASET` | `production` | ✅ Yes |
| `VITE_SANITY_API_VERSION` | `2024-01-01` | ✅ Yes |
| `VITE_SANITY_USE_CDN` | `true` | ✅ Yes |
| `VITE_SANITY_TOKEN` | `your-production-token` | ✅ Yes |

**Important:** Check "Build Time" for all variables!

### Step 7: Configure Domain (Optional)

#### For Custom Domain:
1. Go to **"Domains"** section
2. Click **"Add Custom Domain"**
3. Enter your domain: `alsoadaa.com`
4. Follow DNS configuration instructions
5. SSL/HTTPS configured automatically

#### Using Dokploy Subdomain:
- Dokploy provides: `alsoadaa-website.your-domain.com`

### Step 8: Deploy

1. Review all settings
2. Click **"Deploy"** button
3. Monitor build logs in real-time

**Expected Build Time:** 2-5 minutes

**Expected Output:**
```
✓ 1952 modules transformed.
dist/index.html                   0.48 kB │ gzip:   0.31 kB
dist/assets/index-*.css          84.85 kB │ gzip:  14.40 kB
dist/assets/index-*.js          516.11 kB │ gzip: 155.79 kB
✓ built in 4s
```

### Step 9: Configure Sanity CORS

**Critical:** Add Dokploy domain to Sanity CORS origins

1. Go to: https://www.sanity.io/manage/personal/project/wptd4h7v
2. Navigate: **Settings → API → CORS Origins**
3. Click **"Add CORS Origin"**
4. Add your Dokploy URL: `https://alsoadaa-website.your-domain.com`
5. Check **"Allow credentials"**
6. **Save changes**

### Step 10: Enable Auto-Deploy (Recommended)

1. Go to **"Deployment Settings"**
2. Enable **"Auto Deploy on Push"**
3. Select branch: `main`
4. Save

**Result:** Every `git push` triggers automatic deployment!

---

## Post-Deployment Verification

### Immediate Checks (First 5 minutes)

- [ ] Application loads at Dokploy URL
- [ ] No console errors in browser (F12 → Console)
- [ ] Homepage displays correctly
- [ ] Products page loads with Sanity data
- [ ] Images load from Sanity CDN (`cdn.sanity.io`)
- [ ] Navigation works (all menu items)

### Functional Tests (First 30 minutes)

- [ ] **Multi-language:**
  - [ ] Switch to Arabic - content displays correctly (RTL)
  - [ ] Switch to English - content displays correctly (LTR)
  - [ ] Switch to Russian - content displays correctly (LTR)

- [ ] **Products:**
  - [ ] Product listing displays all products
  - [ ] Product images load correctly
  - [ ] Filter by category works
  - [ ] Product detail page loads

- [ ] **Calendar:**
  - [ ] Seasonal calendar displays
  - [ ] Products show correct availability

- [ ] **Forms:**
  - [ ] Quote request form loads
  - [ ] Contact form loads
  - [ ] Form validation works

### Form Submission Test

1. Fill out quote request form with test data
2. Submit form
3. Check browser console for success message
4. **Verify in Sanity Studio:**
   - Go to Sanity Studio
   - Check "Form Submissions" section
   - Confirm test submission appears
5. Delete test submission

### Performance Checks

- [ ] Initial page load < 3 seconds
- [ ] Time to Interactive < 5 seconds  
- [ ] Images lazy-load correctly
- [ ] No layout shift (CLS)

### Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest) - if available
- [ ] Edge (latest)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

### Mobile Responsiveness

- [ ] Homepage responsive on mobile
- [ ] Products page responsive
- [ ] Forms usable on mobile
- [ ] Navigation menu works on mobile
- [ ] Images scale correctly

---

## Monitoring Setup

### Application Monitoring

- [ ] Check Dokploy deployment logs
- [ ] Set up uptime monitoring (optional)
- [ ] Configure error alerting (if available)

### Sanity Monitoring

- [ ] Monitor API usage in Sanity dashboard
- [ ] Check storage usage (target: < 5GB)
- [ ] Review document count (target: < 10k)

---

## Rollback Triggers

Roll back deployment if:
- [ ] Application fails to load
- [ ] Critical console errors
- [ ] Forms don't submit
- [ ] Images don't load
- [ ] Performance severely degraded (>10s load time)
- [ ] Data not loading from Sanity

**Rollback Procedure:** See `ROLLBACK_STRATEGY_DOKPLOY.md`

---

## Success Criteria

Deployment is successful when:

- ✅ Application loads without errors
- ✅ Products display in all languages (Arabic, English, Russian)
- ✅ Images load from Sanity CDN
- ✅ Forms submit successfully
- ✅ Form submissions appear in Sanity Studio
- ✅ Navigation works across all pages
- ✅ Performance acceptable (< 3s initial load)
- ✅ No critical console errors
- ✅ Mobile responsive
- ✅ Auto-deploy configured

---

## Post-Deployment Tasks

### Immediate (Day 1)

- [ ] Announce deployment to team
- [ ] Test with real users
- [ ] Monitor error logs
- [ ] Document any issues

### Short-term (Week 1)

- [ ] Gather user feedback
- [ ] Address any bugs
- [ ] Optimize performance if needed
- [ ] Train content editors on Sanity Studio

### Long-term (Month 1)

- [ ] Review Sanity usage metrics
- [ ] Plan future features
- [ ] Update documentation
- [ ] Document lessons learned

---

## Emergency Contacts

- **Developer:** [Your contact]
- **Server Admin:** [Server admin contact]
- **Dokploy Support:** Dokploy community/support
- **Sanity Support:** https://slack.sanity.io

---

## Useful Commands

```bash
# Local testing
npm install
npm run build
npm run preview

# Check build output
ls -la dist/

# Git operations
git status
git log --oneline
git push origin main

# Rollback via Git
git revert HEAD
git push origin main
```

---

## Checklist Summary

### Pre-Deployment
- [ ] Code committed and pushed
- [ ] Build passes locally
- [ ] Environment variables ready
- [ ] Sanity content published

### Deployment
- [ ] Dokploy project created
- [ ] GitHub connected
- [ ] Build settings configured
- [ ] Environment variables added
- [ ] Domain configured (optional)
- [ ] Deployment successful
- [ ] Sanity CORS configured
- [ ] Auto-deploy enabled

### Verification
- [ ] Application loads
- [ ] Multi-language works
- [ ] Forms submit
- [ ] Performance acceptable
- [ ] Mobile responsive
- [ ] All tests passed

### Post-Deployment
- [ ] Team notified
- [ ] Monitoring set up
- [ ] Documentation updated
- [ ] Success confirmed

---

**Last Updated:** 2025-11-10  
**Platform:** Dokploy (Git-based, no Docker)  
**Deployment Type:** Automatic from GitHub  
**Status:** ✅ Ready for Production
