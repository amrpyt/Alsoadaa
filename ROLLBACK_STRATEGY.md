# Rollback Strategy - Alsoadaa Sanity CMS Integration

## Overview

This document outlines the rollback procedures in case the Sanity CMS integration deployment fails or causes issues in production.

---

## Rollback Decision Tree

```
Issue Detected
    ↓
Is it critical? (App down, data loss, security breach)
    ↓ YES → Immediate Rollback (Option 1)
    ↓ NO
    ↓
Can it be hot-fixed in <10 minutes?
    ↓ YES → Apply Hot Fix
    ↓ NO → Planned Rollback (Option 2)
```

---

## Rollback Options

### Option 1: Docker Container Rollback (Fastest - 2 minutes)

**When to use**: Application completely broken, images don't load, forms don't work

**Steps**:
```bash
# 1. SSH into server
ssh user@your-server.com

# 2. Stop current container
docker stop alsoadaa

# 3. List available images
docker images | grep alsoadaa

# 4. Start previous version
docker run -d \
  --name alsoadaa \
  -p 80:80 \
  --restart unless-stopped \
  yourusername/alsoadaa:previous-tag

# 5. Verify rollback
curl http://localhost
docker logs alsoadaa
```

**Verification**:
- [ ] Application loads
- [ ] No console errors
- [ ] Basic navigation works

**Time**: ~2 minutes  
**Downtime**: ~30 seconds

---

### Option 2: Git Revert and Redeploy (Medium - 10 minutes)

**When to use**: Need to revert code changes, Docker not used, or need clean deployment

**Steps**:
```bash
# 1. Find the last working commit
git log --oneline

# 2. Revert to previous commit (before Sanity integration)
git revert <commit-hash> --no-edit

# OR reset to specific commit (destructive)
git reset --hard <commit-hash>

# 3. Push revert
git push origin main

# 4. Rebuild application
npm install
npm run build

# 5. Redeploy
# Follow your normal deployment process
```

**Verification**:
- [ ] Build succeeds
- [ ] Application works with mock data
- [ ] All pages load

**Time**: ~10 minutes  
**Downtime**: ~5 minutes

---

### Option 3: Environment Variable Rollback (Quick Fix - 1 minute)

**When to use**: Sanity connection issues, wrong dataset, API errors

**Steps**:
```bash
# 1. Access deployment platform environment variables
# (Dokploy, Vercel, Netlify, etc.)

# 2. Temporarily disable Sanity by removing/commenting variables
# OR switch to a different dataset

# 3. Restart application
docker restart alsoadaa
# OR trigger redeploy on platform

# 4. Verify application falls back to mock data or caching
```

**Note**: This assumes you have fallback logic or can quickly add it.

**Time**: ~1 minute  
**Downtime**: ~10 seconds

---

### Option 4: Traffic Routing Rollback (Zero Downtime)

**When to use**: Need zero downtime, have load balancer or reverse proxy

**Prerequisites**:
- Load balancer (nginx, Traefik, AWS ALB, etc.)
- Previous version still running on different port

**Steps**:
```nginx
# 1. Update nginx config to route to old version
upstream alsoadaa {
    server localhost:8080; # Old version
    # server localhost:8081; # New version (commented out)
}

# 2. Reload nginx
sudo nginx -t
sudo nginx -s reload

# 3. Verify traffic goes to old version
curl http://yourdomain.com

# 4. Stop new version when ready
docker stop alsoadaa-new
```

**Time**: ~30 seconds  
**Downtime**: 0 seconds

---

## Rollback Testing (Practice Runs)

### Before Production Deployment

Test rollback procedures in staging:

```bash
# 1. Deploy new version to staging
# 2. Verify it works
# 3. Practice rolling back
# 4. Time the process
# 5. Document any issues
```

---

## Data Rollback Considerations

### Sanity Data (CMS Content)

**Important**: Sanity data is NOT rolled back automatically. Consider:

#### If Content Was Added:
- Content remains in Sanity
- Old application version may not display new content
- **Action**: No immediate action needed, content is safe

#### If Content Was Modified:
- Modifications remain in Sanity
- Old application may display outdated structure
- **Action**: May need to manually revert content in Sanity Studio

#### If Schema Was Changed:
- Schema changes are deployed to Sanity separately
- Old application may not understand new schema
- **Action**: May need to redeploy old schema (see below)

### Rolling Back Sanity Schema

```bash
# 1. Navigate to studio directory
cd studio

# 2. Checkout previous schema version
git checkout <previous-commit> -- schemaTypes/

# 3. Deploy old schema
npm run deploy

# 4. Verify in Sanity Studio
```

**Warning**: Schema rollbacks can cause data issues if new fields were added.

---

## Form Submissions During Rollback

### If Rolling Back to Mock Data Version:

**Problem**: Form submissions may fail (no Sanity connection)

**Solutions**:

