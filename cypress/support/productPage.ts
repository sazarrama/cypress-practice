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
        cy.get(this.mainContainer)
          .find(this.productPrice)
          .should('be.visible') // Ensure the element is visible
          .children('.productpageprice')
          .invoke('text')
          .then((priceText) => {
            const priceString = priceText.trim();
            cy.wrap(priceString).as('productPrice');
          });
    }

    getProductQuantity() 
    {
        cy.get(this.mainContainer).find(this.productQty)
        .should('be.visible') // Ensure the element is visible
        .invoke('attr','value').then((quantity) => {
            const qtyString = quantity.trim();
            return cy.wrap(qtyString).as('productQty')
        })  
    }
                    
    addProductToCart()
    {
        cy.get(this.mainContainer).find(this.addToCartBtn).click();
    }

} export const onProductPage = new productPage();