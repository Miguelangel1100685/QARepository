// cypress/pages/CheckoutCompletePage.js

class CheckoutCompletePage {
    selectors = {
      pageTitle: '.title',
      completeHeader: '[data-test="complete-header"]',
      completeText: '[data-test="complete-text"]',
      backHomeButton: '[data-test="back-to-products"]',
      ponyExpressImage: '.pony_express',
    };
  
    assertOnCheckoutCompletePage() {
      cy.get(this.selectors.pageTitle).should('have.text', 'Checkout: Complete!');
      cy.url().should('include', '/checkout-complete.html');
      cy.get(this.selectors.ponyExpressImage).should('be.visible'); // Verifica imagen
    }
  
    /**
     * Verifica el texto del encabezado principal de agradecimiento.
     * @param {string} expectedText
     */
    assertCompleteHeader(expectedText) {
      cy.get(this.selectors.completeHeader).should('have.text', expectedText);
    }
  
    /**
     * Verifica el texto descriptivo secundario.
     * @param {string} expectedText
     */
    assertCompleteText(expectedText) {
      cy.get(this.selectors.completeText).should('have.text', expectedText);
    }
  
    clickBackHome() {
      cy.get(this.selectors.backHomeButton).click();
    }
  }
  
  export default new CheckoutCompletePage();