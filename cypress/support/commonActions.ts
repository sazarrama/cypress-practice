import common = require("mocha/lib/interfaces/common")

export class commonActions {

    mainContainer = 'div[id="maincontainer"]'
    allContents = 'div[class="container-fixed"]'
    contentPanel = '.contentpanel'
    contButton = 'button[title="Continue"]'
    mainText = '.heading1'
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
        return cy.get(this.mainText)
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

    getBasketQty() 
    {
        return cy.get(this.allContents).find(this.cartButton).children()
          .invoke('text').then((basketQty) => {
            const basket = parseInt(basketQty.trim(), 10); // Parse the string to an integer
            return cy.wrap(basket).as('basketQty'); // Alias the integer value
            return basket
        })
    }

} export const onCommonActions = new commonActions();