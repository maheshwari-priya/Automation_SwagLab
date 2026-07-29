const { By, until } = require('selenium-webdriver');

class LoginPage {

  constructor(driver) {
    this.driver = driver;
    this.usernameInput = By.css('[data-test="username"]');
    this.passwordInput = By.css('[data-test="password"]');
    this.loginButton = By.css('[data-test="login-button"]');
    this.errorMessage = By.css('[data-test="error"]');
  }

  async open() {
    await this.driver.get('https://www.saucedemo.com');
    await this.driver.wait(until.elementLocated(this.usernameInput), 10000);
  }

  async login(username, password) {
    await this.driver.findElement(this.usernameInput).sendKeys(username);
    await this.driver.findElement(this.passwordInput).sendKeys(password);
    await this.driver.findElement(this.loginButton).click();
  }

  async getErrorText() {
    const el = await this.driver.wait(until.elementLocated(this.errorMessage), 5000);
    return el.getText();
  }
}

module.exports = LoginPage;
