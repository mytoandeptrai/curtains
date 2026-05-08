<!-- refreshed: 2026-05-09 -->
# Architecture

**Analysis Date:** 2026-05-09

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│              Next.js Root Layout (SSR/SSG)                  │
│           `src/app/layout.tsx`                              │
│  Providers: Theme, QueryClient, Progress Bar                │
└────────────────────┬────────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
    ┌─────────────┐         ┌──────────────┐
    │   Platform  │         │    Admin     │
    │   Portal    │         │    Portal    │
    └──────┬──────┘         └──────┬───────┘
           │                       │
           ▼                       ▼
    ┌──────────────────┐    ┌────────────────┐
    │  MainLayout      │    │  AdminLayout   │
    │  (Header/Footer) │    │  (Sidebar)     │
    │ `components/     │    │ `components/   │
    │  layouts/main`   │    │  layouts/admin`│
    └────────┬─────────┘    └────────┬───────┘
             │                       │
             ▼                       ▼
    ┌──────────────────┐    ┌────────────────┐
    │    Modules       │    │   Admin Page   │
    │  `src/modules/   │    │ `src/app/admin/│
    │  home/index.tsx` │    │  page.tsx`     │
    └──────────────────┘    └────────────────┘
             │
             ▼
    ┌──────────────────────────┐
    │  Components (UI/Forms)   │
    │  `src/components/`       │
    │  - Form Fields           │
    │  - UI Components         │
    │  - Utilities             │
    └──────────────────────────┘
             │
             ▼
    ┌──────────────────────────┐
    │   State Management       │
    │   Zustand Stores         │
    │  `src/stores/`           │
    │  - UserStore             │
    │  - IntersectionStore     │
    └──────────┬───────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │   HTTP/API Layer         │
    │   Axios Instance         │
    │  `src/api/http-instance` │
    │  - Token Management      │
    │  - Interceptors          │
    │  - Error Handling        │
    └──────────┬───────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │   External API Server    │
    │  (Backend Service)       │
    └──────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Root Layout | HTML structure, metadata, global providers | `src/app/layout.tsx` |
| Providers | Theme, React Query, Progress tracking | `src/app/providers.tsx` |
| Platform Layout | Main public/user-facing UI template | `src/components/layouts/main-layout/index.tsx` |
| Admin Layout | Admin dashboard UI with sidebar | `src/components/layouts/admin-layout/index.tsx` |
| Form Fields | Reusable form input components | `src/components/form-fields/` |
| UI Components | Radix UI based components (buttons, dialogs, etc) | `src/components/ui/` |
| Utilities | Layout helpers (HStack, VStack, animations) | `src/components/utilities/` |
| User Store | Global auth state (tokens, user data) | `src/stores/user-store.ts` |
| HTTP Instance | Axios with auth, refresh, error handling | `src/api/http-instance.ts` |

## Pattern Overview

**Overall:** Modular Next.js 16 frontend with Zustand for state management, Axios with interceptors for API communication, and Radix UI components for UI.

**Key Characteristics:**
- Server and client component separation (Next.js 14+ App Router)
- Centralized Zustand stores with localStorage persistence
- Request/response interceptors for token management and error handling
- Radix UI primitives wrapped with Tailwind CSS styling
- Form-first architecture using React Hook Form + Zod validation
- Layout-based routing with platform (public) and admin routes

## Layers

**Presentation Layer:**
- Purpose: Render UI, handle user interactions, display forms
- Location: `src/components/`, `src/app/(platform)/`, `src/app/admin/`
- Contains: React components, layouts, pages
- Depends on: Zustand stores, custom hooks, API layer
- Used by: Next.js routing system

**Logic/Hook Layer:**
- Purpose: Encapsulate reusable component logic, state management patterns
- Location: `src/hooks/`
- Contains: Custom React hooks for auth, pagination, debouncing, media queries
- Depends on: Stores, utils, external libraries (React)
- Used by: Presentation components

**State Management Layer:**
- Purpose: Centralized application state, persistence
- Location: `src/stores/`
- Contains: Zustand stores with persistence middleware
- Depends on: localStorage, Zustand
- Used by: Components via custom hooks (`useAuth` in `src/hooks/use-auth.ts`)

**API/HTTP Layer:**
- Purpose: Handle all backend communication, token management, retry logic
- Location: `src/api/http-instance.ts`
- Contains: Axios instance with request/response interceptors
- Depends on: Zustand stores (for tokens), external backend API
- Used by: Components and custom hooks that fetch data

**Utilities/Configuration:**
- Purpose: Constants, helpers, configuration
- Location: `src/utils/`, `src/config/`, `src/lib/`
- Contains: Environment variables, format helpers, constants
- Depends on: Standard JS
- Used by: All layers

## Data Flow

### Primary Request Path (Authenticated API Call)

1. **Component renders** (`src/components/`) - User interacts with form
2. **Custom hook or direct store access** (`src/hooks/use-auth.ts`) - Component gets current auth state
3. **HTTP request initiated** (`src/api/http-instance.ts`) - Request interceptor adds Authorization header
4. **Zustand store provides token** (`src/stores/user-store.ts`) - `useUserStore.getState().accessToken`
5. **Response interceptor processes** (`src/api/http-instance.ts:123-199`) - Strips data wrapper, handles errors
6. **Token refresh if needed** - If 401 TOKEN_EXPIRED, refresh token endpoint called
7. **Failed requests retried** - Queued requests re-executed after token refresh
8. **Component updates via React Query or useState** - UI re-renders with fresh data

