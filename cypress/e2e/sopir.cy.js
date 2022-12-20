import { slowCypressDown } from "cypress-slow-down";
slowCypressDown(1000)

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

context('Sopir', () => {
    const email = 'admin@admin.com'
    const password = 'admin123'
    const url = 'http://127.0.0.1:8000/login'

    describe('Add Sopir', () => {
        const nama = 'Hadi';
        const alamat = 'Jl. Pancasila';
        
        beforeEach('Valid Input', () => {
            cy.visit(url)
            cy.get('#email').type(email)
            cy.get('#password').type(password)
        
            cy.get('.btn').click()
        })

        it('Empty Data', () => {
            cy.get(':nth-child(3) > .nk-menu-link').click()
            cy.get('.nk-block-tools-opt > .drodown > .dropdown-toggle').click()
            
            cy.contains('button', 'Save').click()

            cy.on('fail', (err, runnable) => {
                cy.contains('Please fill out this field.').should('exist')
            })
        })
    
        it('Valid Data', () => {
            cy.get(':nth-child(3) > .nk-menu-link').click()
            cy.get('.nk-block-tools-opt > .drodown > .dropdown-toggle').click()
    
            //form field
            cy.get('#name').type(nama)
            cy.get('select[name=jenis_kelamin]').select('Laki-laki',  {force: true}).should('have.value', 'l')
            cy.get('#alamat').type(alamat)

            //up images
            cy.fixture("sopir.jpg", { encoding: null }).as("mySopir")
            cy.get('#foto').selectFile('@mySopir')
            
            cy.get('#addSopirModal > .modal-dialog > .modal-content > .mt-2 > .modal-footer > .form-group > .btn').click()
        })
        
        it('Duplicated Data', () => {
            cy.get(':nth-child(3) > .nk-menu-link').click()
            cy.get('.nk-block-tools-opt > .drodown > .dropdown-toggle').click()
    
            //form field
            cy.get('#name').type(nama)
            cy.get('select[name=jenis_kelamin]').select('Laki-laki',  {force: true}).should('have.value', 'l')
            cy.get('#alamat').type(alamat)

            //up images
            cy.fixture("sopir.jpg", { encoding: null }).as("mySopir")
            cy.get('#foto').selectFile('@mySopir')
            
            cy.get('#addSopirModal > .modal-dialog > .modal-content > .mt-2 > .modal-footer > .form-group > .btn').click()
        })
    })

    describe('Update Sopir', () => {
      
            beforeEach('Valid Input', () => {
                cy.visit(url)
                cy.get('#email').type(email)
                cy.get('#password').type(password)
            
                cy.get('.btn').click()
            })
        
            it('Update Data Tidak Berubah', () => {
                cy.get(':nth-child(3) > .nk-menu-link').click()
                cy.get(':nth-child(19) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .btn').click()
                cy.get(':nth-child(19) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .dropdown-menu > .link-list-opt > :nth-child(2) > a').click()
                
                cy.get('#form_update_for6 > .modal-footer > .form-group > .btn').click()
            }) 
    
            it('Update Data', () => {
                cy.get(':nth-child(3) > .nk-menu-link').click()
                cy.get(':nth-child(19) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .btn').click()
                cy.get(':nth-child(19) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .dropdown-menu > .link-list-opt > :nth-child(2) > a').click()
    
                //update form field
                cy.get('#form_update_for6 > .modal-body > .card-inner-group > .card-inner > .row > :nth-child(1) > .form-group > .form-control-wrap > #name_update').clear().type('Yoyok')
                cy.get('#form_update_for6 > .modal-body > .card-inner-group > .card-inner > .row > :nth-child(3) > .form-group > .form-control-wrap > #alamat_update').clear().type('Jl. Garuda')
                // cy.get('select[id=status_update]').select('Active',  {force: true}).should('have.value', 'active')

                cy.get('#form_update_for6 > .modal-footer > .form-group > .btn').click()
            })    
        })

    describe('Delete Sopir', () => {
        beforeEach('Valid Input', () => {
            cy.visit(url)
            cy.get('#email').type(email)
            cy.get('#password').type(password)
        
            cy.get('.btn').click()
        })
    
        it('Delete Data', () => {
            cy.get(':nth-child(3) > .nk-menu-link').click()
            cy.get(':nth-child(19) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .btn > .icon').click()
            
            cy.get(':nth-child(19) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .dropdown-menu > .link-list-opt > :nth-child(4) > a').click()
            cy.get('#deleteSopirModal6 > .modal-dialog > .modal-content > form > .modal-body > .nk-modal > .d-flex > :nth-child(1) > #deleteWH').click()
        })    
    })
})
