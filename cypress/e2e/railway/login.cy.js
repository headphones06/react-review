describe('empty spec', () => {
  it('visit', () => {
    cy.visit('/login');
  });

  it('mail failed test', () => {
    cy.get('[data-testid="email"]').clear().type('failed test');
  });

  it('mail success test', () => {
    cy.get('[data-testid="email"]').clear().type('aaa@email.com').should('have.value', 'aaa@email.com');
    cy.get('[data-testid="email-err"]').should('have.value', '');
  });

  it('password test', () => {
    cy.get('[data-testid="password"]').type(`hogehoge`).should('have.value', 'hogehoge');
  });
});
