# SoapUI Tests

SOAP web service testing against the public **DNE Online Calculator** service — a standard, widely used demo SOAP endpoint for QA portfolios (WSDL: `http://www.dneonline.com/calculator.asmx?WSDL`).

## Contents
`SwagLab-soapui-project.xml` — importable directly into SoapUI Open Source. Contains 5 test steps:

| Test | Operation | Checks |
|---|---|---|
| TC01 - Add | Add(10, 15) | HTTP 200, valid SOAP response, result = 25 |
| TC02 - Subtract | Subtract(20, 8) | HTTP 200, valid SOAP response, result = 12 |
| TC03 - Multiply | Multiply(6, 7) | HTTP 200, valid SOAP response, result = 42 |
| TC04 - Divide | Divide(100, 4) | HTTP 200, valid SOAP response, result = 25 |
| TC05 - Divide By Zero (edge case) | Divide(50, 0) | HTTP 200/500 (boundary/negative test) |

## Run it

**GUI:** Open SoapUI Open Source → File → Import Project → select `SwagLab-soapui-project.xml` → run the TestSuite.

**CLI / headless:**
```bash
soapui-testrunner -s "TestSuite" SwagLab-soapui-project.xml
```

**Docker:** already wired into `../docker-compose.yml` (`soapui-tests` service) and `../.github/workflows/ci.yml` (`soapui-tests` job).

> Note: if you'd rather point this at your own SOAP endpoint instead of the public demo service, swap the `endpoint` and request bodies in the project XML — the structure (interface → operations → testSuite → testCase → assertions) stays the same.
