const base = require('@playwright/test');
const ScreenshotUtil = require('../utils/ScreenshotUtil');

exports.test = base.test;
exports.expect = base.expect;

exports.test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });

});

exports.test.afterEach(async ({ page }, testInfo) => {

    if (testInfo.status === 'passed') {

        await ScreenshotUtil.capture(
            page,
            `PASS_${testInfo.title}`
        );

    }

    if (testInfo.status === 'failed') {

        await ScreenshotUtil.capture(
            page,
            `FAIL_${testInfo.title}`
        );

    }

});