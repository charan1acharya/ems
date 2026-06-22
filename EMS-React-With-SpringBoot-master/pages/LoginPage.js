const { expect } = require('@playwright/test');
const { AUTH_API_URL } = require('../utils/serviceChecks');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Sign In' });
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.signUpLink = page.getByRole('link', { name: "Don't have an account? Sign Up" });
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.heading).toBeVisible();
  }

  async registerUserIfNeeded(request, user) {
    const response = await request.post(`${AUTH_API_URL}/register`, {
      data: user
    });

    expect([201, 400]).toContain(response.status());
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async loginAndWaitForResponse(email, password) {
    const responsePromise = this.page.waitForResponse((response) =>
      response.url() === `${AUTH_API_URL}/login` && response.request().method() === 'POST'
    );

    await this.login(email, password);
    return responsePromise;
  }

  async submit() {
    await this.signInButton.click();
  }

  async expectLoginFormVisible() {
    await expect(this.heading).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

  async expectLoginError(message) {
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async expectEmailRequired() {
    const validationMessage = await this.emailInput.evaluate((element) => element.validationMessage);
    expect(validationMessage).toMatch(/fill|email|required/i);
  }

  async expectPasswordRequired() {
    const validationMessage = await this.passwordInput.evaluate((element) => element.validationMessage);
    expect(validationMessage).toMatch(/fill|required/i);
  }
}

module.exports = { LoginPage };
