const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { isAuthApiAvailable } = require('../utils/serviceChecks');
const loginData = require('../data/loginData.json');

test.describe('Login Tests', () => {
  let authApiAvailable;

  test.beforeAll(async ({ request }) => {
    authApiAvailable = await isAuthApiAvailable(request);
  });

  test('Valid Login', async ({ page, request }) => {
    test.skip(!authApiAvailable, 'Auth API is unavailable at http://localhost:5001. Start Backend/server.mjs to run API-backed login tests.');

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.registerUserIfNeeded(request, loginData.validUser);
    await loginPage.goto();
    const response = await loginPage.loginAndWaitForResponse(loginData.validUser.email, loginData.validUser.password);

    expect(response.ok()).toBeTruthy();
    await dashboardPage.expectLoaded();
    await expect(page).toHaveURL(/\/dashboard$/);
  });

  test('Invalid Login', async ({ page }) => {
    test.skip(!authApiAvailable, 'Auth API is unavailable at http://localhost:5001. Start Backend/server.mjs to run API-backed login tests.');

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    const response = await loginPage.loginAndWaitForResponse(loginData.invalidUser.email, loginData.invalidUser.password);

    expect(response.status()).toBe(401);
    await loginPage.expectLoginError(loginData.messages.invalidLogin);
    await loginPage.expectLoginFormVisible();
  });

  test('Empty Email Validation', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.submit();

    await loginPage.expectEmailRequired();
    await expect(page).toHaveURL('/');
  });

  test('Empty Password Validation', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.emailInput.fill(loginData.validUser.email);
    await loginPage.submit();

    await loginPage.expectPasswordRequired();
    await expect(page).toHaveURL('/');
  });
});
