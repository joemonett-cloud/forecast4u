#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

const componentPath = process.argv[2]

if (!componentPath) {
  console.error('Usage: node scripts/generate-component-test.js <component-path>')
  process.exit(1)
}

const componentFullPath = path.resolve(componentPath)
const componentName = path.basename(componentPath, path.extname(componentPath))
const componentDir = path.dirname(componentFullPath)
const testPath = path.join(componentDir, `${componentName}.test.jsx`)

// Check if component file exists
if (!fs.existsSync(componentFullPath)) {
  console.error(`Component file not found: ${componentFullPath}`)
  process.exit(1)
}

// Check if test file already exists
if (fs.existsSync(testPath)) {
  console.log(`Test file already exists: ${testPath}`)
  process.exit(0)
}

// Read component file to generate appropriate test template
const componentContent = fs.readFileSync(componentFullPath, 'utf-8')

// Detect if component is a page (in pages directory) or a regular component
const isPageComponent = componentPath.includes('/pages/')

// Generate test template
let testTemplate = ''

if (isPageComponent) {
  testTemplate = `import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ${componentName} from './${componentName}'

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('${componentName}', () => {
  it('renders successfully', () => {
    renderWithRouter(<${componentName} />)
    // Add specific assertions for ${componentName}
  })

  // Add more test cases specific to ${componentName}
})
`
} else {
  testTemplate = `import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ${componentName} from './${componentName}'

describe('${componentName}', () => {
  it('renders successfully', () => {
    render(<${componentName} />)
    // Add specific assertions for ${componentName}
  })

  // Add more test cases specific to ${componentName}
})
`
}

// Write test file
fs.writeFileSync(testPath, testTemplate)
console.log(`✅ Generated test file: ${testPath}`)
