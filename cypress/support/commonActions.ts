import common = require("mocha/lib/interfaces/common")

export class commonActions {

    mainContainer = 'div[id="maincontainer"]'
    allContents = 'div[class="container-fixed"]'
    contentPanel = '.contentpanel'
    contButton = 'button[title="Continue"]'
    mainText = '.mainText'
    alert = 'div[class="alert alert-error alert-danger"]'
    dismissAlert = 'button[data-dismiss="alert"]'
    categoryMenu = 'section[id="categorymenu"]'
    cartButton = '.dropdown-toggle'
    navigationBar = 'div[role="navigation"]'

    visitWebsite(url)
    {
        cy.visit(url)
    }

    verifyURL(url)
    {
        cy.url().should('eq', url)
    }

    clickContinue()
    {
        cy.get(this.mainContainer).find(this.contButton).click()
    }

    getMainText()
    {
        return cy.get(this.mainText).should('be.visible')
    }

    getAlert()
    {
        return cy.get(this.mainContainer).find(this.dismissAlert).parent(this.alert).should('be.visible')
    }

    navigateToCategory(category)
    {
        cy.get(this.categoryMenu)
        .find('li')
        .contains(category).click()
    }

    openShoppingCart()
    {
        cy.get(this.navigationBar).find(this.cartButton).click();
    }

    getBasketQty() {

        return cy.get(this.allContents).find(this.cartButton).children()
        .invoke('text').then((basketQty) => {
            const basket = basketQty.trim();
            return cy.wrap(basket).as('basketQty');
        })
    }
} export const onCommonActions = new commonActions();