context('Login Tests', () => {
    it('Register user, validate login and create tasks and habits', () => {
        cy.visit('https://habitica.com/static/home')
            // Sign up
        cy.get('#usernameInput').type('jcardenasMiso');
        cy.get('input[placeholder="Email"]').type('j.cardenasc@uniandes.edu.co');
        cy.get('input[placeholder="Password"]').type('Habitica@uniandes.edu.co');
        cy.get('input[placeholder="Confirm Password"]').type('Habitica@uniandes.edu.co');
        cy.get('button[type="submit"]').should('not.be.disabled')
        cy.get('.btn-info[type="submit"]').click()

        // Login
        cy.get('.login-button').click();
        cy.get('#usernameInput').type('j.cardenasc@uniandes.edu.co').should('have.value', 'j.cardenasc@uniandes.edu.co');
        cy.get('#passwordInput').type('Habitica@uniandes.edu.co');
        cy.get('.btn-info[type="submit"]').click()

    })
});