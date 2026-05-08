# Testing Patterns

**Analysis Date:** 2026-05-09

## Test Framework

**Status:** No testing framework currently configured in this project.

**Runner:**
- Not detected (Jest and Vitest configs not present)

**Assertion Library:**
- Not detected

**Build-time Type Checking:**
- TypeScript type checking available via `pnpm type-check` command
- Runs `tsc --noEmit` for static type validation

**Run Commands:**
```bash
pnpm type-check              # Type check without emitting files (tsc --noEmit)
```

**No test execution commands found in package.json scripts.**

## Test File Organization

**Location:**
- Not established (no test files present in codebase)
- Biome config includes test file overrides for future implementation:
  ```json
  {
    "includes": ["*.spec.ts", "*.spec.tsx", "*.test.ts", "*.test.tsx"],
    "javascript": {
      "globals": ["afterEach", "afterAll", "beforeEach", "beforeAll", "describe", "expect", "it", "test", "jest"]
    }
  }
  ```

**Naming Convention (planned/configured):**
- `*.test.ts` or `*.test.tsx` for test files
- `*.spec.ts` or `*.spec.tsx` alternative naming
- Test globals configured in Biome: `afterEach`, `afterAll`, `beforeEach`, `beforeAll`, `describe`, `expect`, `it`, `test`, `jest`

**Suggested Structure (based on Biome config):**
```
src/
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   └── button.test.tsx        # co-located with component
│   └── form-fields/
│       ├── form-input.tsx
│       └── form-input.test.tsx
├── hooks/
│   ├── use-auth.ts
│   └── use-auth.test.ts
├── utils/
│   ├── common.ts
│   └── common.test.ts
└── stores/
    ├── user-store.ts
    └── user-store.test.ts
```

## Test Structure

**Note:** No actual test files exist in the codebase. This section describes the framework configuration and recommended approach for future implementation.

**Biome Test Globals (configured):**
```typescript
// Test framework globals available after Jest setup
describe('ComponentName', () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    // Cleanup
  });

  it('should behave in expected way', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

**Patterns (recommended based on dependencies):**
- Use React Testing Library for component testing (available via `@types/react-dom` and React dependencies)
- Use Jest or Vitest for unit/integration testing
- Setup file would handle provider wrapping (theme, query client, zustand stores)

## Mocking

**Framework:**
- Not configured (would typically be Jest or Vitest)

**Patterns:**
- No mocking utilities observed in codebase
- Zustand stores would need mocking for state management testing
- React Query would need mocking for data fetching tests

**What to Mock (recommended):**
- External API calls (using axios)
- Zustand store actions and state
- React Query hooks
- Socket.io connections (`socket.ts` utility)
- Toast notifications (Sonner)

**What NOT to Mock (recommended):**
- React hooks (useState, useEffect, etc.)
- Custom hooks (useAuth, usePagination, etc.) unless testing behavior in isolation
- Utility functions (should be pure and testable without mocks)
- UI component libraries (Radix UI, Tailwind CSS)

## Fixtures and Factories

**Test Data:**
- No fixtures or factories currently present
- Recommended approach would be to create test factories in `__tests__/fixtures/` or similar

**Suggested location:**
```
__tests__/
├── fixtures/
│   ├── users.ts              # User object factories
│   ├── forms.ts              # Form data factories
│   └── api-responses.ts      # Mock API response data
└── setup.ts                  # Jest/Vitest setup and providers
```

**Example pattern (recommended for this codebase):**
```typescript
// __tests__/fixtures/users.ts
export const createMockUser = (overrides?: Partial<IUser>): IUser => ({
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  imageUrl: '',
  role: 'user',
  permissions: [],
  type: 'standard',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});
