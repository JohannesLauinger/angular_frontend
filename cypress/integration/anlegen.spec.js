context('Testkunde anlegen', () => {
    it('Einloggen und Testkunden anlegen',()=>{
        cy.visit('https://localhost:4200/home')
        cy.get('#usernameInput').type('admin')
        cy.get('#passwordInput').type('p')
        cy.get('#navbarCollapse').contains('Login').click()
        cy.get('#navbarCollapse').contains('Logout')
        cy.get('#navbarCollapse').contains('Neuer Kunde').click()
        cy.contains('Neuen Kunden anlegen')
        cy.get('#mat-input-0').type('Testkunde')
        cy.get('#mat-input-1').type('test@mail.com')
        cy.get('#geburtsdatumInput').type('1/20/1990')
        cy.contains('Divers').click()
        cy.contains('Reisen').click()
        cy.contains('Sport').click()
        cy.get('#mat-select-value-1').click()
        cy.contains('Ledig').click()
        cy.get('#mat-input-3').type('testUser')
        cy.get('#mat-input-4').type('123')
        cy.get('#mat-input-5').type('Karlsruhe')
        cy.get('#mat-input-6').type('76131')
        cy.get('#mat-input-7').type('https://www.acme.de')
        cy.contains('Kunde anlegen').click()
    })
})