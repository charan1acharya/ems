const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:5173',
    screenshot: 'on',
    video: 'on',
    trace: 'on',
    actionTimeout: 10000,
    navigationTimeout: 15000
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  webServer: {
    // run the frontend dev server from the repo's src/Emp React folder
    command: 'npm run dev -- --host localhost',
    cwd: '../src/Emp React',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 120000
  }
});
