# Codebase Concerns

**Analysis Date:** 2026-05-08

## Tech Debt

**Incomplete Error Handling in API Interceptors:**
- Issue: Token refresh and error handling paths have empty catch blocks with `// TODO: handle error` comments
- Files: `src/api/interceptors.ts` (lines 27, 63)
- Impact: Network errors during token refresh are silently swallowed, causing authentication failures without user notification or logging
- Fix approach: Implement proper error logging, user notification, and fallback to login redirect in catch blocks

**Unimplemented Token Refresh Logic:**
- Issue: `onRefreshToken()` function has placeholder empty string assignments instead of actual API calls
- Files: `src/api/interceptors.ts` (lines 16-20, commented out)
- Impact: Token refresh mechanism is completely non-functional despite being wired into the error interceptor
- Fix approach: Uncomment and implement the actual refresh token request with proper error handling

**Empty Type Definitions:**
- Issue: `IUser` and `IStore` interfaces in UserStore are empty placeholders
- Files: `src/stores/UserStore.ts` (lines 5-9)
- Impact: No type safety for user data; any property access relies on runtime behavior; refactoring becomes risky
- Fix approach: Define complete user and store interfaces based on API contract

**Disabled Biome VCS Integration:**
- Issue: VCS (git) integration is disabled in linter configuration
- Files: `biome.json` (lines 4-6: `"enabled": false`)
- Impact: Linter cannot optimize checks for only changed files, reducing efficiency on larger changes
- Fix approach: Enable VCS to improve linting speed and focused checks on modified code

## Known Bugs

**Suppressible Hydration Warnings:**
- Symptoms: `suppressHydrationWarning` prop used on body element to silence Next.js hydration mismatches
- Files: `src/app/layout.tsx` (line 59)
- Trigger: Theme provider or other client-side state initialization differences between SSR and client render
- Workaround: Currently suppressed; underlying cause not addressed

**Silent Sitemap Failures:**
- Symptoms: Sitemap generation returns empty array on any error instead of failing visibly
- Files: `src/app/sitemap.ts` (lines 15-16)
- Trigger: Any error in route enumeration silently converts to empty sitemap, breaking SEO
- Workaround: None; errors are swallowed without logging

## Security Considerations

**Type Casting to `any` in Error Handler:**
- Risk: Response data from backend error cast as `any` without validation
- Files: `src/api/interceptors.ts` (line 49)
- Current mitigation: Biome linter has `noExplicitAny` disabled for suspicious rules
- Recommendations: 
  - Use discriminated union types for error responses
  - Validate error shape before accessing properties
  - Enable stricter type checking in linter

**No Environment Validation at Runtime:**
- Risk: Critical env vars (API_URL, SOCKET_URL) default to empty strings if not set, causing silent failures
- Files: `src/utils/const.ts` (lines 2-6), `src/config/index.ts` (lines 2-3)
- Current mitigation: None; allows app to boot with invalid configuration
- Recommendations:
  - Add startup validation for required env vars
  - Throw clear error if critical configuration missing
  - Implement environment schema validation (e.g., Zod)

**Plaintext Credentials in localStorage:**
- Risk: Access tokens and refresh tokens stored in localStorage without encryption
- Files: `src/stores/UserStore.ts` (line 43)
- Current mitigation: None
- Recommendations:
  - Consider httpOnly cookies for tokens (requires backend support)
  - If localStorage used, implement token encryption
  - Add token expiration enforcement client-side

## Performance Bottlenecks

**Excessive Console Logging in Socket Service:**
- Problem: Every socket event emission and subscription logs with full JSON stringification
- Files: `src/lib/socket.ts` (lines 11-23, 50-60, 75-86, 88-94)
- Cause: Logging configured for all lifecycle events; JSON.stringify with 2-space indent adds overhead
- Improvement path:
  - Disable verbose logging in production (environment-based)
  - Remove JSON.stringify from high-frequency events
  - Use structured logging with log levels

**Unused Type-Checking in Build Pipeline:**
- Problem: TypeScript type checking included in dev script but not enforced in CI
- Files: `package.json` (line 13 defines `type-check` command but not in build)
- Cause: Type checking runs separately, slowing local development without guarantee in CI
- Improvement path:
  - Add `type-check` to pre-commit hooks
  - Include in CI/CD pipeline before build
  - Consider using TypeScript fast mode for incremental checks

## Fragile Areas

**Global Singleton Socket Instance:**
- Files: `src/lib/socket.ts` (lines 112-113)
- Why fragile: Single global instance means socket state is shared across entire app; no isolation for testing or multiple connections
- Safe modification:
  - Use dependency injection or context API for socket
  - Create socket service per instance rather than global singleton
  - Add tests that verify socket state isolation
- Test coverage: No tests exist for socket service

**Zustand Store with Persistence but No Hydration Guards:**
- Files: `src/stores/UserStore.ts` (lines 23-50)
- Why fragile: Async rehydration from localStorage happens after component mount; race conditions possible
- Safe modification:
  - Always check `status` field before accessing user data
  - Ensure all code paths handle `waiting` state
  - Consider server-side hydration for critical auth state
