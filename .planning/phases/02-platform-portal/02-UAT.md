---
status: testing
phase: 02-platform-portal
source: 02-01-SUMMARY.md, 02-02-SUMMARY.md, 02-03-SUMMARY.md, 02-04-SUMMARY.md, 02-05-SUMMARY.md, 02-06-SUMMARY.md, 02-07-SUMMARY.md, 02-08-SUMMARY.md
started: 2026-05-09T00:00:00Z
updated: 2026-05-09T00:00:00Z
---

## Current Test

<!-- OVERWRITE each test - shows where we are -->

number: 1
name: Cold Start Smoke Test
expected: |
  Kill any running dev server. Clear cache/node_modules if needed. Start with `pnpm dev`. Server boots without errors. Navigate to http://localhost:3000. No crash. Navigate to http://localhost:3000/admin and redirect to /login (not 500 error).
awaiting: user response

## Tests

### 1. Cold Start Smoke Test
expected: Server boots clean, http://localhost:3000 loads, /admin redirects to /login without errors
result: pending

### 2. Admin Login
expected: At /login, enter valid admin credentials. "Đăng nhập thành công" toast appears, redirect to /admin dashboard, admin email shown in header.
result: pending

### 3. Admin Dashboard Display
expected: After login, /admin shows stat cards (leads today/week/month, conversion rate, confirmed bookings, top products). Numbers may be 0, but cards render without errors.
result: pending

### 4. Category List with URL State
expected: Navigate to /admin/categories. Table displays with pagination controls. URL contains query params (page, pageSize, sortBy, orderBy, search). Clicking pagination/sort updates URL without page reload. Search input filters categories.
result: pending

### 5. Category Create Form (5 fields)
expected: Click create on /admin/categories. Form appears with 5 fields: name, slug, description, seo_title, seo_description. Fill all fields. Click submit. Success toast appears, new category shows in list.
result: pending

### 6. Category Edit Form (5 fields)
expected: Click edit on a category. Form pre-fills all 5 fields from existing data. Change name. Click save. Success toast, changes reflected in list.
result: pending

### 7. Product List with URL State and Filtering
expected: Navigate to /admin/products. Table displays with pagination controls. URL contains query params (page, pageSize, sortBy, orderBy, search, category, featured). Filter by category or featured toggle updates URL and filters table. Search works.
result: pending

### 8. Product Create Form (18 fields with variants and rich text)
expected: Navigate to /admin/products/create. Form renders 18 fields across 6 sections: Basic (name, sku, slug), Pricing (price, salePrice, stockQuantity, unit), Details (category, description with rich text editor, featured toggle), Attributes (color, material, finish), Variants (add/remove buttons for variants array), Images (primary image + additional images), SEO (metaTitle, metaDescription). Submit fills with test data. Success toast, product appears in list.
result: pending

### 9. Product Description Uses Rich Text Editor
expected: On product create/edit form, the description field uses a rich text editor (FormMinimalTiptap), not a plain textarea. Toolbar visible. Formatting buttons work.
result: pending

### 10. Product Variants Management
expected: On product create form, Variants section has add button. Click add. New variant row appears with color, material, finish, layers fields. Fill fields. Click remove removes that variant. Submit form saves all variants to database.
result: pending

### 11. Product Image Upload
expected: On product create/edit form, two image sections present: primary image (imageUrl, required) and additional images (images, optional, multiple). Both support file upload with preview. Submit saves image data.
result: pending

### 12. Product Edit Form (18 fields pre-filled)
expected: Click edit on a product. Form pre-fills all 18 fields from existing data including variants and images. Edit description using rich text editor. Add/remove variants. Update images. Submit saves all changes.
result: pending

### 13. Lead List with URL State
expected: Navigate to /admin/leads. Table displays leads with pagination controls. URL contains query params (page, pageSize, sortBy, orderBy, search, status). Filter by status updates URL. Search works.
result: pending

### 14. Lead Edit Form (5 fields)
expected: Click edit on a lead. Form shows 5 editable fields: name, phone, address, status (dropdown), notes. Change status to "contacted". Click save. Success toast, changes reflected in list.
result: pending

### 15. Booking List with URL State
expected: Navigate to /admin/bookings. Table displays bookings with pagination controls. URL contains query params (page, pageSize, sortBy, orderBy, search, status). Status column shows color-coded badges (pending=orange, confirmed=green, done=gray).
result: pending

### 16. Booking Create Form (5 fields)
expected: Navigate to /admin/bookings/create. Form renders 5 fields: lead_id (dropdown), booking_date (date input), booking_time (time input), status (dropdown), notes (textarea). Fill all. Submit. Success toast, booking appears in list.
result: pending

### 17. Booking Edit Form (5 fields)
expected: Click edit on a booking. Form pre-fills all 5 fields. Change status to "confirmed". Click save. Success toast, changes reflected in list.
result: pending

### 18. Blog List with URL State
expected: Navigate to /admin/blog. Table displays blog posts with pagination controls. URL contains query params (page, pageSize, sortBy, orderBy, search, status). Filter by status updates URL.
result: pending

### 19. Blog Create Form (8 fields with rich text)
expected: Navigate to /admin/blog/create. Form renders 8 fields: title, slug, content (FormMinimalTiptap rich text editor), excerpt, thumbnail_url (optional), seo_title, seo_description, published checkbox. Fill required fields. Submit. Success toast, blog post appears in list.
result: pending

### 20. Blog Content Field Uses Rich Text Editor
expected: On blog create/edit form, content field uses FormMinimalTiptap (rich text editor with toolbar), not plain textarea. Markdown editing supported.
result: pending

### 21. Blog Edit Form (8 fields pre-filled)
expected: Click edit on a blog post. Form pre-fills all 8 fields including rich text content. Edit content using editor. Change published status. Submit saves all changes.
result: pending

### 22. Dashboard Auto-Refresh
expected: On /admin dashboard, dashboard stats (leads, conversion rate, confirmed bookings, top products) load. Wait 60+ seconds. Stats auto-refresh without user action. Network request fires every 60 seconds.
result: pending

### 23. TypeScript Compilation Clean
expected: Run `npx tsc --noEmit` in project root. Command completes with exit code 0 (no TypeScript errors).
result: pending

## Summary

total: 23
passed: 0
issues: 0
pending: 23
skipped: 0
blocked: 0

## Gaps

[none yet]
