# Technology Stack

**Analysis Date:** 2026-05-09

## Languages

**Primary:**
- TypeScript 6.0.3 - Full codebase including frontend components, utilities, and configurations
- JSX/TSX - React components throughout `src/components/` and `src/app/`

**Secondary:**
- JavaScript - Configuration files (postcss.config.mjs, next.config.ts)
- CSS - Tailwind utilities, custom styles in `src/styles/`

## Runtime

**Environment:**
- Node.js (version not explicitly specified, inferred from Next.js 16.2.4 compatibility)

**Package Manager:**
- pnpm - Primary package manager
- Lockfile: `pnpm-lock.yaml` (present)

## Frameworks

**Core:**
- Next.js 16.2.4 - Full-stack React framework with App Router (ES2017 target)
- React 19.2.5 - UI library
- React DOM 19.2.5 - DOM rendering

**UI Component Library:**
- Radix UI (multiple components v1.x-v2.x):
  - `@radix-ui/react-accordion` 1.2.12
  - `@radix-ui/react-alert-dialog` 1.1.15
  - `@radix-ui/react-avatar` 1.1.11
  - `@radix-ui/react-checkbox` 1.3.3
  - `@radix-ui/react-dialog` 1.1.15
  - `@radix-ui/react-dropdown-menu` 2.1.16
  - `@radix-ui/react-label` 2.1.8
  - `@radix-ui/react-menubar` 1.1.16
  - `@radix-ui/react-navigation-menu` 1.2.14
  - `@radix-ui/react-popover` 1.1.15
  - `@radix-ui/react-radio-group` 1.3.8
  - `@radix-ui/react-select` 2.2.6
  - `@radix-ui/react-slider` 1.3.6
  - `@radix-ui/react-tabs` 1.1.13
  - `@radix-ui/react-tooltip` 1.2.8

**Styling:**
- Tailwind CSS 4.2.4 - Utility-first CSS framework
- `@tailwindcss/postcss` 4.2.4 - PostCSS plugin for Tailwind
- PostCSS 8.5.12 - CSS transformations

**Data Fetching & State Management:**
- `@tanstack/react-query` 5.100.6 - Server state management (configured in `src/components/providers/QueryClientProvider`)
- Axios 1.15.2 - HTTP client (custom instance in `src/api/http-instance.ts`)
- Zustand 5.0.12 - Client state management
- `auto-zustand-selectors-hook` 3.0.1 - Selector functions for Zustand stores

**Forms:**
- React Hook Form 7.74.0 - Form state management
- `@hookform/resolvers` 5.2.2 - Validation resolvers for React Hook Form
- Zod 4.4.3 - TypeScript-first schema validation

**Real-time Communication:**
- Socket.IO Client 4.8.3 - WebSocket client for real-time communication (configured in `src/lib/socket.ts` and `src/hooks/use-socket.ts`)

**Animation:**
- Framer Motion 12.38.0 - Animation library
- Embla Carousel React 8.6.0 - Carousel component

**Utilities:**
- Lucide React 1.14.0 - Icon library
- Date-fns 4.1.0 - Date utilities
- Dayjs 1.11.20 - Lightweight date library
- Decimal.js 10.6.0 - Arbitrary precision decimal arithmetic
- js-cookie 3.0.5 - Cookie management
- qs 6.15.1 - Query string parser/serializer
- react-day-picker 9.14.0 - Date picker component
- react-dropzone 15.0.0 - File upload handling
- react-medium-image-zoom 5.4.5 - Image zoom functionality
- react-number-format 5.4.5 - Number formatting
- Clsx 2.1.1 - Conditional className utility
- Tailwind Merge 3.5.0 - Merge Tailwind classes
- tw-animate-css 1.4.0 - Animation utilities
- Vaul 1.1.2 - Dialog drawer component
- Class Variance Authority 0.7.1 - CSS class variants
- Sonner 2.0.7 - Toast notifications
- Cmdk 1.1.1 - Command menu/palette
- Kbar 0.1.0-beta.48 - Command bar
- `@mantine/hooks` 9.1.1 - Utility hooks
- `@tanstack/match-sorter-utils` 8.19.4 - Sorting utilities
- `@tanstack/react-table` 8.21.3 - Table library

**UI Enhancements:**
- next-nprogress-bar 2.4.7 - Page progress bar
- `@teispace/next-themes` 0.3.2 - Dark mode theme switcher

**Testing & Development:**
- TypeScript 6.0.3 - Static type checking
- Biome 2.4.13 - Linting and formatting (replaces ESLint/Prettier)
- Husky 9.1.7 - Git hooks
- Lint-staged 16.4.0 - Run linters on staged files
- Commitlint 20.5.3 - Commit message linting
- `@commitlint/config-conventional` 20.5.3 - Conventional commit rules

**Build Tools:**
- Next.js Turbopack - Next.js bundler (enabled via `--turbopack` flag in dev)
- @svgr/webpack 8.1.0 - SVG to React component conversion
- Rimraf 6.1.3 - Cross-platform rm -rf utility

**Development:**
- `@types/node` 25.6.0 - Node.js type definitions
- `@types/react` 19.2.14 - React type definitions
- `@types/react-dom` 19.2.3 - React DOM type definitions
- `@types/js-cookie` 3.0.6 - js-cookie type definitions
- `@types/qs` 6.15.1 - qs type definitions

## Configuration

**Environment:**
- Configuration via `.env.local` (example provided in `.env.example`)
- Public env variables prefixed with `NEXT_PUBLIC_`:
  - `NEXT_PUBLIC_APP_URL` - Frontend application URL (default: `http://localhost:3000`)
  - `NEXT_PUBLIC_API_URL` - Backend API URL (default: `http://localhost:3001`)
  - `NEXT_PUBLIC_API_VERSION` - API version path (default: `/v1`)
  - `NEXT_PUBLIC_API_PREFIX` - API prefix (default: `/api`)
  - `NEXT_PUBLIC_SOCKET_URL` - WebSocket server URL (default: `ws://localhost:3002`)

**Build:**
- `next.config.ts` - Next.js configuration with:
  - Turbopack configuration for development
  - Webpack SVG loader configuration for production
  - Standalone output mode
  - ReactStrictMode disabled
- `tsconfig.json` - TypeScript configuration targeting ES2017
- `biome.json` - Code formatting and linting rules
- `tailwind.config.ts` - Tailwind CSS theme customization
- `postcss.config.mjs` - PostCSS configuration with Tailwind plugin

**Code Quality:**
- Linting: Biome with custom rules (2 space indentation, 120 character line width, single quotes)
- Formatting: Biome formatter with trailing commas (es5), semicolons always
- Git hooks: Husky with pre-commit linting/formatting via lint-staged
- Commit validation: Commitlint with conventional commits

## Platform Requirements

**Development:**
- Node.js (compatible with Next.js 16.2.4, recommend v18+)
- pnpm package manager
- Git (for Husky pre-commit hooks)

**Production:**
- Next.js standalone deployment target (can run without Node.js or with minimal Node.js)
- Backend API server at configured `NEXT_PUBLIC_API_URL`
- WebSocket server at configured `NEXT_PUBLIC_SOCKET_URL` (optional, gracefully handles missing connection)

---

*Stack analysis: 2026-05-09*
