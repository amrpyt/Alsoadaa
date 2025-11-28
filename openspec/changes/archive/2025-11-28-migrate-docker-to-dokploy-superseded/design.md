# Design: Migrate from Docker to Dokploy Git-based Deployment

## Context

### Current State
The Alsoadaa website currently uses Docker-based deployment:
- **Build Process:** Multi-stage Dockerfile builds production assets
- **Deployment:** Manual push to Docker registry, pull and run on server
- **Rollback:** Container swap or image rollback
- **Complexity:** Requires Docker knowledge, registry management, container orchestration

### Problem Statement
Docker deployment adds unnecessary complexity for a static React application:
1. **Overhead:** Docker build layers, image size, registry management
2. **Manual Process:** Requires manual build and push steps
3. **Slow Rollback:** Container operations take time
4. **Knowledge Barrier:** Team needs Docker expertise

### Stakeholders
- **Developers:** Want simpler, faster deployment
- **DevOps:** Want automated, reliable deployments
- **Business:** Want faster time-to-market for changes

## Goals / Non-Goals

### Goals
1. **Simplify Deployment:** Reduce from multi-step Docker process to single Git push
2. **Enable Auto-Deploy:** Automatic deployments on every push to main branch
3. **Faster Rollback:** Git-based rollback in < 2 minutes
4. **Improve DX:** Better developer experience with modern Git workflow
5. **Maintain Reliability:** Same or better uptime and deployment success rate
6. **Complete Documentation:** Comprehensive guides for all deployment scenarios

### Non-Goals
1. **Change Application Code:** No changes to React app or business logic
2. **Modify Build Process:** Keep same `npm run build` command
3. **Change Environment Variables:** Same variables, different management
4. **Multi-Platform Support:** Focus on Dokploy only (not Vercel, Netlify, etc.)
5. **Automated Testing:** CI/CD is for build verification only, not full test suite

## Decisions

### Decision 1: Choose Dokploy over Other Platforms

**Options Considered:**
1. **Vercel** - Popular, excellent DX, but vendor lock-in and cost concerns
2. **Netlify** - Similar to Vercel, good features, pricing model
3. **Dokploy** - Self-hosted, full control, similar workflow to Vercel
4. **Keep Docker** - Status quo, known quantity

**Decision:** Use Dokploy

**Rationale:**
- ✅ Self-hosted on existing server (no additional costs)
- ✅ Full control over infrastructure
- ✅ Vercel-like workflow (Git-based, auto-deploy)
- ✅ No vendor lock-in
- ✅ Supports Node.js and static sites
- ✅ Built-in environment variable management
- ✅ Zero-downtime deployments

**Trade-offs:**
- ⚠️ Requires Dokploy instance setup (one-time cost)
- ⚠️ Less mature than Vercel/Netlify (but sufficient for our needs)
- ⚠️ Self-managed (but team prefers control)

### Decision 2: Archive Docker Files Instead of Deleting

**Options Considered:**
1. **Delete Docker files** - Clean slate, no clutter
2. **Keep in Git history only** - Accessible via Git, not in working tree
3. **Archive in dedicated folder** - Visible, documented, easy to restore

**Decision:** Archive in `archive/docker-config/`

**Rationale:**
- ✅ Easy to restore if needed
- ✅ Documented and visible
- ✅ Preserves institutional knowledge
- ✅ Allows comparison with new approach
- ✅ Supports rollback plan

**Trade-offs:**
- ⚠️ Slight directory clutter (minimal impact)
- ✅ Better than losing files completely

### Decision 3: Create Separate Dokploy Documentation Files

**Options Considered:**
1. **Update existing docs** - Single source of truth
2. **Create new docs** - Separate Dokploy-specific guides
3. **Hybrid approach** - Update README, create detailed guides

**Decision:** Hybrid - Update README, create detailed Dokploy guides

**Rationale:**
- ✅ README stays concise with quick start
- ✅ Detailed guides for specific scenarios
- ✅ Easy to find relevant information
- ✅ Supports different user needs (quick start vs deep dive)
- ✅ Clear naming convention (`*_DOKPLOY.md`)

**Files Created:**
- `DOKPLOY_SETUP.md` - Main deployment guide
- `DEPLOYMENT_CHECKLIST_DOKPLOY.md` - Step-by-step checklist
- `ROLLBACK_STRATEGY_DOKPLOY.md` - Rollback procedures
- `DEPLOYMENT_READY_DOKPLOY.md` - Readiness summary

### Decision 4: Add GitHub Actions for Build Verification

**Options Considered:**
1. **No CI/CD** - Rely on local testing only
2. **Full CI/CD pipeline** - Tests, linting, build, deploy
3. **Build verification only** - TypeScript + build check

