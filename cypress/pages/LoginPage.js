class LoginPage {
    visit() {
      cy.visit('https://www.saucedemo.com');
    }
  
    fillUsername(user) {
      cy.get('[data-test="username"]').clear().type(user);
    }
  
    fillPassword(pass) {
      cy.get('[data-test="password"]').clear().type(pass);
    }
  
    clickLogin() {
      cy.get('[data-test="login-button"]').click();
    }
  
    getErrorMessage() {
      return cy.get('[data-test="error"]');
    }
  
    assertLoginSuccess() {
      // Verifica que redirige al inventario
      cy.url().should('include', '/inventory.html');
    }
  
    assertLoginError(mensajeEsperado) {
      this.getErrorMessage().should('contain.text', mensajeEsperado);
    }
  }
  
  export default new LoginPage();
  