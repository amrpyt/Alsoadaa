# Tasks: Add Vercel Deployment

## 1. Initial Setup (DONE)
- [x] 1.1 Create Vercel project
- [x] 1.2 Connect GitHub repository (amrpyt/Alsoadaa)
- [x] 1.3 Configure build settings (Vite auto-detected)
- [x] 1.4 Deploy to production
- [x] 1.5 Verify site loads at https://alsoadaa.vercel.app
- [x] 1.6 Add vercel.json for SPA routing (fixed 404 on direct routes)
- [x] 1.7 Add .env.example with Sanity config documentation

## 2. Environment Variables
- [ ] 2.1 Add VITE_SANITY_PROJECT_ID=wptd4h7v in Vercel dashboard
- [ ] 2.2 Add VITE_SANITY_DATASET=production in Vercel dashboard
- [ ] 2.3 Add VITE_SANITY_TOKEN (if needed for form submissions)
- [ ] 2.4 Redeploy after adding env vars
- [ ] 2.5 Test Sanity content loads correctly

## 3. Domain Configuration
- [ ] 3.1 Decide on custom domain (optional)
- [ ] 3.2 Add custom domain in Vercel (if applicable)
- [ ] 3.3 Configure DNS records (if applicable)
- [ ] 3.4 Verify SSL certificate

## 4. Sanity CORS Setup
- [ ] 4.1 Login to Sanity dashboard
- [ ] 4.2 Go to API → CORS Origins
- [ ] 4.3 Add https://alsoadaa.vercel.app
- [ ] 4.4 Enable "Allow credentials"
- [ ] 4.5 Test API requests work

## 5. Production Verification
- [ ] 5.1 Test homepage loads
- [ ] 5.2 Test all navigation links
- [ ] 5.3 Test products load from Sanity
- [ ] 5.4 Test language switching (AR/EN/RU)
- [ ] 5.5 Test quote request form
- [ ] 5.6 Test contact form
- [ ] 5.7 Check browser console for errors
- [ ] 5.8 Test on mobile devices

## 6. Performance Check
- [ ] 6.1 Run Lighthouse audit
- [ ] 6.2 Check Core Web Vitals
- [ ] 6.3 Verify images load from Sanity CDN
- [ ] 6.4 Check load time < 3s

## 7. Documentation Update
- [ ] 7.1 Update README with Vercel deployment info
- [ ] 7.2 Remove/archive Docker documentation
- [ ] 7.3 Add Vercel environment variables guide
- [ ] 7.4 Document rollback procedure

## 8. Final Verification
- [ ] 8.1 Test auto-deploy on push
- [ ] 8.2 Test rollback from Vercel dashboard
- [ ] 8.3 Confirm team access to Vercel project
- [ ] 8.4 Archive this OpenSpec change
