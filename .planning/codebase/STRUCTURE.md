# Codebase Structure

**Analysis Date:** 2026-05-08

## Directory Layout

```
curtains/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout with metadata and providers
│   │   ├── page.tsx              # Home page (renders Home module)
│   │   ├── providers.tsx          # Client providers wrapper
│   │   ├── error.tsx             # Error boundary component
│   │   ├── robots.ts             # robots.txt metadata
│   │   └── sitemap.ts            # sitemap.xml metadata
│   │
│   ├── components/               # Reusable UI components
│   │   ├── ui/                   # Radix UI + Tailwind primitives (35 files)
│   │   │   ├── button.tsx        # Button component
│   │   │   ├── dialog.tsx        # Modal dialog
│   │   │   ├── form.tsx          # React Hook Form wrapper
│   │   │   ├── input.tsx         # Text input
│   │   │   ├── select.tsx        # Dropdown select
│   │   │   └── ... (30 more)
│   │   │
│   │   ├── form-field/           # Form field wrappers (10 files)
│   │   │   ├── TextField.tsx     # Text input with form integration
│   │   │   ├── SelectField.tsx   # Select with form integration
│   │   │   ├── CheckboxField.tsx # Checkbox with form integration
│   │   │   ├── RadioGroupField.tsx
│   │   │   ├── NumberField.tsx
│   │   │   ├── TextAreaField.tsx
│   │   │   ├── SwitchField.tsx
│   │   │   ├── InputFileField.tsx
│   │   │   └── index.tsx         # Barrel export
│   │   │
│   │   ├── layouts/              # Page layout templates
│   │   │   └── MainLayout/       # Primary page layout
│   │   │       ├── index.tsx     # Layout shell (Header, Footer, main)
│   │   │       └── components/
│   │   │           ├── Header/   # Navigation header (empty placeholder)
│   │   │           └── Footer/   # Page footer (empty placeholder)
│   │   │
│   │   ├── providers/            # Context provider wrappers
│   │   │   ├── QueryClientProvider/    # TanStack Query setup
│   │   │   └── ThemeProvider/          # Next-themes dark/light mode
│   │   │
│   │   └── utilities/            # Layout utility components
│   │       ├── h-stack.tsx       # Horizontal flex container
│   │       ├── v-stack.tsx       # Vertical flex container
│   │       ├── show.tsx          # Conditional render wrapper
│   │       └── index.ts          # Barrel export
│   │
│   ├── modules/                  # Feature modules (pages content)
│   │   └── Home/
│   │       └── index.tsx         # Home page content (placeholder)
│   │
│   ├── stores/                   # Global state (Zustand)
│   │   ├── UserStore.ts          # User auth state + persistence
│   │   ├── IntersectionStore.ts  # Viewport target tracking
│   │   └── index.ts              # Barrel export
│   │
│   ├── api/                      # HTTP client and interceptors
│   │   ├── axios.ts              # Axios instance with config
│   │   └── interceptors.ts       # Request/response/error interceptors
│   │
│   ├── hooks/                    # Custom React hooks (10 files)
│   │   ├── useAuth.ts            # Auth state & login/logout
│   │   ├── useSocket.ts          # WebSocket client
│   │   ├── useModal.ts           # Modal open/close state
│   │   ├── usePagination.ts      # Pagination logic
│   │   ├── usePaging.ts          # Paging (page/limit) state
│   │   ├── useSearchParams.ts    # URL search params
│   │   ├── useMobile.tsx         # Mobile breakpoint detection
│   │   ├── useWindowSize.ts      # Window dimensions
│   │   ├── useCopy.ts            # Copy to clipboard
│   │   └── useCountdown.ts       # Countdown timer
│   │
│   ├── lib/                      # Utilities and helpers
│   │   ├── utils.ts              # cn() for className merging
│   │   ├── socket.ts             # SocketService class (Socket.io wrapper)
│   │   ├── cookie.ts             # Cookie utilities
│   │   ├── debounce.ts           # Debounce helper
│   │   └── calc.ts               # Calculation/math helpers
│   │
│   ├── utils/                    # Constants and helpers
│   │   ├── const.ts              # Environment vars, file types, formatting
│   │   ├── routes.ts             # Route constants
│   │   └── common.ts             # Common utilities (range, etc)
│   │
│   ├── config/                   # Configuration files
│   │   ├── index.ts              # appConfig (API_URL, APP_URL)
│   │   ├── site.ts               # siteConfig (name, description, OG image)
│   │   └── fonts.ts              # Font imports and variable exports
│   │
│   ├── types/                    # TypeScript definitions
│   │   ├── index.ts              # Common types (TResponse, IOption, etc)
│   │   └── additional.d.ts       # Global type augmentations
│   │
│   ├── styles/                   # Global styles
│   │   └── globals.css           # Tailwind + brand CSS
│   │
│   └── assets/                   # Static assets
│       ├── fonts/                # Custom font files
│       ├── svg/                  # SVG icon files
│       └── icons.tsx             # Icon component library
│
├── public/                       # Static files (served at /)
│   └── images/                   # Image assets
│
├── docs/                         # Project documentation
│   ├── design/
│   ├── planning/
│   └── requirements/
│
├── docker/                       # Docker configuration
│   └── nginx/
│
├── .github/                      # GitHub workflows & GSD configuration
├── .claude/                      # Claude/Anthropic tool configuration
├── .husky/                       # Git hooks
│
├── .env.example                  # Example environment variables
├── .editorconfig                 # Editor formatting rules
├── next.config.ts                # Next.js configuration (SVG, Turbopack)
├── tsconfig.json                 # TypeScript configuration
├── biome.json                    # Biome linter/formatter config
├── postcss.config.mjs            # PostCSS config (Tailwind)
├── tailwindcss.config.ts         # Tailwind CSS configuration
├── package.json                  # Dependencies and scripts
└── pnpm-lock.yaml                # Lockfile (pnpm)
```