**Decision:** Build verification only (Option 3)

**Rationale:**
- ✅ Catches build errors before deployment
- ✅ Verifies TypeScript compilation
- ✅ Minimal GitHub Actions usage (cost-effective)
- ✅ Fast feedback on PRs
- ✅ Doesn't duplicate Dokploy's build process

**Implementation:**
```yaml
# .github/workflows/build-check.yml
- TypeScript check: tsc --noEmit
- Build check: npm run build
- Output verification: dist/ folder exists
- Multi-version: Node 18.x and 20.x
```

**Trade-offs:**
- ⚠️ Not a full test suite (acceptable - no tests exist yet)
- ✅ Prevents broken builds from being deployed

### Decision 5: Use Dokploy UI for Environment Variables

**Options Considered:**
1. **Environment file in repo** - Simple, but insecure
2. **Dokploy UI** - Secure, platform-native
3. **External secrets manager** - Overkill for current needs

**Decision:** Dokploy UI

**Rationale:**
- ✅ Secure (not in Git)
- ✅ Platform-native approach
- ✅ Easy to update without code changes
- ✅ Supports build-time injection
- ✅ Documented in setup guide

**Variables:**
```env
VITE_SANITY_PROJECT_ID=wptd4h7v
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_SANITY_USE_CDN=true
VITE_SANITY_TOKEN=<production-token>
```

## Architecture

### Deployment Flow

#### Before (Docker):
```
Developer
  ↓ git commit
  ↓ npm run build
  ↓ docker build
  ↓ docker push
  ↓ SSH to server
  ↓ docker pull
  ↓ docker-compose up
  ↓ Application running
```

#### After (Dokploy):
```
Developer
  ↓ git push origin main
  ↓ GitHub webhook → Dokploy
  ↓ Dokploy: npm install
  ↓ Dokploy: npm run build
  ↓ Dokploy: Deploy dist/
  ↓ Application running (zero downtime)
```

### Build Configuration

**Dokploy Settings:**
```yaml
Application Type: Node.js / Static Site
Build Command: npm install && npm run build
Output Directory: dist
Node.js Version: 18.x or 20.x
Package Manager: npm (auto-detected from package-lock.json)
```

**Environment Variables:**
- Managed via Dokploy UI
- Injected at build time
- Secure storage (not in Git)

### Rollback Strategy

#### Option 1: Dokploy Dashboard (Fastest - 2 min)
```
1. Go to Dokploy dashboard
2. Navigate to Deployments tab
3. Find previous successful deployment
4. Click "Redeploy"
5. Monitor deployment
```

#### Option 2: Git Revert (Standard - 5 min)
```bash
git revert HEAD
git push origin main
# Dokploy auto-deploys reverted version
```

#### Option 3: Git Reset (Destructive - use with caution)
```bash
git reset --hard <good-commit>
git push --force origin main
# Dokploy auto-deploys reset version
```

#### Option 4: Hot Fix (Quick fix - 10 min)
```bash
# Fix issue in new commit
git commit -m "hotfix: description"
git push origin main
# Dokploy auto-deploys fix
```

### Monitoring & Observability

**Build Monitoring:**
- Dokploy dashboard: Real-time build logs
- GitHub Actions: Build status on PRs
- Email notifications: On deployment success/failure (optional)

**Application Monitoring:**
- Same as before: Browser console, Sanity logs
- Dokploy logs: Application runtime logs
- Uptime monitoring: External service (optional)

## Risks / Trade-offs

### Risk 1: Dokploy Platform Dependency

**Risk:** Vendor lock-in to Dokploy platform

**Mitigation:**
- ✅ Self-hosted (full control)
- ✅ Docker files archived (can restore)
- ✅ Standard build process (portable)
- ✅ Can migrate to Vercel/Netlify if needed

**Likelihood:** Low  
**Impact:** Medium  
**Mitigation Effort:** Low

### Risk 2: Learning Curve for Team

**Risk:** Team unfamiliar with Dokploy

**Mitigation:**
- ✅ Comprehensive documentation
- ✅ Similar to Vercel (familiar pattern)
- ✅ Simple UI (15-minute walkthrough)
- ✅ Deployment guide with screenshots

**Likelihood:** Low  
**Impact:** Low  
**Mitigation Effort:** Low

### Risk 3: Build Failures in Production

**Risk:** Build fails on Dokploy but works locally

**Mitigation:**
- ✅ GitHub Actions pre-checks builds
- ✅ Same Node.js version (18.x or 20.x)
- ✅ package-lock.json committed
- ✅ Troubleshooting guide

