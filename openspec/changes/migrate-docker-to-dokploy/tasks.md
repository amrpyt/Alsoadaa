# Implementation Tasks

## 1. Archive Docker Infrastructure
- [x] 1.1 Create `archive/docker-config/` directory
- [x] 1.2 Move `Dockerfile` to archive
- [x] 1.3 Move `docker-compose.yml` to archive
- [x] 1.4 Move `docker-compose.prod.yml` to archive
- [x] 1.5 Move `docker-build-amd64.sh` to archive
- [x] 1.6 Move `docker-push.sh` to archive
- [x] 1.7 Move `deploy.sh` to archive
- [x] 1.8 Move `nginx.conf` to archive (if exists)
- [x] 1.9 Commit archived files with clear message

## 2. Create Dokploy Setup Documentation
- [x] 2.1 Create `DOKPLOY_SETUP.md` with complete guide
- [x] 2.2 Document prerequisites (Dokploy instance, GitHub access)
- [x] 2.3 Document step-by-step deployment setup
- [x] 2.4 Document build configuration (commands, output dir, Node version)
- [x] 2.5 Document environment variable setup
- [x] 2.6 Document domain configuration (custom domain and subdomain)
- [x] 2.7 Document auto-deploy enablement
- [x] 2.8 Add post-deployment verification checklist
- [x] 2.9 Add troubleshooting section with common issues
- [x] 2.10 Add rollback procedures overview

## 3. Create Deployment Checklist
- [x] 3.1 Create `DEPLOYMENT_CHECKLIST_DOKPLOY.md`
- [x] 3.2 Add pre-deployment checklist (code, env vars, Sanity)
- [x] 3.3 Add deployment steps (push, configure, deploy)
- [x] 3.4 Add post-deployment verification (immediate, functional, performance)
- [x] 3.5 Add browser testing checklist
- [x] 3.6 Add mobile responsiveness checks
- [x] 3.7 Add monitoring setup steps
- [x] 3.8 Add rollback triggers and criteria
- [x] 3.9 Add success criteria definition
- [x] 3.10 Add post-deployment tasks timeline

## 4. Create Rollback Strategy Documentation
- [x] 4.1 Create `ROLLBACK_STRATEGY_DOKPLOY.md`
- [x] 4.2 Add rollback decision tree
- [x] 4.3 Document Option 1: Dokploy dashboard rollback (2 min)
- [x] 4.4 Document Option 2: Git revert rollback (5 min)
- [x] 4.5 Document Option 3: Git reset rollback (destructive, with warnings)
- [x] 4.6 Document Option 4: Hot fix deployment (10 min)
- [x] 4.7 Add environment variable rollback procedures
- [x] 4.8 Add Sanity data rollback considerations
- [x] 4.9 Add communication templates for rollback
- [x] 4.10 Add post-rollback checklist
- [x] 4.11 Add rollback testing recommendations
- [x] 4.12 Add rollback authority matrix

## 5. Update README Documentation
- [x] 5.1 Update features list (replace Docker with Dokploy)
- [x] 5.2 Replace Docker deployment section with Dokploy
- [x] 5.3 Add Dokploy quick start guide
- [x] 5.4 Update project structure (remove Docker files, add GitHub Actions)
- [x] 5.5 Add deployment documentation section with links
- [x] 5.6 Add environment variables reference
- [x] 5.7 Update build commands section
- [x] 5.8 Ensure all links work correctly

## 6. Create GitHub Actions Workflow
- [x] 6.1 Create `.github/workflows/` directory
- [x] 6.2 Create `build-check.yml` workflow file
- [x] 6.3 Configure triggers (pull_request, push on main and deployment branches)
- [x] 6.4 Add Node.js setup step (versions 18.x and 20.x matrix)
- [x] 6.5 Add npm install step with caching
- [x] 6.6 Add TypeScript compilation check (`tsc --noEmit`)
- [x] 6.7 Add build step (`npm run build`)
- [x] 6.8 Add build output verification (check dist/ exists)
- [x] 6.9 Add build artifact upload (optional, 7-day retention)
- [x] 6.10 Test workflow on next push

## 7. Create Deployment Readiness Summary
- [x] 7.1 Create `DEPLOYMENT_READY_DOKPLOY.md`
- [x] 7.2 Add summary of changes made
- [x] 7.3 Add next steps for deployment
- [x] 7.4 Add documentation files reference
- [x] 7.5 Add build configuration summary
- [x] 7.6 Add deployment workflow diagram
- [x] 7.7 Add verification checklist
- [x] 7.8 Add advantages comparison (Dokploy vs Docker)
- [x] 7.9 Add commits summary
- [x] 7.10 Add ready status confirmation

