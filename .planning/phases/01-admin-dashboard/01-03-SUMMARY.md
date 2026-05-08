---
phase: 01-admin-dashboard
plan: 03
subsystem: api-routes
tags: [nextjs, supabase, rest-api, crud, soft-delete, zod, typescript]

requires:
  - 01-01 (Zod schemas, TypeScript types, database schema)

provides:
  - REST API routes for all 5 admin resources: categories, products, leads, bookings, blog posts
  - Product sub-resources: variants and images
  - Supabase server client helper for Next.js 15 async cookies API
  - Pagination and filtering for all list endpoints

affects:
  - 01-admin-dashboard (Plans 04-05 consume these API routes for admin UI)
  - 02-platform-portal (leads POST route reused in Phase 2 lead capture form)

tech-stack:
  added:
    - "@supabase/ssr ^0.10.3"
    - "@supabase/supabase-js ^2.105.4"
  patterns:
    - "Next.js 15 async params: params typed as Promise<{ id: string }>, awaited inside handler"
    - "Supabase server client via createSupabaseServerClient() helper with async cookies()"
    - "Soft delete pattern: .update({ deleted_at: new Date().toISOString() }) instead of hard delete"
    - "Auth gate: getSession() checked at start of every handler, 401 on missing session"
    - "Zod validation in POST/PUT: parse() throws ZodError -> caught and returned as 400"
    - "Product extras replace-on-update: soft-delete all old extras, insert new ones"

key-files:
  created:
    - src/lib/supabase/server.ts
    - src/app/api/admin/categories/route.ts
    - src/app/api/admin/categories/[id]/route.ts
    - src/app/api/admin/products/route.ts
    - src/app/api/admin/products/[id]/route.ts
    - src/app/api/admin/products/[id]/variants/route.ts
    - src/app/api/admin/products/[id]/variants/[variantId]/route.ts
    - src/app/api/admin/products/[id]/images/route.ts
    - src/app/api/admin/products/[id]/images/[imageId]/route.ts
    - src/app/api/admin/leads/route.ts
    - src/app/api/admin/leads/[id]/route.ts
    - src/app/api/admin/bookings/route.ts
    - src/app/api/admin/bookings/[id]/route.ts
    - src/app/api/admin/blog/route.ts
    - src/app/api/admin/blog/[id]/route.ts
  modified:
    - package.json (added @supabase/ssr, @supabase/supabase-js)
    - pnpm-lock.yaml

key-decisions:
  - "Used async params (Promise<{ id }>) pattern for Next.js 15 compatibility instead of sync params from plan"
  - "Created shared createSupabaseServerClient() helper instead of inlining client creation in every route"
  - "Installed @supabase/ssr and @supabase/supabase-js (not in package.json before this plan)"

duration: ~12min
completed: 2026-05-09
---

# Phase 1 Plan 03: CRUD API Routes Summary

**12 REST API route files across 5 admin resources using Supabase server client with Next.js 15 async params, Zod validation, session-based auth gate, and soft-delete pattern**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-05-08T18:30:31Z
- **Completed:** 2026-05-08T18:42:00Z
- **Tasks:** 3
- **Files created:** 15 (14 route files + 1 Supabase helper)

## Accomplishments

- Supabase server client helper (`src/lib/supabase/server.ts`) with Next.js 15 async `cookies()` API
- Category CRUD: GET/POST list+create, PUT/DELETE edit+soft-delete
- Product CRUD: GET/POST with category/featured filters, PUT/DELETE with extras replace-on-update; sub-routes for variants (GET/POST/PUT/DELETE) and images (GET/POST/PUT/DELETE)
- Lead CRUD: GET with status/date/product_id/search filters, POST for admin-created leads, PUT/DELETE
- Booking CRUD: GET with status/date filters and lead join, POST with Zod validation, PUT/DELETE
- Blog CRUD: GET with published filter and title/slug search, POST with full Zod validation, PUT/DELETE

## Task Commits