```

## Coverage

**Requirements:** None enforced (no test infrastructure in place)

**Recommended approach:**
```bash
# After test setup
jest --coverage
# or
vitest --coverage
```

## Test Types

**Unit Tests (recommended structure):**
- Scope: Individual utilities, hooks, components in isolation
- Approach: Test function outputs with various inputs, props, state changes
- Example targets: `src/utils/common.ts`, `src/hooks/use-auth.ts`, `src/lib/utils.ts`

**Integration Tests (recommended structure):**
- Scope: Multiple components/utilities working together, form submissions, store interactions
- Approach: Test component rendering with providers, form field interactions, state updates
- Example targets: Form components with validation, user flows with store updates

**E2E Tests:**
- Framework: Not configured (would use Playwright or Cypress)
- Recommended: Add after unit/integration tests establish

## Recommended Test Setup

**Dependencies to add for testing:**
```json
{
  "devDependencies": {
    "@testing-library/react": "^latest",
    "@testing-library/jest-dom": "^latest",
    "@types/jest": "^latest",
    "jest": "^latest",
    "jest-environment-jsdom": "^latest",
    "ts-jest": "^latest",
    "@testing-library/user-event": "^latest"
  }
}
```

**Jest configuration file (jest.config.ts):**
```typescript
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
      },
    }],
  },
};

export default config;
```

**Setup file (jest.setup.ts):**
```typescript
import '@testing-library/jest-dom';
import { server } from './__tests__/setup';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## Common Testing Patterns (Recommended)

**Component Testing:**
```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { container } = render(<Button variant="destructive">Delete</Button>);
    expect(container.querySelector('button')).toHaveClass('bg-destructive');
  });
});
```

**Hook Testing:**
```typescript
import { renderHook } from '@testing-library/react';
import { useAuth } from '@/hooks/use-auth';

describe('useAuth', () => {
  it('returns user data from store', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toBeDefined();
  });

  it('returns isLoggedIn state', () => {
    const { result } = renderHook(() => useAuth());
    expect(typeof result.current.isLoggedIn).toBe('boolean');
  });
});
```

**Utility Function Testing:**
```typescript
import { validateFileSize, shortenString } from '@/utils/common';

describe('Common Utilities', () => {
  describe('validateFileSize', () => {
    it('returns true for files under size limit', () => {
      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      expect(validateFileSize(file, 10)).toBe(true);
    });

    it('returns false for files over size limit', () => {
      const file = new File(['x'.repeat(11 * 1024 * 1024)], 'test.bin');
      expect(validateFileSize(file, 10)).toBe(false);
    });

    it('returns true for undefined input (permissive validation)', () => {
      expect(validateFileSize(undefined as any, 10)).toBe(true);
    });
  });

  describe('shortenString', () => {
    it('shortens long strings', () => {
      expect(shortenString('verylongstring', 4)).toBe('very...ring');
    });

    it('returns original string if shorter than limit', () => {
      expect(shortenString('short', 10)).toBe('short');
    });

    it('returns empty string for undefined', () => {
      expect(shortenString(undefined, 10)).toBe('');
    });
  });
});
```

**Form Component Testing:**
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { FormInput } from '@/components/form-fields/form-input';

describe('FormInput', () => {
  it('renders label when provided', () => {
    const { control } = useForm();
    render(<FormInput control={control} name="email" label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('handles number type conversion', async () => {
    const user = userEvent.setup();
    const { control } = useForm();
    render(<FormInput control={control} name="count" type="number" />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, '42');
    expect(input).toHaveValue(42);
  });
});
```

**Async Testing (Promises/API calls):**
```typescript
it('handles async operations', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useAuth());
  
  // Trigger async action
  act(() => {
    result.current.setUserData({
      accessToken: 'token',
      refreshToken: 'refresh',
      user: mockUser,
    });
  });

  await waitForNextUpdate();
  expect(result.current.isLoggedIn).toBe(true);
});
```

## Code Quality Tools (Currently Active)

**Type Checking:**
- TypeScript enabled (strict mode)
- Run: `pnpm type-check`
- No runtime issues caught automatically

**Linting:**
- Biome 2.4.13 active
- Run: `pnpm lint`
- Fix: `pnpm lint:fix`
- Enforces correctness rules but does not catch logic errors

**Code Formatting:**
- Biome formatting
- Run: `pnpm format:check`
- Fix: `pnpm format:fix`

**Note:** Testing framework (Jest/Vitest) should be the next addition to the QA pipeline to catch runtime and logic errors.

---

*Testing analysis: 2026-05-09*
