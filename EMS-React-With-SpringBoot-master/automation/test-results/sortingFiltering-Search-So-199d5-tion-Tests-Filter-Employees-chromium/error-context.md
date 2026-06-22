# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: sortingFiltering.spec.js >> Search, Sorting, Filtering, and Pagination Tests >> Filter Employees
- Location: tests\sortingFiltering.spec.js:40:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('combobox', { name: /filter/i })
Expected: visible
Timeout: 1000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 1000ms
  - waiting for getByRole('combobox', { name: /filter/i })

```

```yaml
- banner:
  - button "open drawer"
  - text: E-Manager
  - button "show 4 new mails": "0"
  - button "show 17 new notifications": "0"
  - button "account of current user"
- heading "Employee Management System" [level=1]
- heading "Employee List" [level=2]
- table:
  - rowgroup:
    - row "Name Email Actions":
      - columnheader "Name"
      - columnheader "Email"
      - columnheader "Actions"
  - rowgroup:
    - row "abc xyz abc@gmail.com Edit Delete":
      - cell "abc xyz"
      - cell "abc@gmail.com"
      - cell "Edit Delete":
        - button "Edit"
        - button "Delete"
    - row "mohammed saifulla rohan@test.com Edit Delete":
      - cell "mohammed saifulla"
      - cell "rohan@test.com"
      - cell "Edit Delete":
        - button "Edit"
        - button "Delete"
    - row "mohammed ifulla rohan@test.com Edit Delete":
      - cell "mohammed ifulla"
      - cell "rohan@test.com"
      - cell "Edit Delete":
        - button "Edit"
        - button "Delete"
    - row "Sai Ram sai@test.com Edit Delete":
      - cell "Sai Ram"
      - cell "sai@test.com"
      - cell "Edit Delete":
        - button "Edit"
        - button "Delete"
    - row "Ajinkya Jadkar ajinkya1782137681230@test.com Edit Delete":
      - cell "Ajinkya Jadkar"
      - cell "ajinkya1782137681230@test.com"
      - cell "Edit Delete":
        - button "Edit"
        - button "Delete"
    - row "TestFirst TestLast test@example.com Edit Delete":
      - cell "TestFirst TestLast"
      - cell "test@example.com"
      - cell "Edit Delete":
        - button "Edit"
        - button "Delete"
    - row "UpdateTest User update@test.com Edit Delete":
      - cell "UpdateTest User"
      - cell "update@test.com"
      - cell "Edit Delete":
        - button "Edit"
        - button "Delete"
    - row "TestFirst TestLast test@example.com Edit Delete":
      - cell "TestFirst TestLast"
      - cell "test@example.com"
      - cell "Edit Delete":
        - button "Edit"
        - button "Delete"
    - row "UpdateTest User update@test.com Edit Delete":
      - cell "UpdateTest User"
      - cell "update@test.com"
      - cell "Edit Delete":
        - button "Edit"
        - button "Delete"
- heading "Add Employee" [level=2]
- textbox "First Name"
- textbox "Last Name"
- textbox "Email"
- button "Add"
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const { DashboardPage } = require('../pages/DashboardPage');
  3  | const { EmployeePage } = require('../pages/EmployeePage');
  4  | 
  5  | test.describe('Search, Sorting, Filtering, and Pagination Tests', () => {
  6  |   let dashboardPage;
  7  |   let employeePage;
  8  | 
  9  |   test.beforeEach(async ({ page }) => {
  10 |     dashboardPage = new DashboardPage(page);
  11 |     employeePage = new EmployeePage(page);
  12 | 
  13 |     await dashboardPage.openAuthenticated();
  14 |   });
  15 | 
  16 |   test('Search Existing Employee', async () => {
  17 |     test.fail(true, 'DEFECT: Search input is not implemented on the Employee List page.');
  18 | 
  19 |     await expect(employeePage.searchInput).toBeVisible({ timeout: 1000 });
  20 |   });
  21 | 
  22 |   test('Search Non-Existing Employee', async () => {
  23 |     test.fail(true, 'DEFECT: Search input is not implemented on the Employee List page.');
  24 | 
  25 |     await expect(employeePage.searchInput).toBeVisible({ timeout: 1000 });
  26 |   });
  27 | 
  28 |   test('Sort Ascending', async ({ page }) => {
  29 |     test.fail(true, 'DEFECT: Sort controls are not implemented for employee table columns.');
  30 | 
  31 |     await expect(page.getByRole('button', { name: /sort.*ascending/i })).toBeVisible({ timeout: 1000 });
  32 |   });
  33 | 
  34 |   test('Sort Descending', async ({ page }) => {
  35 |     test.fail(true, 'DEFECT: Sort controls are not implemented for employee table columns.');
  36 | 
  37 |     await expect(page.getByRole('button', { name: /sort.*descending/i })).toBeVisible({ timeout: 1000 });
  38 |   });
  39 | 
  40 |   test('Filter Employees', async ({ page }) => {
  41 |     test.fail(true, 'DEFECT: Filter controls are not implemented on the Employee List page.');
  42 | 
> 43 |     await expect(page.getByRole('combobox', { name: /filter/i })).toBeVisible({ timeout: 1000 });
     |                                                                   ^ Error: expect(locator).toBeVisible() failed
  44 |   });
  45 | 
  46 |   test('Clear Filter', async ({ page }) => {
  47 |     test.fail(true, 'DEFECT: Clear filter control is not implemented on the Employee List page.');
  48 | 
  49 |     await expect(page.getByRole('button', { name: /clear filter/i })).toBeVisible({ timeout: 1000 });
  50 |   });
  51 | 
  52 |   test('Next Page', async ({ page }) => {
  53 |     test.fail(true, 'DEFECT: Pagination controls are not implemented on the Employee List page.');
  54 | 
  55 |     await expect(page.getByRole('button', { name: /next/i })).toBeVisible({ timeout: 1000 });
  56 |   });
  57 | 
  58 |   test('Previous Page', async ({ page }) => {
  59 |     test.fail(true, 'DEFECT: Pagination controls are not implemented on the Employee List page.');
  60 | 
  61 |     await expect(page.getByRole('button', { name: /previous/i })).toBeVisible({ timeout: 1000 });
  62 |   });
  63 | 
  64 |   test('Verify Record Changes after Pagination', async ({ page }) => {
  65 |     test.fail(true, 'DEFECT: Pagination controls are not implemented, so record changes cannot be verified.');
  66 | 
  67 |     await expect(page.getByRole('button', { name: /next/i })).toBeVisible({ timeout: 1000 });
  68 |   });
  69 | });
  70 | 
```