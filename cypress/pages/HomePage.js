import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage'; // Suponiendo que existe una página de inicio

describe('Logout - SauceDemo', () => {
  beforeEach(() => {
    LoginPage.visit();
    // Realizar un login exitoso para poder probar el logout
    LoginPage.fillUsername('standard_user');
    LoginPage.fillPassword('secret_sauce');
    LoginPage.clickLogin();
    HomePage.assertOnHomePage(); // Asegurarse de que el login fue exitoso y estamos en la página de inicio
  });

  it('Logout exitoso', () => {
    HomePage.clickLogout();
    LoginPage.assertOnLoginPage(); // Asegurarse de que después del logout volvemos a la página de login
  });
});