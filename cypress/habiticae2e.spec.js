context('Login Tests', () => {
    it('Register user', () => {
        cy.visit('https://habitica.com/static/home')
            // Sign up
        cy.get('#usernameInput').type('jcardenasMiso');
        cy.get('input[placeholder="Email"]').type('j.cardenasc@uniandes.edu.co');
        cy.get('input[placeholder="Password"]').type('Habitica@uniandes.edu.co');
        cy.get('input[placeholder="Confirm Password"]').type('Habitica@uniandes.edu.co');
        cy.get('button[type="submit"]').should('not.be.disabled')
        cy.get('.btn-info[type="submit"]').click()

    })
    it('Login', () => {
        cy.visit('https://habitica.com/static/home')

        // Login
        cy.get('.login-button').click();
        cy.get('#usernameInput').type('j.cardenasc@uniandes.edu.co');
        cy.get('#passwordInput').type('Habitica@uniandes.edu.co');
        cy.get('.btn-info[type="submit"]').click()

    });

    it('Register user with previous data', () => {
        cy.visit('https://habitica.com/static/home')

        // Sign up with existing account
        cy.get('#usernameInput').type('jcardenasMiso');
        cy.get('input[placeholder="Email"]').type('j.cardenasc@uniandes.edu.co');
        cy.get('input[placeholder="Password"]').type('Habitica@uniandes.edu.co');
        cy.get('input[placeholder="Confirm Password"]').type('Habitica@uniandes.edu.co');
        cy.get('button[type="submit"]').should('be.disabled')
        cy.get('.input-error').should('be.visible')

    });

    it('Create public challenge', () => {
        //cy.server();
        cy.visit('https://habitica.com/static/home');

        // Login        
        cy.get('.login-button').click();
        cy.wait(2000)
        cy.get('#usernameInput').type('j.cardenasc@uniandes.edu.co');
        cy.get('#passwordInput').type('Habitica@uniandes.edu.co');
        cy.get('.btn-info[type="submit"]').click()

        // Access to challenge    
        cy.wait(1000)
        cy.get('a[href*="/challenges/myChallenges"]').first().click();
        cy.wait(1000)
        cy.get('.create-challenge-button').click();
        cy.wait(1000)

        // Complete form
        cy.get('input[placeholder="What is your Challenge name?"]').type('Mi primer desafio');
        cy.get('input[placeholder="What short tag should be used to identify your Challenge?"]').type('First');
        cy.get('textarea[class="summary-textarea form-control"]').type('Mi primer desafío en Habitica generado de forma auotamitazada');
        cy.get('textarea[class="description-textarea form-control"]').type('Esta es la descripción del challenge.');
        cy.get('select').select('00000000-0000-4000-A000-000000000000');
        cy.contains('None').click({ force: true })
        cy.wait(500);
        cy.get('input[id="challenge-modal-cat-creativity"]').check({ force: true });
        cy.contains('Close').click({ force: true })
        cy.get('.alert-warning').should('be.visible');

    });
});