# Coding Conventions

**Analysis Date:** 2026-05-09

## Naming Patterns

**Files:**
- Components: PascalCase (e.g., `Button.tsx`, `FormInput.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useAuth.ts`, `usePagination.ts`)
- Utilities/helpers: camelCase (e.g., `common.ts`, `utils.ts`)
- Config files: camelCase (e.g., `site.ts`, `fonts.ts`)
- Stores: camelCase with `-store` suffix (e.g., `user-store.ts`, `intersection-store.ts`)
- UI components (Radix-based): lowercase with hyphens (e.g., `button.tsx`, `form.tsx`, `scroll-area.tsx`)
- Form field components: camelCase with `form-` prefix (e.g., `form-input.tsx`, `form-checkbox.tsx`)
- Provider components: PascalCase in subdirectories (e.g., `QueryClientProvider/index.tsx`)
- Layout components: PascalCase (e.g., `MainLayout`)

**Functions:**
- camelCase for all functions (exported and internal): `validateFileFormat`, `handleToastError`, `numberFormatter`
- Hook functions always start with `use`: `useAuth`, `usePagination`, `useDebounce`
- React components (function names): PascalCase: `Button`, `FormInput`, `RootLayout`
- Callback handlers start with action verb: `handleChange`, `handleSubmit`, `handleToastError`
- Utility functions are descriptive: `validateFileSize`, `formatBytes`, `shortenString`

**Variables:**
- camelCase for all variable declarations: `currentStepIndex`, `totalPageCount`, `leftSiblingIndex`
- Constants are PascalCase with `const` keyword: `const DOTS = '...'`
- Interface/Type prefixes with 'I' for interfaces only: `IUser`, `ISetUserData`, `IMeQueryStore`
- Generic type parameters use PascalCase: `TFieldValues`, `TName`
- Boolean variables often include `is`, `should`, `can` prefixes: `isFirstStep`, `isLastStep`, `shouldShowLeftDots`, `isMobile`

**Types:**
- Interfaces: PascalCase with optional 'I' prefix (inconsistent in codebase): `IUser`, `IMeQueryStore`, `BaseFormFieldProps`
- Type aliases: PascalCase: `RootLayoutProps`, `ProvidersProps`, `FormInputProps`
- Props interfaces: `[ComponentName]Props` (e.g., `FormInputProps`, `BaseFormFieldProps`)
- Generic constraints: `extends FieldValues`, `extends BaseFormFieldProps`

## Code Style

**Formatting:**
- Tool: Biome 2.4.13
- Indent: 2 spaces
- Line width: 120 characters
- Line ending: LF
- Trailing commas: ES5 style (where valid in ES5)
- Semicolons: Always required
- Arrow parentheses: Always required (e.g., `(a) => a`, not `a => a`)
- Bracket spacing: True (e.g., `{ key: value }`)
- Quote style: Single quotes for strings, single quotes for JSX attributes
- Final newline: Always inserted

**Example formatting:**
```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90",
      },
    },
  }
);
```

**Linting:**
- Tool: Biome 2.4.13
- Recommended rules: Disabled (custom rule set)
- Critical rules enabled:
  - `useJsxKeyInIterable` (error): React key requirement
  - `useHookAtTopLevel` (error): React hooks rules
  - `noUnusedImports` (warn): Flag unused imports
  - `useImportType` (error): Force type imports for types
  - `useSortedClasses` (error): Tailwind class ordering (nursery rule)
  - `noDangerouslySetInnerHtmlWithChildren` (error): Security rule
  - `useValidAnchor` (error): Accessibility rule
  - `noDebugger` (error): Prevent debug statements
  - `noCommentText` (error): Prevent arbitrary comment text in certain contexts

**JavaScript-specific formatting:**
- Indent: 2 spaces
- JSX quote style: Single quotes for attributes
- Quote properties: As needed (not always quoted)
- Trailing commas: ES5
- Semicolons: Always
- Arrow parentheses: Always
- Bracket same line: False (opening brace on new line)
- Bracket spacing: True

## Import Organization

**Order:**
1. React and core library imports: `import React from 'react'`, `import { useEffect } from 'react'`
2. External dependencies: `import { cva } from 'class-variance-authority'`, `import { create } from 'zustand'`
3. Internal component/type imports: `import { Button } from '@/components/ui/button'`
4. Relative imports (last): `import { someUtil } from '../utils'`

**Path Aliases:**
- `@/*` → `./src/*` (used throughout codebase for all internal imports)
- Example: `import { cn } from '@/lib/utils'`, `import { useAuth } from '@/hooks/use-auth'`

**Biome auto-organizes imports** via `organizeImports` action (enabled in formatter config).

**Pattern observed in codebase:**
```typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
```

## Error Handling

**Patterns:**
- Use toast notifications for user-facing errors: `toast.error(message)`
- Error utilities: `handleToastError(error, defaultMessage)` extracts message from error object with fallback chain
- Error message extraction: `error?.shortMessage ?? error?.message ?? error?.cause?.message ?? defaultMessage`
- Console error logging: `console.error(error)` used alongside toast notifications
- No custom error classes observed; errors are caught and handled at display layer
- Validation functions return boolean: `validateFileFormat()`, `checkFileSize()`, `validateFileSize()`
- Validation returns `true` for undefined/null inputs (permissive validation pattern)

