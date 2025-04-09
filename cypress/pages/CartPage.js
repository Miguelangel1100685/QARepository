// cypress/pages/CartPage.js

class CartPage {
    // Selectores
    selectors = {
      pageTitle: '.title',
      cartItem: '.cart_item', // Selector para cada fila de producto en el carrito
      itemName: '.inventory_item_name', // Nombre dentro de una fila de producto
      // itemQuantity: '.cart_quantity', // <--- ELIMINADO: Selector de cantidad ya no es necesario
      itemPrice: '.inventory_item_price', // Precio dentro de una fila de producto
      removeButton: 'button.cart_button', // Botón 'Remove' dentro de una fila
      checkoutButton: '[data-test="checkout"]',
      continueShoppingButton: '[data-test="continue-shopping"]',
    };
  
    // Asegura que estamos en la página del carrito
    assertOnCartPage() {
      cy.get(this.selectors.pageTitle).should('have.text', 'Your Cart');
      cy.url().should('include', '/cart.html');
    }
  
    // Obtiene todos los elementos de ítems en el carrito
    getCartItems() {
      return cy.get(this.selectors.cartItem);
    }
  
    // Encuentra un ítem específico en el carrito por su nombre
    findCartItemByName(productName) {
      return cy.contains(this.selectors.cartItem, productName);
    }
  
    /**
     * Verifica que un producto específico exista en el carrito.
     * @param {string} productName - El nombre exacto del producto.
     */
    assertProductInCart(productName) { // <--- ELIMINADO: Parámetro expectedQuantity
      const item = this.findCartItemByName(productName);
      item.should('exist'); // Asegura que el contenedor del item existe
      // Verifica solo el nombre, ya que la cantidad es implícitamente 1 y no se puede cambiar
      item.find(this.selectors.itemName).should('have.text', productName);
      // item.find(this.selectors.itemQuantity)... // <--- ELIMINADO: Verificación de cantidad
    }
  
    /**
     * Verifica que un producto específico NO exista en el carrito.
     * @param {string} productName - El nombre exacto del producto.
     */
    assertProductNotInCart(productName) {
      cy.get(this.selectors.cartItem)
        .find(this.selectors.itemName)
        .contains(productName)
        .should('not.exist');
    }
  
    /**
     * Verifica el número total de ítems distintos listados en el carrito.
     * @param {number} expectedCount - El número esperado de filas de ítems.
     */
    assertCartItemCount(expectedCount) {
      if (expectedCount > 0) {
          this.getCartItems().should('have.length', expectedCount);
      } else {
          this.getCartItems().should('not.exist');
      }
    }
  
    /**
     * Hace clic en el botón 'Remove' para un producto específico en el carrito.
     * @param {string} productName - El nombre exacto del producto a remover.
     */
    removeProduct(productName) {
      this.findCartItemByName(productName)
        .find(this.selectors.removeButton)
        .click();
    }
  
    // Métodos para otros botones (opcional)
    clickCheckout() {
      cy.get(this.selectors.checkoutButton).click();
    }
  
    clickContinueShopping() {
      cy.get(this.selectors.continueShoppingButton).click();
    }
  }
  
  export default new CartPage();