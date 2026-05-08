# Phase 1 Context: Admin Dashboard

**Phase:** 1 (Admin Dashboard)  
**Duration:** 4-5 weeks  
**Requirements:** 39 (AUTH, CAT, PROD, PRICE, LEAD, BOOK, BLOG, STAT, EMAIL)

---

## Decisions Locked

### Email Service
- **Service:** Resend
- **API Key:** `re_4BeEpsAZ_GYw7peT2yvujjcA1p5GM67js` (store in `.env.local` as `RESEND_API_KEY`)
- **Templates:** Customer confirmation + admin notification (both include name, phone, product, estimated price)

### Authentication & Sessions
- **Admin login:** Supabase Auth (email + password)
- **Password reset:** Email reset link (user clicks link in email to set new password)
- **Session storage:** Supabase Auth (built-in cookies, no custom JWT)
- **Session timeout:** Never timeout (implement "remember me" so session persists)
- **Logout:** Clear session via Supabase signOut()

### Pricing Formula
- **Model:** base_price + optional extras
- **Base price:** Set per product (stored in `products.base_price`)
- **Extras:** Both fixed amount (e.g., +50k for cutting) AND per-m² pricing (e.g., +10k/m² for sewing)
- **Calculation:** `price = width × height × base_price + extras`
- **Client-side:** Calculate in browser (no API call needed) when user enters dimensions
- **Persist:** Save estimated price in `leads.estimated_price` when lead submits

### Database Schema & Constraints
- **Product deletion:** Soft delete with `deleted_at` timestamp (NULL = active, non-NULL = deleted)
- **Foreign key constraints:** RESTRICT on product_id → cannot delete product if has variants/images/leads
- **Variant deletion:** Soft delete with `deleted_at` timestamp (preserve lead history)
- **Rationale:** Protects referential integrity while keeping audit trail for leads/bookings

### API Routes & Data Flow
- **Session handling:** Use Supabase Auth session directly (getSession() in API routes)
- **Filtering params:** `?search=...&status=...&date_from=...&date_to=...&sort_by=...&order=asc|desc&limit=20&offset=0`
- **Aggregation:** Return metadata alongside list (e.g., `{ data: [...], total: 150, stats: {...} }`)
- **Error handling:** Supabase errors → API returns 400/500 with `{ error: "message" }`

### Component Structure
- **Dashboard layout:** Shared `app/admin/layout.tsx` with sidebar navigation
  - Sidebar: Categories, Products, Leads, Bookings, Blog, Dashboard (navigation links)
  - Main area: Page content
  - This layout wraps all admin pages
- **CRUD forms:** Separate `ProductCreateForm` and `ProductEditForm` components (NOT shared)
  - Create form: Empty defaults, minimal initial data
  - Edit form: Load existing data, show all fields
  - Each category, product, lead, booking, blog page gets create/edit forms
- **Error handling:** Toast notifications (Sonner or similar)
  - Success: "Saved successfully" (auto-dismiss)
  - Error: "Failed to save: [message]" (auto-dismiss)
  - No modal dialogs for errors

### Form Handling & Validation
- **Zod schemas:** Define in `lib/schemas/` (e.g., `lib/schemas/product.ts`, `lib/schemas/lead.ts`)
  - Shared between form components and API routes
  - Create/edit forms use same schema with `.optional()` where appropriate
- **React Hook Form:** Use `zodResolver` + `useForm()`
- **Form components:** Reuse from existing `src/components/form-fields/demo-form.tsx`
  - FormInput, FormSelect, FormTextarea, FormCheckbox, FormDatePicker, FormFileUpload, etc.
  - Pattern: `<FormInput control={form.control} name="..." label="..." ... />`
  - All forms follow this pattern (product, category, lead, booking, blog)
- **Price calculator:** Client-side only
  - Store formula in `PriceCalculator` utility (or inline in form)
  - Trigger on `onChange` for width/height fields
  - Display estimated price in real-time (no API call)

### Product Management
- **Image upload:** Simple list pattern
  - Upload 1 image at a time (modal or inline file picker)
  - Add to list (show preview)
  - Delete button per image
  - First image = thumbnail for product
  - No drag-drop reordering
