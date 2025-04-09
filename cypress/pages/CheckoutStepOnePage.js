// cypress/pages/CheckoutStepOnePage.js

class CheckoutStepOnePage {
    selectors = {
      pageTitle: '.title',
      firstNameInput: '[data-test="firstName"]',
      lastNameInput: '[data-test="lastName"]',
      postalCodeInput: '[data-test="postalCode"]',
      continueButton: '[data-test="continue"]',
      cancelButton: '[data-test="cancel"]',
      errorMessage: '[data-test="error"]',
    };
  
    assertOnCheckoutStepOnePage() {
      cy.get(this.selectors.pageTitle).should('have.text', 'Checkout: Your Information');
      cy.url().should('include', '/checkout-step-one.html');
    }
  
    fillFirstName(firstName) {
      cy.get(this.selectors.firstNameInput).type(firstName);
    }
  
    fillLastName(lastName) {
      cy.get(this.selectors.lastNameInput).type(lastName);
    }
  
    fillPostalCode(postalCode) {
      cy.get(this.selectors.postalCodeInput).type(postalCode);
    }
  
    /**
     * Rellena todos los campos del formulario de información.
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} postalCode
     */
    fillInformation(firstName, lastName, postalCode) {
      this.fillFirstName(firstName);
      this.fillLastName(lastName);
      this.fillPostalCode(postalCode);
    }
  
    clickContinue() {
      cy.get(this.selectors.continueButton).click();
    }
  
    clickCancel() {
      cy.get(this.selectors.cancelButton).click();
    }
  
    /**
     * Verifica que se muestra un mensaje de error específico.
     * @param {string} expectedMessage - El texto exacto del mensaje de error.
     */
    assertErrorMessage(expectedMessage) {
      cy.get(this.selectors.errorMessage)
        .should('be.visible')
        .and('contain.text', expectedMessage);
    }
  }
  
  export default new CheckoutStepOnePage();