const BasePage = require('./BasePage');
const assert = require('assert');
const {By} = require('selenium-webdriver');
const log = require('../utility/logger');

class SignupOrLoginPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.SignupOrLoginIconXpathWithColor = "//a[contains(text(),'Signup / Login') and contains(@style,'orange')]";
        this.SignupOrLoginTabButtonXpath = "//a[contains(text(),'Signup / Login')]";
        this.EmailXpath = "//input[@data-qa='login-email']";
        this.PasswordXpath = "//input[@data-qa='login-password']";
        this.LoginButtonXpath = "//button[text()='Login']";
    }

    /**
     * This method helps to click on the signup or login tab
     * @returns {Promise<void>}
     */
    async clickOnSignUpOrLoginTab(){
        log.info("This function helps to click on the signup or login tab");
        await this.click(this.SignupOrLoginTabButtonXpath);
    }

    /**
     * This method helps to verify the Signup or Login page is selected and displayed
     * @returns {Promise<void>}
     */
    async verifySignupOrLoginPagePageIsSelectedAndDisplayed() {
        log.info("This function helps to verify the  Signup or Login is selected and displayed");
        const element = await this.driver.findElement(By.xpath(this.SignupOrLoginIconXpathWithColor));
        assert.ok(await element.isDisplayed(), "The Signup or login page tab is not selected and displayed");
    }

    /**
     * This method helps to log in to the application with the given email and password
     * @param email<email as String>
     * @param password<password as String>
     * @returns {Promise<void>}
     */
    async login(email, password){
        log.info("This function helps to login to the application with the given email and password");
        await this.type(this.EmailXpath, email);
        await this.type(this.PasswordXpath, password);
        await this.click(this.LoginButtonXpath);
    }



}

module.exports = SignupOrLoginPage;
