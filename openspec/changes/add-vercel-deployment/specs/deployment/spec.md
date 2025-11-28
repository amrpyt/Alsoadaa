## ADDED Requirements

### Requirement: Vercel Deployment
The application SHALL be deployed to Vercel with automatic deployments on Git push.

#### Scenario: Production deployment
- **WHEN** code is pushed to `main` branch
- **THEN** Vercel automatically builds and deploys the application
- **AND** the site is accessible at https://alsoadaa.vercel.app

#### Scenario: Build configuration
- **WHEN** Vercel builds the application
- **THEN** it uses Vite framework detection
- **AND** runs `npm run build`
- **AND** outputs to `dist/` directory

### Requirement: Environment Variables
The application SHALL use Vercel environment variables for Sanity configuration.

#### Scenario: Sanity connection
- **WHEN** the application loads in production
- **THEN** it connects to Sanity using VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET
- **AND** content loads correctly

### Requirement: Rollback Capability
The deployment SHALL support quick rollback to previous versions.

#### Scenario: Dashboard rollback
- **WHEN** a deployment has issues
- **THEN** operators can rollback via Vercel dashboard
- **AND** previous version is restored within 2 minutes

### Requirement: Auto-Deploy
The deployment SHALL automatically trigger on Git pushes to main branch.

#### Scenario: Push triggers deploy
- **WHEN** a commit is pushed to `main`
- **THEN** Vercel detects the change
- **AND** starts a new deployment automatically