- **Variant images:** Override with variant-specific images
  - Each variant can have its own image(s)
  - If variant has no image, fall back to product image
  - Same simple list upload pattern per variant
- **Featured products:** Toggle checkbox (no ordering)
  - Checkbox on product row: checked = featured
  - No priority/ordering needed (Platform can show featured in any order)

---

## Key Implementation Notes

### Folder Structure (Phase 1)

**Naming Convention:** kebab-case for files and folders (not PascalCase)

**Module Structure:** feature-based with containers → hooks → ui pattern

```
src/
├── app/admin/
│   ├── layout.tsx (sidebar + main layout)
│   ├── page.tsx (dashboard - import from modules)
│   ├── categories/
│   │   ├── page.tsx (import CategoryListContainer from modules)
│   │   ├── create/page.tsx (import CategoryCreateContainer from modules)
│   │   └── [id]/edit/page.tsx (import CategoryEditContainer from modules)
│   ├── products/
│   │   ├── page.tsx
│   │   ├── create/page.tsx
│   │   └── [id]/edit/page.tsx
│   ├── leads/
│   │   ├── page.tsx
│   │   └── [id]/edit/page.tsx
│   ├── bookings/
│   │   ├── page.tsx
│   │   ├── create/page.tsx
│   │   └── [id]/edit/page.tsx
│   └── blog/
│       ├── page.tsx
│       ├── create/page.tsx
│       └── [id]/edit/page.tsx
├── app/api/admin/
│   ├── auth/... (login, logout, password reset)
│   ├── categories/... (CRUD)
│   ├── products/... (CRUD)
│   ├── leads/... (CRUD)
│   ├── bookings/... (CRUD)
│   ├── blog/... (CRUD)
│   └── stats/... (dashboard statistics)
├── modules/
│   ├── category-management/
│   │   ├── components/
│   │   │   ├── category-list-ui/
│   │   │   │   ├── index.ts
│   │   │   │   └── category-list-ui.tsx (pure presentational)
│   │   │   ├── category-create-ui/
│   │   │   └── category-edit-ui/
│   │   ├── containers/
│   │   │   ├── index.ts
│   │   │   ├── category-list-container.tsx
│   │   │   ├── category-create-container.tsx
│   │   │   └── category-edit-container.tsx
│   │   ├── hooks/
│   │   │   ├── index.ts
│   │   │   ├── use-category-list.ts
│   │   │   ├── use-category-create.ts
│   │   │   └── use-category-edit.ts
│   │   └── index.ts (export containers)
│   ├── product-management/
│   │   ├── components/ (product-list-ui, product-create-ui, product-edit-ui, image-upload-ui)
│   │   ├── containers/
│   │   ├── hooks/
│   │   └── index.ts
│   ├── lead-management/
│   │   ├── components/
│   │   ├── containers/
│   │   ├── hooks/
│   │   └── index.ts
│   ├── booking-management/
│   │   ├── components/
│   │   ├── containers/
│   │   ├── hooks/
│   │   └── index.ts
│   └── blog-management/
│       ├── components/
│       ├── containers/
│       ├── hooks/
│       └── index.ts
├── components/
│   ├── form-fields/ (demo-form.tsx + field components - reuse across modules)
│   ├── ui/ (existing shadcn/ui components)
│   └── admin/
│       └── admin-sidebar.tsx (shared admin navigation)
├── lib/
│   ├── schemas/
│   │   ├── category.ts
│   │   ├── product.ts
│   │   ├── lead.ts
│   │   ├── booking.ts
│   │   └── blog.ts
│   └── utils/ (PriceCalculator, date helpers, etc.)
└── types/ (TypeScript interfaces)
```

### Module Pattern Example: Product Management

**Zod Schemas (shared):**
```typescript
// lib/schemas/product.ts
export const productCreateSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  base_price: z.number().min(0),
  // ... other fields
});

export const productEditSchema = productCreateSchema;
```

**Custom Hook (containers logic extracted):**
```typescript
// modules/product-management/hooks/use-product-create.ts
export function useProductCreate() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const onSubmit = async (data: z.infer<typeof productCreateSchema>) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      if (response.ok) {
        toast.success('Product created');
        router.push('/admin/products');
      } else {
        toast.error('Failed to create product');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return { onSubmit, isLoading };
}
```

