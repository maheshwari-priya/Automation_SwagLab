const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const LoginPage = require('../pages/LoginPage');
const ProductPage = require('../pages/ProductPage');

describe('SwagLab - Selenium WebDriver Suite', function () {
  let driver;
  let loginPage;
  let productPage;

  const validUser = { username: 'standard_user', password: 'secret_sauce' };
  const lockedUser = { username: 'locked_out_user', password: 'secret_sauce' };

  before(async function () {
    const options = new chrome.Options();
    options.addArguments('--headless=new', '--no-sandbox', '--disable-dev-shm-usage');
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    loginPage = new LoginPage(driver);
    productPage = new ProductPage(driver);
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  beforeEach(async function () {
    await loginPage.open();
  });

  it('TC01 - Valid login lands on inventory page', async function () {
    await loginPage.login(validUser.username, validUser.password);
    await productPage.isLoaded();
    const url = await driver.getCurrentUrl();
    assert.ok(url.includes('inventory'));
  });

  it('TC02 - Locked out user sees error message', async function () {
    await loginPage.login(lockedUser.username, lockedUser.password);
    const error = await loginPage.getErrorText();
    assert.ok(error.includes('locked out'));
  });

  it('TC03 - Invalid credentials show error message', async function () {
    await loginPage.login('invalid_user', 'wrong_pass');
    const error = await loginPage.getErrorText();
    assert.ok(error.includes('Username and password do not match'));
  });

  it('TC04 - Product page shows 6 products', async function () {
    await loginPage.login(validUser.username, validUser.password);
    await productPage.isLoaded();
    const count = await productPage.getProductCount();
    assert.strictEqual(count, 6);
  });

  it('TC05 - Add first product to cart updates badge', async function () {
    await loginPage.login(validUser.username, validUser.password);
    await productPage.isLoaded();
    await productPage.addFirstProductToCart();
    const badge = await driver.findElement(productPage.cartBadge).getText();
    assert.strictEqual(badge, '1');
  });

  it('TC06 - Sort products A to Z', async function () {
    await loginPage.login(validUser.username, validUser.password);
    await productPage.isLoaded();
    await productPage.sortProducts('az');
    const dropdownEl = await driver.findElement(productPage.sortDropdown);
    const value = await dropdownEl.getAttribute('value');
    assert.strictEqual(value, 'az');
  });
});
