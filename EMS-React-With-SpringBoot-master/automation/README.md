# Employee Management System - Playwright Automation Framework

## Project Overview

This repository contains an end-to-end Playwright automation framework developed for the Employee Management System (EMS) application.

The framework follows industry-standard automation practices including:

* Page Object Model (POM)
* Reusable methods
* Test data separation
* Reporting and debugging support
* Screenshot, Video, and Trace capture
* Scalable framework design

---

## Framework Structure

```text
automation/
├── pages/
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   └── EmployeePage.js
│
├── tests/
│   ├── login.spec.js
│   ├── employeeCRUD.spec.js
│   ├── validation.spec.js
│   └── sortingFiltering.spec.js
│
├── data/
│   ├── loginData.json
│   └── employeeData.json
│
├── utils/
│   └── randomData.js
│
├── playwright.config.js
├── package.json
├── README.md
└── KNOWN_DEFECTS.md
```

---

## Test Coverage

### Authentication

* Valid Login
* Invalid Login
* Empty Credentials Validation

### Employee Management

* Add Employee
* Search Employee
* Update Employee
* Delete Employee

### Validation Testing

* Required Field Validation
* Invalid Data Validation
* Form Submission Validation

### Additional Scenarios

* Sorting Validation (if available)
* Filtering Validation (if available)
* Pagination Validation (if available)

---

## Technologies Used

* Playwright
* JavaScript
* Node.js
* Page Object Model (POM)
* Git & GitHub

---

## Prerequisites

* Node.js (LTS Version)
* npm
* Git
* Running EMS Application

Services Required:

* Frontend: http://localhost:5173
* Authentication API: http://localhost:5001
* Employee API: http://localhost:8080

---

## Installation

Navigate to the automation folder:

```bash
cd automation
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## Test Execution

Run all tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run a specific test:

```bash
npx playwright test tests/login.spec.js
```

Run Playwright UI Mode:

```bash
npx playwright test --ui
```

---

## Reporting

The framework is configured to generate:

### HTML Report

```bash
npx playwright show-report
```

### Screenshots

Captured automatically on failure.

### Videos

Retained automatically on failure.

### Trace Files

Generated on first retry for debugging purposes.

---

## Framework Features

### Page Object Model

All page interactions are maintained in dedicated page classes to improve maintainability and reduce code duplication.

### Reusable Utilities

Common operations and dynamic test data generation are centralized within utility classes.

### Test Data Management

Test data is stored separately from test scripts using JSON files.

### Dynamic Data

Unique employee names and email addresses are generated using timestamps to avoid test data conflicts.

---

## Known Defects

The following application issues were identified during automation:

* Authentication service requires proper MongoDB configuration.
* Employee update functionality requires additional validation.
* Search, sorting, filtering, and pagination features may not be available depending on application version.

---

## Submission Deliverables

This repository contains:

* Playwright Source Code
* Page Object Model Framework
* Test Data Files
* Configuration Files
* Execution Documentation

Additional submission artifacts include:

* HTML Report
* Screenshots
* Videos
* Trace Files

---

## Author

Charan K B

Playwright Automation Assessment Project
