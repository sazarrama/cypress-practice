/// <reference types="cypress"/>

import '@shelex/cypress-allure-plugin';
import { onSiteHomePage } from '../support/homePage';
import { onLoginRegisterPage } from '../support/loginRegisterPage';
import { onAccountPage } from '../support/accountPage';
import { onCommonActions } from '../support/commonActions';
import { onProductPage } from '../support/productPage';
import { onCartPage } from '../support/cartPage';
import { onPossiblyUnhandledRejection } from 'cypress/types/bluebird';

describe('Tests the website functionality', () => {

    //Global variables with Date.now() ensure test reusability

    let email = "user"+Date.now()+'example.com'
    let password = "Pwd"+Date.now()
    let login = "exampleuser"+Date.now()

    before(() => {
        cy.log("This is a before block placeholder");
    })

    beforeEach(() => {
        
    //Saves email/password as an alias to be used in future tests

    cy.wrap(email).as('email');
    cy.wrap(password).as('password');
    cy.wrap(login).as('login');

    //Navigates to the website

    cy.visit("/"); //Gets base URL from config file
    onCommonActions.verifyURL("https://automationteststore.com/");

    })

    it ('Registers an account if one does not exist and throws an error if it already exists', () => {

        //Navigates to the loginpage
        onSiteHomePage
        .clickLoginRegisterButton();
        onCommonActions
        .getMainText()
        .should('contain.text', 'Account Login');

        //Attempts to log in with an invalid username and password

        onLoginRegisterPage
        .getExistingCustomer();
        onLoginRegisterPage
        .loginInvalidCustomer();
        onLoginRegisterPage
        .clickLogIn();
        onCommonActions
        .getAlert()
        .should('contain.text', 'Error: Incorrect login or password provided');

        //Creates an account with the randomised credentials, using dummy data which can be repeated

        onLoginRegisterPage
        .getNewCustomer();
        onCommonActions
        .clickContinue();
        onCommonActions
        .getMainText()
        .should('contain.text', 'Create Account')
        onLoginRegisterPage
        .createNewCustomer(email, login, password, "Ireland", "Donegal", true);
        onCommonActions
        .clickContinue();

        //Confirms the account has been created successfully

        onCommonActions
        .getMainText()
        .should('contain.text', 'Your Account Has Been Created!');
        onLoginRegisterPage
        .navigateToAccount();
        onCommonActions
        .getMainText()
        .should('contain.text', 'My Account')

        //Logs out of the account

        onAccountPage
        .selectFromAccountList(9)
        .should('be.visible')
        .should('contain.text', 'Logoff')
        .click();

        //Attempts to make another account with the same credentials and validates the error
        
        onLoginRegisterPage
        .getNewCustomer();
        onCommonActions
        .clickContinue();
        onCommonActions
        .getMainText()
        .should('contain.text', 'Create Account')
        onLoginRegisterPage
        .createNewCustomer(email, login, password, "Ireland", "Donegal", true);
        onCommonActions
        .clickContinue();
        onCommonActions
        .getAlert()
        .should('contain.text', 'Error: E-Mail Address is already registered!');
 
    })

    it('Logs into the existing account and checks out a single item', () => {
        onSiteHomePage
        .clickLoginRegisterButton();
        onCommonActions
        .getMainText()
        .should('contain.text', 'Account Login');
        onLoginRegisterPage
        .getExistingCustomer();
        onLoginRegisterPage
        .loginExistingCustomer();
        onLoginRegisterPage
        .clickLogIn();
        onCommonActions
        .getMainText()
        .should('contain.text', 'My Account');
        onCommonActions
        .navigateToCategory("Makeup");
        onProductPage
        .getProduct("Tropiques Minerale Loose Bronzer");
        onProductPage
        .getProductPrice();
        onProductPage
        .getProductQuantity();
        onCommonActions
        .getBasketQty();
        onProductPage
        .addProductToCart();

        //Catches any false failures from existing products in cart due to a broken test

        cy.get('@basketQty').then((basket) => {
            if (typeof basket === 'number' && basket <= 1) {
              onCommonActions.openShoppingCart();
              onCartPage.deleteItem();
            } else {
              return false;
            }
          });

        onCommonActions
        .getMainText()
        .should('contain.text', 'Shopping Cart');
        onCartPage
        .getShippingCost()

        cy.get('@productPrice').then((price) => {

            cy.get('@productQty').then((qty) => {

                cy.get('@shippingCost').then((shipping) => {

                    //Gets values from the items and compares them to the cart

                    onCartPage
                    .getCartTableRow(1).should('contain', 'Tropiques Minerale Loose Bronzer');

                    onCartPage
                    .getCartTableRow(1).invoke('text').should('contain', price);

                    onCartPage
                    .getCartTableRow(1)
                    .get('input').invoke('val')
                    .should('eq', qty);

                        onCartPage
                        .getTotalTableRow(0).invoke('text').should('contain', price);

                        onCartPage
                        .getTotalTableRow(1).invoke('text').should('contain', shipping);

                        onCartPage
                        .getTotalTableRow(2)
                        .invoke('text')
                        .then(($grandTotal) => {
                            const grandTotal = parseFloat($grandTotal.trim().replace('Total:', '')
                            .replace('$', ''))
                            const totalPrice = parseFloat(price.text().replace('Total:', '')
                            .replace('$', ''))
                            const shippingTotal = parseFloat(shipping.text().replace('Total $', ''))
                            expect((grandTotal)).to.equal((totalPrice) + (shippingTotal))
                        })
                })
            })
        })

    
    })
})