context('Login', () => {
    it('In angular einloggen als admin',()=>{
        cy.visit('https://localhost:4200/home')
        cy.get('#usernameInput').type('admin')
        cy.get('#passwordInput').type('p')
        cy.get('#navbarCollapse').contains('Login').click()
        cy.get('#navbarCollapse').contains('Logout')
    })
    it('In angular ausloggen',()=>{
        cy.get('#navbarCollapse').contains('Logout').click()
        cy.get('#navbarCollapse').contains('Login')
    })
})