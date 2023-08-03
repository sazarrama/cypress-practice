export class siteHomePage {

    contentPanel = '.contentpanel'
    mainContainer ='div[id="maincontainer"]'
    navigationBar = 'div[role="navigation"]'
    customerMenu = 'ul[id="customer_menu_top"]'

    getNavigationBar() 
    {
        return cy.get(this.navigationBar)
    }

    clickLoginRegisterButton()
    {
        this.getNavigationBar().find(this.customerMenu).find('a')
        .should('contain.text', 'Login or register').click();
    }

} export const onSiteHomePage = new siteHomePage();