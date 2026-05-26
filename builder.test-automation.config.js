/**
 * Builder.io Agent Configuration for Automatic Test Generation
 * 
 * This configuration enables the Builder.io agent to automatically:
 * 1. Generate test files when new components are created
 * 2. Update tests when component signatures change
 * 3. Maintain test coverage metrics
 * 
 * Usage:
 * - The agent will check this config when creating/updating components
 * - Tests are generated in the same directory as the component
 * - Test files follow the pattern: ComponentName.test.jsx
 */

export const testAutomationConfig = {
  // Enable automatic test generation
  enabled: true,

  // File patterns to monitor for test generation
  patterns: {
    components: ['src/components/**/*.jsx', '!src/components/**/*.test.jsx'],
    pages: ['src/pages/**/*.jsx', '!src/pages/**/*.test.jsx'],
  },

  // Test generation rules
  testGeneration: {
    // Automatically create test file when component is created
    onComponentCreate: {
      enabled: true,
      template: 'default', // Can be: 'default', 'hooks', 'router', 'forms'
      outputDir: 'same', // Same directory as component
    },

    // Update tests when component structure changes
    onComponentUpdate: {
      enabled: true,
      updateImports: true,
      preserveCustomTests: true, // Don't overwrite existing test logic
    },

    // Minimum test coverage requirements
    coverageRequirements: {
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80,
    },
  },

  // Test templates for different component types
  templates: {
    default: {
      imports: ['vitest', '@testing-library/react'],
      structure: 'describe-it',
      assertions: ['renders', 'basic-interaction'],
    },

    hooks: {
      imports: ['vitest', '@testing-library/react', '@testing-library/react-hooks'],
      structure: 'describe-it',
      assertions: ['hook-state', 'hook-effects', 'hook-cleanup'],
    },

    router: {
      imports: [
        'vitest',
        '@testing-library/react',
        'react-router-dom',
      ],
      structure: 'describe-it-with-router',
      assertions: ['navigation', 'params', 'route-rendering'],
    },

    forms: {
      imports: ['vitest', '@testing-library/react', '@testing-library/user-event'],
      structure: 'describe-it',
      assertions: ['form-input', 'form-submission', 'validation'],
    },
  },

  // Commands for the agent to run
  commands: {
    // Run tests when component is created
    afterComponentCreate: ['npm run test:run -- {testFile}'],

    // Run tests and coverage when component is updated
    afterComponentUpdate: ['npm run test:coverage'],

    // Validate test quality
    validateTests: ['npm run test:run -- {testFile}', 'npm run test:coverage'],
  },

  // Ignore patterns (don't generate tests for these)
  ignore: [
    '**/*.styles.jsx',
    '**/index.jsx',
    '**/*.config.jsx',
    'node_modules/**',
  ],

  // Agent prompts for test generation
  agentPrompts: {
    testGeneration: `
    You are a testing expert. When a new component is created:
    1. Analyze the component's props, state, and behavior
    2. Generate comprehensive unit tests covering:
       - Component rendering
       - User interactions
       - Edge cases
       - Error states
    3. Use React Testing Library best practices
    4. Focus on testing user-visible behavior, not implementation
    5. Create tests that will help prevent regressions
    `,

    testUpdate: `
    You are a testing expert. When a component is updated:
    1. Review the changes made to the component
    2. Update existing tests to match new behavior
    3. Add tests for new features
    4. Remove tests for removed functionality
    5. Ensure all tests still pass
    6. Preserve any custom test logic developers added
    `,
  },

  // Pre-commit hook configuration
  preCommitHook: {
    enabled: true,
    actions: [
      'npm run test:run',
      'npm run lint',
    ],
    failOnError: true,
  },

  // Reporting configuration
  reporting: {
    // Generate coverage reports
    coverage: {
      enabled: true,
      format: ['html', 'json', 'text'],
      outputDir: 'coverage',
    },

    // Generate test reports
    testReport: {
      enabled: true,
      format: 'json',
      outputDir: 'test-reports',
    },

    // Notify on coverage changes
    notifications: {
      enabled: true,
      onCoverageDecrease: 'warn',
      onCoverageFail: 'error',
    },
  },
}

/**
 * Usage Instructions for Builder.io Agent:
 * 
 * 1. When creating a new component:
 *    - The agent will use this config to determine the component type
 *    - Generate appropriate test file in the same directory
 *    - Run the generated tests to ensure they pass
 * 
 * 2. When updating a component:
 *    - The agent will check if tests exist
 *    - Update tests if needed based on component changes
 *    - Run updated tests to ensure they still pass
 * 
 * 3. For developers:
 *    - No additional setup needed
 *    - Tests are generated automatically
 *    - Run `npm run test` to see all tests
 *    - Run `npm run test:coverage` for coverage reports
 * 
 * 4. To disable auto-generation for specific files:
 *    - Add patterns to the `ignore` array
 *    - Or set `testAutomationConfig.enabled = false`
 */

export default testAutomationConfig
