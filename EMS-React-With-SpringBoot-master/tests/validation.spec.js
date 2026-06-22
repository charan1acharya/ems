const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../pages/DashboardPage');
const { EmployeePage } = require('../pages/EmployeePage');
const employeeData = require('../data/employeeData.json');

test.describe('Form Validation Tests', () => {
  let dashboardPage;
  let employeePage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    employeePage = new EmployeePage(page);

    await dashboardPage.openAuthenticated();
  });

  test('Required Field Validation', async () => {
    await employeePage.expectRequiredValidation();
  });

  test('Invalid Email Validation', async () => {
    await employeePage.expectInvalidEmailValidation();
  });

  test('Empty Form Submission', async ({ page }) => {
    const rowCountBefore = await page.getByRole('row').count();

    await employeePage.expectRequiredValidation();

    await expect(page.getByRole('row')).toHaveCount(rowCountBefore);
  });

  test('Field Length Validation if applicable', async () => {
    test.fail(true, 'DEFECT: Employee form has no maxlength, min-length, or visible validation for unusually long names.');

    await employeePage.firstNameInput.fill(employeeData.fieldLength.longName);
    await employeePage.lastNameInput.fill(employeeData.fieldLength.longName);
    await employeePage.emailInput.fill('long.name@example.com');
    await employeePage.addButton.click();

    const validationMessage = await employeePage.firstNameInput.evaluate((element) => element.validationMessage);
    expect(validationMessage).toMatch(/length|short|long/i);
  });
});
