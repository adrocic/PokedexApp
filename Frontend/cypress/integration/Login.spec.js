/// <reference types="Cypress" />

describe('Login form', () => {
  it('Submits correctly', () => {
    cy.visit('/login');

    // Create aliases for fields and buttons
    // These can be referenced later using the `@foo` syntax
    cy.get('[data-cy=email]').as('email');
    cy.get('[data-cy=password]').as('password');
    cy.get('[data-cy=submit]').as('submit');

    // Login
    cy.get('@email')
      .should('be.focused')
      .type('my@email.com');
    cy.get('@password').type('password');
    cy.get('@submit').click();

    // Redirects correctly
    cy.location('pathname').should('equal', '/private');

    // Go back to home page
    cy.visit('/');

    // Is logged in correctly
    cy.contains('Logged in');

    // Stays logged in through refresh
    cy.reload();
    cy.get('[data-cy=logout]')
      .as('logout')
      .should('have.text', 'Logout');

    // Log out correctly
    cy.get('@logout').click();
    cy.get('[data-cy=login]').as('login');

    cy.reload();
    cy.get('@login');
  });
});
