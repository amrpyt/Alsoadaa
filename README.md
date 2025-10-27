# Alsoadaa Website

A modern, responsive website built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- 🎨 Modern UI with Tailwind CSS and shadcn/ui components
- ⚡ Fast development with Vite
- 📱 Fully responsive design
- 🎯 TypeScript for type safety
- 🐳 Docker support for easy deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

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
│   ├── lib/            # Utilities and helpers
│   └── styles/         # Global styles
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

## License

MIT
