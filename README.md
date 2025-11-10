# Alsoadaa Website

A modern, responsive website built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- 🎨 Modern UI with Tailwind CSS and shadcn/ui components
- ⚡ Fast development with Vite
- 📱 Fully responsive design
- 🎯 TypeScript for type safety
- 🐳 Docker support for easy deployment
- 🌐 Multi-language support (Arabic, English, Russian)
- 📝 Sanity.io CMS for content management
- 🖼️ Optimized image delivery via Sanity CDN
- 🤖 AI-powered translation with Sanity AI Assist

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

## Docker Deployment

### Build Docker Image

```bash
docker build -t alsoadaa-website .
```

### Run with Docker

```bash
docker run -p 8080:80 alsoadaa-website
```

### Run with Docker Compose

```bash
docker-compose up -d
```

The application will be available at [http://localhost:8080](http://localhost:8080).

## Building for Production

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
├── Dockerfile          # Docker configuration
├── nginx.conf          # Nginx configuration
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
3. Create initial pages and services
4. Set up calendar events

## License

MIT
