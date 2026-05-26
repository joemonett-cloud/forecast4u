# Testing Guide

This project uses **Vitest** for unit testing React components. This guide covers how to run, write, and maintain tests.

## Getting Started

### Install Dependencies

Testing dependencies are already included in `package.json`. If you need to reinstall:

```bash
npm install
```

### Run Tests

```bash
# Run tests in watch mode (default for development)
npm test

# Run tests once (CI mode)
npm run test:run

# Run tests with coverage report
npm run test:coverage

# Run tests with UI dashboard
npm run test:ui
```

## Test Structure

Tests are located alongside their components:
- `src/components/ForecastCard.test.jsx` - ForecastCard component tests
- `src/pages/Home.test.jsx` - Home page tests
- `src/pages/WeatherForecast.test.jsx` - WeatherForecast page tests

## Writing Tests

### Basic Component Test

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders the component', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### Testing Components with Router

For page components that use React Router:

```jsx
import { BrowserRouter } from 'react-router-dom'

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('MyPage', () => {
  it('renders successfully', () => {
    renderWithRouter(<MyPage />)
  })
})
```

### Testing User Interactions

```jsx
import userEvent from '@testing-library/user-event'

it('handles user input', async () => {
  const user = userEvent.setup()
  render(<MyComponent />)
  const input = screen.getByRole('textbox')
  await user.type(input, 'hello')
  expect(input).toHaveValue('hello')
})
```

### Mocking Fetch Requests

```jsx
import { vi } from 'vitest'

it('fetches data', async () => {
  global.fetch = vi.fn().mockResolvedValueOnce({
    ok: true,
    json: async () => ({ data: 'test' }),
  })

  render(<MyComponent />)
  // Test your component with mocked data
})
```

## Auto-Generate Test Files

When creating a new component, automatically generate a test template:

```bash
node scripts/generate-component-test.js src/components/MyNewComponent.jsx
```

This creates `src/components/MyNewComponent.test.jsx` with a basic test structure.

## Configuration

Vitest is configured in `vitest.config.js`:
- **Environment**: `happy-dom` (lightweight DOM implementation)
- **Setup Files**: `src/test/setup.js` (imports testing-library matchers)
- **Coverage**: Configured to report HTML, JSON, and text formats

Run coverage reports:
```bash
npm run test:coverage
```

Open the HTML report:
```bash
open coverage/index.html
```

## Best Practices

1. **Test Behavior, Not Implementation**
   - Test what users see and interact with
   - Avoid testing internal state or implementation details

2. **Use Semantic Queries**
   - Prefer `getByRole()`, `getByLabelText()`, `getByText()`
   - Avoid `getByTestId()` unless necessary

3. **Async Patterns**
   - Use `waitFor()` for async operations
   - Use `userEvent` for user interactions (not `fireEvent`)

4. **Keep Tests Focused**
   - One assertion per test when possible
   - Test one feature per test

5. **Mock External Dependencies**
   - Mock API calls, timers, and external libraries
   - Use `vi.fn()`, `vi.mock()`, and `vi.stub()`

## Coverage Goals

- Aim for 80%+ coverage for components
- Focus on critical paths and user interactions
- Don't obsess over 100% coverage

## Debugging Tests

Run Vitest in UI mode for visual debugging:

```bash
npm run test:ui
```

This opens an interactive dashboard where you can:
- See test results in real-time
- Filter and search tests
- View coverage details
- Debug failing tests

## Continuous Integration

Tests are automatically run on:
- Pull request creation
- Commits to main branches
- Manual trigger

Configure pre-commit hooks (optional):

```bash
npm install -D husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npm run test:run && npm run lint"
```

## Common Issues

### Tests Timeout
- Increase timeout: `it('test', async () => {...}, { timeout: 10000 })`
- Check for unresolved promises

### Import Errors
- Ensure file extensions are `.jsx` for React components
- Check path aliases in `vite.config.js`

### Fetch Not Mocked
- Always mock `global.fetch` in tests that make API calls
- Use `vi.fn()` to create mocks

## Resources

- [Vitest Documentation](https://vitest.dev)
- [Testing Library Docs](https://testing-library.com)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
