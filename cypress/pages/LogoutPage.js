class LogoutPage {
  static clickMenuButton() {
    cy.get('.bm-burger-button').should('be.visible').click(); // Selector del botón de menú
  }

  static clickLogoutButton() {
    cy.get('#logout_sidebar_link').should('be.visible').click(); // Selector del botón de logout
  }

  static assertLogoutSuccess() {
    // Verificar que el usuario fue redirigido a la página de login
    cy.url().should('eq', 'https://www.saucedemo.com/'); // Validar la URL exacta tras el logout
    cy.get('[data-test="username"]').should('be.visible'); // Campo de usuario visible
  }
}

export default LogoutPage;
