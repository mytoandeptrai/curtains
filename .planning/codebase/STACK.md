# Technology Stack

**Analysis Date:** 2026-05-08

## Languages

**Primary:**
- TypeScript 6.0.3 - All source code in `src/`
- React 19.2.5 - UI framework

**Secondary:**
- JavaScript - Build configuration files
- CSS/Tailwind - Styling via Tailwind CSS

## Runtime

**Environment:**
- Node.js 20.17.0 (specified in `.github/workflows/lint.yml`)

**Package Manager:**
- pnpm (latest) - Configured in `.github/workflows/lint.yml` via corepack
- Lockfile: pnpm-lock.yaml present at repository root

## Frameworks

**Core:**
- Next.js 16.2.4 - React metaframework with App Router
- React 19.2.5 - UI library
- React DOM 19.2.5 - React rendering

**UI/Components:**
- Radix UI (multiple packages v1.1-2.2) - Unstyled, accessible component primitives
  - Dialog, Accordion, Avatar, Checkbox, Dropdown, Select, Tabs, etc.
- Tailwind CSS 4.2.4 - Utility-first CSS framework
- Class Variance Authority 0.7.1 - CSS variant generation

**State Management:**
- Zustand 5.0.12 - Lightweight state management (`src/stores/`)
- auto-zustand-selectors-hook 3.0.1 - Helper for Zustand selector hooks

**Data Fetching:**
- TanStack React Query 5.100.6 - Server state management (`src/components/providers/QueryClientProvider/`)
- Axios 1.15.2 - HTTP client (`src/api/axios.ts`, `src/api/interceptors.ts`)

**Real-time Communication:**
- Socket.IO Client 4.8.3 - WebSocket communication (`src/lib/socket.ts`, `src/hooks/useSocket.ts`)

**Testing:**
- Biome 2.4.13 - Linter and formatter (configured in `biome.json`)
- (React Query DevTools commented out in `src/components/providers/QueryClientProvider/`)

**Build/Dev:**
- Turbopack - Used via `next dev --turbopack`
- PostCSS 8.5.12 - CSS processing
- Tailwind CSS PostCSS Plugin 4.2.4 - Tailwind CSS as PostCSS plugin
- SVGR/Webpack 8.1.0 - SVG to React component conversion
- TypeScript 6.0.3 - Type checking

**Development/Git:**
- Husky 9.1.7 - Git hooks
- lint-staged 16.4.0 - Run linters on staged files
- Commitlint 20.5.3 - Commit message linting
- Rimraf 6.1.3 - Cross-platform file deletion

## Key Dependencies

**Critical:**
- next 16.2.4 - Server/client framework, routing, rendering
- react 19.2.5 - Core UI rendering
- @tanstack/react-query 5.100.6 - Server state and caching
- zustand 5.0.12 - Client state management
- axios 1.15.2 - API communication with request/response interceptors
- socket.io-client 4.8.3 - WebSocket client for real-time updates

**UI/Styling:**
- tailwindcss 4.2.4 - Utility CSS framework
- @tailwindcss/postcss 4.2.4 - Tailwind CSS via PostCSS
- @radix-ui/* (13 packages) - Accessible, headless components
- lucide-react 1.14.0 - Icon library
- class-variance-authority 0.7.1 - CSS class variant generation
- clsx 2.1.1 - Conditional className utility
- tailwind-merge 3.5.0 - Merge Tailwind classes safely

**Utilities:**
- date-fns 4.1.0 - Date manipulation
- dayjs 1.11.20 - Date library
- decimal.js 10.6.0 - Arbitrary precision decimal arithmetic
- js-cookie 3.0.5 - Cookie management (`src/lib/cookie.ts`)
- react-hook-form 7.74.0 - Form state management
- embla-carousel-react 8.6.0 - Carousel component
- sonner 2.0.7 - Toast notifications
- next-nprogress-bar 2.4.7 - Top progress bar
- vaul 1.1.2 - Drawer/modal component
- cmdk 1.1.1 - Command palette
- react-day-picker 9.14.0 - Date picker

**Development/Infrastructure:**
- typescript 6.0.3 - Type checking and compilation
- @types/react 19.2.14 - React type definitions
- @types/react-dom 19.2.3 - React DOM type definitions
- @types/node 25.6.0 - Node type definitions
- @types/js-cookie 3.0.6 - js-cookie type definitions
- @biomejs/biome 2.4.13 - Linting and formatting
- @svgr/webpack 8.1.0 - SVG to React component conversion

## Configuration

**Environment:**
- Configuration via `NEXT_PUBLIC_*` variables in `.env.example`:
  - `NEXT_PUBLIC_APP_URL` - Application URL (default: http://localhost:3000)
  - `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:3001)
  - `NEXT_PUBLIC_API_VERSION` - API version prefix (default: /v1)
  - `NEXT_PUBLIC_API_PREFIX` - API route prefix (default: /api)
  - `NEXT_PUBLIC_SOCKET_URL` - WebSocket URL (default: ws://localhost:3002)
- Environment constants managed in `src/utils/const.ts` and `src/config/index.ts`

**Build:**
- Next.js config: `next.config.ts` - Webpack SVG handling, Turbopack, standalone output
- TypeScript: `tsconfig.json` - ES2017 target, React JSX, path aliases (@/*)
- PostCSS: `postcss.config.mjs` - Tailwind CSS plugin
- Tailwind: `tailwind.config.ts` - Content paths, color variables
- Biome: `biome.json` - Linting rules, formatting options, import organization

**Package scripts:**
- `pnpm dev` - Development server with Turbopack
- `pnpm build` - Production build
- `pnpm start` - Start production server
- `pnpm lint` - Run Biome linter
- `pnpm lint:fix` - Fix linting issues
- `pnpm format:check` - Check code formatting
- `pnpm format:fix` - Fix formatting issues
- `pnpm type-check` - TypeScript type checking

## Platform Requirements

**Development:**
- Node.js >= 18 (documented in README.md, workflow uses 20.17.0)
- pnpm (installed via corepack)
- Git with LF line endings (documented for Windows users)

**Production:**
- Deployment target: Standalone Next.js application (`output: 'standalone'` in `next.config.ts`)
- Supports any Node.js 20+ hosting environment
- Requires environment variables set for API and Socket URLs

---

*Stack analysis: 2026-05-08*