- Test coverage: No tests for store rehydration or race conditions

**Type-Cast Error Responses Without Validation:**
- Files: `src/api/interceptors.ts` (line 49)
- Why fragile: Any backend response shape change breaks error handler
- Safe modification:
  - Define explicit error response types
  - Add runtime validation (e.g., Zod schema)
  - Test with various error response formats
- Test coverage: No tests for error scenarios

**API URL Configuration Defaults to Invalid Values:**
- Files: `src/config/index.ts` (line 2), `src/utils/const.ts` (lines 2-6)
- Why fragile: Empty string defaults allow app to boot with broken API calls
- Safe modification:
  - Add validation that throws on startup if env vars missing
  - Use `as const` assertions for env var keys
  - Test with and without env vars set
- Test coverage: No tests for configuration validation

## Scaling Limits

**No Request Cancellation Strategy:**
- Current capacity: Unlimited concurrent API requests
- Limit: Too many simultaneous requests can exhaust browser connection limits
- Scaling path:
  - Implement request queuing with max concurrent limits
  - Add request abort logic for navigation changes
  - Use React Query's built-in concurrent request management

**No Rate Limiting on Socket Events:**
- Current capacity: All socket emit/subscribe operations fire immediately
- Limit: Rapid event emission can overwhelm server and client
- Scaling path:
  - Add debounce/throttle for high-frequency events
  - Implement backpressure handling
  - Add event batching for multiple updates

**No Pagination Defaults in API Calls:**
- Current capacity: Unknown; depends on backend implementation
- Limit: Potential for large uncontrolled data transfers
- Scaling path:
  - Enforce pagination on all list endpoints
  - Set sensible defaults (e.g., page size 20-50)
  - Add infinite scroll or pagination UI controls

## Dependencies at Risk

**Zustand Auto-Selector Hook:**
- Risk: `auto-zustand-selectors-hook` is convenience wrapper that auto-generates selectors; maintenance and type safety uncertain
- Impact: Selector generation could break if Zustand API changes
- Migration plan:
  - Use native Zustand selectors instead
  - Manually create typed selector functions
  - Reduces external dependency surface

**Socket.io Client with Manual Event Management:**
- Risk: Manual event listener registration without built-in cleanup risks memory leaks
- Impact: Event listeners accumulate if socket disconnects/reconnects
- Migration plan:
  - Implement proper cleanup in `off()` method with verification
  - Add tests for listener cleanup on disconnect
  - Consider using socket.io-react for integrated lifecycle management

**No Type-Safe Environment Variables:**
- Risk: Environment variables accessed as strings without validation
- Impact: Typos in env var names go undetected until runtime
- Migration plan:
  - Implement Zod or similar for env var schema validation
  - Generate typed env config at build time
  - Fail fast if required vars missing

## Missing Critical Features

**No User Logout Mechanism:**
- Problem: `UserStore` has `logout()` action but no API endpoint or flow to invalidate tokens on backend
- Blocks: Secure logout; users cannot be forced offline server-side
- Recommendation: Add logout endpoint that invalidates refresh token server-side

**No Request Retry Logic:**
- Problem: Failed API requests fail immediately; no exponential backoff or retry attempts
- Blocks: Resilience to temporary network issues; poor UX on flaky connections
- Recommendation: Implement retry wrapper with exponential backoff using React Query

**No Error Boundary Implementation:**
- Problem: No error boundaries defined; React errors crash entire app
- Blocks: Graceful degradation; user can't recover from component errors
- Recommendation: Add error boundaries at page and component level

**No Access Control on Routes:**
- Problem: Routes don't check authentication state before rendering
- Blocks: Unauthenticated users can access protected pages briefly before redirect
- Recommendation: Implement route guards using middleware or layout-level auth checks

## Test Coverage Gaps

**No Unit Tests for API Interceptors:**
- What's not tested: Token refresh flow, error handling, request authorization header injection
- Files: `src/api/interceptors.ts`
- Risk: Auth flow changes could silently break without detection
- Priority: High

**No Tests for State Management:**
- What's not tested: UserStore persistence, rehydration, logout behavior
- Files: `src/stores/UserStore.ts`
- Risk: State mutations could corrupt persisted data or cause race conditions
- Priority: High

**No Tests for Socket Service:**
- What's not tested: Connection lifecycle, event emission/subscription, listener cleanup
- Files: `src/lib/socket.ts`
- Risk: Memory leaks, missed events, or connection state bugs go undetected
- Priority: Medium

**No Integration Tests:**
- What's not tested: Full auth flow, API integration, socket + API interaction
- Files: Multiple
- Risk: End-to-end scenarios fail in production despite component tests passing
- Priority: High

**No E2E Tests:**
- What's not tested: User workflows, authentication, real API interaction
- Files: N/A - no test suite exists
- Risk: Critical user paths break without detection
- Priority: Critical

---

*Concerns audit: 2026-05-08*
