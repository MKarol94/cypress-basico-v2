Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() { //preenche os campos obrigatórios e submete
    cy.get('#firstName').type('Maria Karoline')
    cy.get('#lastName').type("G. M dos Santos")
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
// isso é um comando customizado
//o primeiro argumento é o nome do comando customizado e o segundo argumento é a função que irá executar o comando
}) 