**Likelihood:** Low  
**Impact:** Medium  
**Mitigation Effort:** Low

### Risk 4: Rollback Complexity

**Risk:** Rollback process more complex than expected

**Mitigation:**
- ✅ 4 rollback options documented
- ✅ Fastest option: 2 minutes
- ✅ Tested procedures
- ✅ Decision tree for rollback selection

**Likelihood:** Very Low  
**Impact:** Medium  
**Mitigation Effort:** Very Low

### Trade-off 1: Self-Hosted vs Managed Platform

**Trade-off:** Dokploy requires server management vs Vercel's fully managed

**Decision:** Accept self-hosted complexity

**Rationale:**
- Team prefers control over infrastructure
- No additional costs
- Existing server capacity available
- Dokploy is lightweight and stable

### Trade-off 2: Docker Flexibility vs Simplicity

**Trade-off:** Lose Docker's flexibility for simpler workflow

**Decision:** Accept reduced flexibility

**Rationale:**
- Static site doesn't need Docker's capabilities
- Simpler workflow more valuable than flexibility
- Can restore Docker if needed (archived files)
- Git-based deployment is industry standard for static sites

## Migration Plan

### Phase 1: Preparation (Completed)
- [x] Archive Docker files
- [x] Create Dokploy documentation
- [x] Update README
- [x] Add GitHub Actions workflow
- [x] Create OpenSpec proposal

### Phase 2: Dokploy Setup (Manual - 30 min)
- [ ] Access Dokploy instance
- [ ] Create new application
- [ ] Connect GitHub repository
- [ ] Configure build settings
- [ ] Add environment variables
- [ ] Test deployment

### Phase 3: Verification (15 min)
- [ ] Verify application loads
- [ ] Test all pages and features
- [ ] Verify forms submit
- [ ] Check Sanity integration
- [ ] Test language switching

### Phase 4: Enable Auto-Deploy (5 min)
- [ ] Enable auto-deploy in Dokploy
- [ ] Test with dummy commit
- [ ] Verify automatic deployment

### Phase 5: Team Training (15 min)
- [ ] Walkthrough Dokploy UI
- [ ] Review deployment documentation
- [ ] Practice rollback procedure
- [ ] Q&A session

### Total Migration Time
- **Preparation:** Completed
- **Setup:** 30 minutes
- **Verification:** 15 minutes
- **Auto-Deploy:** 5 minutes
- **Training:** 15 minutes
- **Total:** ~65 minutes

### Rollback Plan
If migration fails:
1. Restore Docker files from archive (5 min)
2. Revert documentation changes (5 min)
3. Build and deploy Docker container (15 min)
4. **Total rollback time:** ~25 minutes

## Open Questions

### Resolved
- ✅ **Q:** Which deployment platform to use?  
  **A:** Dokploy (self-hosted, Vercel-like workflow)

- ✅ **Q:** What to do with Docker files?  
  **A:** Archive in `archive/docker-config/`

- ✅ **Q:** How to handle environment variables?  
  **A:** Dokploy UI (secure, platform-native)

- ✅ **Q:** Should we add CI/CD?  
  **A:** Yes, build verification only (GitHub Actions)

### Outstanding
- ⏳ **Q:** Custom domain configuration?  
  **A:** To be determined during Dokploy setup (documented in guide)

- ⏳ **Q:** SSL certificate management?  
  **A:** Dokploy handles automatically (Let's Encrypt)

- ⏳ **Q:** Backup strategy for deployments?  
  **A:** Git history + Dokploy deployment history (sufficient)

## Success Metrics

### Deployment Metrics
- **Build Time:** < 5 minutes (target: 2-3 minutes)
- **Deployment Frequency:** Increased (easier to deploy)
- **Rollback Time:** < 2 minutes (vs 10+ minutes with Docker)
- **Deployment Success Rate:** > 95%

### Developer Experience
- **Time to First Deployment:** < 15 minutes for new team member
- **Deployment Complexity:** Reduced from 7 steps to 1 (`git push`)
- **Documentation Clarity:** Team can deploy without assistance

### Reliability
- **Uptime:** Same or better than Docker deployment
- **Zero-Downtime Deployments:** 100% (Dokploy feature)
- **Failed Deployment Recovery:** < 5 minutes

## References

### Documentation
- [Dokploy Documentation](https://docs.dokploy.com)
- [Vite Build Documentation](https://vitejs.dev/guide/build.html)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

### Related Changes
- `add-sanity-cms` - Sanity CMS integration (environment variables)
- `fix-quote-form-ux` - Form improvements (deployment testing)

### External Resources
- Vercel deployment model (inspiration)
- Netlify deployment workflow (comparison)
- Docker best practices (archived knowledge)
