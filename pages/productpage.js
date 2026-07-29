class ProductPage {

    constructor(page) {

        this.page = page;

        this.productItems = page.locator('.inventory_item');
        this.sortDropdown = page.locator('[data-test="product_sort_container"]');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
        this.cartBadge = page.locator('.shopping_cart_badge');

    }

    async addFirstProductToCart() {

        await this.addToCartButtons.first().click();

    }

    async sortProducts(option) {

        await this.page.waitForURL(/inventory/);

        await this.sortDropdown.waitFor({
            state: 'visible',
            timeout: 10000
        });

        await this.sortDropdown.selectOption(option);

    }

    async goToCart() {

        await this.cartIcon.click();

    }

    async getProductCount() {

        return await this.productItems.count();

    }

}

module.exports = ProductPage;