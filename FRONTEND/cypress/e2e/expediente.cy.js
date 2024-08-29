describe('Expediente', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/#/expediente') //
    })

    it('debería mostrar una lista de expedientes', () => {
        cy.get('h1').should('contain', 'Expedientes')
        cy.get('select').should('have.length', 1)
        cy.get('option').should('have.length.gt', 0)
    })

    it('debería seleccionar un expediente y mostrar sus documentos', () => {
        cy.get('select').select('Expediente de Finanzas', { force: true }) //  nombre del expediente 
        cy.get('.document-container').should('be.visible')
        cy.get('.document-container select').should('have.length', 1)
        cy.get('.document-container option').should('have.length.gt', 0)
    })

    it('debería seleccionar un documento y realizar acciones', () => {
        cy.get('select').select('Expediente de Finanzas', { force: true }) // nombre del expediente 
        
             // Verificar la presencia del select y las opciones
             cy.get('.document-container select').should('be.visible').then(($select) => {
                cy.wrap($select).find('option').should('have.length.gt', 0)
                cy.wrap($select).find('option').each(($option) => {
                    cy.log($option.text())
                })
            })

            
        cy.get('.document-container select').select('Informe Financiero Q1', { force: true }) //  título del documento 
        cy.get('.action-buttons').should('be.visible')
        
        cy.wait(1000)

        
        cy.get('.action-buttons button').should('have.length', 3)

        cy.wait(1000)

           // Verificar que los botones de acción se habilitan
           cy.get('.action-buttons').should('be.visible').then(() => {
            cy.log('Botones de acción visibles')
        })
        cy.get('.action-buttons button').should('have.length', 3)


         // Probar el botón de editar
         cy.log('Verificando botón Editar')
         cy.get('.action-buttons button').contains('Editar').should('be.visible').click({ force: true })
         cy.url().should('include', 'http://localhost:5173/#/documento/1')
 
         // Volver a la página de expediente
         cy.visit('http://localhost:5173/#/expediente')
         cy.get('select').select('Expediente de Finanzas', { force: true })
         cy.get('.document-container select').select('Informe Financiero Q1', { force: true })
 
         // Probar el botón de eliminar
         cy.log('Verificando botón Eliminar')
         cy.get('.action-buttons button').contains('Eliminar').should('be.visible').click({ force: true })
 
         // Probar el botón de ver detalles
         cy.log('Verificando botón Ver Detalle')
         cy.get('.action-buttons button').contains('Ver Detalle').should('be.visible').click({ force: true })
         cy.get('.modal').should('be.visible')
         cy.get('.modal-content').should('contain', 'Detalles del Documento')

         // Probar el botón de eliminar
         cy.log('Verificando botón Eliminar')
         cy.get('.action-buttons button').contains('Eliminar').should('be.visible').click({ force: true })
       
    })
})