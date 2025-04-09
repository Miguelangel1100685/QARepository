// cypress/e2e/add_to_cart.cy.js

import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';

describe('Carrito de Compras - Agregar Productos', () => {
  const product1 = 'Sauce Labs Backpack';
  const product2 = 'Sauce Labs Bike Light';
  const product3 = 'Sauce Labs Bolt T-Shirt';

  beforeEach(() => {
    LoginPage.visit();
    LoginPage.fillUsername('standard_user');
    LoginPage.fillPassword('secret_sauce');
    LoginPage.clickLogin();
    InventoryPage.assertOnInventoryPage();
  });

  it('Debería agregar un solo producto al carrito y verificar', () => {
    InventoryPage.assertCartBadgeDoesNotExist();
    InventoryPage.addProductToCart(product1);
    InventoryPage.assertCartBadgeCount(1);
    InventoryPage.clickShoppingCartLink();
    CartPage.assertOnCartPage();
    CartPage.assertCartItemCount(1);
    // Verificar que el producto correcto está en el carrito (sin verificar cantidad)
    CartPage.assertProductInCart(product1); // <--- MODIFICADO: Ya no se pasa la cantidad
  });

  it('Debería agregar múltiples productos al carrito y verificar', () => {
    InventoryPage.addProductToCart(product1);
    InventoryPage.addProductToCart(product2);
    InventoryPage.assertCartBadgeCount(2);
    InventoryPage.clickShoppingCartLink();
    CartPage.assertOnCartPage();
    CartPage.assertCartItemCount(2);
    // Verificar que ambos productos están presentes
    CartPage.assertProductInCart(product1);
    CartPage.assertProductInCart(product2);
  });

  it('Debería agregar y luego remover un producto desde la página de inventario', () => {
     InventoryPage.addProductToCart(product3);
     InventoryPage.assertCartBadgeCount(1);
     InventoryPage.removeProductFromCart(product3);
     InventoryPage.assertCartBadgeDoesNotExist();
     InventoryPage.clickShoppingCartLink();
     CartPage.assertOnCartPage();
     CartPage.assertCartItemCount(0);
  });
});