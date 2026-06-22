const { test } = require('@playwright/test');
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
});
