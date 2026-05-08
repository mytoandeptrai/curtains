# Coding Conventions

**Analysis Date:** 2026-05-08

## Naming Patterns

**Files:**
- React components: PascalCase (e.g., `TextField.tsx`, `MainLayout/index.tsx`)
- Non-component files: camelCase (e.g., `useAuth.ts`, `common.ts`, `utils.ts`)
- UI components (primitive/base): lowercase with hyphens (e.g., `form.tsx`, `radio-group.tsx`, `dropdown-menu.tsx`)
- Stores: PascalCase with "Store" suffix (e.g., `UserStore.ts`, `IntersectionStore.ts`)
- Hooks: camelCase with "use" prefix (e.g., `useAuth.ts`, `useModal.ts`, `useMobile.tsx`)
- Configuration files: camelCase or constant names (e.g., `site.ts`, `fonts.ts`, `const.ts`)

**Functions:**
- React components (functional): PascalCase (e.g., `function MainLayout({...})`, `const TextField = (...)`)
- Regular functions: camelCase (e.g., `range`, `validateFileFormat`, `handleToastError`, `getCountdownToTime`)
- Utility/helper functions: camelCase (e.g., `shortenString`, `shuffleArray`, `numberFormatter`, `debounce`)
- Custom hooks: camelCase with "use" prefix (e.g., `useAuth`, `useModal`, `useCountdown`)

**Variables:**
- Constants: UPPER_SNAKE_CASE (e.g., `FILE_FORMAT`, `NUMBER_FORMAT_LOOK_UP`)
- Local variables: camelCase (e.g., `isOpen`, `accessToken`, `refreshToken`)
- State variables: camelCase (e.g., `isLoggedIn`, `status`, `user`)
- Event handlers: camelCase with verb prefix (e.g., `handleToastError`, `onRefreshToken`, `openModal`, `closeModal`)

**Types and Interfaces:**
- Interface names: PascalCase with "I" prefix (e.g., `IUser`, `IStore`, `IMeQueryStore`, `ISetUserData`, `IOption`, `IMeta`)
- Type aliases: PascalCase with "T" prefix for unions/complex types, or no prefix for object types (e.g., `TResponse<T>`, `TCommonSort`, `IconSvgProps`)
- Generic type parameters: Single uppercase letters or descriptive PascalCase (e.g., `<T>`, `<TFormValue>`, `<TFieldValues>`)
- Export type aliases: PascalCase with "T" prefix (e.g., `type SiteConfig`, `type FCC`)

## Code Style

**Formatting:**
- Tool: Biome (`.biomejs/biome`)
- Indentation: 2 spaces
- Line width: 120 characters
- Line endings: LF
- Quotes: Single quotes (`'`) for strings
- Semicolons: Always required
- Trailing commas: ES5 style (not in objects/arrays that span lines)
- Bracket spacing: Yes (e.g., `{ foo }` not `{foo}`)
- Arrow parentheses: Always required (e.g., `(arg) => {}` not `arg => {}`)

**Linting:**
- Tool: Biome v2.4.13
- Recommended preset: Disabled (custom rule set)
- Key enforced rules:
  - `noChildrenProp`: error (forbid `children` as prop)
  - `useJsxKeyInIterable`: error (require `key` in lists)
  - `useImportType`: error (use `import type` for types)
  - `useAsConstAssertion`: error (use `as const` for literals)
  - `noDebugger`: error (forbid debugger statements)
  - `noDuplicateJsxProps`: error (forbid duplicate JSX props)
  - `useSortedClasses`: error (sort Tailwind classes with auto-fix)
  - `noDangerouslySetInnerHtmlWithChildren`: error (security rule)
  - `noUnusedImports`: warn
  - `noUnusedVariables`: off
  - `noUndeclaredVariables`: off

## Import Organization

**Order:**
1. React and framework imports (e.g., `import React, { ... } from 'react'`)
2. External library imports (e.g., `import axios`, `import dayjs`, `import { toast }`)
3. Project absolute imports (e.g., `import { ... } from '@/components'`, `import { ... } from '@/stores'`)
4. Local relative imports (rarely used; prefer absolute)
5. Type imports at end of relevant section or grouped with `import type`

**Path Aliases:**
- `@/*` maps to `./src/*` (configured in `tsconfig.json`)
- Use absolute paths with `@/` prefix consistently (e.g., `@/lib/utils`, `@/components/ui/form`, `@/stores`, `@/config`)

**Type Imports:**
- Use `import type` for type-only imports (enforced by `useImportType` rule)
- Example: `import type { Control, FieldPath, FieldValues } from 'react-hook-form'`

