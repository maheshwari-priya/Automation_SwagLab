# Swag Labs Automation Framework

## Overview

An End-to-End QA Automation portfolio project covering **UI, API, and Web Service testing**, built around the [SauceDemo (Swag Labs)](https://www.saucedemo.com) e-commerce app, plus a demo REST API and a SOAP service.

| Layer | Tool | Language |
|---|---|---|
| UI Automation (primary) | **Playwright** | JavaScript |
| UI Automation (secondary) | **Selenium WebDriver** | JavaScript (Mocha) |
| REST API Testing | **Postman / Newman** | JSON collection |
| SOAP Web Service Testing | **SoapUI** | XML project |
| CI/CD | **GitHub Actions** | YAML |
| Containerization | **Docker / Docker Compose** | — |
| Reporting | **Allure Report** + Playwright HTML Report + Mochawesome + Newman HTML Extra | — |

---

## Project Structure

```
Automation_SwagLab/
├── .github/workflows/ci.yml     # CI pipeline: Playwright, Selenium, Postman, SoapUI
├── Dockerfile                   # Playwright container
├── docker-compose.yml           # Orchestrates all 4 test suites
├── fixtures/                    # Playwright hooks
├── pages/                       # Playwright Page Object Model
├── tests/                       # Playwright test specs
├── test-data/                   # JSON test data
├── utils/                       # Screenshot utility
├── selenium-tests/              # Selenium WebDriver suite (own package.json + Dockerfile)
│   ├── pages/
│   └── tests/
├── postman/                     # Postman collection + environment (reqres.in demo API)
└── soapui-tests/                # SoapUI project (SOAP service tests)
```

---

## 1. Playwright UI Suite (primary)

```bash
npm install
npx playwright install
npx playwright test
npx playwright show-report          # HTML report
allure generate allure-results --clean && allure open   # Allure report
```

## 2. Selenium UI Suite

```bash
cd selenium-tests
npm install
npm test
```

## 3. Postman / API Suite

Requires a free API key from [reqres.in](https://reqres.in) (set it in `postman/environment.postman_environment.json`).

```bash
npm install -g newman newman-reporter-htmlextra
newman run postman/SwagLab_API_Collection.postman_collection.json \
  -e postman/environment.postman_environment.json \
  -r cli,htmlextra --reporter-htmlextra-export postman/reports/report.html
```

## 4. SoapUI Suite

Open `soapui-tests/SwagLab-soapui-project.xml` in SoapUI Open Source, or run headless via the `soapui-testrunner` CLI / Docker image (wired into `docker-compose.yml`).

---

## Run Everything via Docker

```bash
docker compose up --build
```

This spins up all four suites (Playwright, Selenium, Postman/Newman, SoapUI) in isolated containers.

---

## CI/CD

Every push/PR to `main` triggers `.github/workflows/ci.yml`, which runs all four suites in parallel jobs and uploads reports as build artifacts.

---

## Framework Features

- Page Object Model (POM) — Playwright & Selenium
- Data-driven testing (JSON test data)
- Hooks (beforeEach/afterEach)
- Screenshot utility on pass/fail
- REST API CRUD + auth testing (Postman/Newman)
- SOAP request/response assertions (SoapUI)
- Multi-format reporting: Allure, Playwright HTML, Mochawesome, Newman HTML Extra
- Fully containerized (Docker) and CI-integrated (GitHub Actions)

---

## Author

QA Automation Portfolio Project — Playwright, Selenium, Postman, SoapUI, Docker, GitHub Actions.
