# Storybook with IBM Carbon Components

This is a Storybook application showcasing IBM Carbon React components.

## Getting Started

### Installation

From the `storybook` directory, install dependencies:

```bash
npm install
```

### Development

Start the Storybook dev server:

```bash
npm run storybook
```

The Storybook will open at `http://localhost:6006`

### Build

Build Storybook for production:

```bash
npm run build-storybook
```

The built output will be in the `storybook-static` directory.

## Project Structure

```
storybook/
├── .storybook/
│   ├── main.js           # Storybook configuration
│   └── preview.js        # Global preview settings
├── src/
│   ├── components/       # React components and their stories
│   │   ├── Button.jsx
│   │   ├── Button.stories.jsx
│   │   ├── Card.jsx
│   │   ├── Card.css
│   │   ├── Card.stories.jsx
│   │   ├── TextInput.jsx
│   │   └── TextInput.stories.jsx
│   └── styles.css        # Global styles
├── package.json
└── README.md
```

## Available Components

### Button
A flexible button component with multiple variants:
- **Kinds**: primary, secondary, danger, ghost, tertiary
- **Sizes**: sm, md, lg, xl
- **States**: normal, disabled

### Card
A simple card container for displaying content:
- Customizable title and description
- Flexible content area
- Clean styling with shadow

### TextInput
A text input field with validation:
- Label support
- Placeholder text
- Error states with custom error messages
- Disabled state

## Adding New Components

1. Create your component file (e.g., `src/components/MyComponent.jsx`)
2. Create a corresponding stories file (e.g., `src/components/MyComponent.stories.jsx`)
3. Define the component and export story variations
4. Storybook will automatically pick up the `.stories.jsx` files

## Dependencies

- **React**: ^19.2.6
- **React DOM**: ^19.2.6
- **@carbon/react**: ^1.108.0 (IBM Carbon components)
- **@carbon/icons-react**: ^11.81.0 (Carbon icons)
- **Storybook**: ^8.5.0

## Documentation

For more information about Storybook, visit [storybook.js.org](https://storybook.js.org)

For IBM Carbon components, visit [carbon.design](https://www.carbondesignsystem.com/)
