# Codebase Structure

**Analysis Date:** 2026-05-09

## Directory Layout

```
curtains/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── (platform)/               # Public/user routes (no URL prefix)
│   │   │   ├── layout.tsx            # MainLayout wrapper
│   │   │   └── page.tsx              # Home page → modules/home
│   │   ├── admin/                    # Admin routes (/admin prefix)
│   │   │   ├── layout.tsx            # AdminLayout wrapper
│   │   │   └── page.tsx              # Admin dashboard
│   │   ├── layout.tsx                # Root layout (HTML, metadata, providers)
│   │   ├── providers.tsx             # Theme, QueryClient, ProgressBar setup
│   │   ├── error.tsx                 # Error boundary
│   │   ├── robots.ts                 # SEO robots config
│   │   └── sitemap.ts                # SEO sitemap config
│   │
│   ├── components/                   # Reusable React components
│   │   ├── layouts/                  # Layout wrappers
│   │   │   ├── main-layout/          # Public pages template (header/footer)
│   │   │   │   ├── index.tsx
│   │   │   │   └── components/
│   │   │   │       ├── header/       # Navigation header
│   │   │   │       └── footer/       # Footer
│   │   │   └── admin-layout/         # Admin pages template (sidebar/header)
│   │   │       ├── index.tsx
│   │   │       └── components/
│   │   │           ├── app-header/   # Admin header with search
│   │   │           └── app-sidebar/  # Admin navigation sidebar
│   │   │
│   │   ├── ui/                       # Headless Radix UI components (styled with Tailwind)
│   │   │   ├── button.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── data-table/           # TanStack React Table wrapper
│   │   │   ├── kbar/                 # Command palette
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input-file.tsx
│   │   │   ├── input-file-dropzone.tsx
│   │   │   └── [40+ more UI primitives]
│   │   │
│   │   ├── form-fields/              # Form input components (React Hook Form + UI)
│   │   │   ├── form-input.tsx
│   │   │   ├── form-select.tsx
│   │   │   ├── form-checkbox.tsx
│   │   │   ├── form-radio-group.tsx
│   │   │   ├── form-date-picker.tsx
│   │   │   ├── form-file-upload.tsx
│   │   │   ├── form-textarea.tsx
│   │   │   ├── form-slider.tsx
│   │   │   └── demo-form.tsx         # Example form
│   │   │
│   │   ├── providers/                # Context/state providers
│   │   │   ├── QueryClientProvider/  # React Query setup
│   │   │   └── ThemeProvider/        # next-themes setup
│   │   │
│   │   └── utilities/                # Layout utility components
│   │       ├── h-stack.tsx           # Horizontal flex container
│   │       ├── v-stack.tsx           # Vertical flex container
│   │       ├── animation-stack.tsx   # Animated container
│   │       ├── loading-stack.tsx     # Loading state wrapper
│   │       └── show.tsx              # Conditional render helper
│   │
│   ├── modules/                      # Feature-scoped components (future: auth, dashboard, etc)
│   │   └── home/                     # Home page module
│   │       └── index.tsx             # Home page content
│   │
│   ├── stores/                       # Zustand state stores (with persistence)
│   │   ├── user-store.ts             # Auth state (tokens, user data)
│   │   ├── intersection-store.ts     # Intersection observer state
│   │   └── index.ts                  # Barrel export
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── use-auth.ts               # Auth context wrapper around useUserStore
│   │   ├── use-mobile.ts             # Mobile viewport detection
│   │   ├── use-pagination.ts         # Pagination state
│   │   ├── use-search-params.ts      # URL search params helper
│   │   ├── use-socket.ts             # WebSocket client
│   │   ├── use-file-upload.ts        # File upload handling
│   │   ├── use-debounce.tsx          # Debounce state value
│   │   ├── use-modal.ts              # Modal state
│   │   ├── use-copy.ts               # Copy to clipboard
│   │   └── [10+ more hooks]
│   │
│   ├── api/                          # HTTP/API layer
│   │   ├── http-instance.ts          # Axios instance with interceptors (token management)
│   │   └── http-instance.helper.ts   # Error checking utilities
│   │
│   ├── lib/                          # Utility functions
│   │   ├── utils.ts                  # cn() - clsx + tailwind-merge
│   │   ├── socket.ts                 # WebSocket client setup
│   │   ├── cookie.ts                 # Cookie utilities
│   │   ├── debounce.ts               # Debounce function
│   │   └── calc.ts                   # Math/calculation helpers
│   │
│   ├── utils/                        # Configuration and constants
│   │   ├── const.ts                  # Env vars, file types, error messages
│   │   ├── common.ts                 # Shared utility functions
│   │   └── routes.ts                 # Route definitions
│   │
│   ├── types/                        # TypeScript type definitions
│   │   ├── index.ts                  # Global types (Response, Option, NavItem, etc)
│   │   ├── base-form.ts              # Form types
│   │   ├── additional.d.ts           # Type augmentation
│   │   └── [other type files]
│   │
│   ├── config/                       # Application configuration
│   │   ├── index.ts                  # App URL and API URL
│   │   ├── site.ts                   # Site metadata (name, description)
│   │   └── fonts.ts                  # Next.js local fonts (Geist Sans/Mono)
│   │
│   ├── assets/                       # Static assets
│   │   ├── svg/                      # SVG files (auto-converted to React components)
│   │   ├── fonts/                    # Local font files (GeistVF.woff, etc)
│   │   └── icons.tsx                 # Icon exports
│   │
│   └── styles/                       # Global CSS
│       └── globals.css               # Tailwind CSS imports, global styles
│
├── public/                           # Static files served as-is
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── [other static assets]
│
├── docs/                             # Documentation files
├── docker/                           # Docker configuration
├── .github/                          # GitHub configuration
│   ├── get-shit-done/                # GSD command configs
│   └── skills/                       # Project skills definitions
│
├── .husky/                           # Git hooks (pre-commit, commit-msg)
├── .vscode/                          # VS Code settings
├── .claude/                          # Claude AI configuration
│
├── next.config.ts                    # Next.js config (SVG handling, turbopack)
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── postcss.config.mjs                # PostCSS configuration
├── biome.json                        # Biome linter/formatter config
├── commitlint.config.js              # Commit message linting
├── components.json                   # Shadcn component config
├── docker-compose.yml                # Docker Compose setup
├── .editorconfig                     # Editor conventions
├── .env.example                      # Environment variables template
├── package.json                      # Dependencies and scripts
├── pnpm-lock.yaml                    # Locked dependency versions
├── README.md                         # Project documentation
└── preinstall.js                     # Preinstall validation script
```

