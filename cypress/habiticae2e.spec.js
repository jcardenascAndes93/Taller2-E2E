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

    it('Create habit', () => {
        cy.visit('https://habitica.com/static/home');

        // Login        
        cy.get('.login-button').click();
        cy.wait(2000)
        cy.get('#usernameInput').type('j.cardenasc@uniandes.edu.co');
        cy.get('#passwordInput').type('Habitica@uniandes.edu.co');
        cy.get('.btn-info[type="submit"]').click()

        // Access to plus button
        cy.get('.diamond-btn').click({ force: true });
        cy.wait(300)
        cy.get('div[class="create-task-btn diamond-btn"]').first().click({ force: true });
        cy.wait(500)

        // Complete form
        cy.get('input[placeholder="Add a title"]').type('Mi hábito No. 1');
        cy.get('textarea[placeholder="Add notes"]').type('Algunas notas');
        cy.get('div[class="items-none"]').click({ force: true });
        cy.contains('Exercise').click({ force: true });
        cy.get('.btn-footer').click();
    });

    it('Create daily task', () => {
        cy.visit('https://habitica.com/static/home');

        // Login        
        cy.get('.login-button').click();
        cy.wait(2000)
        cy.get('#usernameInput').type('j.cardenasc@uniandes.edu.co');
        cy.get('#passwordInput').type('Habitica@uniandes.edu.co');
        cy.get('.btn-info[type="submit"]').click()

        // Access to plus button
        cy.get('.diamond-btn').click({ force: true });
        cy.wait(300)
        cy.get('div[class="svg-icon icon-daily"]').first().click({ force: true });
        cy.wait(1000)

        // Complete form
        cy.get('input[placeholder="Add a title"]').type('Mi daily No. 1');
        cy.get('textarea[placeholder="Add notes"]').type('Algunas notas', { force: true });
        cy.get('button[tab-index="0"').click({ force: true })
        cy.get('button[tab-index="6"').click({ force: true })
        cy.get('.btn-footer').click();

    });
});