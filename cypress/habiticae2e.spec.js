context('Login Tests', () => {
    it('Register user, validate login and create tasks and habits', () => {
        cy.visit('https://habitica.com/static/home')

        cy.get('#usernameInput').type('jcardenasMiso');
        cy.get('input[placeholder="Email"]').type('j.cardenasc@uniandes.edu.co');
        cy.get('input[placeholder="Password"]').type('Habitica@uniandes.edu.co');
        cy.get('input[placeholder="Confirm Password"]').type('Habitica@uniandes.edu.co');
        cy.get('button[type="submit"]').should('not.be.disabled')

        cy.get('.btn-info[type="submit"]').click()

        //cy.get('#passwordInput').type('fake@email.com');
        //
        //cy.get('.btn-info[type="submit"]').click()
        //cy.contains("Missing username or email.").should('be.visible')
    })
});