# Employee Management System - Playwright Automation Framework

This repository includes a Playwright + JavaScript end-to-end automation framework for the Employee Management System.

## Folder Structure

```text
pages/
  LoginPage.js
  DashboardPage.js
  EmployeePage.js
tests/
  login.spec.js
  employeeCRUD.spec.js
  validation.spec.js
  sortingFiltering.spec.js
data/
  loginData.json
  employeeData.json
utils/
  randomData.js
  serviceChecks.js
playwright.config.js
```

## Execution Steps

1. Install frontend dependencies:

```bash
cd "src/Emp React"
npm install
```

2. Install automation dependencies from the project root:

```bash
cd ../..
npm install
npx playwright install
```

3. Start required backend services:

```bash
cd Backend
npm install
node server.mjs
```

```bash
cd employee
./mvnw spring-boot:run
```

4. Run tests from the project root:

```bash
npm run test:e2e
```

5. Open the HTML report:

```bash
npm run test:e2e:report
```

## Configuration

`playwright.config.js` enables:

- HTML report
- Screenshot on failure: `only-on-failure`
- Video on failure: `retain-on-failure`
- Trace on retry: `on-first-retry`
- Vite frontend web server at `http://127.0.0.1:5173`

The Express login API is expected at `http://localhost:5001`.
The Employee API is expected at `http://localhost:8080`.
The frontend is served at `http://localhost:5173` to match the Spring Boot CORS configuration.

## Locator Strategy

The framework prefers user-facing locators:

- `getByRole()` for headings, buttons, table rows, and menus.
- `getByLabel()` for Material UI login fields because those fields expose accessible labels.
- `getByText()` for visible validation and server error messages.
- `getByPlaceholder()` only for employee form inputs because the current app uses placeholders without labels.

XPath is not used.

## Assumptions

- Valid login test data can be created through `POST /register`.
- Employee CRUD data is persisted through the Spring Boot API.
- Employee tests authenticate by setting `localStorage.Login = true` because dashboard access is controlled only by frontend state.
- Unique employee names and emails are generated with `Date.now()` through `utils/randomData.js`.
- Backend services must be running before tests that use login or employee APIs.
- API-backed tests run a lightweight service preflight. Auth tests are skipped with a clear reason when `Backend/server.mjs` is not running.

## Known Defects Found During Automation

- Search is not implemented on the Employee List page.
- Sorting controls are not implemented for employee table columns.
- Filtering controls are not implemented on the Employee List page.
- Pagination controls are not implemented.
- Employee form inputs have placeholders but no visible labels, reducing accessibility and locator stability.
- Employee form has no custom validation messages for required fields.
- Employee form has no field length restrictions.
- Add/update success snackbar is shown immediately after submit, even if the API request fails.
- Delete success snackbar is shown even when the user cancels the browser confirmation dialog.
- Dashboard authentication is based on editable local storage state.
- UI-created employees are submitted with `id: ""`, which can make update/delete requests target `/UpdateEmployee/` or `/DeleteEmployee/` instead of a real employee id.
- Spring Boot CORS allows `http://localhost:5173`; running the frontend from `http://127.0.0.1:5173` causes browser API calls to fail.

Tests for unavailable search, sorting, filtering, pagination, and field length validation are marked with `test.fail()` and a defect note instead of being skipped.

## Suggested Application Improvements

- Add accessible labels to employee form fields.
- Add stable `aria-label` or visible names to table actions that include the employee identity.
- Add search, sorting, filtering, and pagination if they are expected product features.
- Show success messages only after successful API responses.
- Show error messages for failed employee create, update, delete, and fetch calls.
- Replace local-storage-only route protection with server-backed authentication.
- Add frontend validation for email format, maximum lengths, and required fields with user-friendly messages.
