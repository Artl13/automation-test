# Automation Tests

## Overview
This project is an automated testing suite using [Playwright](https://playwright.dev/) to test web applications efficiently. It supports parallel test execution and CI/CD integration.

## Installation
Ensure you have Node.js installed, then run:

```sh
npm install
```

## Running Tests
To execute all tests, use:

```sh
npx playwright test
```

Run a specific test:

```sh
npx playwright test tests/example.spec.ts
```

For headed mode (visual debugging):

```sh
npx playwright test --headed
```

## Configuration
Playwright settings are in `playwright.config.ts`, including:
- Test directory: `./tests`
- Parallel execution: Enabled
- CI/CD compatibility

## Environment Variables
If needed, create a `.env` file and configure environment variables. Enable dotenv in `playwright.config.ts` if using environment variables.

## Additional Resources
- [Playwright Docs](https://playwright.dev/docs/intro)