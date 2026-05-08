# Curtains - Website Bán Rèm

## What This Is

Nền tảng bán rèm theo mô hình lead generation, cho phép khách hàng xem sản phẩm, tính giá theo kích thước, và để lại thông tin để sales gọi lại. Bao gồm dashboard admin để quản lý sản phẩm, lead, lịch hẹn, và blog SEO.

## Core Value

Thu thập lead chất lượng từ khách hàng quan tâm, với tính giá realtime giúp khách hiểu rõ chi phí trước khi quyết định liên hệ.

## Requirements

### Validated

- ✓ Next.js (App Router) + TailwindCSS setup — existing
- ✓ Supabase (PostgreSQL, Auth, Storage) integration — existing
- ✓ React Hook Form + Zod for validation — existing
- ✓ Brand color palette defined (nâu gỗ, cam, beige) — existing
- ✓ Database schema for products, variants, images, leads, bookings, blog — planned in requirement.md

### Active

**Admin Dashboard Features:**
- [ ] User authentication (1 admin account)
- [ ] Product management (CRUD, variants, pricing, images)
- [ ] Category management (CRUD)
- [ ] Lead management (view, edit status, notes)
- [ ] Booking management (view, confirm, cancel)
- [ ] Blog post management (CRUD, Markdown editor)
- [ ] Dashboard statistics (lead count, conversion rate, etc.)
- [ ] Email notifications (when lead is submitted)

**Platform Portal Features:**
- [ ] Homepage with hero section and featured products
- [ ] Product listing page with filters
- [ ] Product detail page with size calculator and price estimation
- [ ] Lead capture form (name, phone, address, product, size)
- [ ] Blog listing and detail pages
- [ ] Contact, About, FAQ pages
- [ ] Floating action buttons (call, Zalo)
- [ ] Email confirmation for leads
- [ ] Landing pages for SEO keywords

### Out of Scope

- Online payment/checkout — lead generation only
- Inventory management — unlimited product availability assumed
- User accounts for customers — one-time form submission model
- Real-time chat — Zalo link button only
- Video hosting — images only
- Mobile app — web-first, responsive design

## Context

**Existing Codebase:**
- Next.js boilerplate with App Router
- TailwindCSS configured
- Supabase prepared but not yet integrated
- Design system in design.pen with wireframes for all screens (admin + platform)

**Build Strategy:**
1. **Phase 1**: Admin Dashboard (CRUD operations, core system)
2. **Phase 2**: Platform Portal (customer-facing features)
3. **Phase 3**: Blog, SEO optimization, advanced features

**Database Schema:**
- `products` - product info, base pricing
- `product_variants` - color, material, thickness, layer type
- `product_images` - images per product/variant
- `categories` - product categories
- `leads` - customer inquiries (name, phone, address, product, size, price estimate)
- `bookings` - measurement appointments linked to leads
- `blog_posts` - markdown content with SEO fields
- `admin_users` - admin accounts

## Constraints

- **Tech Stack**: Next.js + Supabase (fixed)
- **Pricing**: Formula = width × height × base_price (with optional extras per variant)
- **Authentication**: Single admin account only
- **Blog**: Markdown format for easy editing
- **Timeline**: 2-3 months for complete system
- **Email**: Must send confirmation to customer and notification to admin

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Build Admin first | Establish data structure and CRUD before platform | — Pending |
| Markdown for blog | Easy content creation without CMS overhead | — Pending |
| No user auth for customers | Simplifies MVP, matches lead generation model | — Pending |
| Single admin account | Owner manages everything initially | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-08 after initialization*
