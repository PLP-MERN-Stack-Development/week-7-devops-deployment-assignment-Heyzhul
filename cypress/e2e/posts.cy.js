describe('Blog App - End to End Test', () => {
  it('Should allow a user to login and create a post', () => {
    cy.visit('http://localhost:5173/login');

    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');

    cy.contains('New Post').click();

    cy.get('input[name="title"]').type('My Test Post');
    cy.get('textarea[name="content"]').type('This is a test post created via Cypress.');

    cy.get('button[type="submit"]').click();

    cy.contains('My Test Post').should('exist');
  });
});
