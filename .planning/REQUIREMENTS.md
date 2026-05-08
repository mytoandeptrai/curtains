# Requirements: Curtains - Website Bán Rèm

**Defined:** 2026-05-08
**Core Value:** Thu thập lead chất lượng từ khách hàng quan tâm, với tính giá realtime giúp khách hiểu rõ chi phí

## v1 Requirements

Requirements cho MVP (Admin Dashboard + Platform Portal v1)

### Authentication & Admin

- [ ] **AUTH-01**: Admin có thể đăng nhập với email + password
- [ ] **AUTH-02**: Admin session persist across page refresh
- [ ] **AUTH-03**: Admin có thể logout
- [ ] **AUTH-04**: Protect admin routes (require login)

### Category Management

- [ ] **CAT-01**: Admin có thể tạo danh mục sản phẩm
- [ ] **CAT-02**: Admin có thể chỉnh sửa danh mục (tên, slug, SEO)
- [ ] **CAT-03**: Admin có thể xóa danh mục
- [ ] **CAT-04**: Admin có thể xem danh sách danh mục
- [ ] **CAT-05**: Danh mục hiển thị trên platform (filter sản phẩm)

### Product Management

- [ ] **PROD-01**: Admin có thể tạo sản phẩm (tên, slug, mô tả, giá cơ bản)
- [ ] **PROD-02**: Admin có thể tạo variant cho sản phẩm (màu, chất liệu, độ dày, lớp)
- [ ] **PROD-03**: Admin có thể upload hình ảnh sản phẩm (1+ ảnh)
- [ ] **PROD-04**: Admin có thể gắn ảnh cho variant cụ thể
- [ ] **PROD-05**: Admin có thể chỉnh sửa sản phẩm, variant, ảnh
- [ ] **PROD-06**: Admin có thể xóa sản phẩm (soft delete)
- [ ] **PROD-07**: Admin có thể mark sản phẩm as featured
- [ ] **PROD-08**: Admin có thể xem danh sách sản phẩm với filter/search

### Product Pricing

- [ ] **PRICE-01**: Tính giá cơ bản: width × height × base_price
- [ ] **PRICE-02**: Admin có thể set phí cắt/may thêm (fixed hoặc per m²)
- [ ] **PRICE-03**: Admin có thể set giá khác nhau cho từng variant
- [ ] **PRICE-04**: Hệ thống lưu lại estimated price khi lead submit

### Lead Management

- [ ] **LEAD-01**: Khách hàng có thể fill form lead (tên, SĐT, địa chỉ, sản phẩm, kích thước)
- [ ] **LEAD-02**: Hệ thống validate form (bắt buộc, định dạng SĐT)
- [ ] **LEAD-03**: Hệ thống tính giá ước tính realtime khi khách nhập kích thước
- [ ] **LEAD-04**: Khách hàng submit form → lưu lead vào DB
- [ ] **LEAD-05**: Hệ thống gửi email xác nhận cho khách (tên, sản phẩm, giá)
- [ ] **LEAD-06**: Admin nhận email thông báo khi có lead mới
- [ ] **LEAD-07**: Admin xem danh sách lead với filter (status, ngày, sản phẩm)
- [ ] **LEAD-08**: Admin có thể chỉnh sửa lead (tên, SĐT, status, ghi chú)
- [ ] **LEAD-09**: Admin có thể xóa lead
- [ ] **LEAD-10**: Lead có status (new, contacted, closed)

### Booking Management

- [ ] **BOOK-01**: Admin tạo booking cho lead (chọn ngày, giờ)
- [ ] **BOOK-02**: Admin chỉnh sửa booking (đổi ngày/giờ)
- [ ] **BOOK-03**: Admin xác nhận/hủy booking
- [ ] **BOOK-04**: Admin xem danh sách booking (calendar view hoặc list)
- [ ] **BOOK-05**: Booking có status (pending, confirmed, done)

### Blog Management

