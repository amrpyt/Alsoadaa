# Change: Setup Dokploy Deployment via GitHub

## Why

The current deployment documentation assumes Docker-based deployment. However, the target deployment platform is Dokploy with GitHub integration (similar to Vercel's Git-based deployment workflow). This requires different configuration and deployment procedures that don't rely on Docker containers.

Dokploy provides:
- Automatic deployments from GitHub commits/pushes
- Built-in environment variable management
- Zero-downtime deployments
- Simple rollback via Git commits
- No Docker knowledge required for deployment

## What Changes

- Remove Docker-specific deployment documentation and configuration
- Add Dokploy-specific deployment configuration
- Create GitHub Actions workflow (optional) for build verification
- Update deployment checklist for Dokploy platform
- Add Dokploy environment variable configuration guide
- Configure build commands for Dokploy (npm-based, not Docker)
- Update rollback strategy for Git-based deployments

## Impact

- **Affected specs**: New deployment capability (no existing specs to modify)
- **Affected code**:
  - Remove/archive: `Dockerfile`, `docker-compose.yml`, `docker-compose.prod.yml`, `docker-build-amd64.sh`, `docker-push.sh`, `deploy.sh`
  - Update: `DEPLOYMENT_CHECKLIST.md`, `ROLLBACK_STRATEGY.md`
  - Add: `dokploy.json` (Dokploy configuration), `.github/workflows/build-check.yml` (optional CI)
  - Update: `README.md` with Dokploy deployment instructions
- **Dependencies**: No new dependencies required
- **Environment**: Same Sanity environment variables, managed via Dokploy UI
- **Breaking changes**: None - only changes deployment process, not application code
