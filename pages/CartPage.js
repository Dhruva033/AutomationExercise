const BasePage = require('./BasePage');
const assert = require('assert');
const {By} = require('selenium-webdriver');
const log = require('../utility/logger');
const cartData = require('../contentTestData/CartsContent.json');



class CartPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.CartsIconXpathWithColor = "//a[contains(text(),'Cart') and contains(@style,'orange')]";
        this.productNameXpath = "//a[text()='Pure Cotton V-Neck T-Shirt']";
        this.proceedToCheckoutXpath = "//a[text()='Proceed To Checkout']";
        this.placeOrderButtonXpath = "//a[text()='Place Order']";
    }

    /**
     * This method helps to verify the Cart page is selected and displayed
     * @returns {Promise<void>}
     */
    async verifyCartsPageIsSelectedAndDisplayed() {
        log.info("This function helps to verify the cart page is selected and displayed");
        const element = await this.driver.findElement(By.xpath(this.CartsIconXpathWithColor));
        assert.ok(await element.isDisplayed(), "The cart page tab is not selected");
    }

    /**
     * This method helps to verify the product is added to the cart
     * @returns {Promise<void>}
     */
    async verifyProductIsAddedToCart(){
        log.info("This function helps to verify the product is added to cart");
        await assert.strictEqual(await this.getText(this.productNameXpath), cartData.expectedProductName,"" +
            "The product is not added to cart");
    }

    /**
     * This method helps to click on the proceed to checkout button
     * @returns {Promise<void>}
     */
    async clickOnProceedToCheckoutButton(){
        log.info("This function helps to click on proceed to checkout button");
        await this.click(this.proceedToCheckoutXpath);
    }

    /**
     * This method helps to click on place order
     * @returns {Promise<void>}
     */
    async clickOnPlaceOrderButton(){
        log.info("This function helps to click on place order button");
        const element = await this.driver.findElement(By.xpath(this.placeOrderButtonXpath));
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", element);
        await this.click(this.placeOrderButtonXpath);
    }


}

module.exports = CartPage;
