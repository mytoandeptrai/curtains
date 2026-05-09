---
status: complete
phase: 01-admin-dashboard
source: 01-01-SUMMARY.md, 01-02-SUMMARY.md, 01-03-SUMMARY.md, 01-04-SUMMARY.md, 01-05-SUMMARY.md
started: 2026-05-09T00:00:00Z
updated: 2026-05-09T11:00:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Cold Start Smoke Test
expected: Kill any running dev server. Start fresh with `pnpm dev`. Server boots without errors. Navigating to http://localhost:3000 loads without a crash. Navigating to http://localhost:3000/admin redirects to /login (not a 500 error).
result: pass

### 2. Admin Login
expected: Go to /login. Enter valid admin email and password, click Đăng nhập. A success toast appears ("Đăng nhập thành công") and you are redirected to /admin dashboard. The admin header shows your email address.
result: pass

### 3. Route Protection (unauthenticated)
expected: Open a private/incognito window. Navigate directly to /admin. You should be immediately redirected to /login without seeing any admin content.
result: pass

### 4. Logout
expected: While logged in, click the Đăng xuất (logout) button in the admin header. You are redirected to /login and can no longer access /admin without logging in again.
result: pass

### 5. Dashboard Stats
expected: After logging in, the /admin page shows stat cards: leads today, leads this week, leads this month, conversion rate, confirmed bookings, and a top products table. Numbers may be 0 if no data yet, but cards render without errors.
result: pass

### 6. Category List
expected: Navigate to /admin/categories. A table/list of categories appears (or an empty state if no data). Pagination controls are visible. A "Create" button or link is present.
result: pass

### 7. Category Create
expected: Click the create button on /admin/categories. You land on a form with fields: Category Name, Slug, Description, SEO Title, SEO Description. Fill in a name, click Create Category. A success toast appears and you are redirected back to the list where the new category appears.
result: pass

### 8. Category Edit
expected: Click edit on a category. The edit form pre-fills with the existing values. Change the name, click Save Changes. Success toast appears, changes are reflected in the list.
result: pass

### 9. Product List
expected: Navigate to /admin/products. A list of products appears (or empty state). Filter by category and featured toggles are visible.
result: pass

### 10. Product Create
expected: Navigate to /admin/products/create. Form has: Product Name, Slug, Description, Category dropdown, Base Price, Featured checkbox. Submit — success toast, redirected to product list.
result: pass

### 11. Lead List
expected: Navigate to /admin/leads. A list of leads appears with columns showing customer info and status. Status filter (new/contacted/closed) is visible.
result: pass

### 12. Lead Edit
expected: Click edit on a lead. The edit form shows the customer's name, phone, address (editable), plus read-only meta (product, estimated price, submitted date if available). Change status to "contacted", click Save. Success toast appears.
result: pass

### 13. Booking List
expected: Navigate to /admin/bookings. Bookings are listed showing lead info, date, time, and status. Pagination is present.
result: pass

### 14. Booking Create
expected: Navigate to /admin/bookings/create. Form has: Lead dropdown, Booking Date, Booking Time, Status, Notes. Fill in and submit — success toast, redirected to bookings list.
result: pass

### 15. Blog List
expected: Navigate to /admin/blog. Blog posts are listed with title, slug, published status. A "Create" button is present.
result: pass

### 16. Blog Create
expected: Navigate to /admin/blog/create. Form has: Title, Slug, Content (Markdown), Excerpt, SEO section (title, keywords, description), Published checkbox. Fill in required fields and submit — success toast, redirected to blog list.
result: pass

### 17. Form Validation
expected: On any create form (e.g., category create), clear the required Name field and try to submit. The form shows a validation error under the field — it does NOT submit. Error disappears after filling in the field.
result: pass

## Summary

total: 17
passed: 17
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps

[none yet]