**Container (composes hook + UI):**
```typescript
// modules/product-management/containers/product-create-container.tsx
export function ProductCreateContainer() {
  const form = useForm({
    resolver: zodResolver(productCreateSchema),
    defaultValues: { /* empty */ }
  });
  
  const { onSubmit, isLoading } = useProductCreate();
  
  return (
    <ProductCreateUI
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
}
```

**UI Component (presentational only):**
```typescript
// modules/product-management/components/product-create-ui/product-create-ui.tsx
export function ProductCreateUI({ form, onSubmit, isLoading }) {
  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <FormInput control={form.control} name="name" label="Name" required />
      <FormInput control={form.control} name="base_price" type="number" label="Base Price" required />
      {/* ... other fields */}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Product'}
      </Button>
    </FormWrapper>
  );
}
```

**App page (just imports container):**
```typescript
// app/admin/products/create/page.tsx
import { ProductCreateContainer } from '@/modules/product-management';

export default function CreateProductPage() {
  return <ProductCreateContainer />;
}
```

### Module Organization Pattern

Each module (category-management, product-management, etc.) follows this structure:

**1. UI Components** (components/*)
- Pure presentational components
- Receive data via props
- No hooks, no API calls
- Naming: `<feature>-<variant>-ui.tsx` (e.g., `product-create-ui.tsx`)
- Exported in `components/index.ts`

**2. Custom Hooks** (hooks/*)
- Extract logic from containers
- Handle API calls, state management, form validation
- Naming: `use-<feature>-<action>.ts` (e.g., `use-product-create.ts`)
- Exported in `hooks/index.ts`

**3. Containers** (containers/*)
- Compose UI + hooks
- Connect logic to presentational components
- Pass data/callbacks as props
- Naming: `<feature>-<action>-container.tsx` (e.g., `product-create-container.tsx`)
- Exported in `containers/index.ts`

**4. Module Index** (index.ts)
```typescript
// modules/product-management/index.ts
export { ProductListContainer } from './containers';
export { ProductCreateContainer } from './containers';
export { ProductEditContainer } from './containers';
```

**5. App Pages** (app/admin/*/page.tsx)
- Minimal - just import and render container
- No logic, no styling
- Example: `import { ProductListContainer } from '@/modules/product-management'`

**Benefits:**
- ✅ Easy to test (UI, hooks, containers are separate)
- ✅ Easy to reuse (containers in multiple places)
- ✅ Easy to scale (add new features without touching existing code)
- ✅ Clear responsibility (each layer has one job)

### Price Calculator Pattern
```typescript
// lib/utils/price-calculator.ts
export function calculatePrice(
  width: number,
  height: number,
  basePrice: number,
  extras: { type: 'fixed' | 'per-m2'; amount: number }[] = []
): number {
  let price = width * height * basePrice;
  
  for (const extra of extras) {
    if (extra.type === 'fixed') {
      price += extra.amount;
    } else {
      price += (width * height) * (extra.amount / 1000000); // per m²
    }
  }
  
  return Math.round(price);
}

// In form, trigger on onChange for width/height
const estimatedPrice = calculatePrice(width, height, basePrice, extras);
// Display in form
```

---

## Deferred Decisions

These are gray areas that can be decided during implementation if needed:
- **Dashboard charts library:** (Chart.js, Recharts, etc.) - decide during stats implementation
- **Image storage:** (Supabase Storage with CDN, or external) - decide during product image implementation
- **Markdown editor:** (For blog) - decide during blog implementation
- **Calendar view for bookings:** Can use simple list first, upgrade to calendar later if needed

---

## Verification

Phase 1 is complete when:
- ✅ All 39 requirements marked complete
- ✅ Admin can login, logout, reset password
- ✅ Admin can CRUD categories, products, leads, bookings, blog
- ✅ All forms validate with Zod + React Hook Form
- ✅ Price calculator works client-side (no errors)
- ✅ Email notifications sent on lead submission
- ✅ Dashboard shows statistics (no errors)
- ✅ No console errors, responsive on desktop

---

*Context locked: 2026-05-09*  
*Ready for planning: `/gsd-plan-phase 1`*