1. **Temporary Disable Forms**:
   ```typescript
   // Quick hot-fix: disable submit button
   const MAINTENANCE_MODE = true
   
   if (MAINTENANCE_MODE) {
     return <div>Forms temporarily unavailable</div>
   }
   ```

2. **Fallback to Email**:
   - Configure forms to send email instead
   - Use FormSpree, SendGrid, or similar

3. **Queue Submissions**:
   - Store in localStorage temporarily
   - Retry when Sanity is back online

---

## Communication During Rollback

### Internal Communication
```
🚨 ROLLBACK IN PROGRESS

Reason: [Brief description]
Action: Rolling back to previous version
ETA: [X] minutes
Status: [In Progress / Complete]

Updates:
- [Timestamp] Rollback initiated
- [Timestamp] Previous version deployed
- [Timestamp] Verification complete
```

### User Communication

**If Public Notification Needed**:
```
We're currently performing emergency maintenance.
The site will be back to normal shortly.
Thank you for your patience.
```

**Status Page Update** (if you have one):
- Set status to "Major Outage" or "Partial Outage"
- Post updates every 5 minutes
- Set status back to "Operational" when complete

---

## Post-Rollback Actions

### Immediate (Within 1 hour)
- [ ] Verify application is stable
- [ ] Check error rates returned to normal
- [ ] Monitor user feedback
- [ ] Document what went wrong

### Short Term (Within 24 hours)
- [ ] Root cause analysis
- [ ] Fix the issue in development
- [ ] Test fix thoroughly
- [ ] Update rollback procedures if needed

### Long Term (Within 1 week)
- [ ] Plan redeployment with fix
- [ ] Update deployment checklist
- [ ] Conduct post-mortem meeting
- [ ] Share lessons learned

---

## Rollback Verification Checklist

After rolling back, verify:

- [ ] **Application loads** at production URL
- [ ] **No console errors** in browser
- [ ] **Products display** (with mock data or old data)
- [ ] **Navigation works** (all pages accessible)
- [ ] **Forms load** (even if submissions disabled temporarily)
- [ ] **Images display** (from mock data or cached)
- [ ] **No server errors** (check server logs)
- [ ] **Performance normal** (load time < 3s)
- [ ] **Mobile version works**
- [ ] **Users can browse** products/pages

---

## Prevention for Next Deployment

### Pre-Deployment
- [ ] More thorough testing in staging
- [ ] Longer soak time in staging (24+ hours)
- [ ] Load testing before production
- [ ] Feature flags for gradual rollout

### Deployment Strategy
- [ ] Blue-green deployment
- [ ] Canary deployment (10% → 50% → 100%)
- [ ] Traffic shadowing to test with real traffic
- [ ] Deploy during low-traffic hours

### Monitoring
- [ ] Better error alerting
- [ ] Real-user monitoring
- [ ] Synthetic monitoring
- [ ] Automated rollback triggers

---

## Rollback Decision Authority

### Can Initiate Rollback:
- Lead Developer
- DevOps Engineer
- System Administrator
- On-Call Engineer

### Must Be Notified:
- Project Manager
- Product Owner
- Team Lead

### Approval Required For:
- Data rollback (Sanity content)
- Schema changes
- Multi-service rollback

---

## Testing the Rollback

### Rollback Drill (Monthly Recommended)

```bash
# 1. Deploy new version to staging
# 2. Document current state
# 3. Perform rollback using each method
# 4. Time each method
# 5. Verify application after each rollback
# 6. Update procedures based on findings
```

**Rollback Drill Log**:
```
Date: [Date]
Method: [Docker / Git / Env Vars / Traffic Routing]
Time Taken: [X] minutes
Downtime: [X] seconds
Issues: [List any issues]
Improvements: [List improvements needed]
```

---

## Emergency Contacts

- **Primary On-Call**: [Contact]
- **Backup On-Call**: [Contact]
- **DevOps Lead**: [Contact]
- **Hosting Support**: [Support Number/Link]
- **Sanity Support**: https://slack.sanity.io

---

## Quick Reference Commands

```bash
# Docker rollback
docker ps -a
docker stop alsoadaa && docker rm alsoadaa
docker run -d --name alsoadaa -p 80:80 yourusername/alsoadaa:previous

# Git rollback
git log --oneline
git revert <commit-hash>
git push origin main

# Check application status
curl -I https://yourdomain.com
docker logs alsoadaa --tail 100

# Check Sanity API
curl "https://wptd4h7v.api.sanity.io/v2024-01-01/data/query/production?query=*%5B_type%3D%3D%22product%22%5D%5B0%5D"

# Nginx reload
sudo nginx -t
sudo nginx -s reload
```

---

## Rollback History

Keep a log of all rollbacks:

| Date | Reason | Method Used | Downtime | Fixed By |
|------|--------|-------------|----------|----------|
| [Date] | [Reason] | [Method] | [Time] | [Name] |

---

**Last Updated**: [Date]  
**Last Tested**: [Date]  
**Next Drill**: [Date]
