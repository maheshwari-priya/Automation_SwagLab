const { By, until } = require('selenium-webdriver');

class ProductPage {

  constructor(driver) {
    this.driver = driver;
    this.inventoryItems = By.css('.inventory_item');
    this.sortDropdown = By.css('[data-test="product_sort_container"]');
    this.cartIcon = By.css('.shopping_cart_link');
    this.addToCartButtons = By.css('[data-test^="add-to-cart"]');
    this.cartBadge = By.css('.shopping_cart_badge');
  }

  async isLoaded() {
    await this.driver.wait(until.elementLocated(this.inventoryItems), 10000);
  }

  async getProductCount() {
    const items = await this.driver.findElements(this.inventoryItems);
    return items.length;
  }

  async addFirstProductToCart() {
    const buttons = await this.driver.findElements(this.addToCartButtons);
    await buttons[0].click();
  }

  async goToCart() {
    await this.driver.findElement(this.cartIcon).click();
  }

  async sortProducts(option) {
    const { Select } = require('selenium-webdriver/lib/select');
    const dropdownEl = await this.driver.wait(until.elementLocated(this.sortDropdown), 10000);
    const select = new Select(dropdownEl);
    await select.selectByValue(option);
  }
}

module.exports = ProductPage;
