export class productPage {

    fluidContainer = '.container-fluid'
    mainContainer = 'div[id="maincontainer"]'
    contentPanel = '.contentpanel'
    productList = 'div[class="thumbnails grid row list-inline"]'
    productPrice = 'div[class="productprice"]'
    productQty = 'input[id="product_quantity"]'
    addToCartBtn = 'a[class="cart"]'

    getProduct(product)
    {
        cy.get(this.contentPanel).find(this.productList).each(($element) => {
            cy.wrap($element).should('be.visible')
            .find('a')
            .contains(product)
            .click();
        })
    }

    getProductPrice()
    {
        cy.get(this.mainContainer).find(this.productPrice).children()
        .invoke('text').then((price) => {
            const priceString = price.trim();
            return cy.wrap(priceString).as('productPrice')
        })
    }

    getProductQuantity()
    {
        cy.get(this.mainContainer).find(this.productQty)
        .invoke('text').then((quantity) => {
            const qtyString = quantity.trim();
            return cy.wrap(qtyString).as('productQty');
        })
    }

    addProductToCart()
    {
        cy.get(this.mainContainer).find(this.addToCartBtn).click();
    }

} export const onProductPage = new productPage();