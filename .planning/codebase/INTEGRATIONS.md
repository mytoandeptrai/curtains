# External Integrations

**Analysis Date:** 2026-05-09

## APIs & External Services

**Backend API:**
- REST API - Primary backend service
  - SDK/Client: Axios 1.15.2
  - Auth: Bearer token (JWT) via Authorization header
  - Configuration: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_API_PREFIX`, `NEXT_PUBLIC_API_VERSION`
  - Endpoints: `merchants/refresh-token` for token refresh

**Real-time Communication:**
- Socket.IO Server - WebSocket-based real-time events
  - SDK/Client: Socket.IO Client 4.8.3
  - Configuration: `NEXT_PUBLIC_SOCKET_URL`
  - Events: `connect`, `disconnect`, `connection-established`, `subscribed`, `unsubscribed`, `stats`, `pong`, `bet-placed` (custom events in `src/lib/socket.ts`)
  - Implementation: `src/lib/socket.ts` (SocketService class), `src/hooks/use-socket.ts` (React hook wrapper)

## Data Storage

**Client-side Storage:**
- localStorage - Zustand state persistence
  - User store persisted to `user-store` key
  - Stores: `accessToken`, `refreshToken`, `user` object, authentication status
  - Implementation: `src/stores/user-store.ts` using Zustand persist middleware

**Cookies:**
- js-cookie 3.0.5 - Cookie management
  - Access Token: `access_token`
  - Refresh Token: `refresh_token`
  - Source: `src/api/http-instance.ts` (cookie enum ECookie)

## Authentication & Identity

**Auth Provider:**
- Custom JWT-based authentication
  - Implementation: `src/api/http-instance.ts` (HTTP interceptors)
  - Token refresh: Automatic token refresh on 401 TOKEN_EXPIRED error
  - Token storage: localStorage and cookies
  - User state: Zustand store (`src/stores/user-store.ts`)
  - Endpoints:
    - Login/Register: Not explicitly implemented, assumed external
    - Token Refresh: `POST /merchants/refresh-token`
    - 2FA Setup: `/2fa/setup` endpoint referenced
    - Password Change: `/change-password` endpoint referenced

**Hook Interface:**
- `useAuth()` in `src/hooks/use-auth.ts` - Provides auth state and methods:
  - Properties: `isLoggedIn`, `accessToken`, `refreshToken`, `user`, `status`
  - Methods: `setUserData()`, `logout()`

## HTTP Client Configuration

**Axios Instance:**
- Location: `src/api/http-instance.ts`
- Base URL: Environment variable `NEXT_PUBLIC_API_URL`
- Timeout: 10 seconds
- Content-Type: application/json
- Response Type: JSON

**Request Interceptors:**
- Automatic Authorization header injection with Bearer token from user store
- Parameter serialization with qs library (arrayFormat: 'repeat')
- Empty parameter cleaning (removes null, undefined, empty objects/arrays)

**Response Interceptors:**
- Automatic token refresh on 401 TOKEN_EXPIRED
- Error message mapping to translation keys (errors.code.{errorCode})
- Toast notification for errors (via Sonner)
- Failed request queue management during token refresh
- Logout and redirect to home on refresh token failure

**Error Handling:**
- Custom error response type: `BaseResponseType<null>`
- Error codes mapped to message keys
- Special handling for errors by endpoint:
  - `/register` - EMAIL_EXISTED
  - `/verify` - ACTIVE_CODE_EXPIRED, USER_ACTIVATED
  - `/change-password` - MATCH_CURRENT_PASSWORD
  - `/login` - NEED_TWO_FA
  - `/2fa/setup` - UNAUTHORIZED
- Error response structure: `{ code: number, message: string, data?: { retryAfter?, blockDuration? } }`

## Monitoring & Observability

**Error Tracking:**
- Console logging only - No external error tracking service detected
- SocketService logging: Timestamp-based color-coded logs to console (`src/lib/socket.ts`)

**Logs:**
- Browser console (console.log, console.error, console.warn)
- SocketService uses custom log function with Vietnam timezone formatting
- HTTP instance logs request/response errors to console

## CI/CD & Deployment

**Hosting:**
- Next.js standalone deployment (configured via `output: 'standalone'` in next.config.ts)
- Supports containerization and serverless deployment

**CI Pipeline:**
- Git hooks with Husky and lint-staged
- Pre-commit: Biome lint/format checks
- Commit message validation: Commitlint with conventional commits

## Environment Configuration

**Required env vars (public):**
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_VERSION=/v1
NEXT_PUBLIC_API_PREFIX=/api
NEXT_PUBLIC_SOCKET_URL=ws://localhost:3002
```

**Optional env vars:**
- None explicitly documented, all vars have fallback defaults

**Secrets location:**
- `.env.local` (not committed, local development only)
- Production secrets: Managed externally (environment provided by deployment platform)

## Webhooks & Callbacks

**Incoming:**
- Not detected - Application consumes events via Socket.IO, not HTTP webhooks

**Outgoing:**
- Socket.IO events emitted:
  - Custom events via `socketService.emit(event, data)` pattern
  - No outgoing HTTP callbacks detected

## Response Format Standards

**API Response Format:**
```typescript
{
  code: number;           // HTTP-like status code
  message?: string;       // Error message or code
  data?: T;              // Response payload
}
```

**Pagination Support:**
- IPagination interface: `itemCount`, `totalItems`, `itemsPerPage`, `totalPages`, `currentPage`
- IPaging interface: `page`, `limit`, `total`

---

*Integration audit: 2026-05-09*
