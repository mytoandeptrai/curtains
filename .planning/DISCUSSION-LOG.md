# Phase 1 Discussion Log

**Date:** 2026-05-09  
**Phase:** 1 (Admin Dashboard)  
**Facilitator:** Claude Code  
**Participant:** User

---

## Discussion Summary

Phase 1 discussion covered **4 gray areas** across **business, technical, and implementation** domains. All areas resolved with locked decisions.

### Timeline

- **Duration:** Single session
- **Method:** Interactive questioning with option sets
- **Result:** 3 business areas + 4 technical areas fully discussed

---

## Area 1: Database & Auth (Business/Technical)

**Gray Areas Identified:**
1. How to handle product soft deletion?
2. Foreign key constraints for variants/images/leads?
3. How to handle variant deletion when leads reference them?

**User Decisions:**
- Product deletion: `deleted_at` timestamp (NULL = active)
- Foreign key: RESTRICT (cannot delete product if has child records)
- Variant deletion: Soft delete with `deleted_at` (preserve lead history)

**Rationale:** Protect data integrity while keeping audit trail for customer records

---

## Area 2: Pricing Formula (Business)

**Gray Areas Identified:**
1. How to calculate base price?
2. How to handle extras (cutting, sewing)?
3. How to store and calculate estimated price?

**User Decisions:**
- Base pricing: Set per product (`products.base_price`)
- Extras: Both fixed amount AND per-m² pricing allowed
- Calculation: Client-side formula (width × height × base_price + extras)
- Persist: Save `estimated_price` in leads table

**Rationale:** Client-side calculation is fast and requires no API call during form entry

---

## Area 3: Product Management (Technical/UX)

**Gray Areas Identified:**
1. How to handle image upload UI?
2. How to handle variant-specific images?
3. How to manage featured products?

**User Decisions:**
- Image upload: Simple list (upload 1, add to list, delete)
- Variant images: Override with variant images (fall back to product image)
- Featured: Toggle checkbox (no ordering)

**Rationale:** Simplicity over complexity - minimum viable UX for admin

---

## Area 4: API Routes & Data Flow (Technical)

**Gray Areas Identified:**
1. How to handle admin sessions and authentication?
2. What filtering/sorting capabilities needed for list pages?

**User Decisions:**
- Session: Supabase Auth (built-in cookies)
- Filtering: Pagination + search + sort + aggregation
- Metadata: Return total count and stats with list responses

**Rationale:** Leverage Supabase built-ins to reduce custom code

---

## Area 5: Component Structure (Technical)

**Gray Areas Identified:**
1. How to structure admin dashboard layout?
2. How to structure CRUD forms?
3. How to handle form errors and success feedback?

**User Decisions:**
- Layout: Shared Layout component (sidebar + main)
- Forms: Separate create/edit components
- Errors: Toast notifications (no modals)

**Rationale:** Shared layout prevents repetition; separate forms allow create/edit-specific UX; toasts keep UX lightweight

---

## Area 6: Form Handling & Validation (Technical/Implementation)

**Gray Areas Identified:**
1. Where to define Zod schemas?
2. Real-time price calculator approach?

**User Decisions:**
- Zod schemas: `lib/schemas/` (shared between form and API)
- Price calculator: Client-side formula (no API calls)

**Rationale:** Shared schemas prevent validation duplication; client-side calculation = faster UX

**Additional Input:** User has existing form component base in `demo-form.tsx` with reusable field components. All Phase 1 forms will follow this pattern.

---

## Area 7: Email Service (Configuration)

**User Input:** Resend API key provided
- Service: Resend
- API Key: `re_4BeEpsAZ_GYw7peT2yvujjcA1p5GM67js`
- Storage: `.env.local` (not in code)
- Templates: Customer confirmation + admin notification

**Note:** Key should NOT be committed to git (add to `.env.local` and `.gitignore`)

---

## Area 8: Authentication Flow (Technical)

**Gray Areas Identified:**
1. Password reset mechanism?
2. Session timeout?

**User Decisions:**
- Password reset: Email reset link
- Session timeout: Never timeout (remember me)

**Rationale:** Email link is standard; remember me = better UX for single admin

---

## Deferred Decisions

These decisions were NOT needed for Phase 1 context and are deferred to implementation:
- Dashboard charts library choice (Chart.js, Recharts, etc.)
- Image storage solution (Supabase Storage vs. external)
- Markdown editor for blog (implementation choice)
- Calendar view for bookings (can be simple list initially)

---

## Key Insights

1. **Simplicity first:** User prioritizes simple UX (checkbox for featured, simple image list, no drag-drop)
2. **Client-side wins:** Price calculation and validation happen in browser (faster UX)
3. **Data preservation:** Soft deletes and RESTRICT constraints protect customer history
4. **Reuse existing patterns:** Form components already designed - just follow demo-form.tsx

---

## Next Steps

1. ✅ Write `1-CONTEXT.md` with locked decisions
2. ✅ Document discussion in this log
3. → Commit planning documents to git
4. → `/gsd-plan-phase 1` (create detailed execution plan)
5. → `/gsd-execute-phase 1` (start implementation)

---

*Discussion completed: 2026-05-09*  
*All gray areas resolved ✓*  
*Ready for planning*
