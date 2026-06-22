# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: validation.spec.js >> Form Validation Tests >> Field Length Validation if applicable
- Location: tests\validation.spec.js:33:3

# Error details

```
Error: expect(received).toMatch(expected)

Expected pattern: /length|short|long/i
Received string:  ""
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e5]:
    - generic [ref=e6]:
      - button "open drawer" [ref=e7] [cursor=pointer]:
        - img [ref=e8]
      - generic [ref=e10]: E-Manager
      - generic [ref=e11]:
        - button "show 4 new mails" [ref=e12] [cursor=pointer]:
          - generic [ref=e13]:
            - img [ref=e14]
            - generic: "0"
        - button "show 17 new notifications" [ref=e16] [cursor=pointer]:
          - generic [ref=e17]:
            - img [ref=e18]
            - generic: "0"
        - button "account of current user" [ref=e20] [cursor=pointer]:
          - img [ref=e21]
  - heading "Employee Management System" [level=1] [ref=e23]
  - generic [ref=e24]:
    - heading "Employee List" [level=2] [ref=e25]
    - table [ref=e28]:
      - rowgroup [ref=e29]:
        - row "Name Email Actions" [ref=e30]:
          - columnheader "Name" [ref=e31]
          - columnheader "Email" [ref=e32]
          - columnheader "Actions" [ref=e33]
      - rowgroup [ref=e34]:
        - row "Aadiiii shaj Suryabasjkf addiii123@gmail.com Edit Delete" [ref=e35]:
          - cell "Aadiiii shaj Suryabasjkf" [ref=e36]:
            - generic [ref=e37]: Aadiiii shaj Suryabasjkf
          - cell "addiii123@gmail.com" [ref=e38]:
            - generic [ref=e39]: addiii123@gmail.com
          - cell "Edit Delete" [ref=e40]:
            - button "Edit" [ref=e41] [cursor=pointer]
            - button "Delete" [ref=e42] [cursor=pointer]
  - generic [ref=e43]:
    - heading "Add Employee" [level=2] [ref=e44]
    - generic [ref=e45]:
      - textbox "First Name" [ref=e46]: ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ
      - textbox "Last Name" [ref=e47]: ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ
      - textbox "Email" [ref=e48]: long.name@example.com
      - button "Add" [active] [ref=e49] [cursor=pointer]
    - img [ref=e51]
    - text: Employee added/updated successfully
    - button "Dismiss" [ref=e54] [cursor=pointer]
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const { DashboardPage } = require('../pages/DashboardPage');
  3  | const { EmployeePage } = require('../pages/EmployeePage');
  4  | const employeeData = require('../data/employeeData.json');
  5  | 
  6  | test.describe('Form Validation Tests', () => {
  7  |   let dashboardPage;
  8  |   let employeePage;
  9  | 
  10 |   test.beforeEach(async ({ page }) => {
  11 |     dashboardPage = new DashboardPage(page);
  12 |     employeePage = new EmployeePage(page);
  13 | 
  14 |     await dashboardPage.openAuthenticated();
  15 |   });
  16 | 
  17 |   test('Required Field Validation', async () => {
  18 |     await employeePage.expectRequiredValidation();
  19 |   });
  20 | 
  21 |   test('Invalid Email Validation', async () => {
  22 |     await employeePage.expectInvalidEmailValidation();
  23 |   });
  24 | 
  25 |   test('Empty Form Submission', async ({ page }) => {
  26 |     const rowCountBefore = await page.getByRole('row').count();
  27 | 
  28 |     await employeePage.expectRequiredValidation();
  29 | 
  30 |     await expect(page.getByRole('row')).toHaveCount(rowCountBefore);
  31 |   });
  32 | 
  33 |   test('Field Length Validation if applicable', async () => {
  34 |     test.fail(true, 'DEFECT: Employee form has no maxlength, min-length, or visible validation for unusually long names.');
  35 | 
  36 |     await employeePage.firstNameInput.fill(employeeData.fieldLength.longName);
  37 |     await employeePage.lastNameInput.fill(employeeData.fieldLength.longName);
  38 |     await employeePage.emailInput.fill('long.name@example.com');
  39 |     await employeePage.addButton.click();
  40 | 
  41 |     const validationMessage = await employeePage.firstNameInput.evaluate((element) => element.validationMessage);
> 42 |     expect(validationMessage).toMatch(/length|short|long/i);
     |                               ^ Error: expect(received).toMatch(expected)
  43 |   });
  44 | });
  45 | 
```