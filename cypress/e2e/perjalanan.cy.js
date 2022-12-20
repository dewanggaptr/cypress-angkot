import { slowCypressDown } from "cypress-slow-down";
slowCypressDown(1000)

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

context('Perjalanan', () => {
    const email = 'admin@admin.com'
    const password = 'admin123'
    const url = 'http://127.0.0.1:8000/login'

    describe('Add Perjalanan', () => {
            beforeEach('Valid Input', () => {
                cy.visit(url)
                cy.get('#email').type(email)
                cy.get('#password').type(password)
            
                cy.get('.btn').click()
            })
        
            it('Empty Data', () => {
                cy.get(':nth-child(5) > .nk-menu-link').click()
                cy.get('.nk-block-tools-opt > .drodown > .dropdown-toggle').click()
                
                cy.contains('button', 'Save').click()
    
                cy.on('fail', (err, runnable) => {
                    cy.contains('Please fill out this field.').should('exist')
                })
            })
    
            it('Valid Data', () => {
                cy.get(':nth-child(5) > .nk-menu-link').click()
                cy.get('.nk-block-tools-opt > .drodown > .dropdown-toggle').click()
        
            //     //form field
                cy.get('#jumlah_penumpang').type('10')
                // cy.get('select[name=nama_sopir]').select('Agus-5', {force: true}).should('have.value', '5')

                cy.contains('button', 'Save').click()
            })    
    
        })

        describe('Update Perjalanan', () => {
            beforeEach('Valid Input', () => {
                cy.visit(url)
                cy.get('#email').type(email)
                cy.get('#password').type(password)
            
                cy.get('.btn').click()
            })
        
            it('Update Data Tidak Berubah', () => {
                cy.get(':nth-child(5) > .nk-menu-link').click()
                cy.get(':nth-child(10) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .btn').click()

                cy.get(':nth-child(10) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .dropdown-menu > .link-list-opt > :nth-child(3) > a').click()
                cy.get('#form_update_for4 > .modal-footer > .form-group > .btn').click()
            })
            
            it('Update Data', () => {
                cy.get(':nth-child(5) > .nk-menu-link').click()
                cy.get(':nth-child(10) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .btn').click()

                cy.get(':nth-child(10) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .dropdown-menu > .link-list-opt > :nth-child(3) > a').click()

                cy.get('#form_update_for4 > .modal-body > .row > :nth-child(1) > .form-group > .form-control-wrap > #jumlah_penumpang_update').clear().type('17')
                cy.get('#form_update_for4 > .modal-footer > .form-group > .btn').click()
            })
        })

    describe('Delete Perjalanan', () => {
        beforeEach('Valid Input', () => {
            cy.visit(url)
            cy.get('#email').type(email)
            cy.get('#password').type(password)
        
            cy.get('.btn').click()
        })
    
        it('Delete Data', () => {
            cy.get(':nth-child(5) > .nk-menu-link').click()
            cy.get(':nth-child(10) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .btn').click()

            cy.get(':nth-child(10) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .dropdown-menu > .link-list-opt > :nth-child(5) > a').click()

            cy.get('#deletePerjalananModal4 > .modal-dialog > .modal-content > form > .modal-body > .nk-modal > .d-flex > :nth-child(1) > #deleteWH').click()
        })    
    })
})
