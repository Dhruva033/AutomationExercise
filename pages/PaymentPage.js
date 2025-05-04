const BasePage = require('./BasePage');
const assert = require('assert');
const {By} = require('selenium-webdriver');
const log = require('../utility/logger');
const testData = require('../testData/testData.json');


class PaymentPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.paymentPageXpath = "//h2[text()='Payment']";
        this.NameOnCardXpath = "//input[@data-qa='name-on-card']";
        this.CardNumberXpath = "//input[@data-qa='card-number']";
        this.ExpiryDateXpath = "//input[@data-qa='expiry-month']";
        this.CVVNumberXpath = "//input[@data-qa='cvc']";
        this.YearXpath = "//input[@data-qa='expiry-year']";
        this.PayAndConfirmOrderButtonXpath = "//button[@data-qa='pay-button']";
        this.placeOrderXpath = "//b[text()='Order Placed!']";
    }

    /**
     * This method helps to verify the payment page is displayed
     * @returns {Promise<void>}
     */
    async verifyPaymentPageIsDisplayed() {
        log.info("This function helps to verify the payment page is displayed");
        const element = await this.driver.findElement(By.xpath(this.paymentPageXpath));
        assert.ok(await element.isDisplayed(), "The payment page is not displayed");
    }

    /**
     * This method helps to enter card details
     * @returns {Promise<void>}
     */
    async enterCardDetails(){
        log.info("This function helps to enter card details");
        await this.type(this.NameOnCardXpath,testData.payment.NameOnCard);
        await this.type(this.CardNumberXpath,testData.payment.cardNumber);
        await this.type(this.CVVNumberXpath,testData.payment.cvv);
        await this.type(this.ExpiryDateXpath,testData.payment.expiryMonth);
        await this.type(this.YearXpath,testData.payment.Year);
        await this.click(this.PayAndConfirmOrderButtonXpath);
    }

    /**
     *This method helps to verify the order is successfully placed
     * @returns {Promise<void>}
     */
    async verifyOrderIsPlaced(){
        log.info("This function helps to verify the order is placed");
        const element = await this.driver.findElement(By.xpath(this.placeOrderXpath));
        assert.strictEqual(await element.isDisplayed(), true, "The order is not placed");
    }
}

module.exports = PaymentPage;
