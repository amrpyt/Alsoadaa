# Rollback Strategy - Dokploy Git-based Deployment

## Overview

This document outlines rollback procedures for Dokploy Git-based deployments (no Docker containers). Rollback is simple and fast using Git commits or Dokploy's built-in redeployment feature.

---

## Rollback Decision Tree

```
Issue Detected
    ↓
Is it critical? (App down, data loss, forms broken)
    ↓ YES → Immediate Rollback (Option 1 - 2 minutes)
    ↓ NO
    ↓
Can it be hot-fixed in <10 minutes?
    ↓ YES → Apply Hot Fix via Git
    ↓ NO → Git Rollback (Option 2 - 5 minutes)
```

---

## Rollback Options

### Option 1: Dokploy Dashboard Rollback (Fastest - 2 minutes)

**When to use:** Application completely broken, need immediate rollback

**Steps:**

1. **Login to Dokploy Dashboard**
   - Access: `https://your-dokploy-instance.com`

2. **Navigate to Application**
   - Go to `alsoadaa-website` project

3. **Go to Deployments Tab**
   - Click on "Deployments" or "History"

4. **Find Previous Successful Deployment**
   - Look for last green/successful deployment
   - Check timestamp and commit message

5. **Redeploy Previous Version**
   - Click "Redeploy" button on previous version
   - OR click "⋮" menu → "Redeploy"

6. **Monitor Rollback**
   - Watch build logs
   - Wait for deployment to complete (2-3 minutes)

**Verification:**
- [ ] Application loads without errors
- [ ] Check deployment logs show success
- [ ] Test critical functionality

**Time:** ~2 minutes  
**Downtime:** ~30-60 seconds during switch

---

### Option 2: Git Revert Rollback (Standard - 5 minutes)

**When to use:** Need to revert specific commits, controlled rollback

**Steps:**

```bash
# 1. Check current status
git status
git log --oneline -10

# 2. Identify problematic commit
# Find the commit hash that caused issues

# 3. Revert the commit
git revert <commit-hash>

# Example: Revert last commit
git revert HEAD

# 4. Resolve any conflicts (if needed)
# Edit conflicted files, then:
git add .
git revert --continue

# 5. Push revert commit
git push origin main
```

**Dokploy will automatically:**
- Detect the push
- Trigger new deployment
- Build and deploy the reverted version

**Time:** ~5 minutes  
**Downtime:** 0 seconds (new deployment while old runs)

---

### Option 3: Git Reset Rollback (Destructive - Use with Caution)

**When to use:** Multiple bad commits, need clean slate

⚠️ **Warning:** This rewrites Git history. Use only if necessary.

**Steps:**

```bash
# 1. Find last good commit
git log --oneline -20

# 2. Create backup branch (safety)
git branch backup-before-reset

# 3. Reset to good commit
git reset --hard <good-commit-hash>

# Example: Reset to 3 commits ago
git reset --hard HEAD~3

# 4. Force push (⚠️ destructive)
git push --force origin main
```

**Verification:**
- Check Dokploy triggers redeployment
- Monitor build logs
- Test application

**Time:** ~5 minutes  
**Downtime:** ~1 minute

---

### Option 4: Hot Fix Deployment (Quick Fix - 10 minutes)

**When to use:** Small issue, can fix quickly

**Steps:**

```bash
# 1. Create fix branch
git checkout -b hotfix/issue-description

# 2. Make minimal fix
# Edit only necessary files

# 3. Test locally
npm run build
npm run preview

# 4. Commit fix
git add .
git commit -m "hotfix: description of fix"

# 5. Merge to main
git checkout main
git merge hotfix/issue-description

# 6. Push
git push origin main

# 7. Delete hotfix branch
git branch -d hotfix/issue-description
```

**Time:** ~10 minutes  
**Downtime:** 0 seconds

---

## Environment Variable Rollback

### Problem: Wrong Environment Variable Value

**Solution:**

1. **Go to Dokploy Dashboard**
2. **Navigate to Environment Variables**
3. **Edit the variable:**
   - Find problematic variable
   - Update value
   - Save changes

4. **Trigger Redeploy:**
   - Click "Redeploy" button
   - OR make dummy commit and push

**Time:** ~3 minutes

---

## Sanity Data Rollback

### Important Notes:

- **Sanity data is NOT automatically rolled back**
- Content changes persist across app deployments
- Application rollback doesn't affect CMS content

### If Content Was Modified:

