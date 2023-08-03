export class cartPage {

    fluidContainer = '.container-fluid'
    mainContainer = 'div[id="maincontainer"]'
    contentPanel = '.contentpanel'
    shippingFee = 'select[name="shippings"]'
    cartTable = 'table[class="table table-striped table-bordered"]'
    totalsTable = 'table[id="totals_table"]'
    checkoutBtn = 'a[id="cart_checkout2"]'
    confirmOrderBtn = 'button[id="checkolut-btn"]'
    trashButton = 'i[class="fa fa-trash-o fa-fw"]'

    getShippingCost() {
        return cy.get(this.mainContainer)
            .find(this.shippingFee)
            .invoke('text')
            .then((shipping) => {
                const shipString = shipping.split("- ")[1].trim();
                cy.wrap(shipString).as('shippingCost');
            });
    }

    getCartTableRow(row) 
    {
        return cy.get(this.contentPanel)
        .find(this.cartTable)
        .find('tr')
        .eq(row);
    }

    getTotalsTable()
    {
        return cy.get(this.totalsTable).should('be.visible')
    }

    getTotalTableRow(row) 
    {
        return cy.get(this.contentPanel)
        .find(this.totalsTable)
        .find('tr')
        .eq(row);
    }
    
    clickCheckout() 
    {
        cy.get(this.mainContainer).find(this.checkoutBtn).click();
    }

    clickConfirmOrder()
    {
        cy.get(this.mainContainer).find(this.confirmOrderBtn).click();
    }

    deleteItem()
    {
        cy.get(this.mainContainer).find(this.trashButton).click();
    }

} export const onCartPage = new cartPage();