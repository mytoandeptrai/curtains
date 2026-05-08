# Codebase Concerns

**Analysis Date:** 2026-05-09

## Security Issues

### Obfuscated Code in Build Process

**Issue:** `preinstall.js` contains heavily obfuscated code using invisible Unicode characters that decodes to JavaScript at runtime.

**Files:** `preinstall.js`

**Risk:** The obfuscation makes it impossible to audit what code is executing during npm install. This is a significant security red flag. The file size (36KB+) and encoding suggest it could be performing unauthorized operations such as:
- Stealing credentials or API keys
- Installing additional dependencies silently
- Sending data to external services
- Modifying package installation behavior

**Current state:** This file runs during `pnpm install` as configured in `package.json` line 15.

**Recommendation:** 
- Immediately review and decode this file's contents
- Replace with transparent, readable JavaScript or remove entirely if not needed
- Scan git history to understand when/why it was added
- Consider running security audit on development machines
- Add `.gitignore` entry for auto-generated files if legitimate

## Tech Debt

### HTTP Interceptor Error Handling

**Issue:** Potential unhandled edge case in token refresh flow when multiple requests fail during refresh.

**Files:** `src/api/http-instance.ts` (lines 145-196)

**Problem:** 
- Queue system for failed requests during token refresh could lose requests if axios instance call fails in the `finally` block
- `failedRequests` array is cleared in `finally` block, which happens before requests are fully resolved
- If a request in the queue throws an error, it may not properly propagate

**Impact:** Requests may silently fail during token expiration scenarios, causing user confusion.

**Fix approach:** 
- Ensure all queued requests have handlers attached before clearing the queue
- Add explicit error handling for the finally block operations
- Consider using a promise-based queue instead of direct array manipulation

### Hard-coded Logout Redirect

**Issue:** Direct `window.location.href = '/'` on token refresh failure.

**Files:** `src/api/http-instance.ts` (line 186)

**Problem:** No error state is passed to the redirect. User lands on home page without knowing why they were logged out.

**Recommendation:** 
- Pass logout reason as query param or use routing that preserves error context
- Show error toast or modal before redirect
- Consider using Next.js router push instead of window.location

## Test Coverage Gaps

### Missing Test Suite

**Issue:** No test files exist in the `src/` directory.

**Files:** All source files lack corresponding `.test.ts` or `.spec.ts` files

**Risk:** 
- Complex hooks like `useFileUpload` (387 lines) are untested
- HTTP interceptor logic has no test coverage
- Form validation and file upload edge cases are not validated
- Store state mutations have no coverage

**Affected components:**
- `src/hooks/use-file-upload.ts` - Complex file handling with edge cases
- `src/api/http-instance.ts` - Critical auth and error handling
- `src/stores/user-store.ts` - State management
- `src/components/form-fields/demo-form.tsx` - Form validation

**Priority:** High - These are business-critical systems.

## Fragile Areas

### File Upload Hook Complexity

**Files:** `src/hooks/use-file-upload.ts` (387 lines)

**Why fragile:** 
- Single file containing all file handling logic, validation, drag/drop, and preview management
- Multiple state updates and callbacks with complex dependency arrays
- URL.createObjectURL/revokeObjectURL management could leak memory if callbacks fire incorrectly
- Duplicate detection logic for multiple mode is inconsistent (line 177-183 silently returns vs. other errors)
- Type union `File | FileMetadata` leads to repeated instanceof checks throughout

**Safe modification:** 
- Add comprehensive tests before refactoring
- Split into smaller hooks: `useFileValidation`, `useFilePreview`, `useFileDragDrop`
- Consider creating factory for ID generation

### HTTP Instance as Global Singleton

**Files:** `src/api/http-instance.ts` (singleton at line 233)

**Why fragile:** 
- Single global instance means token state is shared across entire app
- Failed request queue (`failedRequests` array at line 51) is a mutable global that could have race conditions
- No mechanism to reset or mock in tests
- `isTokenRefreshing` flag (line 53) could be set to true and never reset if an error occurs

