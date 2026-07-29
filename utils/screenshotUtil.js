const fs = require('fs');

class ScreenshotUtil {

    static async capture(page, testName) {

        // Create screenshots folder if it doesn't exist
        if (!fs.existsSync('screenshots')) {

            fs.mkdirSync('screenshots');

        }

        // Save screenshot
        await page.screenshot({

            path: `screenshots/${testName}.png`,

            fullPage: true

        });

    }

}

module.exports = ScreenshotUtil;