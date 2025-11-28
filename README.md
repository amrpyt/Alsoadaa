# Alsoadaa Website

A modern, responsive website built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- 🎨 Modern UI with Tailwind CSS and shadcn/ui components
- ⚡ Fast development with Vite
- 📱 Fully responsive design
- 🎯 TypeScript for type safety
- 🚀 Git-based deployment with Vercel
- 🌐 Multi-language support (Arabic, English, Russian)
- 📝 Sanity.io CMS for content management
- 🖼️ Optimized image delivery via Sanity CDN
- 🤖 AI-powered translation with Sanity AI Assist
- ♻️ Auto-deploy from GitHub commits

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env.local` file in the root directory with the following:
```env
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_SANITY_USE_CDN=true
VITE_SANITY_TOKEN=your-write-token  # Optional, for form submissions
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Production Deployment

### Vercel Deployment (Recommended)

This project is deployed on Vercel with automatic deployments from GitHub.

**Live URL:** https://alsoadaa.vercel.app

#### Quick Start

1. **Push to GitHub:**
```bash
git push origin main
```
Vercel will automatically build and deploy.

2. **Manual Deploy (if needed):**
```bash
npm install -g vercel
vercel --prod
```

#### Environment Variables (Vercel Dashboard)

| Variable | Value |
|----------|-------|
| `VITE_SANITY_PROJECT_ID` | `wptd4h7v` |
| `VITE_SANITY_DATASET` | `production` |
| `VITE_SANITY_TOKEN` | (your token) |

#### Auto-Deploy

Auto-deploy is enabled. Every push to `main` branch triggers a new deployment.

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── lib/            # Utilities and helpers (Sanity client, queries)
│   ├── types/          # TypeScript type definitions
│   └── styles/         # Global styles
├── studio/             # Sanity Studio (CMS)
│   ├── schemaTypes/    # Content schemas
│   └── sanity.config.ts
├── scripts/            # Migration and utility scripts
├── public/             # Static assets
├── .github/workflows/  # GitHub Actions (build verification)
└── package.json        # Project dependencies
```

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- Lucide React Icons
- Sanity.io (Headless CMS)
- GROQ (Query Language)

## Content Management

### Sanity Studio

The project uses Sanity.io as a headless CMS for content management. The Sanity Studio is located in the `studio/` directory.

#### Running Sanity Studio Locally

```bash
cd studio
npm install
npm run dev
```

The Studio will be available at [http://localhost:3333](http://localhost:3333).

#### Content Types

- **Products**: Multi-language product catalog with images, specifications, and availability
- **Pages**: Static pages with rich text content (About, Services, etc.)
- **Services**: Service offerings with descriptions and features
- **Calendar Events**: Seasonal availability calendar
- **Form Submissions**: Contact and quote request submissions

#### Multi-Language Support

The CMS supports three languages:
- Arabic (العربية) - Default
- English
- Russian (Русский)

Content is managed as separate documents per language, linked via `originalDocument` references. Use the AI Assist translation feature in Studio to automatically translate content between languages.

### Data Migration

To migrate data from mock data to Sanity:

```bash
npm run migrate
```

This script will:
1. Import products from `mockData.ts`
2. Upload images to Sanity assets
3. Create initial page content

## License

MIT