- [ ] **BLOG-01**: Admin tạo bài blog (title, slug, markdown content)
- [ ] **BLOG-02**: Admin upload thumbnail ảnh cho bài
- [ ] **BLOG-03**: Admin set SEO (title, description, keywords)
- [ ] **BLOG-04**: Admin publish/draft bài viết
- [ ] **BLOG-05**: Admin chỉnh sửa bài blog
- [ ] **BLOG-06**: Admin xóa bài blog
- [ ] **BLOG-07**: Admin xem danh sách bài blog
- [ ] **BLOG-08**: Platform hiển thị blog posts (listing + detail)
- [ ] **BLOG-09**: Markdown renderer hiển thị content đúng format

### Platform Portal - Public Pages

- [ ] **PAGE-01**: Trang chủ (hero + featured products)
- [ ] **PAGE-02**: Danh sách sản phẩm (grid, filter by category)
- [ ] **PAGE-03**: Chi tiết sản phẩm (mô tả, ảnh, variant selector)
- [ ] **PAGE-04**: Form tính giá realtime trên trang chi tiết
- [ ] **PAGE-05**: Form lead tích hợp trên trang chi tiết
- [ ] **PAGE-06**: Trang Blog (listing bài viết, pagination)
- [ ] **PAGE-07**: Trang Blog detail (markdown content, SEO meta)
- [ ] **PAGE-08**: Trang Contact
- [ ] **PAGE-09**: Trang About
- [ ] **PAGE-10**: Trang FAQ
- [ ] **PAGE-11**: Floating action buttons (call, Zalo)

### Dashboard Statistics

- [ ] **STAT-01**: Admin xem tổng số lead (hôm nay, tuần, tháng)
- [ ] **STAT-02**: Admin xem tỷ lệ lead → booking (conversion)
- [ ] **STAT-03**: Admin xem số booking confirmed
- [ ] **STAT-04**: Admin xem sản phẩm phổ biến nhất
- [ ] **STAT-05**: Admin xem chart trend lead over time

### Email System

- [ ] **EMAIL-01**: Send email xác nhận cho khách (template)
- [ ] **EMAIL-02**: Send email thông báo cho admin (template)
- [ ] **EMAIL-03**: Email có thông tin lead (name, phone, address, sản phẩm, giá)

### SEO & Performance

- [ ] **SEO-01**: Meta tags (title, description) trên tất cả pages
- [ ] **SEO-02**: Open Graph tags cho social sharing
- [ ] **SEO-03**: Sitemap.xml generate tự động
- [ ] **SEO-04**: robots.txt configured

## v2 Requirements

Dành cho phase sau (optimization, advanced features)

### Advanced Admin Features

- **ADMIN-ADV-01**: Multi-admin accounts với role-based permissions
- **ADMIN-ADV-02**: Activity log (ai đã thay đổi gì, khi nào)
- **ADMIN-ADV-03**: Bulk upload sản phẩm (CSV)
- **ADMIN-ADV-04**: Export lead/booking data (Excel)

### Landing Pages & SEO

- **LANDING-01**: Tạo landing pages cho keywords cụ thể
- **LANDING-02**: Dynamic landing page templates
- **LANDING-03**: A/B testing CTA buttons
- **BLOG-ADV-01**: Blog categories/tags
- **BLOG-ADV-02**: Related posts suggestions

### Notifications & Integrations

- **NOTIF-01**: SMS notification cho khách (optional lead confirm)
- **NOTIF-02**: Zalo API integration (send lead info)
- **CRM-01**: CRM features (lead assignment, follow-up reminders)
- **ANALYTIC-01**: Google Analytics / Mixpanel integration
- **ANALYTIC-02**: Lead source tracking (organic, referral, direct)

### Performance & Advanced

- **PERF-01**: Image optimization & lazy loading
- **PERF-02**: Page speed optimization
- **CACHE-01**: Caching strategy (products, blog posts)
- **BACKUP-01**: Automated database backups

## Out of Scope

