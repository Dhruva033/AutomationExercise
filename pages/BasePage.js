const {Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const config = require('../Config');
const Log = require('../utility/logger');
const {resolve} = require("node:path");

class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    /**
     * This method is used to initialize the driver
     * @returns {Promise<ThenableWebDriver>}
     */
    static async initWebDriver() {
        const browser = config.browser.toLowerCase();
        try {
            let driver;

            if (browser === 'chrome') {
                const options = new chrome.Options();
                const chromedriverPath = resolve(__dirname, '../node_modules/chromedriver/lib/chromedriver/chromedriver.exe');
                const service = new chrome.ServiceBuilder(chromedriverPath);

                Log.info('Initializing local Chrome driver');
                driver = await new Builder()
                    .forBrowser('chrome')
                    .setChromeService(service)
                    .setChromeOptions(options)
                    .build();

            } else if (browser === 'firefox') {
                const options = new firefox.Options();
                Log.info('Initializing Firefox driver');

                driver = await new Builder()
                    .forBrowser('firefox')
                    .setFirefoxOptions(options)
                    .build();

            } else {
                throw new Error(`Unsupported browser: ${browser}`);
            }

            await driver.manage().window().maximize();
            Log.info(`${browser.charAt(0).toUpperCase() + browser.slice(1)} driver initialized successfully`);

            return driver;

        } catch (error) {
            Log.error(`Failed to initialize WebDriver: ${error.message}`);
            throw error;
        }
    }

    /**
     * This method helps to launch the application
     * @param url<url as String>
     * @returns {Promise<void>}
     */
    async navigateTo(url) {
        try {
            await this.driver.get(url);
            Log.info(`Navigated to: ${url}`);
        } catch (err) {
            Log.error(`Navigation failed: ${err}`);
            throw err;
        }
    }

    /**
     * This method is used to perform click action
     * @param xpath<xpath as String>
     * @returns {Promise<void>}
     */
    async click(xpath) {
        try {
            const element = await this.driver.wait(until.elementLocated(By.xpath(xpath)), config.timeout);
            await element.click();
            Log.info(`Clicked on element with XPath: ${xpath}`);
        } catch (err) {
            Log.error(`Click failed on XPath: ${xpath} - ${err}`);
            throw err;
        }
    }

    /**
     * This method helps to enter the value into the text box
     * @param xpath<xpath as String>
     * @param text<text as String>
     * @returns {Promise<void>}
     */
    async type(xpath, text) {
        try {
            const element = await this.driver.wait(until.elementLocated(By.xpath(xpath)), config.timeout);
            await element.clear();
            await element.sendKeys(text);
            Log.info(`Entered text into element with XPath: ${xpath}`);
        } catch (err) {
            Log.error(`Typing failed on XPath: ${xpath} - ${err}`);
            throw err;
        }
    }

    /**
     * This method helps to get the text
     * @param xpath<xpath as String>
     * @returns {Promise<*>}
     */
    async getText(xpath) {
        try {
            const element = await this.driver.wait(until.elementLocated(By.xpath(xpath)), config.timeout);
            const text = await element.getText();
            Log.info(`Text fetched from XPath: ${xpath} -> ${text}`);
            return text;
        } catch (err) {
            Log.error(`Get text failed on XPath: ${xpath} - ${err}`);
            throw err;
        }
    }

    /**
     * This method helps to close the browser
     * @returns {Promise<void>}
     */
    async close() {
        try {
            await this.driver.quit();
            Log.info('Browser closed');
        } catch (err) {
            Log.error('Failed to close browser:', err);
        }
    }
}

module.exports = BasePage;
