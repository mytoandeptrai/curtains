---
phase: 02-platform-portal
plan: 05
type: execute
status: completed
completed_date: 2026-05-09
duration: "~30 minutes"
tasks_completed: 5
files_created: 2
files_modified: 9
---

# Phase 2 Plan 05: Lead & Booking List/Form Refactoring Summary

Refactored lead and booking management modules to follow the identical nuqs + TanStack Query + data-table pattern established in Plan 04 (categories/products). All 4 critical admin modules (categories, products, leads, bookings) now use consistent architecture for list rendering and form handling.

## Completed Tasks

| Task | Name | Status | Commit |
|------|------|--------|--------|
| 1 | Refactor lead list container, hook, and add data-table rendering | ✓ Complete | 03cf09f |
| 2 | Refactor lead edit containers and hooks (mutations) | ✓ Complete | 75deb00 |
| 3 | Refactor booking list container, hook, and add data-table rendering | ✓ Complete | 1e045e0 |
| 4 | Refactor booking create/edit containers and hooks | ✓ Complete | 576ca1e |
| 5 | Verify TypeScript compilation for all container and data-table refactoring | ✓ Complete | d6e0f40 |

## Key Changes

### Task 1: Lead List Refactoring
- **useLeadListContainer** hook created with nuqs URL state management (page, pageSize, sortBy, orderBy, search, status)
- Default sort: `created_at` descending
- **create-columns.tsx** file created with ILead column definitions
- Status column renders with color-coded badges (new=blue, contacted=yellow, closed=gray)
- Container updated to use DataTable component matching category/product pattern

### Task 2: Lead Edit Refactoring  
- **useLeadEdit** hook refactored to use useGetLeadDetail and useUpdateLeadMutation from @/api/leads
- Uses TanStack Query for both data fetching and mutations
- Implements query invalidation on successful update
- Maps new API fields (customer_name, customer_phone) to legacy schema fields (name, phone) for backward compatibility

### Task 3: Booking List Refactoring
- **useBookingListContainer** hook created with nuqs URL state management (page, pageSize, sortBy, orderBy, search, status)
- Default sort: `booking_date` descending  
- **create-columns.tsx** file created with IBooking column definitions
- Status column renders with color-coded badges (pending=orange, confirmed=green, done=gray)
- Container updated to use DataTable component matching pattern

### Task 4: Booking Create/Edit Refactoring
- **useBookingCreateForm** hook refactored to use useCreateBookingMutation from @/api/bookings
- **useBookingEditForm** hook refactored to use useGetBookingDetail and useUpdateBookingMutation
- Both hooks implement query invalidation on success
- Containers handle lead options fetching to maintain UI compatibility
- Removed internal state management in favor of TanStack Query mutations

### Task 5: TypeScript Verification
- Full TypeScript compilation passes (`npx tsc --noEmit`)
- All module imports resolve correctly
- Type safety maintained across all containers and hooks
- Backward compatibility exports added (Lead, Booking interfaces) for legacy UI components

## Architecture Consistency

All 4 critical modules now follow identical pattern:

```
List Module Pattern:
- Hook: useXxxListContainer() with nuqs + useGetXxxList
- Container: imports DataTable, createColumns, uses handlers
- Columns: createColumns() returns ColumnDef<T>[] with status badges
- Search: unified input field calls onSearchChange

Create Module Pattern:
- Hook: useXxxCreateForm() with useCreateXxxMutation
- Container: manages additional data (lead options) if needed
- Form: React Hook Form + Zod validation

Edit Module Pattern:
- Hook: useXxxEditForm(id) with useGetXxxDetail + useUpdateXxxMutation
- Container: renders loading state while fetching
- Form: React Hook Form + Zod validation
```

## Files Created

1. `/src/modules/lead-management/components/lead-list-ui/create-columns.tsx` — ILead column definitions
2. `/src/modules/booking-management/components/booking-list-ui/create-columns.tsx` — IBooking column definitions

## Files Modified

1. `/src/modules/lead-management/hooks/use-lead-list.ts` — Refactored with nuqs and TanStack Query
2. `/src/modules/lead-management/containers/lead-list-container.tsx` — Updated to use DataTable
3. `/src/modules/lead-management/hooks/use-lead-edit.ts` — Refactored with TanStack Query mutations
4. `/src/modules/lead-management/containers/lead-edit-container.tsx` — Updated for new hook signature
5. `/src/modules/booking-management/hooks/use-booking-list.ts` — Refactored with nuqs and TanStack Query
6. `/src/modules/booking-management/containers/booking-list-container.tsx` — Updated to use DataTable
7. `/src/modules/booking-management/hooks/use-booking-create.ts` — Refactored with TanStack Query mutations
8. `/src/modules/booking-management/containers/booking-create-container.tsx` — Updated with lead options handling
9. `/src/modules/booking-management/hooks/use-booking-edit.ts` — Refactored with TanStack Query mutations
10. `/src/modules/booking-management/containers/booking-edit-container.tsx` — Updated with lead options handling

## Deviations from Plan

**Rule 2 - Auto-fix: TypeScript Type Compatibility**
- **Found during:** Task 5 (TypeScript verification)
- **Issue:** Old UI components (LeadListUI, BookingListUI, BookingCreateUI, BookingEditUI) expected properties from Phase 1 API (products, leads relations, email field)
- **Fix:** Added backward compatibility exports (Lead, Booking interfaces extending ILead/IBooking) and field mapping in lead-edit hook to map new API fields to old schema fields
- **Commit:** d6e0f40
- **Rationale:** Phase 1 UI components are not refactored in this plan (deferred to Phase 2 form refactoring plans). Backward compatibility ensures containers work with existing UI while establishing new hook patterns.

## Threat Surface Coverage

All threat mitigations from threat_model are addressed:

| Threat ID | Category | Mitigation |
|-----------|----------|-----------|
| T-02-15 | URL Params (Lead) | useQueryStates enforces type parsing with nuqs |
| T-02-16 | URL Params (Booking) | useQueryStates enforces type parsing with nuqs |
| T-02-21 | DataTable Injection | Column cell renderers use React JSX (auto-escaped) |

## Verification Results

✓ All 5 tasks completed  
✓ TypeScript compilation passes  
✓ All 4 modules (categories, products, leads, bookings) follow identical container + data-table pattern  
✓ nuqs URL state management consistent across all list pages  
✓ TanStack Query mutations implemented for all create/edit operations  
✓ DataTable component used for all list rendering  
✓ Status badges color-coded per module requirements  
✓ Backward compatible with Phase 1 UI components  

## Next Steps

Plan 06 will refactor blog and dashboard containers using the same pattern established here, completing the container + data-table standardization across all admin modules.

Forms (create/edit UI components) will be refactored in Plans 07-08 to use complete field coverage, rich text editors, and image uploads as specified in Phase 2 CONTEXT.
