const faker = require('faker');
faker.locale = 'pt_BR'

describe('Walkdog', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('POST', 'https://jsonplaceholder.typicode.com/posts').as('postForm')
  });
  it('Cadastro', () => {
    cy.get('a[href="/signup"').click()

    cy.get('input[placeholder="Nome completo"]').type(faker.name.findName())
    cy.get('input[placeholder="E-mail"]').type(faker.internet.email().toLowerCase())
    cy.get('input[placeholder="CPF somente números"]').type('69885174052')
    cy.get('input[placeholder="CEP"').type('05005030')
    cy.get('input[type="button"][value="Buscar CEP"]').click()
    cy.get('input[placeholder="Número"]').type('214')

    cy.contains('li', 'Cuidar').click()
    cy.contains('li', 'Adestrar').click()

    cy.get('input[type="file"]').selectFile('cypress/fixtures/imagem documento.jpg', {force: true})
    cy.get('.dropzone img').should('be.visible') // Verifica se a imagem está visível

    cy.contains('button', 'Cadastrar').click()
    cy.wait('@postForm')
    cy.contains ('Recebemos o seu cadastro e em breve retornaremos o contato.').should('be.visible')    
  })
})