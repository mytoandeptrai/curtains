# Website Bán Rèm (Next.js + Supabase)

## 1. Tổng quan

Đây là website phục vụ **bán rèm theo mô hình lead generation**, tập trung vào:

- Hiển thị sản phẩm rèm
- Tính giá theo kích thước (m²)
- Thu thập thông tin khách hàng (lead)
- Đặt lịch đo rèm tại nhà
- SEO (blog + landing page)
- Dashboard admin quản lý dữ liệu

> Không phải website thương mại điện tử. Không có thanh toán online, không quản lý tồn kho.

---

## 2. Công nghệ sử dụng

- **Frontend**: Next.js (App Router), TailwindCSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Form**: React Hook Form + Zod
- **Deploy**: Vercel

---

## 3. Tính năng chính

### Hệ thống sản phẩm

- Nhiều loại rèm:
  - rèm vải
  - rèm cuốn
  - rèm roman
  - rèm cầu vồng...

- Thuộc tính:
  - màu sắc
  - chất liệu
  - độ dày
  - 1 lớp / 2 lớp

- Nhiều ảnh (có thể theo từng variant)

---

### Tính giá

- Người dùng nhập:
  - chiều rộng (m)
  - chiều cao (m)

- Công thức:
  - `giá = rộng × cao × base_price`

- Hiển thị giá ước tính realtime

---

### Thu thập khách hàng (Lead)

- Thông tin:
  - tên
  - số điện thoại
  - địa chỉ
  - sản phẩm đã chọn
  - kích thước

- Lưu vào DB → sale gọi lại

---

### Đặt lịch đo rèm

- Khách chọn:
  - ngày
  - giờ

- Liên kết với lead

---

### Blog & SEO

- Viết bài SEO
- Landing page theo keyword
- Tăng traffic tự nhiên từ Google

---

### Dashboard Admin

- Quản lý:
  - sản phẩm
  - danh mục
  - lead khách hàng
  - lịch hẹn
  - bài blog

---

## 4. Cấu trúc trang

### Public

- `/` → Trang chủ
- `/products` → Danh sách sản phẩm
- `/products/[slug]` → Chi tiết sản phẩm + tính giá
- `/blog` → Danh sách bài viết
- `/blog/[slug]` → Chi tiết bài viết
- `/contact` → Liên hệ
- `/about` → Giới thiệu
- `/faq` → Câu hỏi thường gặp
- `/[landing-pages]` → trang SEO (ví dụ: /rem-chong-nang)

---

### Admin

- `/admin/dashboard`
- `/admin/products`
- `/admin/categories`
- `/admin/leads`
- `/admin/bookings`
- `/admin/blog`

---

## 5. Thiết kế database

### products

- id
- name
- slug
- category_id
- base_price (VNĐ/m²)
- short_description
- description
- is_featured
- is_active
- created_at
- updated_at

---

### product_variants

- id
- product_id
- color
- material
- thickness
- layer_type
- created_at

> Variant chỉ dùng để hiển thị (không ảnh hưởng giá)

---

### product_images

- id
- product_id
- image_url
- alt_text
- is_thumbnail
- sort_order
- variant_id (nullable)
- created_at

---

### categories

- id
- name
- slug
- seo_title
- seo_description
- created_at

---

### leads (QUAN TRỌNG NHẤT)

- id
- name
- phone
- address
- product_id
- variant_id
- width
- height
- estimated_price
- note
- status (new, contacted, closed)
- created_at

---

### bookings

- id
- lead_id
- date
- time
- status (pending, confirmed, done)
- created_at

---

### blog_posts

- id
- title
- slug
- excerpt
- content
- thumbnail_url
- author_name
- status (draft, published)
- published_at
- seo_title
- seo_description
- seo_keywords
- reading_time
- view_count
- created_at
- updated_at

---

## 6. Biến môi trường

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

---

## 7. Chạy project

```bash
npm install
npm run dev
```

---

## 8. Deploy

Khuyến nghị: **Vercel**

Các bước:

1. Connect GitHub
2. Add env variables
3. Deploy

---

## 9. Luồng bán hàng

1. User vào web
2. Chọn sản phẩm
3. Nhập kích thước
4. Xem giá
5. Nhập SĐT
6. Sale gọi lại
7. Đặt lịch đo (nếu có)

---

## 10. UX cần lưu ý

- Luôn có CTA:
  - gọi điện
  - Zalo
  - form

- Có button nổi (floating):
  - call
  - chat

- Dùng ảnh thi công thật để tăng trust
- UI đơn giản, ưu tiên chuyển đổi

---

## 11. SEO

- Mỗi page cần:
  - meta title
  - meta description

- Blog là nguồn traffic chính
- Landing page target keyword cụ thể

---

## 12. Ghi chú

- Không có tồn kho
- Không có thanh toán online
- Tập trung tối đa vào lead

---

## 13. Hướng phát triển sau

- CRM nâng cao (phân công lead)
- Tracking chuyển đổi
- Tích hợp Zalo API
- Multi chi nhánh
- Tối ưu performance

## 14. Màu sắc:

Light mode:

- Primary: #8B5E3C (nâu gỗ)
- Secondary: #F5EFE6 (kem/beige nền)
- Accent: #D97706 (cam/nâu CTA)
- Text: #2B2118 (nâu đậm)
- Muted: #8A7A6A (xám nâu)
- White: #FFFFFF
  Cách dùng:
- Nền chính: #F5EFE6
- Button chính: #8B5E3C hoặc #D97706
- Text chính: #2B2118
- Card sản phẩm: #FFFFFF
- Border nhẹ: #E6D8C8

Dark mode:

- Background: #1C1713
- Surface/Card: #2A211B
- Primary: #C08A5A
- Accent/CTA: #D97706
- Text: #F5EFE6
- Muted Text: #B8A99A
- Border: #3A2E26

---
