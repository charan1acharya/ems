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
        - row "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ long.name@example.com Edit Delete" [ref=e35]:
          - cell "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ" [ref=e36]:
            - generic [ref=e37]: ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ
          - cell "long.name@example.com" [ref=e38]:
            - generic [ref=e39]: long.name@example.com
          - cell "Edit Delete" [ref=e40]:
            - button "Edit" [ref=e41] [cursor=pointer]
            - button "Delete" [ref=e42] [cursor=pointer]
        - row "mohammed saifulla rohan@test.com Edit Delete" [ref=e43]:
          - cell "mohammed saifulla" [ref=e44]:
            - generic [ref=e45]: mohammed saifulla
          - cell "rohan@test.com" [ref=e46]:
            - generic [ref=e47]: rohan@test.com
          - cell "Edit Delete" [ref=e48]:
            - button "Edit" [ref=e49] [cursor=pointer]
            - button "Delete" [ref=e50] [cursor=pointer]
        - row "mohammed ifulla rohan@test.com Edit Delete" [ref=e51]:
          - cell "mohammed ifulla" [ref=e52]:
            - generic [ref=e53]: mohammed ifulla
          - cell "rohan@test.com" [ref=e54]:
            - generic [ref=e55]: rohan@test.com
          - cell "Edit Delete" [ref=e56]:
            - button "Edit" [ref=e57] [cursor=pointer]
            - button "Delete" [ref=e58] [cursor=pointer]
        - row "Sai Ram sai@test.com Edit Delete" [ref=e59]:
          - cell "Sai Ram" [ref=e60]:
            - generic [ref=e61]: Sai Ram
          - cell "sai@test.com" [ref=e62]:
            - generic [ref=e63]: sai@test.com
          - cell "Edit Delete" [ref=e64]:
            - button "Edit" [ref=e65] [cursor=pointer]
            - button "Delete" [ref=e66] [cursor=pointer]
        - row "Ajinkya Jadkar ajinkya1782137681230@test.com Edit Delete" [ref=e67]:
          - cell "Ajinkya Jadkar" [ref=e68]:
            - generic [ref=e69]: Ajinkya Jadkar
          - cell "ajinkya1782137681230@test.com" [ref=e70]:
            - generic [ref=e71]: ajinkya1782137681230@test.com
          - cell "Edit Delete" [ref=e72]:
            - button "Edit" [ref=e73] [cursor=pointer]
            - button "Delete" [ref=e74] [cursor=pointer]
        - row "TestFirst TestLast test@example.com Edit Delete" [ref=e75]:
          - cell "TestFirst TestLast" [ref=e76]:
            - generic [ref=e77]: TestFirst TestLast
          - cell "test@example.com" [ref=e78]:
            - generic [ref=e79]: test@example.com
          - cell "Edit Delete" [ref=e80]:
            - button "Edit" [ref=e81] [cursor=pointer]
            - button "Delete" [ref=e82] [cursor=pointer]
        - row "UpdateTest User update@test.com Edit Delete" [ref=e83]:
          - cell "UpdateTest User" [ref=e84]:
            - generic [ref=e85]: UpdateTest User
          - cell "update@test.com" [ref=e86]:
            - generic [ref=e87]: update@test.com
          - cell "Edit Delete" [ref=e88]:
            - button "Edit" [ref=e89] [cursor=pointer]
            - button "Delete" [ref=e90] [cursor=pointer]
        - row "TestFirst TestLast test@example.com Edit Delete" [ref=e91]:
          - cell "TestFirst TestLast" [ref=e92]:
            - generic [ref=e93]: TestFirst TestLast
          - cell "test@example.com" [ref=e94]:
            - generic [ref=e95]: test@example.com
          - cell "Edit Delete" [ref=e96]:
            - button "Edit" [ref=e97] [cursor=pointer]
            - button "Delete" [ref=e98] [cursor=pointer]
        - row "UpdateTest User update@test.com Edit Delete" [ref=e99]:
          - cell "UpdateTest User" [ref=e100]:
            - generic [ref=e101]: UpdateTest User
          - cell "update@test.com" [ref=e102]:
            - generic [ref=e103]: update@test.com
          - cell "Edit Delete" [ref=e104]:
            - button "Edit" [ref=e105] [cursor=pointer]
            - button "Delete" [ref=e106] [cursor=pointer]
  - generic [ref=e107]:
    - heading "Add Employee" [level=2] [ref=e108]
    - generic [ref=e109]:
      - textbox "First Name" [ref=e110]: ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ
      - textbox "Last Name" [ref=e111]: ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ
      - textbox "Email" [ref=e112]: long.name@example.com
      - button "Add" [active] [ref=e113] [cursor=pointer]
    - img [ref=e115]
    - text: Employee added/updated successfully
    - button "Dismiss" [ref=e118] [cursor=pointer]
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