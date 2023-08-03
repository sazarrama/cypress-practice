export class accountPage {

    mainContainer = 'div[id="maincontainer"]'
    contentPanel = 'contentpanel'
    dataEntry = 'div[class="form group "]'
    accountPageList = '.myaccountbox'

    selectFromAccountList(index)
    {
        return cy.get(this.mainContainer).find(this.accountPageList).find('li').eq(index)
    }

} export const onAccountPage = new accountPage();