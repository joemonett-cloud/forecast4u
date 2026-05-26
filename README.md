# Forecast4U

A modern 5-day weather forecast application built with React and Vite, providing detailed weather information in 3-hour increments using the OpenWeatherMap API.

## Prerequisites

- Node.js 16.x or higher
- npm (comes with Node.js)

## Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

## Configuration

### OpenWeatherMap API Key

This project requires an OpenWeatherMap API key to fetch weather data.

1. **Get your API key:**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key from your account dashboard

2. **Set up environment variables:**
   - Copy the `.env.example` file (if it exists) or create a `.env.local` file in the root directory:
     ```bash
     VITE_OPENWEATHER_API_KEY=your_api_key_here
     ```
   - Replace `your_api_key_here` with your actual OpenWeatherMap API key

## Running the App

### Development Server
Start the development server with hot module replacement (HMR):
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Build for Production
Create an optimized production build:
```bash
npm run build
```

### Preview Production Build
Preview the production build locally:
```bash
npm run preview
```

## Testing

### Run Tests
Execute the test suite:
```bash
npm test
```

### Run Tests Once
Run tests without watch mode:
```bash
npm run test:run
```

### View Test UI
Open an interactive test UI:
```bash
npm test:ui
```

### Coverage Report
Generate a test coverage report:
```bash
npm run test:coverage
```

## Code Quality

### Lint Code
Check and report linting issues:
```bash
npm run lint
```

## Project Structure

```
forecast4u/
├── src/
│   ├── components/         # Reusable React components
│   ├── pages/             # Page components
│   ├── assets/            # Images and static assets
│   ├── App.jsx            # Main app component
│   ├── index.css          # Global styles
│   └── main.jsx           # Entry point
├── public/                # Static files
├── storybook/             # Component stories
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
├── vitest.config.js       # Vitest configuration
└── package.json           # Project dependencies
```

## Features

- Search weather by ZIP code
- 5-day forecast with 3-hour intervals
- Real-time weather updates
- Responsive design

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Carbon Design System** - UI components
- **Vitest** - Unit testing framework
- **ESLint** - Code linting

## Troubleshooting

### API Key Not Working
- Verify your API key is correctly set in `.env.local`
- Ensure the key is for the OpenWeatherMap 2.5 API (not 3.0)
- Check that your account is active on OpenWeatherMap

### Port Already in Use
If port 5173 is already in use, Vite will automatically use the next available port. Check the terminal output for the actual URL.

### Node Version Issues
If you encounter issues, try updating Node.js to the latest LTS version:
```bash
node --version  # Check current version
```

## Support

For issues or questions, refer to the project's test documentation in `TESTING.md` or the test automation setup in `SETUP_TEST_AUTOMATION.md`.
