# Deployment Checklist - Alsoadaa with Sanity CMS

## Pre-Deployment Checklist

### 1. Environment Variables
- [ ] Verify all Sanity environment variables are set in deployment platform:
  - `VITE_SANITY_PROJECT_ID` = `wptd4h7v`
  - `VITE_SANITY_DATASET` = `production`
  - `VITE_SANITY_API_VERSION` = `2024-01-01`
  - `VITE_SANITY_USE_CDN` = `true` (production only)
  - `VITE_SANITY_TOKEN` = Your production token

- [ ] Ensure environment variables are properly formatted (no quotes, trailing spaces, etc.)
- [ ] Test environment variables locally with production values

### 2. Sanity Configuration
- [ ] Verify Sanity project exists and is accessible
- [ ] Check dataset contains published content (not just drafts)
- [ ] Confirm all schemas are deployed to Sanity:
  - `product`
  - `page`
  - `service`
  - `calendarEvent`
  - `formSubmission`

- [ ] Verify content is properly migrated:
  - [ ] Products in all languages (ar, en, ru)
  - [ ] Pages translated
  - [ ] Services available
  - [ ] Calendar events created

### 3. CORS Configuration
- [ ] Add production domain to Sanity CORS settings:
  1. Go to https://www.sanity.io/manage
  2. Select project `wptd4h7v`
  3. Navigate to Settings → API → CORS Origins
  4. Add production URL (e.g., `https://alsoadaa.com`)
  5. Save changes

- [ ] Test CORS from production domain (use browser network tab)

### 4. Sanity Studio Deployment
- [ ] Deploy Sanity Studio separately:
  ```bash
  cd studio
  npm run build
  npm run deploy
  ```

- [ ] Verify Studio is accessible at deployed URL
- [ ] Test Studio login and content editing
- [ ] Confirm Studio can create/edit/publish documents

### 5. Code Quality
- [ ] All tests pass locally:
  ```bash
  npm run build
  npm run preview
  ```

- [ ] No TypeScript errors:
  ```bash
  npm run build
  ```

- [ ] Linter passes (if configured):
  ```bash
  npm run lint
  ```

- [ ] Code reviewed and approved

### 6. Docker Configuration (if using Docker)
- [ ] Update docker-compose.prod.yml with environment variables
- [ ] Test Docker build locally:
  ```bash
  docker build \
    --build-arg VITE_SANITY_PROJECT_ID=wptd4h7v \
    --build-arg VITE_SANITY_DATASET=production \
    --build-arg VITE_SANITY_API_VERSION=2024-01-01 \
    --build-arg VITE_SANITY_USE_CDN=true \
    --build-arg VITE_SANITY_TOKEN=your-token \
    -t alsoadaa:latest .
  ```

- [ ] Test Docker container locally:
  ```bash
  docker run -p 8080:80 alsoadaa:latest
  # Visit http://localhost:8080
  ```

- [ ] Verify nginx.conf is correct
- [ ] Confirm all routes work (SPA fallback configured)

### 7. Data Verification
- [ ] Verify products load in all languages
- [ ] Check calendar data displays correctly
- [ ] Test form submissions work
- [ ] Confirm images load from Sanity CDN
- [ ] Validate language switching works

### 8. Performance
- [ ] Run Lighthouse audit (target: >80 performance score)
- [ ] Check image optimization (WebP/AVIF formats)
- [ ] Verify CDN is enabled (`useCdn: true` in production)
- [ ] Test initial load time (target: <2s)

### 9. Security
- [ ] Sanity token has appropriate permissions (not admin token in frontend)
- [ ] No sensitive data in client-side code
- [ ] HTTPS enabled on production domain
- [ ] Security headers configured in nginx

---

## Deployment Steps

### Option A: Docker Deployment (Dokploy/Docker Hub)

#### 1. Build Docker Image
```bash
# Build multi-platform image
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --build-arg VITE_SANITY_PROJECT_ID=wptd4h7v \
  --build-arg VITE_SANITY_DATASET=production \
  --build-arg VITE_SANITY_API_VERSION=2024-01-01 \
  --build-arg VITE_SANITY_USE_CDN=true \
  --build-arg VITE_SANITY_TOKEN=your-token \
  -t yourusername/alsoadaa:latest \
  --push .
```

#### 2. Deploy to Server
```bash
# SSH into server
ssh user@your-server.com

# Pull latest image
docker pull yourusername/alsoadaa:latest

# Stop existing container
docker stop alsoadaa
docker rm alsoadaa

# Run new container
docker run -d \
  --name alsoadaa \
  -p 80:80 \
  --restart unless-stopped \
  yourusername/alsoadaa:latest
```

#### 3. Verify Deployment
- [ ] Check container is running: `docker ps`
- [ ] View logs: `docker logs alsoadaa`
- [ ] Test application at production URL

### Option B: Direct Server Deployment

