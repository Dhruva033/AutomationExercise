# AutomationExercise

# Test Automation Framework - Selenium WebDriver with JavaScript (Mocha)

# Project Setup Instructions

# Prerequisites
- Make sure you have **Node.js** (which includes npm) installed.  

1. Install IntelliJ WebStorm- https://www.jetbrains.com/webstorm/download/#section=windows
2. choose project from version control-Enter the url-https://github.com/Dhruva033/AutomationExercise.git
3. click on clone button
4. Install Project Dependencies-npm install
5. Run the tests-npm test or npx mocha tests/successfullyPlaceTheOrder.js


# Framework Chosen and Why
This project uses Selenium WebDriver with JavaScript (Mocha + Chai).
1. Selenium: Supports cross-browser testing and is highly stable.
2. Mocha: A flexible test runner that works well with asynchronous testing.
3. Chai: Used for assertions with readable syntax (expect, should, assert).
4. Page Object Model (POM): Encourages reusability and maintainability of locators and actions.
5. Data-Driven Testing: Externalized test data with testData.json.
6. Easy to integrate with CI/CD pipelines (e.g., GitHub Actions, Jenkins).
7. JavaScript is widely used and integrates well with frontend tech.

# List of Test Cases
1. Test case-Successfully place the order

Located in-tests/successfullyPlaceTheOrder.js

It covers:
1. Navigating to homepage
2. Logging in with valid credentials
3. Searching for a product
4. Viewing and adding product to cart
5. Verifying cart and placing the order
6. Verifying payment success

page objects
1. HomePage.js
2. SignupOrLoginPage.js
3. LoginPage.js
4. ProductPage.js
5. CartPage.js
6. PaymentPage.js

test data
testData/testData.json

Expected Content testdata
contentTestData/CartsContent.json

# How to run tests-
npm test or npx mocha tests/successfullyPlaceTheOrder.js

# Screenshot or path to the test report
After running the tests

open the terminal and run: 

1.allure generate allure-results --clean -o allure-report
2.allure open allure-report

results will be present in allure-results/testsuite.xml

 











