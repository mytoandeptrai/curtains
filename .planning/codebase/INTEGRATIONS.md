# External Integrations

**Analysis Date:** 2026-05-08

## APIs & External Services

**Backend API:**
- Service: Custom REST API
  - Purpose: Primary backend for application data
  - SDK/Client: Axios (`src/api/axios.ts`)
  - Configuration: 
    - Base URL: `NEXT_PUBLIC_API_URL` (default: http://localhost:3001)
    - Version prefix: `NEXT_PUBLIC_API_VERSION` (default: /v1)
    - Endpoint prefix: `NEXT_PUBLIC_API_PREFIX` (default: /api)
  - Auth: Bearer token via Authorization header (`src/api/interceptors.ts`)

**Real-time Socket Service:**
- Service: Socket.IO WebSocket server
  - Purpose: Real-time bidirectional communication (bet placement, stats, pings)
  - SDK/Client: socket.io-client 4.8.3
  - Connection URL: `NEXT_PUBLIC_SOCKET_URL` (default: ws://localhost:3002)
  - Implementation: `src/lib/socket.ts` (SocketService class), `src/hooks/useSocket.ts` (React hook)
  - Events handled:
    - `bet-placed` - Incoming bet placement events
    - `stats` - Statistical updates
    - `pong` - Heartbeat responses
  - Transport: WebSocket protocol

## Data Storage

**Databases:**
- Not detected in frontend codebase
- Backend database likely required but not specified

**File Storage:**
- Local filesystem only - No external file storage service detected
- Image types supported: png, jpg, jpeg, webp, svg (in `src/utils/const.ts`)
- Video types supported: mp4, mov, webm, ogg, wmv

**Caching:**
- TanStack React Query (v5.100.6) - Client-side caching via `src/components/providers/QueryClientProvider/`
  - Cache stale time: 5 seconds
  - Refetch on window focus: disabled
  - Refetch on mount: disabled
  - Retry on error: disabled
- No server-side caching service detected

## Authentication & Identity

**Auth Provider:**
- Custom implementation with manual token management
  - Implementation: `src/hooks/useAuth.ts`, `src/api/interceptors.ts`
  - Token storage: Cookies via `src/lib/cookie.ts` using js-cookie 3.0.5
  - Cookies used:
    - `token` - Access token
    - `refreshToken` - Refresh token
    - `address` - User address (likely blockchain wallet)
    - `privy-token` - Privy wallet integration token
    - `privy-session` - Privy session token
  - Auth approach: Bearer token in `Authorization` header
  - Token refresh: Implemented in `src/api/interceptors.ts` on 401 errors
  - State management: Zustand store `useUserStore` in `src/stores/UserStore.ts`

**Third-party Auth Detected:**
- Privy (Web3 wallet auth) - Cookie names suggest integration (`privy-token`, `privy-session`)
  - Purpose: Likely blockchain wallet authentication
  - Implementation details in Privy-related cookie handling in `src/lib/cookie.ts`

## Monitoring & Observability

**Error Tracking:**
- None detected
- Errors from API passed through to Zustand store and intercepted at HTTP level

**Logs:**
- Console logging only in `src/lib/socket.ts`
  - Formatted with timestamps (Asia/Ho_Chi_Minh timezone)
  - Color-coded by level (success, info, error, warn)
- No structured logging service

**Analytics:**
- None detected

## CI/CD & Deployment

**Hosting:**
- Not specified - Frontend is standalone Next.js application
- Can be deployed to any Node.js 20+ compatible platform
- Configured for standalone output (`output: 'standalone'` in `next.config.ts`)

**CI Pipeline:**
- GitHub Actions workflow: `.github/workflows/lint.yml`
- Triggers: Pull requests to `main` and `dev` branches
- Environment: Ubuntu latest, Node.js 20.17.0
- Steps:
  1. Checkout code
  2. Setup Node.js and pnpm
  3. Install dependencies
  4. Run Biome linter
  5. Run TypeScript type checking
  6. Run Prettier format check
- No deployment step configured

## Environment Configuration

**Required env vars:**
- `NEXT_PUBLIC_APP_URL` - Application base URL for client-side navigation
- `NEXT_PUBLIC_API_URL` - Backend API base URL
- `NEXT_PUBLIC_API_VERSION` - API version prefix (e.g., /v1)
- `NEXT_PUBLIC_API_PREFIX` - API route prefix (e.g., /api)
- `NEXT_PUBLIC_SOCKET_URL` - WebSocket server URL for real-time updates

**Optional env vars:**
- None identified (all public env vars have defaults in `src/utils/const.ts`)

**Secrets location:**
- `.env.example` - Template file (public, no secrets)
- `.env` - Local development (not committed, ignored by `.gitignore`)
- No secrets management system detected (e.g., no Vault, Secrets Manager)

## Webhooks & Callbacks

**Incoming:**
- None detected in frontend

**Outgoing:**
- None detected in frontend
- Socket.IO events emitted via `socketService.emit()` in `src/lib/socket.ts`

## Third-party Libraries & Services

**Icons & Assets:**
- Lucide React (v1.14.0) - SVG icon library
- SVGR (v8.1.0) - SVG to React component conversion
- Geist font (via Next.js `next/font` - referenced in README but not configured)

**UI/Component Libraries:**
- Radix UI (13 component packages) - Headless, accessible components
- Embla Carousel (v8.6.0) - Carousel/slider functionality
- Sonner (v2.0.7) - Toast notifications
- cmdk (v1.1.1) - Command palette

**Theming:**
- @teispace/next-themes (v0.3.2) - Theme provider for dark/light mode

**Forms:**
- react-hook-form (v7.74.0) - Form state management

**Date/Time:**
- date-fns (v4.1.0) - Modern date utility library
- dayjs (v1.11.20) - Lightweight date library
- react-day-picker (v9.14.0) - Date picker component

**Utilities:**
- decimal.js (v10.6.0) - Arbitrary precision decimal math (likely for financial calculations)
- clsx (v2.1.1) - Conditional classNames
- tailwind-merge (v3.5.0) - Merge Tailwind classes
- vaul (v1.1.2) - Drawer primitive

---

*Integration audit: 2026-05-08*
