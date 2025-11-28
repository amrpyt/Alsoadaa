# Tasks: Add Vercel Deployment

## 1. Initial Setup (DONE)
- [x] 1.1 Create Vercel project
- [x] 1.2 Connect GitHub repository (amrpyt/Alsoadaa)
- [x] 1.3 Configure build settings (Vite auto-detected)
- [x] 1.4 Deploy to production
- [x] 1.5 Verify site loads at https://alsoadaa.vercel.app
- [x] 1.6 Add vercel.json for SPA routing (fixed 404 on direct routes)
- [x] 1.7 Add .env.example with Sanity config documentation

## 2. Environment Variables (DONE)
- [x] 2.1 Add VITE_SANITY_PROJECT_ID=wptd4h7v in Vercel dashboard
- [x] 2.2 Add VITE_SANITY_DATASET=production in Vercel dashboard
- [x] 2.3 Add VITE_SANITY_TOKEN (if needed for form submissions)
- [x] 2.4 Redeploy after adding env vars
- [x] 2.5 Test Sanity content loads correctly

## 3. Domain Configuration (SKIPPED - will do later)
- [x] 3.1 Decide on custom domain - SKIPPED for now
- [ ] 3.2 Add custom domain in Vercel (if applicable)
- [ ] 3.3 Configure DNS records (if applicable)
- [ ] 3.4 Verify SSL certificate

## 4. Sanity CORS Setup (DONE - already configured)
- [x] 4.1 Login to Sanity dashboard
- [x] 4.2 Go to API → CORS Origins
- [x] 4.3 Add https://alsoadaa.vercel.app
- [x] 4.4 Enable "Allow credentials"
- [x] 4.5 Test API requests work

## 5. Production Verification
- [x] 5.1 Test homepage loads
- [x] 5.2 Test all navigation links
- [x] 5.3 Test products load from Sanity
- [x] 5.4 Test language switching (AR/EN/RU)
- [x] 5.5 Test quote request form
- [x] 5.6 Test contact form
- [x] 5.7 Check browser console for errors
- [x] 5.8 Test on mobile devices

## 6. Performance Check (SKIPPED - can do later)
- [ ] 6.1 Run Lighthouse audit
- [ ] 6.2 Check Core Web Vitals
- [x] 6.3 Verify images load from Sanity CDN
- [x] 6.4 Check load time < 3s

## 7. Documentation Update (DONE)
- [x] 7.1 Update README with Vercel deployment info
- [x] 7.2 Remove/archive Docker documentation
- [x] 7.3 Add Vercel environment variables guide
- [x] 7.4 Document rollback procedure

## 8. Final Verification
- [x] 8.1 Test auto-deploy on push (working)
- [x] 8.2 Test rollback from Vercel dashboard (documented)
- [x] 8.3 Confirm team access to Vercel project
- [ ] 8.4 Archive this OpenSpec change
