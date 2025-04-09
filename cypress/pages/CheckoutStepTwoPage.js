// cypress/pages/CheckoutStepTwoPage.js

class CheckoutStepTwoPage {
    selectors = {
      pageTitle: '.title',
      cartItem: '.cart_item',
      itemName: '.inventory_item_name',
      itemPrice: '.inventory_item_price',
      // Selectores para información de resumen (menos específicos, basados en clase/texto)
      paymentInfoLabel: '.summary_info_label:contains("Payment Information")',
      shippingInfoLabel: '.summary_info_label:contains("Shipping Information")',
      subtotalLabel: '.summary_subtotal_label',
      taxLabel: '.summary_tax_label',
      totalLabel: '.summary_total_label',
      // Botones
      finishButton: '[data-test="finish"]',
      cancelButton: '[data-test="cancel"]',
    };
  
    assertOnCheckoutStepTwoPage() {
      cy.get(this.selectors.pageTitle).should('have.text', 'Checkout: Overview');
      cy.url().should('include', '/checkout-step-two.html');
    }
  
    /**
     * Verifica que un producto específico esté listado en el resumen.
     * (Similar a CartPage.assertProductInCart pero en el contexto del resumen)
     * @param {string} productName - El nombre exacto del producto.
     */
    assertProductInOverview(productName) {
      cy.contains(this.selectors.cartItem, productName)
        .should('exist')
        .find(this.selectors.itemName)
        .should('have.text', productName);
    }
  
    /**
     * Extrae el valor numérico de una etiqueta de precio/total.
     * @param {string} selector - El selector de la etiqueta (e.g., '.summary_subtotal_label').
     * @returns {Cypress.Chainable<number>} - Chainable que resuelve al valor numérico.
     */
    _extractValue(selector) {
      return cy.get(selector).then($el => {
        const text = $el.text();
        // Extrae el número después del último '$' y lo convierte a float
        return parseFloat(text.substring(text.lastIndexOf('$') + 1).trim());
      });
    }
  
    /**
     * Verifica que el subtotal + impuestos sea igual al total mostrado.
     * Usa closeTo para manejar posibles imprecisiones de punto flotante.
     */
    assertTotals() {
      let subtotal, tax, total;
      this._extractValue(this.selectors.subtotalLabel).then(val => subtotal = val);
      this._extractValue(this.selectors.taxLabel).then(val => tax = val);
      this._extractValue(this.selectors.totalLabel).then(val => {
          total = val;
          cy.log(`Subtotal: ${subtotal}, Tax: ${tax}, Total: ${total}`); // Log para debugging
          // Asegura que la suma esté muy cerca del total esperado
          expect(subtotal + tax).to.be.closeTo(total, 0.001);
      });
    }
  
    // Métodos opcionales para verificar texto estático (podrían cambiar)
    assertPaymentInformation(expectedText) {
       cy.get(this.selectors.paymentInfoLabel) // Busca la etiqueta
         .next('.summary_value_label') // Encuentra el siguiente hermano con la clase de valor
         .should('contain.text', expectedText);
    }
  
    assertShippingInformation(expectedText) {
       cy.get(this.selectors.shippingInfoLabel)
         .next('.summary_value_label')
         .should('contain.text', expectedText);
    }
  
    clickFinish() {
      cy.get(this.selectors.finishButton).click();
    }
  
    clickCancel() {
      cy.get(this.selectors.cancelButton).click();
    }
  }
  
  export default new CheckoutStepTwoPage();