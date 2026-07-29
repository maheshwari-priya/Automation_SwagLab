class CheckoutPage {

    constructor(page) {

        this.page = page;

        this.firstNameField = page.locator('[data-test="firstName"]');
        this.lastNameField = page.locator('[data-test="lastName"]');
        this.postalCodeField = page.locator('[data-test="postalCode"]');

        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.cancelButton = page.locator('[data-test="cancel"]');

        this.errorMessage = page.locator('[data-test="error"]');
        this.successMessage = page.locator('.complete-header');

    }

    async fillCheckoutInfo(firstName, lastName, postalCode) {

        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.postalCodeField.fill(postalCode);

    }

    async clickContinue() {

        await this.continueButton.click();

    }

    async clickFinish() {

        await this.finishButton.click();

    }

    async clickCancel() {

        await this.cancelButton.click();

    }

}

module.exports = CheckoutPage;