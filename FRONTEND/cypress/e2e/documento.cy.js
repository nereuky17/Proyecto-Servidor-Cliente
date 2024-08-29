describe('Documento', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/documento') // URL correcta de tu aplicación
    })

    it('debería mostrar el formulario de expediente cuando se hace clic en el botón "Insertar Expediente"', () => {
        cy.get('.btn-expediente').click()
        cy.get('.formulario-expediente').should('be.visible')
    })

    it('debería mostrar el formulario de documento cuando se hace clic en el botón "Insertar Documento"', () => {
        cy.get('.btn-documento').click()
        cy.get('.formulario-documento').should('be.visible')
    })

    it('debería añadir un nuevo expediente cuando se hace clic en el botón "Añadir Expediente"', () => {
        cy.get('.btn-expediente').click()
        cy.get('#expedienteNombre').type('Nuevo Expediente')
        cy.get('.btn-añadir-expediente').click()
        cy.get('.expediente-creado').should('be.visible')
    })

    it('debería añadir un nuevo documento cuando se hace clic en el botón "Añadir Documento"', () => {
        cy.get('.btn-documento').click()
        cy.get('#documentoNombre').type('Nuevo Documento')
        cy.get('#documentoContenido').type('Contenido del nuevo documento')
        cy.get('#expedienteIdManual').type('123')
        cy.get('.btn-añadir-documento').click()
        cy.get('.documento-creado').should('be.visible')
    })

    it('debería actualizar un documento cuando se hace clic en el botón "Actualizar Documento"', () => {
        cy.visit('http://localhost:5173/documento/1') 
        cy.get('#documentoNombre').clear().type('Documento Actualizado')
        cy.get('#documentoContenido').clear().type('Contenido actualizado del documento')
        cy.get('.btn-actualizar-documento').click()
        cy.url().should('eq', 'http://localhost:5173/')
    })
})