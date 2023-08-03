export class loginRegisterPage {

    mainContainer = 'div[id="maincontainer"]'
    contentPanel = '.contentpanel'
    contButton = 'button[title="Continue"]'
    inputTxt = 'input[type="text"]'
    inputPwd = 'input[type="password"]'
    countryPicker = 'select[name="country_id"]'
    regionPicker = 'select[name="zone_id"]'
    newsletterYes = 'input[name="newsletter"][value="1"]'
    newsletterNo = 'input[name="newsletter"][value="0"]'
    privacyPolicyAgree = 'input[type="checkbox"]'
    loginButton = 'button[title="Login"]'

    getNewCustomer()
    {
        return cy.get(this.mainContainer).should('contain.text', 'I am a new customer.')
    }

    createNewCustomer(email, login, password, country, region, hasNewsletter=true)
    {
        var i = new Array (0,1,2,3,4,5,6,7,8,9,10)
        let info = new Array ("Example", "Customer", email, "1234567890", "1234567890", "Sample Company", "123 Fake Street", "Madeupville", "False City", "00000", login)
        
        i.forEach((item, index) =>
        this.getInputBox(item).type(`${info[index]}`));
        this.enterPassword(0).type(password)
        this.enterPassword(1).type(password);
        this.selectCountry(country)
        this.selectRegion(region)
        this.hasNewsletter(hasNewsletter);
        this.agreePrivacyPolicy();
    }

    getExistingCustomer()
    {
        return cy.get(this.mainContainer).should('contain.text', 'Returning Customer')
    }

    loginExistingCustomer() {
        cy.get('@login').then((loginValue) => {
          if (typeof loginValue === 'string') {
            cy.get(this.contentPanel).find(this.inputTxt).type(loginValue);
          } else {
            // Handle if loginValue is not a string (e.g., number, boolean, etc.)
            // For example, you can convert it to a string or provide a default value
          }
        });
      
        cy.get('@password').then((passwordValue) => {
          if (typeof passwordValue === 'string') {
            cy.get(this.contentPanel).find(this.inputPwd).type(passwordValue);
          } else {
            // Handle if passwordValue is not a string (e.g., number, boolean, etc.)
            // For example, you can convert it to a string or provide a default value
          }
        });
      }        

    loginInvalidCustomer()
    {
        
        let invalidLogin = 'invaliduser1234!'
        let invalidPassword = 'invalidPassword123!'

        cy.get(this.contentPanel).find(this.inputTxt).type(invalidLogin)
        cy.get(this.contentPanel).find(this.inputPwd).type(invalidPassword)
    }

    clickLogIn()
    {
        cy.get(this.mainContainer).find(this.loginButton).click()
    }

    getInputBox(index)
    {
        return cy.get(this.contentPanel).find(this.inputTxt).eq(index)
    }

    enterPassword(index)
    {
        return cy.get(this.contentPanel).find(this.inputPwd).eq(index)
    }

    selectCountry(country)
    {
        cy.get(this.contentPanel).find(this.countryPicker).select(country)
    }

    selectRegion(region)
    {
        cy.get(this.contentPanel).find(this.regionPicker).select(region)
    }

    hasNewsletter(newsletter=false)
    {
        if(newsletter === true) {
            cy.get(this.contentPanel).find(this.newsletterYes).click();
        } else if (newsletter === false) {
            cy.get(this.contentPanel).find(this.newsletterNo).click();
        }
        
    }

    agreePrivacyPolicy()
    {
        cy.get(this.contentPanel).find(this.privacyPolicyAgree).click();
    }

    navigateToAccount()
    {
        cy.get(this.contentPanel).find('a').eq(1).should('contain.text', 'Continue').click()
    }

} export const onLoginRegisterPage = new loginRegisterPage();