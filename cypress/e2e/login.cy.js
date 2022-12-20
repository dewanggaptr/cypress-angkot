import { slowCypressDown } from "cypress-slow-down";
slowCypressDown(1000)

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Login', () => {
  const email = 'admin@admin.com'
  const password = 'admin123'
  const url = 'http://127.0.0.1:8000/login'

  it('Input Email Invalid & Password Invalid', () => {
    cy.visit(url)
    cy.get('#email').type('test@gmail.com')
    cy.get('#password').type('testPass')

    cy.get('.btn').click()
  })

  it('Input Email Valid & Password Invalid', () => {
    cy.visit(url)
    cy.get('#email').type(email)
    cy.get('#password').type('testPass')

    cy.get('.btn').click()
  })

  it('Input Email Valid & Password Valid', () => {
    cy.visit(url)
    cy.get('#email').type(email)
    cy.get('#password').type(password)

    cy.get('.btn').click()
  })
})