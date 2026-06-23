const { expect } = require('@playwright/test');
const { EMPLOYEE_API_URL } = require('../utils/serviceChecks');

class EmployeePage {
  constructor(page) {
    this.page = page;
    this.formHeading = page.getByRole('heading', { name: /Add Employee|Edit Employee/ });
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.emailInput = page.getByPlaceholder('Email');
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.updateButton = page.getByRole('button', { name: 'Update' });
    this.table = page.getByRole('table');
    this.searchInput = page.getByRole('searchbox');
  }

  employeeRowByEmail(email) {
    return this.table.locator('tbody tr').filter({ hasText: email });
  }

  employeeRowByName(name) {
    return this.page.getByRole('row').filter({ hasText: name });
  }

  async createEmployee(employee) {
    await this.firstNameInput.fill(employee.firstname);
    await this.lastNameInput.fill(employee.lastname);
    await this.emailInput.fill(employee.email);

    const createResponsePromise = this.page.waitForResponse((response) =>
      response.url() === `${EMPLOYEE_API_URL}/ems/AddEmployee` && response.request().method() === 'POST'
    );

    await this.addButton.click();
    const createResponse = await createResponsePromise;
    expect(createResponse.ok()).toBeTruthy();

    await this.expectEmployeeExists(employee.email);
  }

  async updateEmployee(currentEmail, updatedEmployee) {
    const row = this.employeeRowByEmail(currentEmail);
    await expect(row).toBeVisible();
    await row.getByRole('button', { name: 'Edit' }).click();
    await expect(this.updateButton).toBeVisible();
    if (updatedEmployee.firstname !== undefined) {
      await this.firstNameInput.fill(updatedEmployee.firstname);
    }
    if (updatedEmployee.lastname !== undefined) {
      await this.lastNameInput.fill(updatedEmployee.lastname);
    }
    if (updatedEmployee.email !== undefined) {
      await this.emailInput.fill(updatedEmployee.email);
    }

    const updateResponsePromise = this.page.waitForResponse((response) =>
      response.url().includes(`${EMPLOYEE_API_URL}/ems/UpdateEmployee/`) && response.request().method() === 'PUT'
    );

    await this.updateButton.click();
    const updateResponse = await updateResponsePromise;
    expect(updateResponse.ok()).toBeTruthy();

    await this.expectEmployeeExists(updatedEmployee.email);
  }

  async deleteEmployee(email) {
    const row = this.employeeRowByEmail(email);
    await expect(row).toBeVisible();
    this.page.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Are you sure you want to delete this employee?');
      await dialog.accept();
    });

    const deleteResponsePromise = this.page.waitForResponse((response) =>
      response.url().includes(`${EMPLOYEE_API_URL}/ems/DeleteEmployee/`) && response.request().method() === 'DELETE'
    );

    await row.getByRole('button', { name: 'Delete' }).click();
    const deleteResponse = await deleteResponsePromise;
    expect(deleteResponse.ok()).toBeTruthy();

    await this.expectEmployeeRemoved(email);
  }

  async selectEmployee(email) {
    const row = this.employeeRowByEmail(email);
    await expect(row).toBeVisible();
    await row.getByRole('button', { name: 'Edit' }).click();
    await expect(this.page.getByRole('heading', { name: 'Edit Employee' })).toBeVisible();
  }

  async expectEmployeeExists(email) {
    const rows = this.employeeRowByEmail(email);
    await expect(rows.first()).toBeVisible();
  }

  async expectEmployeeRemoved(email) {
    const rows = this.employeeRowByEmail(email);
    await expect(rows).toHaveCount(0);
  }

  async expectRequiredValidation() {
    await this.addButton.click();
    const validationMessage = await this.firstNameInput.evaluate((element) => element.validationMessage);
    expect(validationMessage).toMatch(/fill|required/i);
  }

  async expectInvalidEmailValidation() {
    await this.firstNameInput.fill('Invalid');
    await this.lastNameInput.fill('Email');
    await this.emailInput.fill('invalid-email');
    await this.addButton.click();
    const validationMessage = await this.emailInput.evaluate((element) => element.validationMessage);
    expect(validationMessage).toMatch(/email|include|@/i);
  }

  async search(term) {
    await this.searchInput.fill(term);
  }

  async getEmployeeCount() {
    // Prefer counting via API for accurate results, fall back to UI counting
    try {
      const count = await this.page.evaluate((url) =>
        fetch(url + '/ems/EmployeeDetail')
          .then((r) => r.json())
          .then((list) => list.length)
          .catch(() => 0),
        EMPLOYEE_API_URL
      );
      if (typeof count === 'number') return count;
    } catch (e) {
      // fallback to UI counting
    }

    try {
      await this.page.waitForSelector('table', { timeout: 2000 });
      const rows = await this.table.locator('tbody tr').count();
      return rows;
    } catch (e) {
      const allRows = await this.page.getByRole('row').count();
      return Math.max(0, allRows - 1);
    }
  }

  async apiCreateEmployee(request, employee) {
    const response = await request.post(`${EMPLOYEE_API_URL}/ems/AddEmployee`, {
      data: employee
    });
    return response;
  }

  async apiDeleteEmployeeByEmail(request, email) {
    const listResponse = await request.get(`${EMPLOYEE_API_URL}/ems/EmployeeDetail`);
    if (!listResponse.ok()) {
      return;
    }

    const employees = await listResponse.json();
    const matches = employees.filter((employee) => employee.email === email);

    for (const employee of matches) {
      await request.delete(`${EMPLOYEE_API_URL}/ems/DeleteEmployee/${employee.id}`);
    }
  }
}

module.exports = { EmployeePage };
