# Change: Migrate from Docker to Dokploy Git-based Deployment

## Why

The current deployment strategy uses Docker containers with manual build and deployment processes. This approach requires:
- Docker knowledge and infrastructure
- Manual container builds and pushes
- Complex rollback procedures
- Separate deployment scripts and configurations

**Problem:** The deployment process is more complex than necessary for a static React application. Modern platforms like Dokploy (similar to Vercel) offer Git-based deployment that is:
- Simpler to set up and maintain
- Automatic on every Git push
- Faster to deploy (no Docker build overhead)
- Easier to rollback (Git-based)
- More developer-friendly

**Opportunity:** Migrating to Dokploy Git-based deployment will:
- Reduce deployment complexity
- Enable automatic deployments from GitHub
- Improve developer experience
- Simplify rollback procedures
- Eliminate Docker dependencies for deployment

## What Changes

### Infrastructure Changes
- **Remove Docker deployment infrastructure:**
  - Archive `Dockerfile`, `docker-compose.yml`, `docker-compose.prod.yml`
  - Archive Docker build scripts: `docker-build-amd64.sh`, `docker-push.sh`, `deploy.sh`
  - Archive `nginx.conf` (Dokploy handles static file serving)

- **Add Dokploy configuration:**
  - Build command: `npm install && npm run build`
  - Output directory: `dist/`
  - Node.js version: 18.x or 20.x LTS
  - Environment variables managed via Dokploy UI

### Documentation Changes
- **Create new Dokploy-specific documentation:**
  - `DOKPLOY_SETUP.md` - Complete deployment guide
  - `DEPLOYMENT_CHECKLIST_DOKPLOY.md` - Pre/post-deployment checklist
  - `ROLLBACK_STRATEGY_DOKPLOY.md` - Git-based rollback procedures
  - `DEPLOYMENT_READY_DOKPLOY.md` - Deployment readiness summary

- **Update existing documentation:**
  - `README.md` - Replace Docker instructions with Dokploy
  - Update project structure documentation
  - Add deployment workflow section

- **Archive old documentation:**
  - Keep old Docker docs for reference
  - Maintain Docker files in `archive/docker-config/`

### CI/CD Changes
- **Add GitHub Actions workflow:**
  - `.github/workflows/build-check.yml`
  - Automatic build verification on PRs and pushes
  - TypeScript compilation check
  - Build output verification
  - Multi-version Node.js testing (18.x, 20.x)

### Deployment Workflow Changes
- **From:** Manual Docker build → Push to registry → Deploy container
- **To:** Git push → Automatic Dokploy build → Deploy static files

### Configuration Changes
- **Environment Variables:**
  - Same variables, different management method
  - Moved from Docker build args to Dokploy UI
  - Build-time injection for Vite environment variables

## Impact

### Affected Specs
- **New capability:** `deployment` - Git-based deployment workflow
  - Requirements for build configuration
  - Requirements for deployment automation
  - Requirements for rollback procedures
  - Requirements for environment variable management

### Affected Code
- **Removed:**
  - `Dockerfile` (moved to archive)
  - `docker-compose.yml` (moved to archive)
  - `docker-compose.prod.yml` (moved to archive)
  - `docker-build-amd64.sh` (moved to archive)
  - `docker-push.sh` (moved to archive)
  - `deploy.sh` (moved to archive)
  - `nginx.conf` (moved to archive)

- **Added:**
  - `.github/workflows/build-check.yml` - CI/CD automation
  - `DOKPLOY_SETUP.md` - Deployment guide
  - `DEPLOYMENT_CHECKLIST_DOKPLOY.md` - Deployment checklist
  - `ROLLBACK_STRATEGY_DOKPLOY.md` - Rollback guide
  - `DEPLOYMENT_READY_DOKPLOY.md` - Readiness summary
  - `archive/docker-config/` - Archived Docker files

- **Modified:**
  - `README.md` - Updated deployment section
  - `openspec/project.md` - Updated deployment constraints

### Dependencies
- **No new npm dependencies** - Uses existing build tools
- **Platform dependency:** Requires Dokploy instance with:
  - Node.js support (18.x or 20.x)
  - GitHub integration
  - Static file serving capability
  - Environment variable management

### Environment
- **Development:** No changes - same local development workflow
- **Build:** Same build command (`npm run build`)
- **Production:** Different deployment platform (Dokploy vs Docker)

### Breaking Changes
- **BREAKING:** Docker-based deployment no longer supported
  - **Migration Path:** Follow `DOKPLOY_SETUP.md` to set up Dokploy
  - **Rollback:** Docker files archived in `archive/docker-config/`
  - **Timeline:** Immediate - new deployments use Dokploy only

### Deployment Process
- **Before:** 
  1. Build Docker image locally
  2. Push to Docker registry
  3. Pull and run on server
  4. Manual rollback via container swap

- **After:**
  1. Push to GitHub
  2. Dokploy auto-builds and deploys
  3. Zero-downtime deployment
  4. Git-based rollback (2 minutes)

### Performance Impact
- **Build Time:** Faster (no Docker layer caching overhead)
- **Deployment Time:** Similar or faster
- **Rollback Time:** Much faster (Git revert vs container operations)

### Security Considerations
- **Environment Variables:** Same security level, different storage
- **Build Process:** More transparent (GitHub Actions logs)
- **Access Control:** Managed via Dokploy and GitHub permissions

### Monitoring & Observability
- **Build Logs:** Available in Dokploy dashboard
- **Deployment Status:** Real-time in Dokploy UI
- **GitHub Actions:** Build verification status on PRs
- **Application Logs:** Same as before (browser console, Sanity logs)

### Cost Implications
- **Reduced:** No Docker registry costs
- **Same:** Hosting costs (Dokploy on existing server)
- **Added:** GitHub Actions minutes (minimal for build checks)

### Team Impact
- **Required Knowledge:**
  - Git basics (already required)
  - Dokploy UI navigation (simple, documented)
  - No Docker knowledge needed

- **Training Needed:**
  - 15-minute walkthrough of Dokploy UI
  - Review of new deployment documentation

### Rollback Plan
If Dokploy deployment fails or is unsuitable:
1. Restore Docker files from `archive/docker-config/`
2. Revert documentation changes
3. Resume Docker-based deployment
4. Estimated time: 30 minutes

### Success Criteria
- ✅ Application deploys successfully via Dokploy
- ✅ Auto-deploy triggers on Git push
- ✅ Build time < 5 minutes
- ✅ Rollback works within 2 minutes
- ✅ All documentation complete and accurate
- ✅ Team can deploy without assistance
