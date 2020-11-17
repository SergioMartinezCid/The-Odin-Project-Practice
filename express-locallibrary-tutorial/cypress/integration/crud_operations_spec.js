describe('Book Instance Pagination', () => {
    it('successfully loads', () => {
        cy.visit('/catalog/bookinstances');
        cy.contains('Next').click();
        cy.url().should('include', '/catalog/bookinstances/2');
    })
})
describe('Genre creation: Empty field', () => {
    it('successfully loads', () => {
        cy.visit('/catalog/genre/create');
        cy.get('.btn').click();
        cy.get('.col-sm-10 > ul:nth-child(3) > li:nth-child(1)').should('have.text', 'Genre name required');
    })
})
describe('Genre creation: Existing genre', () => {
    it('successfully loads', () => {
        cy.visit('/catalog/genre/create');
        cy.get('#name').type('French Poetry');
        cy.get('.btn').click();
        cy.url().should('include', '/catalog/genre/3');
    })
})
describe('Update Book: missing field', () => {
    it('successfully loads', () => {
        cy.visit('/catalog/book/7/update');
        cy.get('#summary').click().clear();
        cy.get('.btn').click();
        cy.url().should('include', '/catalog/book/7/update');
    })
})
describe('Update Book: successful update', () => {
    it('successfully loads', () => {
        cy.visit('/catalog/book/7/update');
        cy.get('#summary').click().clear().type('Summary of test book 1, updated.');
        cy.get('.btn').click();
        cy.url().should('include', '/catalog/book/7');
        cy.get('.col-sm-10 > p:nth-child(3)').should('have.text', 'Summary: Summary of test book 1, updated.');
    })
})