## Error Handling

**Patterns:**
- Error display: Use `toast.error()` from `sonner` library via `handleToastError` utility (`src/utils/common.ts`)
- HTTP errors: Axios interceptors in `src/api/interceptors.ts` handle 401 errors with token refresh logic
- Validation errors: React Hook Form integrates with custom form field components that display `FormMessage` for field-level errors
- Default error message: "Something went wrong" as fallback
- Error logging: `console.error()` for debugging before toast display

**Example error handling pattern:**
```typescript
export const handleToastError = (error: any, defaultError = 'Something went wrong') => {
  console.error(error);
  toast.error(error?.shortMessage ?? error?.message ?? error?.cause?.message ?? defaultError);
};
```

## Logging

**Framework:** No dedicated logging library; uses `console` for debugging

**Patterns:**
- Error logging: `console.error(error)` in catch blocks and interceptors (`src/api/interceptors.ts`)
- No structured logging (no Winston, Pino, or similar)
- Logging is minimal and ad-hoc in utility functions

## Comments

**When to Comment:**
- Complex logic or non-obvious implementation details
- Example from `src/utils/common.ts`: Multi-line comments explain array generation logic
- Avoid commenting obvious code (e.g., `const user = getUser();`)
- Commented-out code may exist (e.g., `src/api/interceptors.ts` has commented refresh token call)

**JSDoc/TSDoc:**
- Type annotations and exported types have minimal JSDoc usage
- Component props documented via TypeScript interface/type (e.g., `interface Props<T extends FieldValues>`)
- No strict JSDoc enforcement across codebase

## Function Design

**Size:** Functions are generally compact, ranging from 1-20 lines for utility functions, up to 40-60 lines for components with form handling logic

**Parameters:**
- React components accept props as single object parameter with destructuring
- Utility functions accept parameters with type annotations
- Generic parameters common in form-related utilities (e.g., `<T extends FieldValues>`)
- Default parameters used for optional values (e.g., `initialState: boolean = false`, `size = 10`, `length = 10`)

**Return Values:**
- Explicitly typed return values (no implicit `any`)
- Components return JSX.Element or React functional component type
- Hooks return object with typed values and methods (e.g., `{ isOpen, openModal, closeModal, toggleModal }`)
- Utility functions return primitive types, arrays, promises, or custom types
- Void returns used for setup functions (e.g., middleware setup in stores)

## Module Design

**Exports:**
- Named exports for utilities and types (e.g., `export const range = ...`)
- Default exports for React components and page-like modules (e.g., `export default MainLayout`)
- Mixed exports in form utilities: both named exports for individual components and default for wrapper
- Type exports: `export type SiteConfig = typeof siteConfig`
- Barrel exports in index files (e.g., `src/stores/index.ts`, `src/components/form-field/index.tsx`)

**Barrel Files:**
- Used to group related exports: `src/stores/index.ts` exports all store selectors
- Used in form-field components: `src/components/form-field/index.tsx` exports all field types
- Index files re-export from subdirectories for cleaner imports in client code

**Component Composition:**
- Wrapping components: Use `React.forwardRef` for components that need ref forwarding (e.g., `FormControl`, `FormLabel`, `FormDescription`)
- Props interface pattern: Extend HTML element attributes and add custom props (e.g., `interface Props<T extends FieldValues> extends InputProps`)
- Functional component naming: Capital first letter (`const MainLayout = ...`)

## Special Patterns

**Custom Hooks:**
- Always use `'use client'` directive at top of file if using browser APIs
- Manage local state with `useState` and side effects with `useCallback`
- Return objects with clear method names (e.g., `{ isOpen, openModal, closeModal, toggleModal }`)
- Example: `src/hooks/useModal.ts`

**Zustand Stores:**
- Create base store with `create<StoreType>()`
- Wrap with `persist` middleware for localStorage
- Use `createSelectorFunctions` wrapper for selector hooks
- Separate state, actions, and lifecycle methods in single object
- Example: `src/stores/UserStore.ts`

**Form Components:**
- Integrate with React Hook Form via `Control` and `FieldPath` generics
- Provide custom wrapper components that compose UI library components
- Pass through standard HTML attributes while adding custom styling props
- Use `cn()` utility for conditional class merging
- Example: `src/components/form-field/TextField.tsx`

**Styling:**
- Tailwind CSS for utility classes
- `class-variance-authority` for component variants
- `cn()` utility (`src/lib/utils.ts`) for merging Tailwind classes with `clsx` and `tailwind-merge`
- Inline styling props for custom ClassValue arrays merged via `cn()`

---

*Convention analysis: 2026-05-08*
