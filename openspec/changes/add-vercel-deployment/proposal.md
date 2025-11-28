# Change: Add Vercel Deployment

## Why

Moved from Docker-based deployment to Vercel for simpler, faster deployments with:
- Auto-deploy on Git push
- Zero-config for Vite apps
- Built-in CDN and SSL
- Easy rollback via dashboard

## What Changes

- **Deployment Platform:** Docker → Vercel
- **URL:** https://alsoadaa.vercel.app
- **Auto-deploy:** Enabled on `main` branch
- **Framework:** Vite (auto-detected)
- **Node:** 22.x

### Completed
- [x] Vercel project created
- [x] GitHub repo connected
- [x] Production deployment live
- [x] Docker files archived

### Pending
- [ ] Custom domain setup (if needed)
- [ ] Environment variables verification
- [ ] Sanity CORS configuration
- [ ] Performance optimization
- [ ] Documentation update

## Impact

- **Affected specs:** `deployment` (new capability)
- **Breaking:** Docker deployment no longer used
- **Supersedes:** `migrate-docker-to-dokploy` (archived)
