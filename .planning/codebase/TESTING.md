# Testing Patterns

**Analysis Date:** 2026-05-08

## Test Framework

**Status:** Not Implemented

**Current State:**
- No test files exist in the codebase (no `*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx` files detected)
- No testing framework installed (Jest, Vitest, etc. not in devDependencies)
- No test configuration files present (`jest.config.js`, `vitest.config.ts`, etc.)
- Biome config includes test file overrides (`*.spec.ts`, `*.test.tsx`) but they are not utilized

**Framework Recommendation:**
- Vitest is suggested for unit/integration testing (faster, TypeScript-native, works with Next.js)
- Alternatively, Jest with `@testing-library/react` for traditional setup

## Testing Infrastructure Gaps

**Missing:**
- Test runner configuration
- Unit test structure and patterns
- Component testing utilities
- API mocking setup
- Test data factories or fixtures
- Code coverage measurement

## Test File Organization

**Planned Structure (if implemented):**
- **Location:** Co-located with source files
- **Naming Convention:** 
  - `Component.test.tsx` for React components
  - `utility.test.ts` for utility functions
  - `hook.test.ts` for custom hooks
  - `store.test.ts` for Zustand stores
- **Directory Pattern:**
  ```
  src/
  ├── components/
  │   ├── ui/
  │   │   ├── button.tsx
  │   │   └── button.test.tsx
  │   └── form-field/
  │       ├── TextField.tsx
  │       └── TextField.test.tsx
  ├── hooks/
  │   ├── useAuth.ts
  │   └── useAuth.test.ts
  ├── utils/
  │   ├── common.ts
  │   └── common.test.ts
  ```

## Test Structure (Template for Implementation)

**Recommended Suite Organization:**

For unit tests:
```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('ComponentName', () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    // Cleanup
  });

  it('should render correctly', () => {
    expect(true).toBe(true);
  });

  it('should handle user interaction', () => {
    // Test logic
  });
});
```

For component tests with React Testing Library:
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders button with label', () => {
    render(<MyComponent />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<MyComponent onClick={handleClick} />);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

**Patterns:**
- Use `describe` blocks to organize test suites by component/function
- Use `beforeEach`/`afterEach` for common setup/teardown
- Use clear test names with "should" verb (e.g., "should render correctly")
- Use `expect` assertions from testing framework
- Group related tests in nested `describe` blocks

## Mocking

**Framework:** Vitest (recommended) has `vi.fn()` and `vi.mock()`

**Patterns (to establish):**
```typescript
// Mock function
const mockCallback = vi.fn();

// Mock module
vi.mock('@/api/axios', () => ({
  request: vi.fn(),
}));

// Mock Zustand store
vi.mock('@/stores', () => ({
  useUserStore: {
    getState: vi.fn(() => ({
      accessToken: 'token',
      user: { id: 1, name: 'Test User' },
    })),
  },
}));
```

**What to Mock:**
- External API calls (Axios `request` instance from `src/api/axios.ts`)
- Zustand stores (e.g., `useUserStore` from `src/stores/UserStore.ts`)
- Browser APIs (e.g., `localStorage`, `window` APIs)
- Third-party libraries (e.g., `sonner` toast, `react-hook-form`)
- Child components (when testing in isolation)

**What NOT to Mock:**
- Utility functions (test them directly, e.g., `common.ts` utilities)
- TypeScript types and interfaces
- React hooks from React itself (hooks can be tested through components)
- Small helper functions (e.g., `cn()` from `lib/utils.ts`)

## Fixtures and Factories

**Test Data (Not Currently Implemented):**

Recommended location: `src/__tests__/fixtures/` or `src/__tests__/factories/`

Example fixture pattern:
```typescript
// src/__tests__/fixtures/user.ts
export const mockUser = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
};

export const mockAccessToken = 'mock-access-token';
export const mockRefreshToken = 'mock-refresh-token';
```

Example factory pattern:
```typescript
// src/__tests__/factories/userFactory.ts
export function createMockUser(overrides = {}) {
  return {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    ...overrides,
  };
}
```

**Location:** Test fixtures and factories should be in a shared `__tests__` directory at root or under `src/`

## Coverage

**Requirements:** Not enforced (no coverage thresholds configured)

**Recommendation:**
```json
{
  "coverage": {
    "provider": "v8",
    "reporter": ["text", "json", "html"],
    "all": true,
    "include": ["src/**/*.{ts,tsx}"],
    "exclude": ["src/**/*.d.ts", "src/**/*.stories.tsx"],
    "lines": 80,
    "functions": 80,
    "branches": 75,
    "statements": 80
  }
}
```

**View Coverage (future command):**
```bash
pnpm vitest --coverage
```

## Test Types

**Unit Tests:**
- **Scope:** Individual utility functions, custom hooks
- **Approach:** Direct function call testing with mocked dependencies
- **Examples:**
  - Test `range()` utility with various inputs and edge cases
  - Test `validateFileFormat()` with different file types
  - Test `useModal()` hook state transitions
  - Test `useAuth()` hook token and user retrieval

**Integration Tests:**
- **Scope:** Components with form handling, store interaction, API calls
- **Approach:** Component render testing with mocked APIs and store state
- **Examples:**
  - Test `TextField` component with React Hook Form integration
  - Test `MainLayout` with providers and child components
  - Test form submission with validation and error handling
  - Test Zustand store persistence to localStorage

**E2E Tests:**
- **Framework:** Not used currently
- **Recommendation:** Playwright or Cypress for full page/user flow testing
- **Future scope:** Test complete user journeys (login, form submission, navigation)

## Common Test Patterns (To Establish)

**Async Testing:**
```typescript
it('should fetch user data', async () => {
  const { getState } = useUserStore;
  const state = getState();
  // Test async actions
  await expect(Promise.resolve('data')).resolves.toBeDefined();
});
```

**Error Testing:**
```typescript
it('should handle validation errors', () => {
  const result = validateFileFormat({ type: 'text/plain' }, ['image/*']);
  expect(result).toBe(false);
});

it('should throw on invalid input', () => {
  expect(() => {
    riskyFunction(null);
  }).toThrow();
});
```

**Hook Testing:**
```typescript
import { renderHook, act } from '@testing-library/react';
import { useModal } from '@/hooks/useModal';

it('should toggle modal state', () => {
  const { result } = renderHook(() => useModal());
  
  expect(result.current.isOpen).toBe(false);
  
  act(() => {
    result.current.openModal();
  });
  
  expect(result.current.isOpen).toBe(true);
});
```

**Store Testing:**
```typescript
import { renderHook, act } from '@testing-library/react';
import { useUserStore } from '@/stores';

it('should set and logout user', () => {
  const { result } = renderHook(() => useUserStore());
  
  act(() => {
    result.current.setUser({ id: 1, name: 'Test' });
  });
  
  expect(result.current.user).toEqual({ id: 1, name: 'Test' });
  
  act(() => {
    result.current.logout();
  });
  
  expect(result.current.accessToken).toBe('');
});
```

## Testing Tools to Install

**Recommended devDependencies:**
```json
{
  "devDependencies": {
    "vitest": "^latest",
    "@testing-library/react": "^latest",
    "@testing-library/jest-dom": "^latest",
    "@testing-library/user-event": "^latest",
    "@vitest/ui": "^latest",
    "jsdom": "^latest"
  }
}
```

## Test Configuration (To Create)

**File: `vitest.config.ts`**
```typescript
import { getViteConfig } from 'astro/config';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.d.ts'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**Update `package.json` scripts:**
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

---

*Testing analysis: 2026-05-08*
