context('Testkunde löschen', () => {
    it('Testkunde löschen',()=>{
        cy.visit('https://localhost:4200/kunden/suche')
        cy.get('#usernameInput').type('admin')
        cy.get('#passwordInput').type('p')
        cy.get('#navbarCollapse').contains('Login').click()
        cy.get('#navbarCollapse').contains('Logout')
        cy.contains('Suchen').click()
        cy.get('table').contains('tr', 'Testkunde').find('*[title^="Entfernen"]').click()
    })
})