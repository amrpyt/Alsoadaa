# Project Context

## Purpose
Alsoadaa is a modern, responsive website designed to showcase products and services with a professional, user-friendly interface. The website features a seasonal calendar, product catalog, contact forms, and comprehensive information pages. It's built to provide an excellent user experience across all devices with fast load times and smooth interactions.

## Tech Stack

### Frontend Framework & Build Tools
- **React 18** - Modern UI library with hooks and functional components
- **TypeScript 5.2.2** - Type-safe development with strict mode enabled
- **Vite 5.0.8** - Fast build tool and development server (runs on port 5173)

### Styling & UI Components
- **Tailwind CSS 3.3.6** - Utility-first CSS framework with custom theme
- **shadcn/ui** - High-quality React components built on Radix UI
- **Radix UI** - Comprehensive set of accessible, unstyled UI primitives
- **Lucide React 0.487.0** - Modern icon library
- **tailwindcss-animate** - Animation utilities for Tailwind
- **next-themes 0.4.6** - Dark mode support

### Form Handling & Validation
- **React Hook Form 7.55.0** - Performant form management
- **Zod 3.24.1** - TypeScript-first schema validation
- **@hookform/resolvers 3.10.0** - Validation resolver integration

### Additional Libraries
- **date-fns 3.6.0** - Modern date utility library
- **embla-carousel-react 8.5.2** - Carousel/slider functionality
- **recharts 2.15.0** - Charting library for data visualization
- **sonner 2.0.3** - Toast notifications
- **cmdk 1.0.4** - Command menu component
- **vaul 1.1.2** - Drawer component

### Development Tools
- **ESLint** - Code linting with TypeScript support
- **PostCSS & Autoprefixer** - CSS processing

### Deployment
- **Docker** - Containerized deployment with Nginx
- **Nginx** - Production web server (port 80 in container, mapped to 8080)

## Project Conventions

### Code Style
- **Language**: TypeScript with strict mode enabled (`strict: true`)
- **Module System**: ESNext with bundler resolution
- **JSX**: React JSX transform (`jsx: "react-jsx"`)
- **Linting**: Strict linting rules with no unused locals/parameters
- **File Extensions**: `.tsx` for React components, `.ts` for utilities
- **Path Aliases**: Use `@/` prefix for imports from `src/` directory
  - Example: `import { Button } from '@/components/ui/button'`
- **Component Naming**: PascalCase for components (e.g., `ProductCard.tsx`, `SeasonalCalendar.tsx`)
- **Utility Naming**: camelCase for utilities and hooks (e.g., `mockData.ts`, `useRouter`)

### Architecture Patterns

#### Project Structure
```
src/
├── components/       # Reusable UI components
│   ├── ui/          # shadcn/ui components (48 components)
│   ├── figma/       # Figma-imported components
│   └── *.tsx        # Custom components (Header, Footer, ProductCard, etc.)
├── pages/           # Page-level components
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── ProductsPage.tsx
│   ├── CalendarPage.tsx
│   ├── ContactPage.tsx
│   └── ServicesPage.tsx
├── lib/             # Utilities and shared logic
│   ├── router.tsx   # Custom hash-based routing
│   └── mockData.ts  # Mock data for development
└── styles/          # Global styles
    └── globals.css  # Tailwind directives and custom CSS variables
```

#### Routing Strategy
- **Custom Hash-Based Router**: Client-side routing using URL hash fragments
- **Router Context**: React Context API for state management
- **Navigation Hook**: `useRouter()` hook provides `currentPage`, `navigate()`, and `params`
- **URL Pattern**: `#page?param1=value1&param2=value2`
- **Features**: Query parameter support, smooth scrolling on navigation

#### Component Architecture
- **Functional Components**: All components use React hooks
- **Composition**: Prefer component composition over inheritance
- **UI Components**: shadcn/ui components in `components/ui/` directory
- **Custom Components**: Business logic components in `components/` root
- **Page Components**: Full-page views in `pages/` directory

#### State Management
- **React Context**: For global state (router, theme)
- **React Hooks**: `useState`, `useEffect`, `useContext` for local state
- **Form State**: React Hook Form for complex form management

#### Styling Approach
- **Tailwind Utility Classes**: Primary styling method
- **CSS Variables**: HSL-based color system with CSS custom properties
- **Dark Mode**: Class-based dark mode with `next-themes`
- **Component Variants**: `class-variance-authority` for variant management
- **Utility Functions**: `clsx` and `tailwind-merge` for conditional classes

### Testing Strategy
Currently no automated testing framework is configured. Future testing should consider:
- **Unit Tests**: Vitest (Vite-native testing framework)
- **Component Tests**: React Testing Library
- **E2E Tests**: Playwright or Cypress
- **Type Safety**: TypeScript strict mode as first line of defense

### Git Workflow
- Standard Git workflow with feature branches
- Deployment documentation available in multiple files:
  - `DEPLOYMENT.md` - General deployment guide
  - `DOCKER_DEVELOPMENT.md` - Docker development setup
  - `DOCKER_HUB_PUSH.md` - Docker Hub publishing
  - `DOKPLOY_SETUP.md` - Dokploy deployment
  - `README_WORKFLOW.md` - Workflow documentation

## Domain Context

### Business Domain
Alsoadaa appears to be a product/service showcase website, likely for a business dealing with seasonal products or services. Key features include:
- **Product Catalog**: Display and browse products
- **Seasonal Calendar**: Time-based product or service availability
- **Quote Requests**: Customer inquiry and quotation system
- **Contact Forms**: Customer communication channels

### User Experience Focus
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Radix UI primitives ensure ARIA compliance
- **Performance**: Vite for fast builds, optimized production bundles
- **Modern UI**: Clean, professional design with smooth animations

## Important Constraints

### Technical Constraints
- **Browser Support**: Modern browsers supporting ES2020
- **Node Version**: Requires Node.js 18+
- **Build Target**: ES2020 with DOM APIs
- **Bundle Size**: Keep component files modular and tree-shakeable
- **Type Safety**: All code must pass TypeScript strict checks

### Development Constraints
- **No Server-Side Rendering**: Pure client-side React application
- **Hash-Based Routing**: Cannot use browser history API (SPA limitation)
- **Static Assets**: All assets must be bundled or in public directory

### Deployment Constraints
- **Docker**: Production deployment uses Docker containers
- **Nginx**: Static file serving with Nginx in production
- **Port Mapping**: Container port 80 → Host port 8080
- **Build Process**: Must run `npm run build` before Docker build

## External Dependencies

### Build-Time Dependencies
- **Vite Dev Server**: `http://localhost:5173` for development
- **Node Package Registry**: npm for package management

### Runtime Dependencies
- **None**: Fully self-contained client-side application
- **No Backend APIs**: Currently uses mock data (`mockData.ts`)
- **No Database**: All data is client-side

### Production Infrastructure
- **Docker Registry**: For container image storage
- **Nginx**: Web server for static file serving
- **Optional**: Dokploy for deployment orchestration

### Future Integration Points
The architecture supports adding:
- REST or GraphQL APIs
- Authentication services
- Database backends
- CDN for static assets
- Analytics services