## Directory Purposes

**`src/app/`**
- Purpose: Next.js App Router pages and layouts
- Contains: Page components, layout wrappers, error boundaries
- Key files: `layout.tsx` (root), `providers.tsx` (global context)
- Routing: `(platform)/page.tsx` → `/`, `admin/page.tsx` → `/admin`

**`src/components/`**
- Purpose: Reusable React components
- Contains: UI primitives, layouts, form inputs, providers
- Organized as: By function (layouts, ui, form-fields, providers) not by route

**`src/components/ui/`**
- Purpose: Radix UI headless components styled with Tailwind
- Contains: 40+ UI primitives (buttons, dialogs, tables, carousels, etc)
- Pattern: Each component is a single file with optional sub-utilities

**`src/components/form-fields/`**
- Purpose: Pre-connected React Hook Form inputs
- Contains: Input, Select, Checkbox, DatePicker, FileUpload, etc
- Integration: Wraps UI components with React Hook Form registration

**`src/stores/`**
- Purpose: Global state management with persistence
- Contains: Zustand stores (user auth, intersection observer state)
- Persistence: localStorage via Zustand middleware
- Access: Via hooks (`useAuth`) or direct state access (`useUserStore.getState()`)

**`src/hooks/`**
- Purpose: Custom React hooks for logic reuse
- Contains: Auth wrapper, media queries, pagination, file upload, etc
- Pattern: Hooks exported by function name (`useAuth`, `useMobile`, etc)

**`src/api/`**
- Purpose: HTTP communication layer
- Contains: Axios instance with interceptors for token management
- Responsibilities: Auth header injection, token refresh, error mapping, request retry

**`src/lib/`**
- Purpose: Utility functions used across codebase
- Contains: `cn()` for class merging, socket client, cookie helpers, debounce

**`src/utils/`**
- Purpose: Constants, configuration, shared helpers
- Contains: Environment variables, file type lists, error message keys, routes

**`src/types/`**
- Purpose: TypeScript type definitions
- Contains: API response types, component prop types, form types
- Key file: `index.ts` with global types (Response, Option, NavItem, etc)

**`src/config/`**
- Purpose: Application configuration and constants
- Contains: Site metadata, API/app URLs, font setup
- Usage: Imported in layouts and providers for metadata

**`src/assets/`**
- Purpose: Static resources (fonts, icons, SVGs)
- SVG handling: Files auto-converted to React components via SVGR Webpack loader
- Fonts: Local fonts loaded via Next.js font optimization

