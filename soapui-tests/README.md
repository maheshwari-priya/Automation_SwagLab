# SoapUI Tests

This folder will contain the SoapUI project file (`SwagLab-soapui-project.xml`) for SOAP web service testing.

## Pending
Waiting on the WSDL endpoint URL to generate the SoapUI project, test suite, and assertions.

Once provided, this folder will include:
- `SwagLab-soapui-project.xml` — the SoapUI project (importable directly in SoapUI Open Source)
- Test suite with request/response assertions (status, schema, and value checks)
- Instructions to run via `soapui-testrunner` CLI (already wired into `docker-compose.yml` and the GitHub Actions workflow)