**Test coverage issue:** Cannot easily test error scenarios without affecting global state.

## Performance Bottlenecks

### Excessive useCallback Dependencies

**Files:** `src/hooks/use-file-upload.ts` (lines 75-356)

**Problem:** 
- `addFiles` callback has 8 dependencies (line 236-247) including `state.files` which changes on every file operation
- This causes callback to be recreated frequently, defeating the purpose of useCallback
- All dependent callbacks will also be recreated (removeFile, drag handlers, etc.)
- Input props using these callbacks will re-render unnecessarily

**Improvement path:** 
- Use functional state updates to reduce explicit dependency on state
- Separate mutable and immutable concerns
- Consider moving validation and preview creation outside of component state

### Large Components

**Files with excessive lines:**
- `src/components/ui/sidebar.tsx` - 682 lines
- `src/components/ui/input-file-dropzone.tsx` - 294 lines
- `src/components/form-fields/demo-form.tsx` - 282 lines

**Impact:** 
- Harder to test individual functionality
- Reduced reusability of sub-components
- Performance degradation due to full component re-renders

## Missing Error Boundaries

### Limited Error Recovery UI

**Files:** `src/app/error.tsx` (lines 1-24)

**Issues:**
- Error boundary only exists at root level, not for sections
- No specific error handling for API failures, auth errors, form validation
- Error logging only goes to console, no error tracking service
- No recovery path shown to user beyond generic "Try again"

**Recommendation:** 
- Create specialized error boundaries for API errors, form errors, auth
- Integrate with error tracking service (Sentry, etc.)
- Show contextual recovery paths

## Data Validation Concerns

### Type Safety in Store

**Files:** `src/stores/user-store.ts` (lines 5-62)

**Issues:**
- `user` initialized as empty object `{}` (line 39) then later type-cast as `IUser`
- This bypasses type safety - accessing properties on empty object before hydration will be undefined
- `IStore` interface is completely empty (line 19), reducing type safety of `setStore`

**Improvement:** 
- Initialize user as `undefined` not empty object
- Populate IStore interface with actual expected store shape
- Add runtime validation on rehydration

### Weak Form Validation

**Files:** `src/components/form-fields/demo-form.tsx` (line 53)

**Issue:** File upload field validates with `z.array(z.any()).optional()` - `z.any()` disables all type checking on array contents.

**Recommendation:** Use specific type for files: `z.array(z.instanceof(File))`

## Scaling Limits

### localStorage for Token Storage

**Files:** `src/stores/user-store.ts` (line 53)

**Issue:** Using localStorage for auth tokens and refresh tokens means:
- Tokens are accessible to XSS attacks (no HttpOnly flag equivalent)
- localStorage can only store ~5-10MB per domain
- No automatic cleanup of old sessions
- Synchronization across tabs may cause race conditions during logout

**Risk:** Significant for multi-tab applications where user logs out in one tab but remains logged in another.

## Known Issues

### Silent Failure on Duplicate File Upload

**Files:** `src/hooks/use-file-upload.ts` (lines 176-184)

**Behavior:** When a duplicate file is detected in multiple mode, the function returns silently without:
- Calling onError callback to notify user
- Adding any error to errors array
- Any user-visible indication

**Expected:** Should add error message or call onError for duplicate files, not fail silently.

## Dependencies at Risk

### Beta/Pre-release Versions

**Files:** `package.json`

**Concerning packages:**
- `kbar@0.1.0-beta.48` - Beta version, could have breaking changes
- `@teispace/next-themes@0.3.2` - Not the official `next-themes`, appears to be a fork
- `auto-zustand-selectors-hook@3.0.1` - Minimal maintenance, small user base

**Risk:** Breaking updates or deprecation without long-term support guarantees.

## Missing Critical Features

### No Loading States in Components

**Issue:** File upload UI and forms lack loading/disabled states during submission.

**Files:** `src/components/form-fields/demo-form.tsx`, form field components

**Impact:** User can submit forms multiple times, causing duplicate requests or confusing UX.

---

*Concerns audit: 2026-05-09*
