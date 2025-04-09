// cypress/e2e/inventory_filter.cy.js

import LoginPage from '../pages/LoginPage'; // Asumiendo que LoginPage está en la misma carpeta 'pages'
import InventoryPage from '../pages/InventoryPage';

describe('Catálogo de Productos - Navegación y Filtrado', () => {
  beforeEach(() => {
    // Visitar la página de login antes de cada prueba
    LoginPage.visit();
    // Iniciar sesión con un usuario válido para acceder al catálogo
    LoginPage.fillUsername('standard_user');
    LoginPage.fillPassword('secret_sauce');
    LoginPage.clickLogin();
    // Verificar que hemos llegado a la página de inventario
    InventoryPage.assertOnInventoryPage();
  });

  it('Debería mostrar la página de productos después del login', () => {
    // La aserción ya está en beforeEach, pero podemos repetirla para claridad del test
    InventoryPage.assertOnInventoryPage();
    // Verificar que hay productos visibles
    cy.get(InventoryPage.selectors.productItems).should('have.length.greaterThan', 0);
  });

  it('Debería ordenar los productos por Nombre (A a Z) por defecto', () => {
    // El orden por defecto es A-Z
    InventoryPage.assertProductsSortedByName('asc');
  });

  it('Debería ordenar los productos por Nombre (Z a A)', () => {
    // Seleccionar la opción 'Name (Z to A)'
    InventoryPage.selectSortOption('za');
    // Verificar que los productos están ordenados de Z a A
    InventoryPage.assertProductsSortedByName('desc');
  });

  it('Debería ordenar los productos por Precio (low to high)', () => {
    // Seleccionar la opción 'Price (low to high)'
    InventoryPage.selectSortOption('lohi');
    // Verificar que los productos están ordenados por precio ascendente
    InventoryPage.assertProductsSortedByPrice('asc');
  });

  it('Debería ordenar los productos por Precio (high to low)', () => {
    // Seleccionar la opción 'Price (high to low)'
    InventoryPage.selectSortOption('hilo');
    // Verificar que los productos están ordenados por precio descendente
    InventoryPage.assertProductsSortedByPrice('desc');
  });

  // Opcional: Test para volver a ordenar por Nombre (A a Z) después de otros filtros
  it('Debería poder volver a ordenar por Nombre (A a Z)', () => {
    // Aplicar un orden diferente primero
    InventoryPage.selectSortOption('hilo');
    InventoryPage.assertProductsSortedByPrice('desc'); // Verificar que cambió

    // Volver a seleccionar la opción 'Name (A to Z)'
    InventoryPage.selectSortOption('az');
    // Verificar que los productos están ordenados de A a Z
    InventoryPage.assertProductsSortedByName('asc');
  });
});