**Example pattern:**
```typescript
export const handleToastError = (error: any, defaultError = 'Something went wrong') => {
  console.error(error);
  toast.error(error?.shortMessage ?? error?.message ?? error?.cause?.message ?? defaultError);
};
```

## Logging

**Framework:** Sonner for toast notifications, `console` for debug/error logging

**Patterns:**
- Use `toast.error()` for user-facing error messages
- Use `console.error()` for server-side/development logging
- No centralized logging service detected
- Error logging paired with user notification: `console.error(error)` then `toast.error(...)`
- Single source of truth for error messages: `handleToastError()` utility in `src/utils/common.ts`

## Comments

**When to Comment:**
- Multi-case logic sections include explanatory comments for complex algorithms (see `usePagination.ts`)
- Inline comments explain business logic: "Create an array of certain length and set the elements within it from start value to end value"
- No JSDoc comments observed on utility functions
- Comments use standard `/*` or `//` syntax

**Example style:**
```typescript
/*
  Create an array of certain length and set the elements within it from
  start value to end value.
*/
return Array.from({ length }, (_, idx) => idx + start);
```

## Function Design

**Size:** Utility functions are compact (5-20 lines typical). Hooks average 15-30 lines. Complex pagination logic spans 30-50 lines with detailed comments.

**Parameters:** 
- Use destructuring for object parameters: `({ control, name, label, description, ...props }) => { ... }`
- Generic constraints for type-safe props: `<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>`
- Default parameters provided inline: `type = 'text'`, `decimals = 0`
- Rest parameters used for spreading: `{...field}`, `{...props}`

**Return Values:**
- Utility functions return primitive types: `boolean`, `number`, `string`, arrays: `(number | string)[]`
- Hooks return objects with state and methods: `{ isLoggedIn, accessToken, refreshToken, user, status, setUserData, logout }`
- Components return JSX: `React.ReactElement` or implicit return
- Generic typing preserved in return: `(number | string)[]` for pagination

## Module Design

**Exports:**
- Named exports for utilities: `export const range = (...)`, `export const validateFileFormat = (...)`
- Named exports for components: `export { Button, buttonVariants }` (both component and its variants)
- Named exports for hooks: `export const useAuth = () => { ... }`
- Named exports for interfaces/types: `export interface IUser { ... }`, `export type RootLayoutProps = { ... }`
- Default exports for single-export modules: `export default function RootLayout(...) { ... }`, `export default Providers`

**Barrel Files:**
- Used in hook directories: `src/hooks/` appears to have individual files, no barrel observed
- Used in store directories: `src/stores/index.ts` imports and re-exports: `export * from './index'`
- Pattern: `export * from './user-store'` and `export * from './intersection-store'`
- Import from barrel: `import { useUserStore } from '@/stores'`

**Example barrel pattern:**
```typescript
// src/stores/index.ts
export * from './user-store'
export * from './intersection-store'
```

## Component Patterns

**React Components:**
- Functional components with destructured props: `function Button({ className, variant, size, asChild = false, ...props })`
- Generic component props: `<React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }>`
- Client-side marker for interactive components: `'use client'` directive at top of file

**Form Components:**
- All form components accept `control` from react-hook-form
- Generic typing for type-safe form fields: `FormInputProps<TFieldValues, TName>`
- Render function pattern: `render={({ field }) => ( <FormItem>...</FormItem> )}`
- Error display: `<FormMessage />` component automatically renders field validation errors
- Custom handling for number inputs: Type coercion in onChange handler

**Hooks:**
- Hooks use `useState` and `useEffect` from React core
- Hooks return simple objects or arrays: `{ step, steps, isFirstStep, isLastStep, goTo, next, back }`
- Generic hook typing: `useDebounce<T>()` with generic type parameter
- Dependencies properly listed in useEffect: `[value, delay]`, `[steps.length]`

**State Management:**
- Zustand stores with createSelectorFunctions helper: `createSelectorFunctions(useBaseUserStore)`
- Store exports use hook pattern: `export const useUserStore = createSelectorFunctions(...)`
- Persistence middleware: `persist(...)` with localStorage storage
- Selector hooks: `useUserStore.use.accessToken()`, `useUserStore.use.setUser()`

## Type Safety

**TypeScript configuration:**
- Target: ES2017
- Strict mode: Enabled
- JSX: react-jsx
- Module resolution: bundler
- All implicit `any` types caught by linter (noExplicitAny: off - but caught by usage)

**Type patterns:**
- Generic constraints on form components: `TFieldValues extends FieldValues`
- Generic type preservation: Functions maintain generic types through call chains
- Union types for state: `status: 'waiting' | 'ready'`
- Optional properties: `user?: IUser`, `description?: string`
- Type imports: Always use `import type` for type-only imports (enforced by linter)

---

*Convention analysis: 2026-05-09*