**`src/styles/`**
- Purpose: Global CSS and Tailwind setup
- Contains: `globals.css` with Tailwind directives and global styles

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx` - Root HTML structure, metadata, providers
- `src/app/providers.tsx` - QueryClient, Theme, Progress bar initialization
- `src/app/(platform)/page.tsx` - Home page (public)
- `src/app/admin/page.tsx` - Admin dashboard

**Configuration:**
- `src/config/index.ts` - App and API URLs
- `src/config/site.ts` - Site metadata (name, description, image)
- `src/config/fonts.ts` - Custom fonts (Geist Sans/Mono)
- `next.config.ts` - Next.js SVG and build config

**Core Logic:**
- `src/api/http-instance.ts` - Axios with token management
- `src/stores/user-store.ts` - Auth state (tokens, user data)
- `src/hooks/use-auth.ts` - Auth context hook

**Testing:**
- Test files: Not detected in structure (no .test.ts or .spec.ts files found)

## Naming Conventions

**Files:**
- Components: PascalCase in exports, kebab-case filenames (e.g., `app-sidebar.tsx` exports `AppSidebar`)
- Utilities/Functions: camelCase in exports and filenames (e.g., `use-auth.ts`)
- Types: PascalCase with I/T prefix (e.g., `IUser`, `TResponse`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_URL`, `PAGE_SIZE_OPTIONS`)

**Directories:**
- Feature/Component directories: kebab-case (e.g., `form-fields`, `admin-layout`, `query-client-provider`)
- Type/Utility directories: lowercase singular form (e.g., `types`, `hooks`, `stores`, `utils`)

**Functions:**
- React components: PascalCase (e.g., `AdminLayout`, `FormInput`)
- Custom hooks: camelCase with `use` prefix (e.g., `useAuth`, `useMobile`)
- Utilities: camelCase (e.g., `cn()`, `cleanParams()`)

**Variables:**
- React state: camelCase (e.g., `accessToken`, `isLoading`)
- Store selectors: camelCase with `use` prefix (e.g., `useUserStore.use.accessToken()`)
- Constants: UPPER_SNAKE_CASE (e.g., `ACCESS_TOKEN`, `ECookie`)

**Types:**
- Component props: `ComponentNameProps` (e.g., `ProvidersProps`, `AdminLayoutProps`)
- API responses: `[Resource]Response` or `T[Resource]Response` (e.g., `TRefreshToKenResponse`)
- Store interfaces: `IMeQueryStore`, `IUser`, `IStore`

## Where to Add New Code

**New Feature Module:**
- Create directory: `src/modules/[feature-name]/`
- Create page file: `src/modules/[feature-name]/index.tsx`
- Import in route layout: `src/app/(platform)/page.tsx` or new route

**New API Endpoint:**
- Create custom hook in: `src/hooks/use-[resource].ts`
- Hook internally calls: `httpInstance.get/post/patch/delete()` from `src/api/http-instance.ts`
- Hook returns: Typed data or React Query mutation handle
- Call hook in component: `const data = use[Resource]()`

**New UI Component:**
- Create file: `src/components/ui/[component-name].tsx`
- Base on existing component pattern in `src/components/ui/button.tsx`
- Export from file, optionally add barrel export

**New Form Field:**
- Create file: `src/components/form-fields/form-[field-type].tsx`
- Wrap form UI component with React Hook Form controller pattern
- Accept props: `label`, `name`, `validation rules`
- Example: See `src/components/form-fields/form-input.tsx`

**New Custom Hook:**
- Create file: `src/hooks/use-[purpose].ts`
- Export single named function starting with `use`
- Example: See `src/hooks/use-auth.ts`

**New Zustand Store:**
- Create file: `src/stores/[store-name]-store.ts`
- Create interface defining state shape and actions
- Wrap with `persist()` middleware if state should survive page refresh
- Export wrapped with `createSelectorFunctions()` for component subscriptions
- Add barrel export in `src/stores/index.ts`

**New Utility Function:**
- Small utility: `src/lib/[utility-name].ts`
- Domain-specific utility: `src/utils/[utility-name].ts`
- Shared helpers: `src/utils/common.ts`
- Constants: `src/utils/const.ts`

**New Type Definition:**
- Global/reused types: `src/types/index.ts`
- Feature-specific types: `src/types/[feature-name].ts`
- Form types: `src/types/base-form.ts`

## Special Directories

**`src/.next/`**
- Purpose: Build output directory
- Generated: Yes (built by `next build`)
- Committed: No (in .gitignore)

**`node_modules/`**
- Purpose: Installed dependencies
- Generated: Yes (installed by `pnpm install`)
- Committed: No (in .gitignore)

**`public/`**
- Purpose: Static assets served at root URL
- Generated: No (manually created)
- Committed: Yes

**`docs/`**
- Purpose: Project documentation
- Generated: No (manually created)
- Committed: Yes

**`.github/get-shit-done/`**
- Purpose: GSD command configurations
- Generated: No (configuration files)
- Committed: Yes

---

*Structure analysis: 2026-05-09*
