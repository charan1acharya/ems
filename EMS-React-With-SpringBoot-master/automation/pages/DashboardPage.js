const { expect } = require('@playwright/test');

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.title = page.getByRole('heading', { name: 'Employee Management System' });
    this.employeeListHeading = page.getByRole('heading', { name: 'Employee List' });
    this.accountButton = page.getByRole('button', { name: 'account of current user' });
    this.logoutMenuItem = page.getByRole('menuitem', { name: 'Logout' });
  }

  async openAuthenticated() {
    await this.page.goto('/');
    await this.page.evaluate(() => localStorage.setItem('Login', 'true'));
    await this.page.goto('/dashboard');
    await this.expectLoaded();
  }

  async expectLoaded() {
    await expect(this.title).toBeVisible();
    await expect(this.employeeListHeading).toBeVisible();
  }

  async logout() {
    await this.accountButton.click();
    await this.logoutMenuItem.click();
    await expect(this.page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
  }
}

module.exports = { DashboardPage };
