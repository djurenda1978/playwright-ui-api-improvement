# Ottometric Demo

UI and API tests written in TypeScript with Playwright.  
Original assignment: `Task.dm`.

## Setup

Requires Node.js 20–25 and Java on PATH for the Allure CLI.

```bash
npm ci
npx playwright install chromium
```

Create `.env` in the project root using `.env.example` as a reference:

```dotenv
SAUCE_STANDARD_USERNAME="enter value"
SAUCE_PASSWORD="enter value"
```

When running the tests on your own machine, replace the placeholders with the `standard_user` credentials listed in `Task.dm`.

The local `.env` is ignored by Git. Application URLs are configured in `config/env.ts`. GoREST GET requests do not use a token.

## Run

Run commands from the project root in PowerShell or Git Bash.

| Command | Purpose |
|---|---|
| `npm test` | Run all four tests |
| `npm run test:api` | Run GoREST API tests |
| `npm run test:ui` | Run SauceDemo checkout test |
| `npm run test:ui:debug` | Debug the UI test |
| `npm run typecheck` | Check TypeScript types |
| `npm run report:open` | Open the Playwright HTML report |
| `npm run clean` | Remove previous Allure results and report |
| `npm run allure:report:open` | Generate and open the Allure report after a test run |

UI tests run headed locally and headless when `CI` is set.

All test commands clear previous Allure results and the report before running. Use `npm test` to include both API and UI results in one report; separate runs replace previous results.

**Note:** Before running `npm test`, `npm run test:ui`, or `npm run test:ui:debug` locally, set `SAUCE_STANDARD_USERNAME` and `SAUCE_PASSWORD` in the root `.env` file. API-only tests do not require credentials.

## Project Structure

```text
ottometric-demo/
├── api/
│   ├── connectors/          # API request handling
│   ├── models/responses/    # API response models
│   └── headers.ts           # Shared API headers
├── config/                  # URLs and secrets loading
├── docs/screenshots/        # Checkout evidence
├── pages/                   # SauceDemo Page Objects
│   └── common/              # Shared page components
├── test-data/               # Test data
├── tests/
│   ├── api/                 # GoREST API tests
│   └── ui/                  # SauceDemo UI tests
├── utils/                   # BDD helpers and credentials
├── playwright.config.ts     # Playwright configuration
└── package.json             # Dependencies and test scripts
```

## GitHub Actions

GitHub Actions uses repository secrets `SAUCE_STANDARD_USERNAME` and `SAUCE_PASSWORD` for UI test execution.

In GitHub Actions, select **Playwright tests**, click **Run workflow**, and choose `all`, `ui`, or `api`.

Reports are saved as artifacts, including after test failures.

### Allure Report

The latest Allure test report is published to GitHub Pages:

https://djurenda1978.github.io/ottometric-demo-task/

The published report reflects the most recently published test suite.

Given/When/Then/And helpers are used to structure Playwright steps and improve report readability.
The UI test captures a screenshot after successful checkout. Playwright screenshots, videos, and traces are retained for failed UI tests to support debugging.

## Test Coverage

### API

- **TEST 1:** Retrieve users and verify that at least one user is returned.
- **TEST 2:** Retrieve users and verify that at least one name starts with uppercase `C`.
- **TEST 3:** Retrieve users, print the returned user objects to the console, and verify that the response is not empty.

TEST 1 and TEST 3 validate a single response page, while TEST 2 searches across paginated results. Since the API uses public data, TEST 2 depends on the current data containing at least one matching name.

### UI

- **TEST 4:** Log in to SauceDemo as `standard_user`, add a product to the cart, complete the checkout process, verify the successful order, return to the products page, and log out.

Each stage of the purchase flow is validated.

