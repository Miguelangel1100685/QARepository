import LoginPage from '../pages/LoginPage';
import LogoutPage from '../pages/LogoutPage';

describe('Logout - SauceDemo', () => {
  beforeEach(() => {
    LoginPage.visit();
    LoginPage.fillUsername('standard_user');
    LoginPage.fillPassword('secret_sauce');
    LoginPage.clickLogin();
    // Asegurarse de que el login fue exitoso antes de probar el logout
    LoginPage.assertLoginSuccess();
  });

  it('Logout exitoso', () => {
    // Usar LogoutPage para realizar las acciones de logout
    LogoutPage.clickMenuButton();
    LogoutPage.clickLogoutButton();
    // Verificar que el usuario fue redirigido a la página de login
    LogoutPage.assertLogoutSuccess();
  });
});