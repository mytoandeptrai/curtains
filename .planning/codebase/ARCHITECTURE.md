<!-- refreshed: 2026-05-08 -->
# Architecture

**Analysis Date:** 2026-05-08

## System Overview

```text
┌──────────────────────────────────────────────────────────────────────────┐
│                           Next.js App Router                             │
│                          `src/app/layout.tsx`                            │
├─────────────────────────────────────────────────────────────────────────┤
│  Root Providers                    │  Main Layout                        │
│  `src/app/providers.tsx`           │  `src/components/layouts/...`      │
│  - QueryClientProvider             │  - Header                          │
│  - ThemeProvider                   │  - Footer                          │
│  - Progress Bar                    │  - Main Content Area               │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                         Modules & Components                             │
│  `src/modules/Home`    │  `src/components/form-field`   │  `src/components/ui`  │
└──────────────────────────────────────────────────────────────────────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
        ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
        │  State & Stores  │  │   HTTP & API     │  │   Real-time      │
        │  `src/stores/`   │  │   `src/api/`     │  │   `src/lib/socket`│
        │  - UserStore     │  │   - axios.ts     │  │   - SocketService │
        │  - Intersection  │  │   - interceptors │  │   - useSocket hook│
        │                  │  │                  │  │                  │
        └──────────────────┘  └──────────────────┘  └──────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Root Layout | Metadata, global styles, providers | `src/app/layout.tsx` |
| Providers | Query client, theme, progress bar | `src/app/providers.tsx` |
| MainLayout | Page structure (header, footer, main) | `src/components/layouts/MainLayout/index.tsx` |
| Home Module | Home page content | `src/modules/Home/index.tsx` |
| UserStore | User auth state, persistence | `src/stores/UserStore.ts` |
| IntersectionStore | Viewport intersection tracking | `src/stores/IntersectionStore.ts` |
| API Request | HTTP client, auth interceptors | `src/api/axios.ts`, `src/api/interceptors.ts` |
| Socket Service | Real-time communication | `src/lib/socket.ts` |

## Pattern Overview

**Overall:** Next.js 16 SSR/Client Hybrid with Zustand State + Radix UI Components

**Key Characteristics:**
- Server-side rendering for metadata and initial layout
- Client-side hydration with Providers (QueryClient, Theme, Progress)
- Zustand stores with localStorage persistence
- Radix UI component library with Tailwind CSS
- Axios HTTP client with request/response interceptors
- Socket.io for real-time communication
- React Hook Form for form management

## Layers

**Presentation Layer (Components):**
- Purpose: UI rendering and user interaction
- Location: `src/components/`
- Contains: UI primitives (`ui/`), form fields (`form-field/`), layouts (`layouts/`), providers (`providers/`), utilities (`utilities/`)
- Depends on: hooks, utils, styles, types
- Used by: modules, pages

**Module Layer:**
- Purpose: Feature-level page content
- Location: `src/modules/`
- Contains: Feature components and their logic
- Depends on: components, hooks, stores, API
- Used by: App Router pages

**State Management Layer:**
- Purpose: Global state storage and retrieval
- Location: `src/stores/`
- Contains: Zustand stores with persistence
- Depends on: types, lib utilities
- Used by: components, hooks, API interceptors

**Data Access Layer:**
- Purpose: HTTP communication and authentication
- Location: `src/api/`
- Contains: Axios instance, request/response interceptors
- Depends on: stores, utils/const
- Used by: components, hooks, modules

**Real-time Layer:**
- Purpose: WebSocket communication
- Location: `src/lib/socket.ts`, `src/hooks/useSocket.ts`
- Contains: SocketService class, useSocket hook
- Depends on: utils/const
- Used by: components, modules

**Utility & Config Layer:**
- Purpose: Helpers, constants, configuration
- Location: `src/lib/`, `src/utils/`, `src/config/`, `src/hooks/`
- Contains: Formatting, routing, environment configuration, custom hooks
- Depends on: types
- Used by: all layers

**Type Layer:**
- Purpose: TypeScript definitions
- Location: `src/types/`
- Contains: Response shapes, component props, common types
- Used by: all layers

## Data Flow

### Primary Request Path (Page Load)

1. Browser requests `/` → Next.js App Router (`src/app/page.tsx`)
2. Page component imports Home module (`src/modules/Home/index.tsx`)
3. Root Layout wraps with Providers (`src/app/layout.tsx` → `src/app/providers.tsx`)
4. Providers initialize:
   - QueryClientProvider (TanStack Query)
   - ThemeProvider (system/light/dark)
   - Progress bar component
5. MainLayout renders with Header/Footer (`src/components/layouts/MainLayout/index.tsx`)
6. Home component renders page content
7. Client hydration completes, interactive state available

### Authentication Flow

1. Component calls `useAuth()` hook (`src/hooks/useAuth.ts`)
2. Hook reads from `useUserStore` (Zustand state with localStorage)
3. On login: component calls `setUserData()` with `{ accessToken, refreshToken, user }`
4. Store persists to localStorage via `zustand/middleware/persist`
5. On subsequent requests, `requestInterceptor` (`src/api/interceptors.ts`) attaches `Authorization: Bearer ${token}` header
6. If 401 response: `errorInterceptor` calls `onRefreshToken()` to refresh token via store

### Real-time Communication

1. Component calls `useSocket()` hook (`src/hooks/useSocket.ts`)
2. Hook accesses singleton socket instance (`src/lib/socket.ts` line 20-28)
3. Socket.io client configured with auto-reconnect
4. Component subscribes to events with `on()` callback
5. Server sends events, callbacks fire with data
6. Component unsubscribes with `off()` on cleanup

**State Management:**
- Global state: Zustand stores in `src/stores/` with localStorage persistence
- Query state: TanStack Query via `QueryClientProvider` with 5-second stale time
- UI state: React useState for local component state
- URL state: hooks like `useSearchParams()` for query parameters

## Key Abstractions

**Form Handling:**
- Purpose: Standardized form field components
- Examples: `TextField`, `SelectField`, `CheckboxField` in `src/components/form-field/`
- Pattern: React Hook Form + Radix UI + Tailwind CSS wrapping

**UI Components:**
- Purpose: Reusable, accessible UI primitives
- Examples: `Button`, `Input`, `Dialog`, `Select`, `Tabs` in `src/components/ui/`
- Pattern: Radix UI headless components with Tailwind styling

**Store Pattern:**
- Purpose: Type-safe global state with selectors
- Examples: `useUserStore`, `useIntersectionStore` in `src/stores/`
- Pattern: Zustand with `auto-zustand-selectors-hook` for granular re-render optimization

**API Interceptor Pattern:**
- Purpose: Cross-cutting HTTP concerns
- Examples: Auth token attachment, error handling, refresh token retry
- Pattern: Axios middleware with access to Zustand store state

**Utility Functions:**
- Purpose: Reusable helpers
- Examples: `cn()` for className merging (`src/lib/utils.ts`), `range()` for pagination, formatting
- Pattern: Pure functions, exported from `src/lib/` and `src/utils/`

## Entry Points

**Server Entry:**
- Location: `src/app/layout.tsx`
- Triggers: Every page render
- Responsibilities: Root HTML, metadata, global styles, provider wrapping

**Client Entry:**
- Location: `src/app/providers.tsx`
- Triggers: On hydration
- Responsibilities: Context providers (Query, Theme, Progress)

**Page Entry:**
- Location: `src/app/page.tsx` (and future route segments)
- Triggers: Route navigation
- Responsibilities: Import and render module for the page

**API Entry:**
- Location: `src/api/axios.ts`
- Triggers: When component calls API
- Responsibilities: Configure and export Axios instance with interceptors

**Socket Entry:**
- Location: `src/hooks/useSocket.ts`
- Triggers: When component mounts
- Responsibilities: Provide socket connection interface

## Architectural Constraints

- **Rendering:** Next.js App Router with React 19 SSR + client hydration. All components in `src/components/` are client-side compatible with `'use client'` where needed.
- **Global state:** Zustand stores in `src/stores/` are module-level singletons with localStorage persistence. State is read via hook selectors to minimize re-renders.
- **API communication:** Single Axios instance exported from `src/api/axios.ts`. All HTTP requests go through interceptors for auth and error handling. No independent fetch calls.
- **Real-time communication:** Single Socket.io instance in `src/lib/socket.ts`. Managed via `useSocket()` hook with event-based API.
- **Styling:** Tailwind CSS v4 + Radix UI. No inline styles. Class utilities via `cn()` from `src/lib/utils.ts`.
- **Type safety:** Full TypeScript strict mode. Props types in component files, shared types in `src/types/index.ts`.
- **Module resolution:** Path alias `@/*` maps to `src/*` (tsconfig.json). All imports use `@/` prefix.
- **Circular imports:** None detected. Stores can read from API interceptors, but API does not import stores directly to avoid circular deps.

## Anti-Patterns

### Empty Components Without Implementation

**What happens:** Headers, Footers, and modules contain placeholder `<div></div>` with no actual content (`src/components/layouts/MainLayout/components/Header/index.tsx`, `src/components/layouts/MainLayout/components/Footer/index.tsx`, `src/modules/Home/index.tsx`)

**Why it's wrong:** These are critical shell components but provide no value. Page lacks structure and navigation. Teams extending the codebase don't have reference implementations.

**Do this instead:** Implement Header with navigation menu (e.g., `@radix-ui/react-navigation-menu`), Footer with links, and Home module with welcome/intro content. Use existing UI components like `Button`, `NavigationMenu`, `Separator` from `src/components/ui/`.

### Token Refresh Stub

**What happens:** The `onRefreshToken()` function in `src/api/interceptors.ts` (lines 10-32) creates empty strings for accessToken and newRefreshToken. The actual refresh request is commented out (lines 18-20).

**Why it's wrong:** Auth cannot be refreshed. Tokens will expire and users will be logged out with no recovery path. 401 errors cannot be retried.

**Do this instead:** Implement the commented-out `refreshTokenRequest()` call with a real API endpoint (e.g., POST `/auth/refresh`). Handle errors by redirecting to login. Test the full 401 → refresh → retry flow.

### SocketService & useSocket Duplication

**What happens:** Two separate socket implementations exist: `SocketService` class in `src/lib/socket.ts` and `useSocket` hook in `src/hooks/useSocket.ts`. They both create socket instances independently, with `useSocket` creating a singleton at module load (line 20-28).

**Why it's wrong:** Risk of multiple socket connections. Logging via SocketService is verbose but useSocket is silent. Event subscriptions may not be in sync.

**Do this instead:** Consolidate to one pattern. Either use SocketService class exclusively (consumed via a hook), or use the useSocket hook pattern everywhere. Pick one logging strategy.

### Empty Stores and Incomplete Types

**What happens:** `UserStore` has empty interface `IUser {}` (line 6) and empty interface `IStore {}` (line 9). IntersectionStore has `TTargetInView = ''` (empty string type).

**Why it's wrong:** No type safety for user data or store updates. Code compiles but properties are unknown at runtime. Will cause issues when implementing auth endpoints.

**Do this instead:** Define `IUser` with actual user shape (e.g., `{ id: string; email: string; name?: string; role: string }`). Define `IStore` as an update shape or extend `IMeQueryStore`. Update `TTargetInView` to union of actual element IDs or names.

---

*Architecture analysis: 2026-05-08*