1. **Task 1: Category CRUD API routes** - `376bb40` (feat)
2. **Task 2: Product CRUD API routes with variants and images** - `755482f` (feat)
3. **Task 3: Lead, booking, and blog CRUD API routes** - `9fbb7a0` (feat)

## API Endpoint Summary

| Resource | GET (list) | POST (create) | PUT (edit) | DELETE (soft-delete) |
|----------|-----------|---------------|------------|----------------------|
| /api/admin/categories | paginate, search | Zod validate | Zod validate | deleted_at |
| /api/admin/products | paginate, search, category, featured | Zod + extras insert | Zod + extras replace | deleted_at |
| /api/admin/products/[id]/variants | list active | name required | name update | deleted_at |
| /api/admin/products/[id]/images | list active | image_url required | is_featured update | deleted_at |
| /api/admin/leads | paginate, search, status, date, product | field validation | Zod validate | deleted_at |
| /api/admin/bookings | paginate, status, date, lead join | Zod validate | Zod validate | deleted_at |
| /api/admin/blog | paginate, search, published | Zod validate | Zod validate | deleted_at |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Supabase packages not installed**
- **Found during:** Task 1 setup
- **Issue:** `@supabase/ssr` and `@supabase/supabase-js` not present in `package.json`; plan assumed they existed
- **Fix:** Installed both packages via `pnpm add @supabase/ssr @supabase/supabase-js`
- **Files modified:** `package.json`, `pnpm-lock.yaml`
- **Commit:** `376bb40`

**2. [Rule 2 - Missing critical functionality] Shared Supabase server client helper**
- **Found during:** Task 1
- **Issue:** Plan inlined `createServerClient(...)` in every route handler; this creates duplication and makes cookie config changes brittle
- **Fix:** Created `src/lib/supabase/server.ts` with `createSupabaseServerClient()` reused by all routes
- **Files modified:** `src/lib/supabase/server.ts`
- **Commit:** `376bb40`

**3. [Rule 1 - Bug] Next.js 15 async params API**
- **Found during:** Task 1
- **Issue:** Plan used sync `{ params }: { params: { id: string } }` pattern which is deprecated in Next.js 15 (causes runtime warning/error)
- **Fix:** Used `{ params }: { params: Promise<{ id: string }> }` with `const { id } = await params` in all `[id]` routes
- **Files modified:** All `[id]/route.ts` files
- **Commits:** `376bb40`, `755482f`, `9fbb7a0`

## Known Stubs

None - all API routes are fully implemented. No hardcoded placeholders or TODO items.

## Threat Flags

None - no new trust boundaries introduced beyond those in the plan's threat model. All new endpoints are admin-authenticated (session check at every handler entry).

## Self-Check: PASSED

Files verified:
- `src/lib/supabase/server.ts` - FOUND
- `src/app/api/admin/categories/route.ts` - FOUND
- `src/app/api/admin/categories/[id]/route.ts` - FOUND
- `src/app/api/admin/products/route.ts` - FOUND
- `src/app/api/admin/products/[id]/route.ts` - FOUND
- `src/app/api/admin/products/[id]/variants/route.ts` - FOUND
- `src/app/api/admin/products/[id]/variants/[variantId]/route.ts` - FOUND
- `src/app/api/admin/products/[id]/images/route.ts` - FOUND
- `src/app/api/admin/products/[id]/images/[imageId]/route.ts` - FOUND
- `src/app/api/admin/leads/route.ts` - FOUND
- `src/app/api/admin/leads/[id]/route.ts` - FOUND
- `src/app/api/admin/bookings/route.ts` - FOUND
- `src/app/api/admin/bookings/[id]/route.ts` - FOUND
- `src/app/api/admin/blog/route.ts` - FOUND
- `src/app/api/admin/blog/[id]/route.ts` - FOUND

Commits verified:
- `376bb40` feat(01-03): create category CRUD API routes - FOUND
- `755482f` feat(01-03): create product CRUD API routes with variants and images - FOUND
- `9fbb7a0` feat(01-03): create lead, booking, and blog CRUD API routes - FOUND

---
*Phase: 01-admin-dashboard*
*Completed: 2026-05-09*
