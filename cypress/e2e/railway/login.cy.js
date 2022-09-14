describe('empty spec', () => {
  it('visit', () => {
    cy.visit('/login');
  });

  it('mail test', () => {
    cy.get('[data-testid="email"]').type('aaa@email.com').should('have.value', 'aaa@email.com');
  });

  it('password test', () => {
    cy.get('.password-input').type(`hogehoge`).should('have.value', 'hogehoge');
  });
});
