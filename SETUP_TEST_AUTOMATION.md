# Test Automation Setup Guide

This guide explains how to leverage the automated test generation for your project.

## Overview

The test automation system is configured to:
1. ✅ Automatically generate tests when you create new components
2. ✅ Update tests when components are modified
3. ✅ Enforce test coverage standards
4. ✅ Run tests automatically via CI/CD

## What's Included

### Configuration Files

- **`vitest.config.js`** - Vitest configuration with coverage reporting
- **`builder.test-automation.config.js`** - Builder.io agent configuration for test automation
- **`.github/workflows/test.yml`** - GitHub Actions CI workflow

### Test Files

Complete test suites for all existing components:
- `src/components/ForecastCard.test.jsx` - Tests for ForecastCard
- `src/pages/Home.test.jsx` - Tests for Home page
- `src/pages/WeatherForecast.test.jsx` - Tests for WeatherForecast page

### Utility Scripts

- `scripts/generate-component-test.js` - Manual test file generator
- `src/test/setup.js` - Test environment setup

## Quick Start

### 1. Verify Installation

```bash
npm install
```

All dependencies are already in `package.json`. If you added new packages, reinstall:

```bash
npm ci
```

### 2. Run Tests

```bash
# Watch mode (re-runs on file changes)
npm test

# One-time run (useful for CI)
npm run test:run

# With coverage report
npm run test:coverage

# Interactive UI
npm run test:ui
```

### 3. View Coverage

After running tests with coverage:

```bash
open coverage/index.html  # macOS
# or
start coverage/index.html  # Windows
# or
xdg-open coverage/index.html  # Linux
```

## How Automatic Test Generation Works

### For New Components

When you create a new component in `src/components/` or `src/pages/`:

1. **Option A: Manual Generation**
   ```bash
   node scripts/generate-component-test.js src/components/MyComponent.jsx
   ```
   This creates `src/components/MyComponent.test.jsx` with a test template.

2. **Option B: Builder.io Agent**
   - The agent can automatically generate tests when you create components
   - Uses the configuration in `builder.test-automation.config.js`
   - Follows best practices from `TESTING.md`

### For Updated Components

When you modify an existing component:

1. **Automatic Updates (via Builder.io Agent)**
   - Agent detects component signature changes
   - Updates test imports and component references
   - Preserves your custom test logic

2. **Manual Updates**
   - Edit the test file alongside your component changes
   - Run `npm test` to verify

## Configuration Details

### Test Automation Rules

Edit `builder.test-automation.config.js` to customize:

```javascript
testGeneration: {
  onComponentCreate: {
    enabled: true,        // Auto-generate tests on component creation
    template: 'default',  // Use 'default', 'hooks', 'router', or 'forms'
  },
  
  coverageRequirements: {
    statements: 80,       // Require 80% statement coverage
    branches: 75,         // Require 75% branch coverage
    functions: 80,        // Require 80% function coverage
    lines: 80,            // Require 80% line coverage
  },
}
```

### Template Types

Choose template based on component type:

- **`default`** - Basic component with props and state
- **`hooks`** - Components using React hooks (useState, useEffect, etc.)
- **`router`** - Page components with React Router
- **`forms`** - Form components with validation

### Coverage Requirements

The system enforces minimum coverage percentages. To check coverage:

```bash
npm run test:coverage
```

View detailed coverage in `coverage/index.html`.

## Integration with Builder.io Agent

The `builder.test-automation.config.js` file contains prompts for the Builder.io agent:

```javascript
agentPrompts: {
  testGeneration: `
    You are a testing expert. When a new component is created:
    1. Analyze the component's props, state, and behavior
    2. Generate comprehensive unit tests covering...
  `,
}
```

The agent uses these prompts to:
- Understand the component structure
- Generate relevant tests
- Follow project conventions
- Maintain code quality

## CI/CD Integration

### GitHub Actions

Tests run automatically on:
- Pull requests to `main` or `develop`
- Pushes to `main` or `develop`

View results:
1. Go to your GitHub repository
2. Click **Actions** tab
3. Select the latest workflow run
4. Review test results and coverage

### Pre-Commit Hooks (Optional)

To run tests before committing:

```bash
npm install -D husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npm run test:run && npm run lint"
```

This ensures:
- All tests pass before committing
- Linting rules are followed
- Code quality is maintained

## Writing Tests for New Components

### Step 1: Create Component

```jsx
// src/components/MyComponent.jsx
export default function MyComponent({ title, onAction }) {
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={onAction}>Click Me</button>
    </div>
  )
}
```

### Step 2: Generate Test Template

```bash
node scripts/generate-component-test.js src/components/MyComponent.jsx
```

### Step 3: Enhance Tests

Edit `src/components/MyComponent.test.jsx`:

```jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders title', () => {
    render(<MyComponent title="Test Title" onAction={() => {}} />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('calls onAction when button is clicked', async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()
    render(<MyComponent title="Test" onAction={onAction} />)
    
    await user.click(screen.getByText('Click Me'))
    expect(onAction).toHaveBeenCalled()
  })
})
```

### Step 4: Run Tests

```bash
npm test
```

## Best Practices

### ✅ Do

- Test user-visible behavior
- Use semantic queries (`getByRole`, `getByText`)
- Mock external APIs and dependencies
- Keep tests focused and independent
- Use descriptive test names

### ❌ Don't

- Test implementation details
- Use `getByTestId` excessively
- Create fragile tests
- Skip testing error states
- Leave untested code in production

## Troubleshooting

### Tests Won't Run

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm test
```

### Coverage Goals Not Met

```bash
# View coverage report
npm run test:coverage
open coverage/index.html

# Update coverage requirements in builder.test-automation.config.js
# Then run tests again
npm test
```

### Tests Timing Out

Increase timeout in test file:

```jsx
it('slow test', async () => {
  // test code
}, { timeout: 10000 }) // 10 second timeout
```

### Mock Not Working

```jsx
import { vi } from 'vitest'

// For global mocks
global.fetch = vi.fn()

// For module mocks
vi.mock('./myModule', () => ({
  default: { myFunction: vi.fn() }
}))
```

## Next Steps

1. **Run existing tests**: `npm test`
2. **Create a new component** and auto-generate tests
3. **View coverage report**: `npm run test:coverage`
4. **Customize configuration**: Edit `builder.test-automation.config.js`
5. **Read best practices**: See `TESTING.md`

## Resources

- [Vitest Documentation](https://vitest.dev)
- [Testing Library](https://testing-library.com)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Support

For issues or questions:
1. Check `TESTING.md` for detailed test writing guide
2. Review existing tests in `src/**/*.test.jsx`
3. Run `npm run test:ui` for interactive debugging
