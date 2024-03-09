import { cy } from 'cypress';
// Example end-to-end test using Cypress
describe('Task Management', () => {
  it('successfully creates a new task', () => {
    cy.visit('/');

    // Simulate user input
    cy.get('input[placeholder="Title"]').type('New Task');
    cy.get('textarea[placeholder="Description"]').type('New Task Description');
    cy.get('select').select('To Do');

    // Simulate form submission
    cy.contains('Add Task').click();

    // Check if the new task is rendered
    cy.contains('New Task').should('exist');
  });
});
