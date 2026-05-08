---
phase: 01-admin-dashboard
plan: 02
subsystem: auth
tags: [supabase, supabase-ssr, zustand, next-middleware, typescript, react-hook-form, zod]

requires:
  - phase: 01-admin-dashboard/01-01
    provides: "Zod schemas (adminLoginSchema, passwordResetSchema) in src/lib/schemas/auth.ts"

provides:
  - Supabase Auth login/logout/password-reset API routes with admin_users table verification
  - Zustand admin-auth-store with localStorage session persistence (remember-me pattern)
  - useAdminAuth custom hook with login(), logout(), requestPasswordReset() methods
  - Public login page with React Hook Form + Zod validation and toast feedback
  - Next.js middleware protecting all /admin/* routes (redirect to /login if no session)
  - Admin layout updated with admin email display and logout button in header

affects:
  - 01-03 (category management - all admin CRUD routes require valid session)
  - 01-04 (product management - same)
  - 01-05 (lead/booking/blog management - same)
  - 02-platform-portal (middleware pattern established)

tech-stack:
  added:
    - "@supabase/supabase-js ^2.105.4"
    - "@supabase/ssr ^0.10.3"
  patterns:
    - "Supabase SSR cookie pattern: getAll/setAll in route handlers and middleware"
    - "Zustand persist middleware with createJSONStorage(() => localStorage) for token storage"
    - "Defense-in-depth: middleware (server) + useAdminAuth (client) both guard admin routes"
    - "T-02-006: login API verifies email exists in admin_users table (not just any Supabase user)"

key-files:
  created:
    - src/stores/admin-auth-store.ts
    - src/hooks/use-admin-auth.ts
    - src/app/login/page.tsx
    - src/app/api/admin/auth/login/route.ts
    - src/app/api/admin/auth/logout/route.ts
    - src/app/api/admin/auth/reset-password/route.ts
    - src/app/api/admin/auth/verify-reset-link/route.ts
    - src/middleware.ts
  modified:
    - src/app/admin/layout.tsx
    - src/components/layouts/admin-layout/components/app-header/app-header.tsx
    - package.json (added @supabase/ssr, @supabase/supabase-js)

key-decisions:
  - "Used @supabase/ssr getAll/setAll cookie pattern (not deprecated get/set/remove) for Next.js 15 compatibility"
  - "Middleware placed at src/middleware.ts (not src/app/middleware.ts) - Next.js requires root-level src/"
  - "Admin layout guard is defense-in-depth after middleware (handles edge cases where cookies are cleared client-side)"
  - "Login API signs user out of Supabase if admin_users check fails (prevents orphaned sessions)"
  - "createJSONStorage SSR-safe wrapper used instead of direct localStorage reference (avoids SSR crash)"

patterns-established:
  - "Supabase SSR pattern: all route handlers use createServerClient with cookieStore.getAll()/setAll()"
  - "Middleware pattern: createServerClient in middleware with request.cookies.getAll() + response.cookies.set()"

requirements-completed:
  - AUTH-01
  - AUTH-02
  - AUTH-03
  - AUTH-04

duration: 25min
completed: 2026-05-09
---

# Phase 1 Plan 02: Admin Authentication Summary

**Supabase Auth integration with persistent Zustand sessions, protected middleware, login page, 4 auth API routes, and admin_users table verification**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-05-09T00:00:00Z
- **Completed:** 2026-05-09T00:25:00Z
- **Tasks:** 6
- **Files modified:** 10

## Accomplishments

- Admin auth Zustand store persisting access_token, refresh_token, admin_id, admin_email to localStorage
- useAdminAuth hook with login(), logout(), requestPasswordReset() wrapping API calls
- Public login page at /login with React Hook Form + Zod, toast notifications, redirect-if-authenticated
- 4 auth API routes: login (with admin_users verification), logout, reset-password, verify-reset-link
- Next.js middleware at src/middleware.ts protecting all /admin/* routes via Supabase session check
- Admin header updated with admin email display and logout button

## Task Commits

1. **Task 1: Admin auth Zustand store** - `3262d22` (feat)
2. **Task 2: useAdminAuth custom hook** - `f68b058` (feat)
3. **Task 3: Login page** - `4b7e315` (feat)
4. **Task 4: Auth API routes (login, logout, reset-password, verify-reset-link)** - `f6126d7` (feat)
5. **Task 5: Next.js middleware** - `fd6422f` (feat)
6. **Task 6: Admin layout + AppHeader auth integration** - `1ec3e0f` (feat)

## Files Created/Modified

- `src/stores/admin-auth-store.ts` - Zustand store with persist middleware, localStorage session storage
- `src/hooks/use-admin-auth.ts` - Custom hook: login, logout, requestPasswordReset, isAuthenticated
- `src/app/login/page.tsx` - Public login page with React Hook Form + Zod + toast
- `src/app/api/admin/auth/login/route.ts` - Supabase signInWithPassword + admin_users table check
- `src/app/api/admin/auth/logout/route.ts` - Supabase signOut
- `src/app/api/admin/auth/reset-password/route.ts` - Supabase resetPasswordForEmail
- `src/app/api/admin/auth/verify-reset-link/route.ts` - Supabase verifyOtp + updateUser password
- `src/middleware.ts` - Next.js middleware protecting /admin/* routes
- `src/app/admin/layout.tsx` - Added 'use client', useAdminAuth client-side guard
- `src/components/layouts/admin-layout/components/app-header/app-header.tsx` - Admin email + logout button
- `package.json` - Added @supabase/ssr ^0.10.3, @supabase/supabase-js ^2.105.4

## Decisions Made

- Used `@supabase/ssr` `getAll/setAll` cookie API (not deprecated `get/set/remove`) for Next.js 15 App Router compatibility
- Middleware placed at `src/middleware.ts` (root src level, required by Next.js); plan specified `src/app/middleware.ts` which does not work
- Login API signs user out of Supabase immediately if `admin_users` table check fails (prevents orphaned sessions - threat T-02-006)
- `createJSONStorage` SSR-safe wrapper used in Zustand persist to avoid `localStorage is not defined` on server
- Admin layout added client-side redirect guard as defense-in-depth after middleware (covers edge case of cleared cookies)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Installed missing Supabase dependencies**
- **Found during:** Task 4 (auth API routes)
- **Issue:** @supabase/ssr and @supabase/supabase-js not in package.json; all imports would fail
- **Fix:** Ran `pnpm add @supabase/supabase-js @supabase/ssr`
- **Files modified:** package.json, pnpm-lock.yaml
- **Verification:** Imports resolve, packages available
- **Committed in:** Part of Task 4 commit f6126d7

**2. [Rule 1 - Bug] Middleware file location corrected**
- **Found during:** Task 5 (middleware creation)
- **Issue:** Plan specified `src/app/middleware.ts` - this path is NOT recognized by Next.js. Middleware must be at `src/middleware.ts` (root of src/)
- **Fix:** Created file at correct path `src/middleware.ts`
- **Files modified:** src/middleware.ts (correct path)
- **Verification:** File at correct location per Next.js docs
- **Committed in:** fd6422f

**3. [Rule 1 - Bug] Used @supabase/ssr getAll/setAll pattern instead of deprecated get/set/remove**
- **Found during:** Task 4 (API routes)
- **Issue:** Plan's code examples used old `get/set/remove` cookie API which @supabase/ssr v0.5+ deprecated in favor of `getAll/setAll`
- **Fix:** Updated all createServerClient calls to use getAll/setAll pattern
- **Files modified:** All 4 auth route files, src/middleware.ts
- **Verification:** Matches current @supabase/ssr documentation
- **Committed in:** f6126d7, fd6422f

**4. [Rule 1 - Bug] SSR-safe localStorage wrapper in Zustand persist**
- **Found during:** Task 1 (admin-auth-store)
- **Issue:** Plan code used `typeof window !== 'undefined' ? localStorage : undefined` - Zustand persist expects a Storage object (not undefined), would throw on SSR
- **Fix:** Used `createJSONStorage(() => localStorage)` with proper SSR fallback object returning null/noop
- **Files modified:** src/stores/admin-auth-store.ts
- **Verification:** Zustand persist storage is always a valid object
- **Committed in:** 3262d22

---

**Total deviations:** 4 auto-fixed (1 blocking, 3 bugs)
**Impact on plan:** All auto-fixes essential for correctness and Next.js compatibility. No scope creep.

## Issues Encountered

None beyond the auto-fixed deviations above.

## User Setup Required

The following environment variables must be added to `.env.local` before auth will work:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Additionally, an admin user must be seeded in the `admin_users` table in Supabase (the login route checks this table). The Supabase Auth user and admin_users row must have matching emails.

## Known Stubs

None - all auth flows are fully wired to Supabase.

## Threat Flags

No new threat surface introduced beyond what was in the plan's threat model.

## Next Phase Readiness

- Auth system complete: login, logout, session persistence, route protection, password reset
- All /admin/* routes protected by middleware
- useAdminAuth hook available for any component needing auth state
- Admin header displays logged-in user email and logout button
- Ready for Phase 1.3+ (category, product, lead, booking, blog management)

---
*Phase: 01-admin-dashboard*
*Completed: 2026-05-09*
