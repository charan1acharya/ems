# Automation (Playwright) 

This folder contains the Playwright end-to-end automation framework for the Employee Management System.

Setup

1. Change to this folder:

```bash
cd automation
```

2. Install dependencies:

```bash
npm install
npx playwright install
```

Execution

- Run all tests:

```bash
npm run test:e2e
```

- Run headed tests or open UI:

```bash
npm run test:e2e:headed
npm run test:e2e:ui
```

Report

- After a run, view the HTML report:

```bash
npx playwright show-report
```

Notes

- The Playwright config runs the frontend dev server from `../src/Emp React`.
- Environment variables supported: `BASE_URL`, `AUTH_API_URL`, `EMPLOYEE_API_URL`.