## 8. Update Project Configuration Documentation
- [ ] 8.1 Update `openspec/project.md` deployment section
- [ ] 8.2 Replace Docker deployment constraints with Dokploy
- [ ] 8.3 Update deployment infrastructure description
- [ ] 8.4 Update external dependencies section
- [ ] 8.5 Add Dokploy to production infrastructure

## 9. Create OpenSpec Proposal
- [x] 9.1 Create `openspec/changes/migrate-docker-to-dokploy/` directory
- [x] 9.2 Create `proposal.md` with complete change description
- [x] 9.3 Create `design.md` with architectural decisions
- [x] 9.4 Create `specs/deployment/spec.md` with requirements
- [x] 9.5 Create `tasks.md` with implementation checklist
- [x] 9.6 Validate proposal with `openspec validate`
- [ ] 9.7 Request approval before implementation

## 10. Verify Local Build
- [x] 10.1 Run `npm install` to ensure dependencies are current
- [x] 10.2 Run `npm run build` to verify build succeeds
- [x] 10.3 Check `dist/` directory is created
- [x] 10.4 Verify `dist/index.html` exists
- [x] 10.5 Run `npm run preview` to test production build
- [x] 10.6 Verify application loads at localhost:4173
- [x] 10.7 Test all pages and features locally
- [x] 10.8 Document any build issues or optimizations needed

## 11. Prepare for Dokploy Deployment (Manual Steps)
- [ ] 11.1 Ensure Dokploy instance is accessible
- [ ] 11.2 Verify GitHub repository access from Dokploy
- [ ] 11.3 Prepare Sanity production token
- [ ] 11.4 Prepare list of environment variables
- [ ] 11.5 Decide on custom domain (if applicable)
- [ ] 11.6 Review deployment checklist
- [ ] 11.7 Schedule deployment window
- [ ] 11.8 Notify team of upcoming deployment

## 12. Execute Dokploy Setup (Manual Steps)
- [ ] 12.1 Login to Dokploy dashboard
- [ ] 12.2 Create new application
- [ ] 12.3 Connect GitHub repository
- [ ] 12.4 Configure build settings (command, output, Node version)
- [ ] 12.5 Add all environment variables
- [ ] 12.6 Configure domain (if applicable)
- [ ] 12.7 Trigger first deployment
- [ ] 12.8 Monitor build logs
- [ ] 12.9 Verify deployment success

## 13. Post-Deployment Verification (Manual Steps)
- [ ] 13.1 Access deployed application URL
- [ ] 13.2 Verify homepage loads without errors
- [ ] 13.3 Test all navigation links
- [ ] 13.4 Verify products load from Sanity
- [ ] 13.5 Test language switching (Arabic, English, Russian)
- [ ] 13.6 Test forms (quote request, contact)
- [ ] 13.7 Verify images load from Sanity CDN
- [ ] 13.8 Check browser console for errors
- [ ] 13.9 Test on mobile devices
- [ ] 13.10 Verify performance (< 3s load time)

## 14. Configure Sanity CORS (Manual Steps)
- [ ] 14.1 Login to Sanity dashboard
- [ ] 14.2 Navigate to project settings
- [ ] 14.3 Go to API → CORS Origins
- [ ] 14.4 Add Dokploy deployment URL
- [ ] 14.5 Enable "Allow credentials"
- [ ] 14.6 Save CORS configuration
- [ ] 14.7 Test API requests from deployed app
- [ ] 14.8 Verify no CORS errors in console

## 15. Enable Auto-Deploy (Manual Steps)
- [ ] 15.1 Go to Dokploy deployment settings
- [ ] 15.2 Enable "Auto Deploy on Push"
- [ ] 15.3 Select main branch as trigger
- [ ] 15.4 Save configuration
- [ ] 15.5 Test with dummy commit
- [ ] 15.6 Verify automatic deployment triggers
- [ ] 15.7 Monitor auto-deployment completion
- [ ] 15.8 Document auto-deploy status

## 16. Test Rollback Procedures (Manual Steps)
- [ ] 16.1 Create test deployment to rollback from
- [ ] 16.2 Test Option 1: Dashboard rollback
- [ ] 16.3 Time the rollback process
- [ ] 16.4 Verify application after rollback
- [ ] 16.5 Test Option 2: Git revert rollback
- [ ] 16.6 Verify automatic redeployment
- [ ] 16.7 Document rollback timings
- [ ] 16.8 Update rollback documentation if needed