**Option A: Revert in Sanity Studio**
1. Login to Sanity Studio
2. Find modified document
3. Use "Revision History" to revert changes
4. Publish previous version

**Option B: Unpublish New Content**
1. Find problematic document
2. Unpublish it
3. Application will stop showing it

### If Schema Was Changed:

**Warning:** Schema changes need careful handling

1. **Check if old app is compatible** with new schema
2. **If not compatible:**
   - Rollback app first
   - Then rollback Sanity schema deployment
   - Redeploy old schema version

```bash
# In studio directory
cd studio
git checkout <previous-commit>
npm run deploy
```

---

## Communication During Rollback

### Internal Team Notification

```
🚨 ROLLBACK IN PROGRESS

Reason: [Brief description]
Action: Rolling back to previous deployment
Method: [Dokploy Dashboard / Git Revert / etc.]
ETA: [X] minutes
Current Status: [In Progress / Testing / Complete]

Timeline:
- [HH:MM] Issue detected
- [HH:MM] Rollback initiated
- [HH:MM] Rollback complete
- [HH:MM] Verification complete
```

### User Communication (if needed)

```
We're performing emergency maintenance to fix an issue.
The site will be back to normal shortly.
Thank you for your patience.
```

---

## Post-Rollback Checklist

### Immediate (Within 15 minutes)

- [ ] Application is accessible
- [ ] No console errors
- [ ] Products load correctly
- [ ] Forms work
- [ ] Images display
- [ ] Navigation functions

### Short Term (Within 1 hour)

- [ ] Document what went wrong
- [ ] Identify root cause
- [ ] Plan fix for issue
- [ ] Update team
- [ ] Review logs

### Long Term (Within 24 hours)

- [ ] Fix issue in development
- [ ] Test fix thoroughly
- [ ] Create new deployment
- [ ] Conduct post-mortem
- [ ] Update procedures if needed

---

## Rollback Testing (Monthly Recommended)

Practice rollback procedures:

```bash
# 1. Deploy test change to staging/test environment
# 2. Practice rollback using each method
# 3. Time each method
# 4. Document any issues
# 5. Update procedures
```

**Rollback Drill Log:**
```
Date: [Date]
Method: [Dokploy Dashboard / Git Revert / etc.]
Time Taken: [X] minutes
Issues: [Any problems encountered]
Improvements: [What to improve]
```

---

## Prevention Checklist

Prevent need for rollback:

- [ ] Test builds locally before pushing
- [ ] Use feature branches for major changes
- [ ] Enable auto-deploy only after testing
- [ ] Test in staging environment first (if available)
- [ ] Review changes before merging to main
- [ ] Keep commits small and focused
- [ ] Write descriptive commit messages

---

## Rollback Authority

### Can Initiate Rollback:
- Lead Developer
- DevOps Engineer  
- Server Administrator
- On-Call Engineer

### Must Be Notified:
- Project Manager
- Team Lead
- Product Owner

---

## Quick Reference Commands

### Git Rollback
```bash
# View history
git log --oneline -10

# Revert last commit
git revert HEAD
git push origin main

# Reset to specific commit (⚠️ destructive)
git reset --hard <commit-hash>
git push --force origin main
```

### Check Deployment
```bash
# Check application status
curl -I https://your-domain.com

# Check Sanity API
curl "https://wptd4h7v.api.sanity.io/v2024-01-01/data/query/production?query=*[_type=='product'][0]"
```

### Local Testing
```bash
# Test build
npm run build

# Preview production build
npm run preview
```

---

## Rollback History Log

Keep record of all rollbacks:

| Date | Reason | Method | Downtime | Resolved By |
|------|--------|--------|----------|-------------|
| YYYY-MM-DD | [Issue] | [Method] | [Time] | [Name] |

---

## Emergency Contacts

- **Primary On-Call:** [Contact]
- **Backup On-Call:** [Contact]
- **Server Admin:** [Contact]
- **Dokploy Support:** [Support Link]
- **Sanity Support:** https://slack.sanity.io

---

## Comparison: Dokploy vs Docker Rollback

| Aspect | Dokploy (Git-based) | Docker (Previous) |
|--------|---------------------|-------------------|
| **Speed** | 2-5 minutes | 2 minutes |
| **Complexity** | Very Simple | Moderate |
| **Downtime** | 0-60 seconds | ~30 seconds |
| **Method** | Git commits or UI | Container swap |
| **Ease** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

---

**Last Updated:** 2025-11-10  
**Platform:** Dokploy (Git-based)  
**Next Review:** Monthly  
**Last Tested:** [Date]
