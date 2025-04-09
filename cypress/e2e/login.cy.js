import LoginPage from '../pages/LoginPage';

describe('Login - SauceDemo', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('Login exitoso con usuario válido', () => {
    LoginPage.fillUsername('standard_user');
    LoginPage.fillPassword('secret_sauce');
    LoginPage.clickLogin();
    LoginPage.assertLoginSuccess();
  });

  it('Login fallido con contraseña incorrecta', () => {
    LoginPage.fillUsername('standard_user');
    LoginPage.fillPassword('wrong_password');
    LoginPage.clickLogin();
    LoginPage.assertLoginError('Epic sadface: Username and password do not match any user in this service');
  });

  it('Login fallido con usuario bloqueado', () => {
    LoginPage.fillUsername('locked_out_user');
    LoginPage.fillPassword('secret_sauce');
    LoginPage.clickLogin();
    LoginPage.assertLoginError('Epic sadface: Sorry, this user has been locked out.');
  });

  it('Login fallido con campos vacíos', () => {
    LoginPage.clickLogin();
    LoginPage.assertLoginError('Epic sadface: Username is required');
  });
});
