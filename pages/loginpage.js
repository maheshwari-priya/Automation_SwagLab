class LoginPage {

    constructor(page) {

        this.page = page;

        this.usernameField = page.locator('#user-name');
        this.passwordField = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');

    }

    async navigate() {

        await this.page.goto('https://www.saucedemo.com/');

    }

    async login(username, password) {

        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();

    }

    async getErrorMessage() {

        return await this.errorMessage.textContent();

    }

}

module.exports = LoginPage;