// -- Este comando personalizado permite iniciar sesión en la aplicación --
Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
});

// -- Este comando personalizado llena un formulario con los datos proporcionados --
Cypress.Commands.add('fillForm', (formData) => {
    Object.keys(formData).forEach((field) => {
        cy.get(`input[name="${field}"]`).type(formData[field]);
    });
});

// -- Este comando personalizado verifica que un elemento sea visible en la página --
Cypress.Commands.add('checkVisibility', (selector) => {
    cy.get(selector).should('be.visible');
});