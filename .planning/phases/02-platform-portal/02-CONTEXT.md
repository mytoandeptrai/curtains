---
phase: 02-platform-portal
phase_number: 2
status: locked
created: 2026-05-09
updated: 2026-05-09
author: user + Claude
---

# Phase 2: Platform Portal — Context Document

## Domain

**Phase 2 is a refactoring phase, not a new-features phase.** Before building customer-facing Portal pages (Phase 3+), Phase 1 code must follow established patterns and conventions. This phase establishes the correct architecture so Phases 3, 4, 5, 6 can build on solid foundations.

## Scope

Refactor Phase 1 admin modules to align with enterprise code standards:

- **All admin modules:** categories, products, leads, bookings, blog management, dashboard
- **All components:** UI, containers, hooks, API integrations
- **Goal:** Establish patterns that Phase 2+ will reuse

**Out of scope:** New customer-facing features (Platform Portal UI) — deferred to Phase 3+.

## Locked Requirements

Refactoring rules from `docs/requirements/refactor-phase-1.md`:

### A. API Call Pattern — TanStack Query + HTTP Instance

**Old pattern (Phase 1):** `useEffect` + `fetch` inline in components

**New pattern:** 
- Use TanStack Query (`@tanstack/react-query`) for queries and mutations
- Use HTTP instance instead of raw `fetch` 
- Query/mutation logic in separate `queries.ts` hooks
- Containers call these hooks, not useEffect

**Base examples exist:** 
- `src/api/auth/index.ts` — Login/logout mutations
- `src/api/transactions/index.ts` — Generic query/mutation base (from prior project)
- **Task:** Create equivalent for admin modules: `categories`, `products`, `leads`, `bookings`, `blog`

### B. State Management — URL-based (nuqs)

**Old pattern (Phase 1):** Local `useState` for pagination, filters, sort

**New pattern:**
- Use `nuqs` library to store filters/pagination/sort on URL query params
- Benefits: Shareable URLs, back-button works, browser history retained
- Example: `/admin/products?page=2&sort=name&order=asc`

**Dependencies to install:** `nuqs` (only new one)

### C. Table Rendering — Reusable data-table Component

**Old pattern (Phase 1):** Custom table rendering per module

**New pattern:**
- Use `src/components/ui/data-table/data-table.tsx` (already exists in codebase)
- Define columns in `create-columns.tsx`
- Container/hook manages pagination/sorting/filtering logic
- Table component receives data + handlers

### D. Create/Edit Forms — Complete Field Coverage

**Old pattern (Phase 1):** Minimal fields (3-4 per form)

**New pattern:**
- Product/Category/Booking/Blog forms must include ALL schema fields
- Images: support upload + preview (use dropzone pattern from refactor doc)
- Rich text for descriptions: use `form-minimal-tiptap` instead of textarea
- SEO fields included where applicable (products, blog, categories)

### E. Rich Text Editor

**For description/content fields:**
- Replace `FormTextarea` with `form-minimal-tiptap` 
- Modules affected: products, blog, categories (where SEO matters)

## Dependencies to Add

Only **`nuqs`** needs installing (others already installed):
```bash
pnpm add nuqs
```

## Timeline

**1-2 weeks** — Foundational refactoring before moving to new features.

## Refactor Sequence

All modules at once (not sequential). This establishes patterns uniformly:
1. categories
2. products (most complex — variants, images, extras)
3. leads
4. bookings
5. blog
6. dashboard (stats)

## Branch Strategy

- Work on `develop` branch
- No merge to `main` yet — `main` stays at Phase 1 stable state

## Success Criteria

After Phase 2 refactor completes:
- All admin modules use TanStack Query + HTTP instance pattern
- All list pages use `nuqs` for URL-based pagination/filters
- All tables use `data-table` component
- All forms include complete field coverage
- TypeScript clean (`npx tsc --noEmit` passes)
- Phase 3+ can fork frontend Portal features off Phase 2 patterns

## Canonical References

None external — refactor rules locked in `docs/requirements/refactor-phase-1.md`

## Notes for Downstream Agents

- Researcher: Not needed (refactor plan is complete)
- Planner: CONTEXT.md (this file) is the spec — all requirements locked
- Executor: Detailed code examples in `refactor-phase-1.md` (use them as templates)
