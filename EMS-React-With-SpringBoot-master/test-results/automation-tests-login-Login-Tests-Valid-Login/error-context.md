# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: automation\tests\login.spec.js >> Login Tests >> Valid Login
- Location: automation\tests\login.spec.js:14:3

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/", waiting until "load"

```

# Test source

```ts
  1  | const { expect } = require('@playwright/test');
  2  | const { AUTH_API_URL } = require('../utils/serviceChecks');
  3  | 
  4  | class LoginPage {
  5  |   constructor(page) {
  6  |     this.page = page;
  7  |     this.heading = page.getByRole('heading', { name: 'Sign In' });
  8  |     this.emailInput = page.getByLabel('Email');
  9  |     this.passwordInput = page.getByLabel('Password');
  10 |     this.signInButton = page.getByRole('button', { name: 'Sign In' });
  11 |     this.signUpLink = page.getByRole('link', { name: "Don't have an account? Sign Up" });
  12 |   }
  13 | 
  14 |   async goto() {
> 15 |     await this.page.goto('/');
     |                     ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  16 |     await expect(this.heading).toBeVisible();
  17 |   }
  18 | 
  19 |   async registerUserIfNeeded(request, user) {
  20 |     const response = await request.post(`${AUTH_API_URL}/register`, {
  21 |       data: user
  22 |     });
  23 | 
  24 |     expect([201, 400]).toContain(response.status());
  25 |   }
  26 | 
  27 |   async login(email, password) {
  28 |     await this.emailInput.fill(email);
  29 |     await this.passwordInput.fill(password);
  30 |     await this.signInButton.click();
  31 |   }
  32 | 
  33 |   async loginAndWaitForResponse(email, password) {
  34 |     const responsePromise = this.page.waitForResponse((response) =>
  35 |       response.url() === `${AUTH_API_URL}/login` && response.request().method() === 'POST'
  36 |     );
  37 | 
  38 |     await this.login(email, password);
  39 |     return responsePromise;
  40 |   }
  41 | 
  42 |   async submit() {
  43 |     await this.signInButton.click();
  44 |   }
  45 | 
  46 |   async expectLoginFormVisible() {
  47 |     await expect(this.heading).toBeVisible();
  48 |     await expect(this.emailInput).toBeVisible();
  49 |     await expect(this.passwordInput).toBeVisible();
  50 |   }
  51 | 
  52 |   async expectLoginError(message) {
  53 |     await expect(this.page.getByText(message)).toBeVisible();
  54 |   }
  55 | 
  56 |   async expectEmailRequired() {
  57 |     const validationMessage = await this.emailInput.evaluate((element) => element.validationMessage);
  58 |     expect(validationMessage).toMatch(/fill|email|required/i);
  59 |   }
  60 | 
  61 |   async expectPasswordRequired() {
  62 |     const validationMessage = await this.passwordInput.evaluate((element) => element.validationMessage);
  63 |     expect(validationMessage).toMatch(/fill|required/i);
  64 |   }
  65 | }
  66 | 
  67 | module.exports = { LoginPage };
  68 | 
```