## 17. Team Training (Manual Steps)
- [ ] 17.1 Schedule training session
- [ ] 17.2 Walkthrough Dokploy UI
- [ ] 17.3 Demonstrate deployment process
- [ ] 17.4 Practice rollback procedure
- [ ] 17.5 Review documentation together
- [ ] 17.6 Answer questions
- [ ] 17.7 Share access credentials
- [ ] 17.8 Document training completion

## 18. Monitoring Setup (Manual Steps)
- [ ] 18.1 Set up deployment notifications (email/Slack)
- [ ] 18.2 Configure build failure alerts
- [ ] 18.3 Set up uptime monitoring (optional)
- [ ] 18.4 Configure error tracking (optional)
- [ ] 18.5 Document monitoring access
- [ ] 18.6 Test notification delivery
- [ ] 18.7 Create monitoring dashboard (optional)
- [ ] 18.8 Share monitoring access with team

## 19. Documentation Review and Finalization
- [ ] 19.1 Review all created documentation for accuracy
- [ ] 19.2 Test all documentation links
- [ ] 19.3 Verify code examples work
- [ ] 19.4 Check for typos and formatting issues
- [ ] 19.5 Ensure consistency across all docs
- [ ] 19.6 Add table of contents where needed
- [ ] 19.7 Update last modified dates
- [ ] 19.8 Get documentation peer review

## 20. Archive Old Documentation (Manual Steps)
- [ ] 20.1 Identify old Docker-specific documentation
- [ ] 20.2 Move old docs to archive or add deprecation notice
- [ ] 20.3 Update links pointing to old docs
- [ ] 20.4 Add migration guide from old to new process
- [ ] 20.5 Keep old docs accessible for reference
- [ ] 20.6 Document what was archived and why

## 21. Final Validation and Sign-off
- [ ] 21.1 Verify all tasks completed
- [ ] 21.2 Confirm deployment is stable
- [ ] 21.3 Verify team can deploy independently
- [ ] 21.4 Check all success criteria met
- [ ] 21.5 Document any outstanding issues
- [ ] 21.6 Create post-implementation review
- [ ] 21.7 Get stakeholder sign-off
- [ ] 21.8 Archive this OpenSpec change

## Task Dependencies

### Parallel Tasks (Can be done simultaneously)
- Tasks 2, 3, 4 (Documentation creation)
- Tasks 5, 6, 7 (README, GitHub Actions, Summary)

### Sequential Dependencies
- Task 1 must complete before Task 9 (need archived files for proposal)
- Tasks 2-7 must complete before Task 11 (need docs for deployment)
- Task 12 must complete before Tasks 13-15 (need deployment to verify)
- Task 13 must complete before Task 14 (verify app before CORS config)
- Task 15 should complete before Task 16 (test auto-deploy before rollback)

### Critical Path
1. Archive Docker files (Task 1)
2. Create documentation (Tasks 2-7)
3. Prepare for deployment (Task 11)
4. Execute deployment (Task 12)
5. Verify deployment (Task 13)
6. Configure CORS (Task 14)
7. Enable auto-deploy (Task 15)

### Estimated Timeline
- **Preparation (Tasks 1-10):** Completed
- **Deployment Setup (Tasks 11-12):** 30-45 minutes
- **Verification (Tasks 13-14):** 15-20 minutes
- **Auto-Deploy (Task 15):** 5-10 minutes
- **Testing (Task 16):** 15-20 minutes
- **Training (Task 17):** 15-30 minutes
- **Monitoring (Task 18):** 30-60 minutes
- **Finalization (Tasks 19-21):** 30-45 minutes

**Total Estimated Time:** 2.5-4 hours (excluding preparation)

## Validation Checklist

### Code Quality
- [x] TypeScript compilation passes
- [x] Build succeeds locally
- [x] No console errors in development
- [x] All imports resolve correctly

### Documentation Quality
- [x] All documentation files created
- [x] Documentation is comprehensive
- [x] Examples are accurate
- [x] Links work correctly

### Deployment Readiness
- [ ] Dokploy instance accessible
- [ ] GitHub repository connected
- [ ] Environment variables prepared
- [ ] Team trained on new process

### Success Criteria
- [ ] Application deploys successfully
- [ ] Auto-deploy works
- [ ] Rollback procedures tested
- [ ] Team can deploy independently
- [ ] Documentation complete and accurate