#### 1. Build Application
```bash
# On local machine or CI/CD
npm install
npm run build
```

#### 2. Upload Build
```bash
# Upload dist folder to server
scp -r dist/* user@server:/var/www/alsoadaa/
```

#### 3. Configure Web Server
- [ ] Update nginx/apache configuration
- [ ] Restart web server
- [ ] Test configuration

---

## Post-Deployment Verification

### Immediate Checks (Within 5 minutes)
- [ ] Application loads at production URL
- [ ] No console errors in browser
- [ ] Products display in default language (Arabic)
- [ ] Language switcher works (test all 3 languages)
- [ ] Images load from Sanity CDN
- [ ] Navigation works (all pages accessible)
- [ ] Forms are accessible (quote request, contact)

### Functional Tests (Within 30 minutes)
- [ ] Submit test quote request
- [ ] Verify submission appears in Sanity Studio
- [ ] Test product filtering (by category, season)
- [ ] Check calendar displays correctly
- [ ] Test product detail pages
- [ ] Verify RTL/LTR switching (Arabic vs English/Russian)
- [ ] Test on mobile device
- [ ] Check responsive design

### Performance Tests (Within 1 hour)
- [ ] Run Lighthouse audit
- [ ] Check Time to First Byte (TTFB)
- [ ] Monitor image loading performance
- [ ] Verify CDN is serving images
- [ ] Check bundle size (should be <1MB for main bundle)

### Browser Compatibility (Within 2 hours)
- [ ] Test on Chrome (latest)
- [ ] Test on Firefox (latest)
- [ ] Test on Safari (latest)
- [ ] Test on Edge (latest)
- [ ] Test on mobile browsers (iOS Safari, Chrome Android)

### Data Integrity (Within 24 hours)
- [ ] All products visible in all languages
- [ ] Calendar events accurate
- [ ] Form submissions working
- [ ] No data loss from migration
- [ ] Images displaying correctly

---

## Monitoring Setup

### Error Tracking
- [ ] Set up error monitoring (Sentry, LogRocket, etc.)
- [ ] Configure error alerts
- [ ] Test error reporting

### Analytics
- [ ] Set up Google Analytics / Plausible / similar
- [ ] Configure conversion tracking for form submissions
- [ ] Test analytics events

### Performance Monitoring
- [ ] Set up performance monitoring (Web Vitals)
- [ ] Configure alerts for slow pages
- [ ] Monitor Sanity API usage

### Sanity Monitoring
- [ ] Check Sanity dashboard for usage stats
- [ ] Monitor API request count
- [ ] Track asset storage usage
- [ ] Set up alerts for approaching limits

---

## Rollback Triggers

Roll back if any of these occur:
- Application fails to load
- Console shows critical errors
- Forms don't submit
- Images fail to load
- Data is missing or corrupted
- Performance degrades significantly (>5s load time)
- Browser crashes or freezes

See [ROLLBACK_STRATEGY.md](./ROLLBACK_STRATEGY.md) for detailed rollback procedures.

---

## Communication Plan

### Before Deployment
- [ ] Notify team of deployment window
- [ ] Schedule deployment during low-traffic period
- [ ] Prepare rollback plan
- [ ] Assign roles (deployer, tester, monitor)

### During Deployment
- [ ] Update team in real-time
- [ ] Monitor error rates
- [ ] Track deployment progress

### After Deployment
- [ ] Announce successful deployment
- [ ] Share verification results
- [ ] Document any issues encountered
- [ ] Gather feedback from team

---

## Sign-off

### Pre-Deployment Sign-off
- [ ] Developer: Code reviewed and tested
- [ ] DevOps: Infrastructure ready
- [ ] Content: Sanity data verified
- [ ] Project Manager: Approved to deploy

### Post-Deployment Sign-off
- [ ] Developer: Application working as expected
- [ ] QA: All tests passed
- [ ] Content: Can edit content in Studio
- [ ] Project Manager: Deployment successful

---

## Notes

- **Deployment Time**: Estimated 30-60 minutes
- **Rollback Time**: Estimated 5-10 minutes
- **Testing Time**: Estimated 1-2 hours
- **Total Downtime**: 0 (zero-downtime deployment)

## Useful Commands

```bash
# Check deployed version
curl https://yourdomain.com

# Check Docker container logs
docker logs -f alsoadaa

# Restart container
docker restart alsoadaa

# View Sanity API usage
# Visit: https://www.sanity.io/manage/personal/project/wptd4h7v

# Test Sanity connection
curl "https://wptd4h7v.api.sanity.io/v2024-01-01/data/query/production?query=*%5B_type%20%3D%3D%20%22product%22%5D%5B0%5D"
```

---

## Emergency Contacts

- **Developer**: [Your contact info]
- **DevOps**: [DevOps contact]
- **Sanity Support**: https://slack.sanity.io
- **Hosting Support**: [Hosting provider support]

---

**Last Updated**: [Date]
**Next Review**: [Date]
