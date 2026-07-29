const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({

    testDir: './tests',

    timeout: 60000,

    reporter: [
        ['list'],
        ['html'],
        ['allure-playwright']
    ],

    use: {

        baseURL: 'https://www.saucedemo.com',

        browserName: 'chromium',

        headless: false,

        navigationTimeout: 60000,

        actionTimeout: 15000

    }

});