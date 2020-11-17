describe('The Home Page', () => {
    it('successfully loads', () => {
        cy.visit('/');
    })
})

describe('Book list', () => {
    it('successfully loads', () => {
        cy.visit('/');
        cy.contains('All books').click();
    })
})
describe('Author list', () => {
    it('successfully loads', () => {
        cy.visit('/');
        cy.contains('All authors').click();
    })
})
describe('Genre list', () => {
    it('successfully loads', () => {
        cy.visit('/');
        cy.contains('All genres').click();
    })
})
describe('Book Instace list', () => {
    it('successfully loads', () => {
        cy.visit('/');
        cy.contains('All book-instances').click();
    })
})
