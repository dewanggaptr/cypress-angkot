import { slowCypressDown } from "cypress-slow-down";
slowCypressDown(1000)

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

context('Angkot', () => {
    const email = 'admin@admin.com'
    const password = 'admin123'
    const url = 'http://127.0.0.1:8000/login'

    describe('Add Angkot', () => {
        beforeEach('Valid Login', () => {
            cy.visit(url)
            cy.get('#email').type(email)
            cy.get('#password').type(password)
        
            cy.get('.btn').click()
        })

        it('Empty Data', () => {
            cy.get(':nth-child(4) > .nk-menu-link').click()
            cy.get('.nk-block-tools-opt > .drodown > .dropdown-toggle').click()
            
            cy.contains('button', 'Save').click()

            cy.on('fail', (err, runnable) => {
                cy.contains('Please fill out this field.').should('exist')
            })
        })

        
        it('Valid Data', () => {
            cy.get(':nth-child(4) > .nk-menu-link').click()
            cy.get('.nk-block-tools-opt > .drodown > .dropdown-toggle').click()
    
            //form field
            cy.get('#no_pol').type('N 1234 GA')
            cy.get('select[name=nama_trayek]').select('KA',  {force: true}).should('have.value', '4')
            cy.get('select[name=nama_pemilik]').select('Jonathan Milky', {force: true}).should('have.value', '2')
            cy.get('#merk').type('Innova')

            //up images
            cy.fixture("stnk.jpg", { encoding: null }).as("mySTNK")
            cy.get('#foto_stnk').selectFile('@mySTNK')
            cy.fixture("bpkb.jpg", { encoding: null }).as("myBPKB")
            cy.get('#foto_bpkb').selectFile('@myBPKB')
            
            cy.contains('button', 'Save').click()
        })  

        it('Duplicate Data', () => {
            cy.get(':nth-child(4) > .nk-menu-link').click()
            cy.get('.nk-block-tools-opt > .drodown > .dropdown-toggle').click()
    
            //update form field
            cy.get('#no_pol').type('N 1234 GA')
            cy.get('select[name=nama_trayek]').select('KA',  {force: true}).should('have.value', '4')
            cy.get('select[name=nama_pemilik]').select('Jonathan Milky', {force: true}).should('have.value', '2')
            cy.get('#merk').type('Innova')

            //up images
            cy.fixture("stnk.jpg", { encoding: null }).as("mySTNK")
            cy.get('#foto_stnk').selectFile('@mySTNK')
            cy.fixture("bpkb.jpg", { encoding: null }).as("myBPKB")
            cy.get('#foto_bpkb').selectFile('@myBPKB')
            
            cy.contains('button', 'Save').click()
        }) 
    })

    describe('Update Angkot', () => {
        beforeEach('Valid Login', () => {
            cy.visit(url)
            cy.get('#email').type(email)
            cy.get('#password').type(password)
        
            cy.get('.btn').click()
        })
    
        it('Update Data Tidak Berubah', () => {
            cy.get(':nth-child(4) > .nk-menu-link').click()
            cy.get(':nth-child(19) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .btn > .icon').click()
            cy.get(':nth-child(19) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .dropdown-menu > .link-list-opt > :nth-child(2) > a').click()
            
            cy.get('#updateAngkotModal7 > .modal-dialog > .modal-content > .mt-2 > .modal-footer > .form-group > .btn').click()
        })    

        it('Test Update', () => {
            cy.get(':nth-child(4) > .nk-menu-link').click()
            cy.get(':nth-child(19) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .btn > .icon').click()
            cy.get(':nth-child(19) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .dropdown-menu > .link-list-opt > :nth-child(2) > a').click()
            
            //form field
            cy.get('#updateAngkotModal7 > .modal-dialog > .modal-content > .mt-2 > .modal-body > .card-inner-group > .card-inner > .row > :nth-child(1) > .form-group > .form-control-wrap > #no_pol_update').clear().type('N 3456 TA')
            // cy.get('select[name=nama_trayek_update]').select('MA',  {force: true}).should('have.value', '3')
            // cy.get('select[name=nama_pemilik_update]').select('John Doe', {force: true}).should('have.value', '1')
            cy.get('#updateAngkotModal7 > .modal-dialog > .modal-content > .mt-2 > .modal-body > .card-inner-group > .card-inner > .row > :nth-child(4) > .form-group > .form-control-wrap > #merk_update').clear().type('Kijang')

            cy.get('#updateAngkotModal7 > .modal-dialog > .modal-content > .mt-2 > .modal-footer > .form-group > .btn').click()
        })
        
    })

    describe('Delete Angkot', () => {
        beforeEach('Valid Login', () => {
            cy.visit(url)
            cy.get('#email').type(email)
            cy.get('#password').type(password)
        
            cy.get('.btn').click()
        })
    
        it('Delete Data Angkot', () => {
            cy.get(':nth-child(4) > .nk-menu-link').click()
            cy.get(':nth-child(19) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .btn > .icon').click()
            cy.get(':nth-child(19) > .nk-tb-col-tools > .nk-tb-actions > :nth-child(1) > .drodown > .dropdown-menu > .link-list-opt > :nth-child(4) > a').click()
            cy.get('#deleteAngkotModal7 > .modal-dialog > .modal-content > form > .modal-body > .nk-modal > .d-flex > :nth-child(1) > #deleteWH').click()
            
        })    
    })
})
