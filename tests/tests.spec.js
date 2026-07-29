// ==========================================
// IMPORT LIBRARIES
// ==========================================

const { test, expect } = require('../fixtures/hooks');

const LoginPage = require('../pages/LoginPage');
const ProductPage = require('../pages/ProductPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');

const users = require('../test-data/user.json');


// ==========================================
// LOGIN TEST CASES
// ==========================================

test('TC01 - Valid Login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    await expect(page).toHaveURL(/inventory/);

});

test('TC02 - Locked User Login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.login(
        users.lockedUser.username,
        users.lockedUser.password
    );

    await expect(
        page.locator('[data-test="error"]')
    ).toBeVisible();

});


// TC03 - Invalid User Login

test('TC03 - Invalid User Login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.login(
        users.invalidUser.username,
        users.invalidUser.password
    );

    await expect(
        page.locator('[data-test="error"]')
    ).toBeVisible();

});


// TC04 - Empty Username

test('TC04 - Empty Username', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.login(
        '',
        users.validUser.password
    );

    await expect(
        page.locator('[data-test="error"]')
    ).toBeVisible();

});


// TC05 - Empty Password

test('TC05 - Empty Password', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.login(
        users.validUser.username,
        ''
    );

    await expect(
        page.locator('[data-test="error"]')
    ).toBeVisible();

});
// ==========================================
// PRODUCT TEST CASES
// ==========================================

// TC06 - Verify Products Page

test('TC06 - Verify Products Page', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    await expect(page.locator('.title')).toHaveText('Products');

});

// TC07 - Verify Product Count

test('TC07 - Verify Product Count', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    const count = await productPage.getProductCount();

    expect(count).toBe(6);

});

// TC08 - Add First Product To Cart

test('TC08 - Add First Product To Cart', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    await productPage.addFirstProductToCart();

    await expect(
        page.locator('.shopping_cart_badge')
    ).toHaveText('1');

});

// TC09 - Open Cart

test('TC09 - Open Cart', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    await productPage.goToCart();

    await expect(page).toHaveURL(/cart.html/);

});

// TC10 - Sort Products A to Z

test('TC10 - Sort Products A to Z', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    await expect(page).toHaveURL(/inventory/);

    await productPage.sortProducts('az');

    await expect(
        page.locator('[data-test="product_sort_container"]')
    ).toHaveValue('az');

});
// ==========================================
// CART TEST CASES
// ==========================================

// TC11 - Verify Cart Page

test('TC11 - Verify Cart Page', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    await productPage.goToCart();

    await expect(page.locator('.title')).toHaveText('Your Cart');

});

// TC12 - Verify Added Product

test('TC12 - Verify Added Product', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    await productPage.addFirstProductToCart();

    await productPage.goToCart();

    await expect(
        page.locator('.cart_item')
    ).toBeVisible();

});

// TC13 - Remove Product From Cart

test('TC13 - Remove Product From Cart', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    await productPage.addFirstProductToCart();

    await productPage.goToCart();

    await cartPage.removeProduct();

    await expect(
        page.locator('.cart_item')
    ).toHaveCount(0);

});

// TC14 - Continue Shopping

test('TC14 - Continue Shopping', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    await productPage.goToCart();

    await cartPage.continueShopping();

    await expect(page).toHaveURL(/inventory.html/);

});

// TC15 - Checkout Button

test('TC15 - Checkout Button', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    await productPage.addFirstProductToCart();

    await productPage.goToCart();

    await cartPage.goToCheckout();

    await expect(page).toHaveURL(/checkout-step-one.html/);

});
// ==========================================
// CHECKOUT TEST CASES
// ==========================================

// TC16 - Open Checkout Page

test('TC16 - Open Checkout Page', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    await productPage.addFirstProductToCart();

    await productPage.goToCart();

    await cartPage.goToCheckout();

    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');

});

// TC17 - Fill Checkout Information

test('TC17 - Fill Checkout Information', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    await productPage.addFirstProductToCart();

    await productPage.goToCart();

    await cartPage.goToCheckout();

    await checkoutPage.fillCheckoutInfo(
        'Sara',
        'Khan',
        '75000'
    );

    await checkoutPage.clickContinue();

    await expect(page).toHaveURL(/checkout-step-two.html/);

});

// TC18 - Complete Order

test('TC18 - Complete Order', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    await productPage.addFirstProductToCart();

    await productPage.goToCart();

    await cartPage.goToCheckout();

    await checkoutPage.fillCheckoutInfo(
        'Sara',
        'Khan',
        '75000'
    );

    await checkoutPage.clickContinue();

    await checkoutPage.clickFinish();

    await expect(
        page.locator('.complete-header')
    ).toHaveText('Thank you for your order!');

});

// TC19 - Empty Checkout Form

test('TC19 - Empty Checkout Form', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    await productPage.addFirstProductToCart();

    await productPage.goToCart();

    await cartPage.goToCheckout();

    await checkoutPage.clickContinue();

    await expect(
        page.locator('[data-test="error"]')
    ).toBeVisible();

});

// TC20 - Verify Order Success Message

test('TC20 - Verify Order Success Message', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    await productPage.addFirstProductToCart();

    await productPage.goToCart();

    await cartPage.goToCheckout();

    await checkoutPage.fillCheckoutInfo(
        'Sara',
        'Khan',
        '75000'
    );

    await checkoutPage.clickContinue();

    await checkoutPage.clickFinish();

    await expect(
        page.locator('.complete-header')
    ).toHaveText('Thank you for your order!');

});