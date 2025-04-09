// cypress/e2e/checkout_complete.cy.js

import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
import CheckoutStepOnePage from '../pages/CheckoutStepOnePage';
import CheckoutStepTwoPage from '../pages/CheckoutStepTwoPage';
import CheckoutCompletePage from '../pages/CheckoutCompletePage';

describe('Proceso de Checkout Completo', () => {
  const productForCheckout = 'Sauce Labs Fleece Jacket'; // Producto a usar en el test

  // Datos del comprador (pueden ser ficticios)
  const buyerInfo = {
    firstName: 'Juan',
    lastName: 'Perez',
    postalCode: '10101',
  };

  beforeEach(() => {
    // Iniciar sesión antes de cada test
    LoginPage.visit();
    LoginPage.fillUsername('standard_user');
    LoginPage.fillPassword('secret_sauce');
    LoginPage.clickLogin();
    InventoryPage.assertOnInventoryPage();
  });

  it('Debería completar el proceso de checkout exitosamente con un producto', () => {
    // 1. Agregar producto al carrito desde Inventario
    InventoryPage.addProductToCart(productForCheckout);
    InventoryPage.assertCartBadgeCount(1);

    // 2. Ir al Carrito y verificar
    InventoryPage.clickShoppingCartLink();
    CartPage.assertOnCartPage();
    CartPage.assertProductInCart(productForCheckout);

    // 3. Proceder al Checkout (Step One)
    CartPage.clickCheckout();
    CheckoutStepOnePage.assertOnCheckoutStepOnePage();

    // 4. Llenar información del comprador
    CheckoutStepOnePage.fillInformation(
      buyerInfo.firstName,
      buyerInfo.lastName,
      buyerInfo.postalCode
    );
    CheckoutStepOnePage.clickContinue();

    // 5. Verificar Resumen (Step Two)
    CheckoutStepTwoPage.assertOnCheckoutStepTwoPage();
    CheckoutStepTwoPage.assertProductInOverview(productForCheckout);
    // Opcional: Verificar información estática (puede cambiar)
    // CheckoutStepTwoPage.assertPaymentInformation('SauceCard #31337');
    // CheckoutStepTwoPage.assertShippingInformation('Free Pony Express Delivery!');
    CheckoutStepTwoPage.assertTotals(); // Verificar que Subtotal + Tax = Total

    // 6. Finalizar la compra
    CheckoutStepTwoPage.clickFinish();

    // 7. Verificar Página de Completado
    CheckoutCompletePage.assertOnCheckoutCompletePage();
    CheckoutCompletePage.assertCompleteHeader('Thank you for your order!');
    CheckoutCompletePage.assertCompleteText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    );

    // 8. Volver a la página de inicio (Inventario)
    CheckoutCompletePage.clickBackHome();
    InventoryPage.assertOnInventoryPage();

    // 9. Verificar que el carrito esté vacío después de completar
    InventoryPage.assertCartBadgeDoesNotExist();
  });

  it('Debería mostrar un error si la información del comprador está incompleta', () => {
    // 1. Agregar producto y ir al primer paso del checkout
    InventoryPage.addProductToCart(productForCheckout);
    InventoryPage.clickShoppingCartLink();
    CartPage.clickCheckout();
    CheckoutStepOnePage.assertOnCheckoutStepOnePage();

    // 2. Intentar continuar sin llenar nada
    CheckoutStepOnePage.clickContinue();

    // 3. Verificar mensaje de error (el mensaje exacto puede variar, ajustar si es necesario)
    CheckoutStepOnePage.assertErrorMessage('Error: First Name is required');

    // 4. Llenar solo el nombre e intentar de nuevo
    CheckoutStepOnePage.fillFirstName(buyerInfo.firstName);
    CheckoutStepOnePage.clickContinue();
    CheckoutStepOnePage.assertErrorMessage('Error: Last Name is required');

    // 5. Llenar nombre y apellido e intentar de nuevo
    CheckoutStepOnePage.fillLastName(buyerInfo.lastName);
    CheckoutStepOnePage.clickContinue();
    CheckoutStepOnePage.assertErrorMessage('Error: Postal Code is required');

    // 6. Llenar todo y verificar que el error desaparece (y avanza)
    CheckoutStepOnePage.fillPostalCode(buyerInfo.postalCode);
    CheckoutStepOnePage.clickContinue();
    // Verificar que avanzamos a la siguiente página (Step Two)
    CheckoutStepTwoPage.assertOnCheckoutStepTwoPage();
  });
});