describe('empty spec', () => {
  it('visit', () => {
    cy.visit('/login');
  });

  it('mail test', () => {
    cy.get('.email-input').type('aaa@email.com').should('include', '@');

    cy.get('.email-input').clear().type('error typing').should('include', '@');
  });

  it('password test', () => {
    cy.get('.password-input').type(`hogehoge`).should('not.have.value', 'hogehoge');
  });
});
