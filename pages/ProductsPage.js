const BasePage = require('./BasePage');
const assert = require('assert');
const {By} = require('selenium-webdriver');
const log = require('../utility/logger');

class ProductsPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.productsIconXpathWithColor = "//a[contains(text(),'Products') and contains(@style,'orange')]";
        this.SearchFieldXpath = "//input[@id='search_product']";
        this.SearchFieldButtonXpath = "//button[@id='submit_search']";
        this.viewProductButtonXpath = "//a[text()='View Product']";
        this.AddToCartProductButtonXpath = "//button[@type='button']";
        this.viewCartButton = "//a[@href='/view_cart']//u";
        this.productNameXpath = "//a[text()='Pure Cotton V-Neck T-Shirt']";
    }

    /**
     * This method helps to verify the product page is selected and displayed
     * @returns {Promise<void>}
     */
    async verifyProductsPageIsSelectedAndDisplayed() {
        log.info("This function helps to verify the product page is selected and displayed");
        const element = await this.driver.findElement(By.xpath(this.productsIconXpathWithColor));
        assert.ok(await element.isDisplayed(), "The product page tab is not selected");
    }

    /**
     * This method helps to enter the product name in the search field
     * @param productName<product name as String>
     * @returns {Promise<void>}
     */
    async enterTheProductNameInTheSearchField(productName) {
        log.info("This function helps to enter the product name in the search field");
        await this.type(this.SearchFieldXpath, productName);
    }

    /**
     * This method helps to click on the search product button
     * @returns {Promise<void>}
     */
    async clickOnTheSearchProductButton() {
        log.info("This function helps to click on the search product button");
        await this.click(this.SearchFieldButtonXpath);
    }

    /**
     *This method helps to click on the view product button based on the index value
     * @param index<index as int>
     * @returns {Promise<void>}
     */
    async clickOnTheViewProductButton(index) {
        log.info("This function helps to click on view product button based on the index value");
        const elements = await this.driver.findElements(By.xpath(this.viewProductButtonXpath));
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", elements[index]);
        await elements[index].click();
    }

    /**
     * This method helps to click on the add to cart button
     * @returns {Promise<void>}
     */
    async clickOnAddToCartButton() {
        log.info("This function helps to click on add to cart button");
        await this.click(this.AddToCartProductButtonXpath);
    }

    /**
     * This method helps to click on the view cart button
     * @returns {Promise<void>}
     */
    async clickOnViewCartButton(){
        log.info("This function helps to click on view cart button");
        await this.click(this.viewCartButton);
    }

}

module.exports = ProductsPage;
