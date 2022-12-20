import { slowCypressDown } from "cypress-slow-down";
slowCypressDown(1000)

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

context('Trayek', () => {
    const email = 'admin@admin.com';
    const password = 'admin123'
    const url = 'http://127.0.0.1:8000/login'

    describe('Add Trayek', () => {
        beforeEach('Valid Input', () => {
            cy.visit(url)
            cy.get('#email').type(email)
            cy.get('#password').type(password)
        
            cy.get('.btn').click()
        })
    
    
        const nama = 'MM';
        const warna = 'Biru-Hitam';
        const jalur =  'Mulyorejo-Madyopuro';
    
        it('Empty Data', () => {
            cy.get(':nth-child(6) > .nk-menu-link').click()
            cy.get('.nk-block-tools-opt > .drodown > .dropdown-toggle').click()
            
            cy.contains('button', 'Save').click()

            cy.on('fail', (err, runnable) => {
                cy.contains('Please fill out this field.').should('exist')
            })
        })

        it('Valid Data', () => {
            cy.get(':nth-child(6) > .nk-menu-link').click()
            cy.get('.nk-block-tools-opt > .drodown > .dropdown-toggle').click()
    
            //form field
            cy.get('#nama_trayek').type(nama)
            cy.get('#jalur_trayek').type(jalur)
            cy.get('#warna_angkot').type(warna)
            
            cy.contains('button', 'Save').click()
        })    

        it('Duplicated Data', () => {
            cy.get(':nth-child(6) > .nk-menu-link').click()
            cy.get('.nk-block-tools-opt > .drodown > .dropdown-toggle').click()
    
            //form field
            cy.get('#nama_trayek').type(nama)
            cy.get('#jalur_trayek').type(jalur)
            cy.get('#warna_angkot').type(warna)
            
            cy.contains('button', 'Save').click()
        }) 
    })

    describe('Update Trayek', () => {
      
        beforeEach('Valid Input', () => {
            cy.visit(url)
            cy.get('#email').type(email)
            cy.get('#password').type(password)
        
            cy.get('.btn').click()
        })
    
        it('Update Data Tidak Berubah', () => {
            cy.get(':nth-child(6) > .nk-menu-link').click()
            cy.get(':nth-child(19) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .btn').click()
            cy.get(':nth-child(19) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .dropdown-menu > .link-list-opt > :nth-child(2) > a').click()
            
            cy.get('#form_update_for10 > .modal-footer > .form-group > .btn').click()
        }) 

        it('Update Data', () => {
            cy.get(':nth-child(6) > .nk-menu-link').click()
            cy.get(':nth-child(19) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .btn').click()
            cy.get(':nth-child(19) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .dropdown-menu > .link-list-opt > :nth-child(2) > a').click()

            //update form field
            cy.get('#form_update_for10 > .modal-body > .row > :nth-child(1) > .form-group > .form-control-wrap > #nama_trayek_update').clear().type('GA')
            cy.get('#form_update_for10 > .modal-body > .row > :nth-child(2) > .form-group > .form-control-wrap > #warna_angkot_update').clear().type('Biru-Kuning')
            cy.get('#form_update_for10 > .modal-body > .row > .col-md-12 > .form-group > .form-control-wrap > #jalur_trayek_update').clear().type('Gadang-Arjosari')
            
            cy.get('#form_update_for10 > .modal-footer > .form-group > .btn').click()
        })    
    })

    describe('Delete Trayek', () => {
      
        beforeEach('Valid Input', () => {
            cy.visit(url)
            cy.get('#email').type(email)
            cy.get('#password').type(password)
        
            cy.get('.btn').click()
        })
    
        it('Delete Data', () => {
            cy.get(':nth-child(6) > .nk-menu-link').click()
            cy.get(':nth-child(19) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .btn').click()
            cy.get(':nth-child(19) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .dropdown-menu > .link-list-opt > :nth-child(4) > a').click()
            cy.get('#deleteTrayekModal10 > .modal-dialog > .modal-content > form > .modal-body > .nk-modal > .d-flex > :nth-child(1) > #deleteWH').click()
        })    
    })
})



