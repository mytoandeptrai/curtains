# Roadmap: Curtains - Website Bán Rèm

**Timeline:** 2-3 months | **Mode:** Standard (Horizontal Layers - complete systems)
**Start:** 2026-05-08

---

## Phase Overview

| Phase | Name | Focus | Duration | Requirements |
|-------|------|-------|----------|--------------|
| 1 | Admin Dashboard | Complete admin CRUD system | 4-5 weeks | AUTH, CAT, PROD, LEAD, BOOK, BLOG, STAT (39 reqs) |
| 2 | Platform Portal v1 | Customer-facing pages + lead capture | 3-4 weeks | Product display, lead form, email, contact pages (21 reqs) |
| 3 | Blog & SEO | Blog system, landing pages, optimization | 2-3 weeks | Blog display, SEO, landing pages (4 reqs) |

---

## Phase 1: Admin Dashboard ✅ COMPLETE (2026-05-09)

**Goal:** Complete admin system for managing products, leads, bookings, and content

**Duration:** 4-5 weeks

**Requirements Covered:** AUTH-01..04, CAT-01..04, PROD-01..08, PRICE-01..03, LEAD-07..10, BOOK-01..05, BLOG-01..07, STAT-01..05, EMAIL-02

**Success Criteria:**
1. Admin can login/logout with email + password (session persists)
2. Admin can fully manage categories (create, edit, delete, list)
3. Admin can fully manage products with variants and images
4. Admin can set pricing (base + extras + variant-specific)
5. Admin dashboard shows live statistics (leads, bookings, conversions)
6. Admin can manage all leads (view, edit status, delete, notes)
7. Admin can manage all bookings (create, edit, confirm, cancel)
8. Admin can fully manage blog posts with Markdown support
9. Email notifications sent to admin when new lead arrives
10. Database schema fully implemented and tested

**Key Deliverables:**
- Database schema (products, variants, images, categories, leads, bookings, blog, admin_users)
- Admin auth system (login, logout, session management)
- 8 CRUD pages (categories, products, variants, images, leads, bookings, blog, dashboard)
- Email service integration (Resend/SendGrid for admin notifications)
- Forms with React Hook Form + Zod validation
- Dashboard statistics & charts

**Acceptance Criteria:**
- All 39 requirements in Phase 1 marked as Complete
- Database migrations run successfully
- Admin can perform all CRUD operations
- Email notifications working end-to-end
- No console errors, responsive layout on desktop

---

## Phase 2: Platform Portal v1

**Goal:** Customer-facing portal for product browsing, pricing, and lead submission

**Duration:** 3-4 weeks

**Requirements Covered:** CAT-05, PRICE-04, LEAD-01..06, PAGE-01..05, PAGE-08..11, EMAIL-01, SEO-01..02

**Success Criteria:**
1. Homepage displays hero section + featured products
2. Product listing page shows all products with category filter
3. Product detail page shows full product info + variants + images
4. Price calculator works realtime (width × height × base_price)
5. Lead form is easy to fill and validates correctly
6. Form submission shows success toast + sends confirmation email to customer
7. Admin receives lead notification email
8. Contact, About, FAQ pages are functional
9. Floating action buttons (call, Zalo) visible on all pages
10. All pages have proper SEO meta tags

**Key Deliverables:**
- Homepage (hero, featured products, CTA sections)
- Product listing page (grid, category filter, search)
- Product detail page (images carousel, variants selector, price calculator, lead form)
- Lead form with realtime price calculation
- Email confirmation system (customer + admin)
- Contact, About, FAQ pages
- Floating action buttons (phone, Zalo)
- SEO metadata for all pages

**Acceptance Criteria:**
- All 21 requirements in Phase 2 marked as Complete
- Customer can complete lead submission flow
- Confirmation emails sent successfully
- Admin sees new leads in dashboard
- No broken links or form validation issues
- Mobile responsive design

---

## Phase 3: Blog & SEO

**Goal:** Blog system with content, SEO optimization, and landing pages

**Duration:** 2-3 weeks

**Requirements Covered:** BLOG-08..09, PAGE-06..07, SEO-03..04, plus v2 features prep

**Success Criteria:**
1. Blog listing page displays all published posts (pagination)
2. Blog detail page renders Markdown content correctly
3. Blog posts have proper SEO meta tags
4. Blog posts can be shared on social media (Open Graph tags)
5. Sitemap.xml auto-generates with all pages
6. robots.txt is configured properly
7. Landing pages for targeted keywords created
8. Blog posts support featured images + thumbnails
9. Reading time estimated and displayed

**Key Deliverables:**
- Blog listing page (pagination, categories filter)
- Blog detail page (Markdown renderer, SEO meta, sharing buttons)
- Blog post admin CRUD (already in Phase 1, enhance for v2)
- Sitemap generator (automatic from database)
- robots.txt configuration
- Landing page templates (for SEO keywords)
- Meta tag management across all pages

**Acceptance Criteria:**
- All 4 requirements in Phase 3 marked as Complete
- Blog posts render without formatting issues
- Sitemap contains all pages (products, blog posts, static pages)
- robots.txt allows crawling, disallows admin
- Landing pages rank for target keywords (future validation)
- No duplicate content issues

---

## Technical Architecture

### Database Layers
- **Core Data**: products, variants, images, categories
- **User Data**: admin_users (auth), leads, bookings
- **Content**: blog_posts

### API & Server
- Next.js API routes (product data, lead submission, blog fetch)
- Supabase PostgreSQL backend (queries, auth, RLS policies)
- Row Level Security for admin-only tables

### Frontend Layers
- **Admin**: Dashboard, CRUD forms, statistics
- **Portal**: Public pages, product display, lead capture
- **Shared**: Navigation, footer, floating buttons, common components

### Authentication
- Supabase Auth for admin (email + password)
- No user auth for customers (one-time form submission)

### Email System
- Resend or SendGrid for transactional emails
- Templates: customer confirmation, admin notification

---

## Success Metrics

### Phase 1 (Admin)
- ✓ All CRUD operations functional
- ✓ Dashboard loads in <2s
- ✓ Email delivery 100% success rate
- ✓ No database errors in logs

### Phase 2 (Portal)
- ✓ Lead conversion from form submission 100%
- ✓ Page load time <3s on desktop, <5s on mobile
- ✓ Form validation prevents invalid submissions
- ✓ Email confirmation received by customers

### Phase 3 (Blog & SEO)
- ✓ All pages have meta tags
- ✓ Sitemap includes all pages
- ✓ No crawl errors in Google Search Console
- ✓ Landing pages ready for SEO campaigns

---

## Dependencies & Risks

### Dependencies
- Supabase project setup (tables, auth, storage)
- Email service account (Resend/SendGrid API key)
- Domain configured with DNS
- SSL certificate (Vercel auto-provisions)

### Risks & Mitigation
| Risk | Mitigation |
|------|-----------|
| Email delivery issues | Test with multiple email providers early; set up bounce handling |
| Complex pricing formula | Build calculator in Phase 1 → test thoroughly before Phase 2 |
| Image storage costs | Optimize image sizes; set storage quota in Supabase |
| SEO time to rank | Start blog content creation in Phase 2; publish consistently |

---

## Post-Roadmap (v2)

After Phase 3 completion, potential future work:
- Multi-admin accounts with role-based permissions
- CRM features (lead assignment, follow-up reminders)
- Advanced analytics (Google Analytics integration)
- Zalo API integration for lead notifications
- Landing page A/B testing
- Customer SMS notifications
- Export/import features for leads & products

---

*Roadmap created: 2026-05-08*
*Last updated: 2026-05-08 after creation*