| Feature | Reason |
|---------|--------|
| Online payment / E-commerce checkout | Lead generation model, sales team handles closing |
| User accounts for customers | One-time form submission, no tracking needed |
| Real-time chat | Zalo button sufficient for initial MVP |
| Video content | Images only for MVP |
| Mobile app | Web-responsive design covers mobile users |
| Multi-language | Vietnamese only |
| Inventory management | All products have unlimited availability |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 | Phase 1 | Pending |
| AUTH-02 | Phase 1 | Pending |
| AUTH-03 | Phase 1 | Pending |
| AUTH-04 | Phase 1 | Pending |
| CAT-01 | Phase 1 | Pending |
| CAT-02 | Phase 1 | Pending |
| CAT-03 | Phase 1 | Pending |
| CAT-04 | Phase 1 | Pending |
| CAT-05 | Phase 2 | Pending |
| PROD-01 | Phase 1 | Pending |
| PROD-02 | Phase 1 | Pending |
| PROD-03 | Phase 1 | Pending |
| PROD-04 | Phase 1 | Pending |
| PROD-05 | Phase 1 | Pending |
| PROD-06 | Phase 1 | Pending |
| PROD-07 | Phase 1 | Pending |
| PROD-08 | Phase 1 | Pending |
| PRICE-01 | Phase 1 | Pending |
| PRICE-02 | Phase 1 | Pending |
| PRICE-03 | Phase 1 | Pending |
| PRICE-04 | Phase 2 | Pending |
| LEAD-01 | Phase 2 | Pending |
| LEAD-02 | Phase 2 | Pending |
| LEAD-03 | Phase 2 | Pending |
| LEAD-04 | Phase 2 | Pending |
| LEAD-05 | Phase 2 | Pending |
| LEAD-06 | Phase 2 | Pending |
| LEAD-07 | Phase 1 | Pending |
| LEAD-08 | Phase 1 | Pending |
| LEAD-09 | Phase 1 | Pending |
| LEAD-10 | Phase 1 | Pending |
| BOOK-01 | Phase 1 | Pending |
| BOOK-02 | Phase 1 | Pending |
| BOOK-03 | Phase 1 | Pending |
| BOOK-04 | Phase 1 | Pending |
| BOOK-05 | Phase 1 | Pending |
| BLOG-01 | Phase 1 | Pending |
| BLOG-02 | Phase 1 | Pending |
| BLOG-03 | Phase 1 | Pending |
| BLOG-04 | Phase 1 | Pending |
| BLOG-05 | Phase 1 | Pending |
| BLOG-06 | Phase 1 | Pending |
| BLOG-07 | Phase 1 | Pending |
| BLOG-08 | Phase 3 | Pending |
| BLOG-09 | Phase 3 | Pending |
| PAGE-01 | Phase 2 | Pending |
| PAGE-02 | Phase 2 | Pending |
| PAGE-03 | Phase 2 | Pending |
| PAGE-04 | Phase 2 | Pending |
| PAGE-05 | Phase 2 | Pending |
| PAGE-06 | Phase 3 | Pending |
| PAGE-07 | Phase 3 | Pending |
| PAGE-08 | Phase 2 | Pending |
| PAGE-09 | Phase 2 | Pending |
| PAGE-10 | Phase 2 | Pending |
| PAGE-11 | Phase 2 | Pending |
| STAT-01 | Phase 1 | Pending |
| STAT-02 | Phase 1 | Pending |
| STAT-03 | Phase 1 | Pending |
| STAT-04 | Phase 1 | Pending |
| STAT-05 | Phase 1 | Pending |
| EMAIL-01 | Phase 2 | Pending |
| EMAIL-02 | Phase 2 | Pending |
| EMAIL-03 | Phase 2 | Pending |
| SEO-01 | Phase 2 | Pending |
| SEO-02 | Phase 2 | Pending |
| SEO-03 | Phase 3 | Pending |
| SEO-04 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 64 total
- Mapped to phases: 64
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-08*
*Last updated: 2026-05-08 after initial definition*
