const BasePage = require('./BasePage');
const assert = require('assert');
const {By} = require('selenium-webdriver');
const log = require('../utility/logger');


class HomePage extends BasePage {
    constructor(driver) {
        super(driver);
        this.homeIconXpathWithColor = "//a[contains(text(),'Home') and contains(@style,'orange')]";
        this.productsTabXapth="//a[contains(text(),'Products')]";
    }

    /**
     * This method helps to verify the home page is selected and displayed by default
     * @returns {Promise<void>}
     */
   async verifyHomePageIsSelectedAndDisplayed(){
        log.info("This function helps to verify the home page is selected and displayed");
       const element = await this.driver.findElement(By.xpath(this.homeIconXpathWithColor));
       assert.ok( await element.isDisplayed(), "The home page tab is not selected");
   }

    /**
     * This method helps to click on the product tab
     * @returns {Promise<void>}
     */
   async clickOnProductsTab(){
       log.info("This function helps to click on the product tab");
       await this.click(this.productsTabXapth);
   }

}

module.exports = HomePage;
