describe('empty spec', () => {
  it('visit', () => {
    cy.visit('/login');
  });

  it('mail test', () => {
    cy.get('[data-testid="email"]').type('aaa@email.com').should('include', '@');

    cy.get('[data-testid="password"]').clear().type('error typing').should('include', '@');
    //全部PASSするコードを書かないといけない（改善必須）
  });

  it('password test', () => {
    cy.get('.password-input').type(`hogehoge`).should('not.have.value', 'hogehoge');
  });
});