### Authentication Flow

1. User logs in via form submission
2. Component calls `useAuth().setUserData()` (`src/hooks/use-auth.ts:20-24`)
3. Store updated: `setUser()`, `setAccessToken()`, `setRefreshToken()`
4. localStorage auto-synced by persist middleware
5. HTTP interceptor reads tokens on next request
6. On token expiry (401), refresh endpoint called with refreshToken
7. Tokens updated in store, failed requests replayed
8. On refresh failure, user logged out and redirected to home

**State Management:**
- User auth state (tokens, user info) persisted to localStorage
- Zustand rehydration on mount sets `status: 'ready'`
- Components use `useAuth()` hook to access auth context
- HTTP layer reads tokens directly from store state via `useUserStore.getState()`

## Key Abstractions

**HTTP Interceptor Chain:**
- Purpose: Centralize token injection, error handling, token refresh logic
- Examples: `src/api/http-instance.ts`
- Pattern: Request → Add Auth header, Response → Unwrap data / handle errors / retry on token expiry

**Zustand Store with Selectors:**
- Purpose: Typed state management with automatic selector generation
- Examples: `src/stores/user-store.ts` wrapped with `createSelectorFunctions()`
- Pattern: `useUserStore.use.accessToken()` for component-level subscriptions

**Layout Component Pattern:**
- Purpose: Apply consistent wrapping (header, sidebar, footer) to nested routes
- Examples: `src/components/layouts/main-layout/`, `src/components/layouts/admin-layout/`
- Pattern: Layout component accepts `{children}` and wraps them with header/sidebar/footer

**Form Field Wrapper Components:**
- Purpose: Pre-styled, pre-connected form inputs using React Hook Form
- Examples: `src/components/form-fields/form-input.tsx`, `form-select.tsx`, etc.
- Pattern: Component accepts `label`, `name`, `validation rules` and handles registration internally

## Entry Points

**App Root:**
- Location: `src/app/layout.tsx`
- Triggers: Next.js renders page
- Responsibilities: HTML shell, metadata, global providers setup

**Platform Portal:**
- Location: `src/app/(platform)/page.tsx` → `src/modules/home/index.tsx`
- Triggers: User navigates to `/`
- Responsibilities: Renders home module with MainLayout (header/footer)

**Admin Portal:**
- Location: `src/app/admin/page.tsx`
- Triggers: User navigates to `/admin`
- Responsibilities: Renders admin page with AdminLayout (sidebar/header)

**Provider Layer:**
- Location: `src/app/providers.tsx`
- Triggers: Root layout wraps children
- Responsibilities: Sets up React Query, Theme, Progress tracking

## Architectural Constraints

- **Threading:** Single-threaded event loop (browser runtime)
- **Global state:** Zustand stores in `src/stores/` - user auth state, intersection observer state. Persisted via localStorage.
- **Circular imports:** None detected - clear dependency hierarchy (presentation → logic → state → http → external)
- **Client vs Server:** Components must mark `'use client'` for Zustand access, event handlers, hooks. Server components used for layouts and static rendering.
- **Token Management:** Both HTTP instance and store read/write from Zustand. Token refresh queues failed requests to replay after refresh.
- **Route Grouping:** Platform routes under `(platform)` group (no URL prefix), admin routes under `admin/` prefix

## Anti-Patterns

### Using Window/Document in Server Components

**What happens:** Components without `'use client'` import browser APIs, causing hydration errors
**Why it's wrong:** Next.js renders on server, client APIs undefined during SSR
**Do this instead:** Mark component `'use client'` before using hooks, Zustand, event handlers, or window/localStorage

### Direct API Calls in Components

**What happens:** Components import axios directly or create fetch calls without interceptors
**Why it's wrong:** Bypasses token management, error handling, and auth refresh logic in `src/api/http-instance.ts`
**Do this instead:** Always use `httpInstance` from `src/api/http-instance.ts` or wrap in custom hook (`src/hooks/`)

### Accessing Tokens Directly from Cookies

**What happens:** Code reads tokens from `js-cookie` instead of Zustand
**Why it's wrong:** Creates duplication, inconsistent state between cookie and store
**Do this instead:** Use `useAuth()` hook or `useUserStore.getState()` to read tokens

## Error Handling

**Strategy:** Layered error handling - HTTP interceptor catches API errors, components handle UI feedback

**Patterns:**
- API errors caught in `src/api/http-instance.ts:127-199` (onResponseError)
- Error codes mapped to localization keys (`errors.code.${errorCode}`)
- Toast notifications via `sonner` library for user feedback
- 401 TOKEN_EXPIRED triggers automatic refresh + retry
- Other errors rejected and propagated to component
- Network errors logged to console with error details

## Cross-Cutting Concerns

**Logging:** Console errors in HTTP interceptor (`src/api/http-instance.ts:118`)

**Validation:** React Hook Form + Zod in form components (`src/components/form-fields/`)

**Authentication:** Zustand store maintains tokens/user. HTTP interceptor injects tokens. Custom `useAuth()` hook provides auth context.

---

*Architecture analysis: 2026-05-09*
