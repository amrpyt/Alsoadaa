# Deployment Guide

## Live Website

**URL:** https://alsoadaa.vercel.app

## Vercel Deployment

The website is deployed on Vercel with automatic deployments.

### How It Works

1. Push code to GitHub (`main` branch)
2. Vercel automatically builds and deploys
3. Changes are live in ~1 minute

### Manual Deployment

```bash
# Install Vercel CLI (one time)
npm install -g vercel

# Deploy
vercel --prod
```

## Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_SANITY_PROJECT_ID` | `wptd4h7v` | Sanity project ID |
| `VITE_SANITY_DATASET` | `production` | Sanity dataset |
| `VITE_SANITY_TOKEN` | `(secret)` | For form submissions |

## Sanity CMS

### Dashboard
https://www.sanity.io/manage/project/wptd4h7v

### Studio (Local)
```bash
cd studio
npm install
npm run dev
```
Opens at http://localhost:3333

### CORS Configuration
Make sure your domain is added in:
Sanity Dashboard → API → CORS Origins

## Rollback

If something breaks:
1. Go to Vercel Dashboard
2. Click on Deployments
3. Find previous working deployment
4. Click "..." → "Promote to Production"

## Monitoring

- **Vercel Dashboard:** Build logs, analytics
- **Sanity Dashboard:** Content, API usage
- **Browser Console:** Check for errors

## Troubleshooting

### Site not loading?
- Check Vercel deployment status
- Verify environment variables are set

### Content not showing?
- Check Sanity CORS settings
- Verify API token is valid

### Forms not working?
- Ensure `VITE_SANITY_TOKEN` has write access
- Check browser console for errors
