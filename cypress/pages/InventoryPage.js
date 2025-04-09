// cypress/pages/InventoryPage.js

class InventoryPage {
    // Selectores existentes...
    selectors = {
      pageTitle: '.title',
      inventoryContainer: '#inventory_container',
      productItems: '.inventory_item',
      productNames: '.inventory_item_name',
      productPrices: '.inventory_item_price',
      sortDropdown: '.product_sort_container',
      // --- NUEVOS SELECTORES ---
      // Prefijos para botones (usaremos productName para completar el selector)
      addToCartButtonPrefix: 'add-to-cart-',
      removeButtonPrefix: 'remove-',
      // Badge del carrito y enlace
      shoppingCartBadge: '[data-test="shopping-cart-badge"]',
      shoppingCartLink: '[data-test="shopping-cart-link"]',
    };
  
    // --- MÉTODOS EXISTENTES ---
    assertOnInventoryPage() {
      cy.get(this.selectors.pageTitle).should('have.text', 'Products');
      cy.get(this.selectors.inventoryContainer).should('be.visible');
    }
  
    getSortDropdown() {
      return cy.get(this.selectors.sortDropdown);
    }
  
    selectSortOption(optionValue) {
      this.getSortDropdown().select(optionValue);
    }
  
    getProductNames() {
      return cy.get(this.selectors.productNames);
    }
  
    getProductPrices() {
      return cy.get(this.selectors.productPrices);
    }
  
    assertProductsSortedByName(order = 'asc') {
      // ... (código existente sin cambios)
      this.getProductNames().then(($elements) => {
          const names = Cypress._.map($elements, (el) => el.innerText);
          const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
          if (order === 'desc') {
              sortedNames.reverse();
          }
          expect(names).to.deep.equal(sortedNames);
      });
    }
  
    assertProductsSortedByPrice(order = 'asc') {
      // ... (código existente sin cambios)
      this.getProductPrices().then(($elements) => {
          const prices = Cypress._.map($elements, (el) =>
              parseFloat(el.innerText.replace('$', ''))
          );
          const sortedPrices = [...prices].sort((a, b) => a - b);
          if (order === 'desc') {
              sortedPrices.reverse();
          }
          expect(prices).to.deep.equal(sortedPrices);
      });
    }
  
    // --- NUEVOS MÉTODOS ---
  
    /**
     * Genera el selector data-test para un botón de producto específico.
     * @param {string} prefix - 'add-to-cart-' o 'remove-'
     * @param {string} productName - Nombre del producto (ej: 'Sauce Labs Backpack')
     * @returns {string} El selector data-test completo.
     */
    _getProductButtonSelector(prefix, productName) {
      // Convierte el nombre a formato kebab-case para el selector
      const dataTestSuffix = productName.toLowerCase().replace(/\s+/g, '-');
      return `[data-test="${prefix}${dataTestSuffix}"]`;
    }
  
    /**
     * Agrega un producto específico al carrito haciendo clic en su botón "Add to cart".
     * @param {string} productName - El nombre exacto del producto.
     */
    addProductToCart(productName) {
      const selector = this._getProductButtonSelector(
        this.selectors.addToCartButtonPrefix,
        productName
      );
      cy.get(selector).should('be.visible').click();
    }
  
    /**
     * Quita un producto específico del carrito haciendo clic en su botón "Remove".
     * @param {string} productName - El nombre exacto del producto.
     */
    removeProductFromCart(productName) {
      const selector = this._getProductButtonSelector(
        this.selectors.removeButtonPrefix,
        productName
      );
      cy.get(selector).should('be.visible').click();
    }
  
    /**
     * Obtiene el elemento del badge del carrito.
     */
    getShoppingCartBadge() {
      // El badge puede no existir si el carrito está vacío, usamos find para manejarlo
      // Cypress esperará a que aparezca si es necesario dentro de un should
      // Devolvemos el contenedor del link, ya que el badge está dentro
       return cy.get(this.selectors.shoppingCartLink);
    }
  
    /**
     * Verifica la cantidad mostrada en el badge del carrito.
     * @param {number} expectedCount - El número esperado de ítems.
     */
    assertCartBadgeCount(expectedCount) {
      this.getShoppingCartBadge()
          .find(this.selectors.shoppingCartBadge) // Busca el badge dentro del link
          .should('have.text', expectedCount.toString());
    }
  
     /**
     * Verifica que el badge del carrito no exista (carrito vacío).
     */
    assertCartBadgeDoesNotExist() {
      cy.get(this.selectors.shoppingCartLink)
        .find(this.selectors.shoppingCartBadge)
        .should('not.exist');
    }
  
    /**
     * Hace clic en el icono/link del carrito de compras para navegar a la página del carrito.
     */
    clickShoppingCartLink() {
      cy.get(this.selectors.shoppingCartLink).click();
    }
  }
  
  export default new InventoryPage();