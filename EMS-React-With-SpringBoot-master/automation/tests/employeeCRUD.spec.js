const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../pages/DashboardPage');
const { EmployeePage } = require('../pages/EmployeePage');
const { isEmployeeApiAvailable } = require('../utils/serviceChecks');
const { uniqueEmployee } = require('../utils/randomData');
const employeeData = require('../data/employeeData.json');

test.describe('Employee CRUD Tests', () => {
  let employeeApiAvailable;
  let dashboardPage;
  let employeePage;
  let createdEmails;

  test.beforeAll(async ({ request }) => {
    employeeApiAvailable = await isEmployeeApiAvailable(request);
  });

  test.beforeEach(async ({ page }) => {
    test.skip(!employeeApiAvailable, 'Employee API is unavailable at http://localhost:8080. Start the Spring Boot employee service to run CRUD tests.');

    dashboardPage = new DashboardPage(page);
    employeePage = new EmployeePage(page);
    createdEmails = [];

    await dashboardPage.openAuthenticated();
  });

  test.afterEach(async ({ request }) => {
    if (!employeePage || !createdEmails) {
      return;
    }

    for (const email of createdEmails) {
      await employeePage.apiDeleteEmployeeByEmail(request, email);
    }
  });

  test('Add Employee and Verify Employee Exists After Creation', async () => {
    const employee = uniqueEmployee({
      firstname: employeeData.baseEmployee.firstname,
      lastname: employeeData.baseEmployee.lastname
    });
    createdEmails.push(employee.email);

    await employeePage.createEmployee(employee);
  });

  test('Search Employee from existing list by visible table text', async ({ request }) => {
    const employee = uniqueEmployee();
    createdEmails.push(employee.email);

    await employeePage.apiCreateEmployee(request, employee);
    await dashboardPage.openAuthenticated();

    await employeePage.expectEmployeeExists(employee.email);
  });

  test('Update Employee', async ({ request }) => {
    const employee = uniqueEmployee();
    const updatedEmployee = uniqueEmployee({
      firstname: employeeData.updatedEmployee.firstname,
      lastname: employeeData.updatedEmployee.lastname
    });
    createdEmails.push(employee.email, updatedEmployee.email);

    await employeePage.apiCreateEmployee(request, employee);
    await dashboardPage.openAuthenticated();

    await employeePage.updateEmployee(employee.email, updatedEmployee);
    await employeePage.expectEmployeeRemoved(employee.email);
  });

  test('Delete Employee and Verify Employee Removed After Deletion', async ({ request }) => {
    const employee = uniqueEmployee();
    createdEmails.push(employee.email);

    await employeePage.apiCreateEmployee(request, employee);
    await dashboardPage.openAuthenticated();

    await employeePage.deleteEmployee(employee.email);
  });
  // Test to create multiple employees and verify their existence
  test('Create Multiple Employees', async ({ request }) => {
  const employee1 = uniqueEmployee();
  const employee2 = uniqueEmployee();

  await employeePage.apiCreateEmployee(request, employee1);
  await employeePage.apiCreateEmployee(request, employee2);

  await dashboardPage.openAuthenticated();

  await employeePage.expectEmployeeExists(employee1.email);
  await employeePage.expectEmployeeExists(employee2.email);
  });
  // Test to check duplicate employee creation validation
  test('Duplicate Employee Validation', async ({ request }) => {
  const employee = uniqueEmployee();

  await employeePage.apiCreateEmployee(request, employee);

  const response = await employeePage.apiCreateEmployee(
    request,
    employee
  );

  expect(response.status()).not.toBe(201);
  });
    // Test to search for a non-existing employee and verify that it is not found
  test('Search Non Existing Employee', async () => {
  await dashboardPage.openAuthenticated();

  await employeePage.expectEmployeeRemoved(
    'doesnotexist@test.com'
  );
  });
  // Test to verify that the employee count increases after adding a new employee
  test('Employee Count Increases After Add', async ({ request }) => {
  const beforeCount = await employeePage.getEmployeeCount();

  const employee = uniqueEmployee();

  await employeePage.apiCreateEmployee(request, employee);

  await dashboardPage.openAuthenticated();

  const afterCount = await employeePage.getEmployeeCount();

  expect(afterCount).toBeGreaterThan(beforeCount);
  });
  // Test to verify that the employee count decreases after deleting an employee
  test('Employee Count Decreases After Delete', async ({ request }) => {
  const employee = uniqueEmployee();

  await employeePage.apiCreateEmployee(request, employee);

  await dashboardPage.openAuthenticated();

  const beforeCount = await employeePage.getEmployeeCount();

  await employeePage.deleteEmployee(employee.email);

  const afterCount = await employeePage.getEmployeeCount();

  expect(afterCount).toBeLessThan(beforeCount);
  });
  // Test to update only the first name of an employee and verify that the employee still exists
  test('Update Employee First Name Only', async ({ request }) => {
  const employee = uniqueEmployee();

  await employeePage.apiCreateEmployee(request, employee);

  await dashboardPage.openAuthenticated();

  await employeePage.updateEmployee(employee.email, {
    firstname: 'UpdatedName'
  });

  await employeePage.expectEmployeeExists(employee.email);
  });
  // Test to verify that an employee persists after a page refresh
  test('Employee Persists After Refresh', async ({ request, page }) => {
  const employee = uniqueEmployee();

  await employeePage.apiCreateEmployee(request, employee);

  await dashboardPage.openAuthenticated();

  await page.reload();

  await employeePage.expectEmployeeExists(employee.email);
  });
  // Test to verify that an employee created via API appears in the UI
  test('Employee Created Via API Appears In UI', async ({ request }) => {
  const employee = uniqueEmployee();

  await employeePage.apiCreateEmployee(request, employee);

  await dashboardPage.openAuthenticated();

  await employeePage.expectEmployeeExists(employee.email);
  });
});