## Directory Purposes

**src/app/**
- Purpose: Next.js App Router directory
- Contains: Root layout, pages, error boundary, metadata generators
- Key files: `layout.tsx` (root), `page.tsx` (home page), `providers.tsx` (client context setup)

**src/components/**
- Purpose: Reusable UI components
- Contains: Radix UI primitives, form fields, layouts, providers, utilities
- Key files: UI library (`ui/`), form field wrappers (`form-field/`), main layout (`layouts/MainLayout/`)

**src/modules/**
- Purpose: Feature-level page content
- Contains: Page-specific components and logic
- Key files: `Home/index.tsx` (home page module)
- Note: Currently minimal - expand here as features are added

**src/stores/**
- Purpose: Global application state
- Contains: Zustand stores with localStorage persistence
- Key files: `UserStore.ts` (auth), `IntersectionStore.ts` (viewport tracking)
- Pattern: Each store exported via `useStore()` hook with selector functions

**src/api/**
- Purpose: HTTP communication
- Contains: Axios client configuration, request/response/error interceptors
- Key files: `axios.ts` (instance), `interceptors.ts` (auth, error handling)

**src/hooks/**
- Purpose: Custom React hooks
- Contains: Logic for auth, socket, pagination, UI state, DOM queries
- Key files: `useAuth.ts`, `useSocket.ts`, `useModal.ts`, `usePagination.ts`

**src/lib/**
- Purpose: Utilities and service classes
- Contains: Helper functions, SocketService, cookie/debounce utilities
- Key files: `utils.ts` (cn), `socket.ts` (SocketService), `cookie.ts`, `debounce.ts`

**src/utils/**
- Purpose: Constants and common helpers
- Contains: Environment variables, route constants, file type lists, formatting lookups
- Key files: `const.ts` (env, file types), `routes.ts` (route paths), `common.ts` (helpers)

**src/config/**
- Purpose: Application configuration
- Contains: Environment-based config, site metadata, font setup
- Key files: `index.ts` (appConfig), `site.ts` (siteConfig), `fonts.ts` (font imports)

**src/types/**
- Purpose: TypeScript type definitions
- Contains: Common interfaces and types used across the app
- Key files: `index.ts` (response shapes, pagination, common types), `additional.d.ts` (augmentations)

**src/styles/**
- Purpose: Global stylesheet
- Contains: Tailwind CSS directives, brand color palettes, global utility classes
- Key files: `globals.css` (single stylesheet)

**src/assets/**
- Purpose: Static assets (fonts, icons, images)
- Contains: Custom font files, SVG icons, icon component library
- Key files: `fonts/`, `svg/`, `icons.tsx`

**public/**
- Purpose: Served at root URL
- Contains: Static files (favicon, OG images, etc)
- Key files: `images/`

## Key File Locations

**Entry Points:**
- Root layout: `src/app/layout.tsx`
- Home page: `src/app/page.tsx` (renders `src/modules/Home/index.tsx`)
- Client setup: `src/app/providers.tsx`

**Configuration:**
- Next.js: `next.config.ts`
- TypeScript: `tsconfig.json` (path alias `@/*` → `src/*`)
- Tailwind: `tailwindcss.config.ts`
- Linting: `biome.json`

**Core Logic:**
- Auth state: `src/stores/UserStore.ts`
- HTTP client: `src/api/axios.ts`
- Socket client: `src/lib/socket.ts`
- Layout shell: `src/components/layouts/MainLayout/index.tsx`

**Testing:**
- Not configured yet (no test files present)

## Naming Conventions

**Files:**
- React components: PascalCase with `.tsx` extension (e.g., `TextField.tsx`, `MainLayout/index.tsx`)
- Utilities: camelCase with `.ts` extension (e.g., `axios.ts`, `debounce.ts`)
- Config: camelCase (e.g., `site.ts`, `fonts.ts`)
- Custom hooks: camelCase with `use` prefix (e.g., `useAuth.ts`, `useSocket.ts`)
- Store files: PascalCase + `Store` suffix (e.g., `UserStore.ts`, `IntersectionStore.ts`)

**Directories:**
- Feature modules: PascalCase (e.g., `Home/`, `MainLayout/`)
- Utility directories: lowercase (e.g., `api/`, `lib/`, `utils/`, `hooks/`)
- Component categories: lowercase plural (e.g., `components/`, `stores/`, `types/`)

**React Components:**
- Functional components only
- Props interface in same file with `Props` or `[ComponentName]Props` naming
- Exports: default export for single component, named export for component function

**Hooks:**
- All custom hooks in `src/hooks/`
- Named with `use` prefix
- Return type explicitly typed
- Inline state (useState) or external state (Zustand)

**Exports:**
- Barrel files use `index.ts` or `index.tsx` (e.g., `src/stores/index.ts`, `src/components/form-field/index.tsx`)
- Path alias `@/` used in all imports (no relative paths like `../`)

## Where to Add New Code

**New Feature (e.g., Product Listing):**
- Primary code: `src/modules/ProductList/index.tsx` (main component) + sub-components in same directory
- Routes: Add route constant to `src/utils/routes.ts`
- API calls: Create hooks in `src/hooks/` (e.g., `useProducts.ts`) that call `src/api/axios.ts`
- Styling: Use Tailwind classes in JSX, define utilities in `src/components/utilities/` if reusable
- Types: Add shapes to `src/types/index.ts` or feature-specific `src/types/product.ts`
- Store updates: If global state needed, add getter/setter to `src/stores/` (e.g., `ProductStore.ts`)

**New Component (UI or Feature):**
- Implementation: `src/components/[category]/[ComponentName].tsx`
  - Generic UI: `src/components/ui/` (e.g., `tooltip.tsx`)
  - Form fields: `src/components/form-field/` (e.g., `DatePickerField.tsx`)
  - Layout: `src/components/layouts/[LayoutName]/` 
  - Custom: `src/components/[FeatureName]/` (e.g., `src/components/ProductCard/`)
- Export: Update barrel file (`index.ts` or parent) to include new component
- Usage: Import via `@/components/[path]`

**Utilities & Helpers:**
- Shared helpers: `src/lib/[utility].ts` (e.g., `src/lib/formatCurrency.ts`)
- Pure utilities: `src/utils/[utility].ts` (e.g., `src/utils/validation.ts`)
- Environment/constants: Add to `src/utils/const.ts`
- Export and reuse via `@/lib/` or `@/utils/`

**Custom Hooks:**
- Always in: `src/hooks/use[HookName].ts`
- Use React hooks (useState, useEffect, useCallback) + Zustand stores
- Export type definitions alongside hook
- Example: `src/hooks/useProducts.ts` with `export type UseProductsReturn = { ... }`

**Global State:**
- Create new store: `src/stores/[FeatureName]Store.ts`
- Pattern: Zustand with `createSelectorFunctions` for optimization
- Import and use in components via `use[FeatureName]Store()` hook
- For persistence: add `persist()` middleware with localStorage

**API Integration:**
- HTTP calls: `src/api/` or in component hooks (e.g., `useProducts.ts`)
- Client initialization: `src/api/axios.ts`
- Request/response handlers: `src/api/interceptors.ts`
- Example: `const { data } = await request.get('/products')`

**Styling:**
- Use Tailwind CSS classes in JSX (no CSS files except `src/styles/globals.css`)
- Merge conflicting classes with `cn()` from `src/lib/utils.ts`
- Example: `<div className={cn('p-4 bg-white', isActive && 'bg-blue-500')}>`

**Tests:**
- Not yet configured - plan: Jest or Vitest in `__tests__/` or `.test.ts` co-located files
- When added, follow existing pattern of co-location

## Special Directories

**src/.next/**
- Purpose: Build output (generated)
- Generated: Yes (by Next.js build)
- Committed: No (.gitignore)

**docker/nginx/**
- Purpose: Docker configuration for production
- Generated: No
- Committed: Yes

**public/**
- Purpose: Static assets served at root
- Generated: No
- Committed: Yes (images, favicon, metadata)

**.github/get-shit-done/, .claude/get-shit-done/**
- Purpose: GSD workflow configuration
- Generated: No
- Committed: Yes

---

*Structure analysis: 2026-05-08*
