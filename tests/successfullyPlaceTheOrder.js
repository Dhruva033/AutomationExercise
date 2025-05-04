const BasePage = require('../pages/BasePage');
const HomePage = require('../pages/HomePage');
const ProductPage = require('../pages/productsPage');
const CartPage = require('../pages/CartPage');
const LoginPage = require('../pages/SignupOrLoginPage');
const PaymentPage = require('../pages/PaymentPage');
const config = require('../Config');
const testData = require('../testData/testData.json');

describe('Order placing', function () {
    this.retries(config.retryCount);
    this.timeout(config.timeout);
    let driver;
    let basePage;
    let homePage;
    let productPage;
    let cartPage;
    let loginPage;
    let paymentPage;

    before(async function () {
        driver = await BasePage.initWebDriver();
        await driver.manage().setTimeouts({implicit: 10000});
        basePage = new BasePage(driver);
    });


    after(async function () {
        await driver.quit();
    });

    it('login add the product and place the order', async function () {

        try {
            await basePage.navigateTo(config.url);
            homePage = new HomePage(driver);
            loginPage = new LoginPage(driver);
            productPage = new ProductPage(driver);
            cartPage = new CartPage(driver);
            paymentPage = new PaymentPage(driver);

            await homePage.verifyHomePageIsSelectedAndDisplayed();
            await loginPage.clickOnSignUpOrLoginTab();
            await loginPage.verifySignupOrLoginPagePageIsSelectedAndDisplayed();
            await loginPage.login(testData.login.username, testData.login.password);
            await homePage.clickOnProductsTab();
            await productPage.verifyProductsPageIsSelectedAndDisplayed();
            await productPage.enterTheProductNameInTheSearchField(testData.products.productName);
            await productPage.clickOnTheSearchProductButton();
            await productPage.clickOnTheViewProductButton(0);
            await productPage.clickOnAddToCartButton();
            await productPage.clickOnViewCartButton();
            await cartPage.verifyCartsPageIsSelectedAndDisplayed();
            await cartPage.verifyProductIsAddedToCart();
            await cartPage.clickOnProceedToCheckoutButton();
            await cartPage.clickOnPlaceOrderButton();
            await paymentPage.verifyPaymentPageIsDisplayed();
            await paymentPage.enterCardDetails();
            await paymentPage.verifyOrderIsPlaced();


        } catch (error) {
            throw error;
        }


    });
});
