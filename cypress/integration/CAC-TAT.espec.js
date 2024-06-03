// CAC-TAT.espec.js created with Cypress


describe('Central de atendimento', function () {   //o describe define a suíte
    beforeEach(function() {  //antes de cada teste ele irá realizar os códigos que estão dentro dele
        cy.visit('./src/index.html')
      })
    it ('verifica o título da aplicação', function() {   //o it define o caso de teste
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it ('Preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'

        cy.get('#firstName').type('Maria Karoline')
        cy.get('#lastName').type("G. M dos Santos")
        cy.get('#email').type('teste@teste.com')
        cy.get('#open-text-area').type(longText, { delay: 0 }) //primeiro argumento é a variável, segundo argumento é a propriedade delay
        // cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click() //utilizando o .contains como um seletor, que está procurando um botão que tenha o texto Enviar

        cy.get('.success').should('be.visible') //verificação da mensagem de sucesso
    })

    it ('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Maria Karoline')
        cy.get('#lastName').type("G. M dos Santos")
        cy.get('#email').type('teste@teste,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible') //verificação da mensagem de erro

    })

    it ('Campo tefone continua vazio quando preenchido com valor não-numérico', function () {
        cy.get('#phone')
          .type('abcdefg')
          .should('have.value', '')
    })

    it ('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Maria Karoline')
        cy.get('#lastName').type("G. M dos Santos")
        cy.get('#email').type('teste@teste.com')
        cy.get('#phone-checkbox').check().should('be.checked')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible') //verificação da mensagem de erro

    })

    it ('Preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName') //pega o campo input
          .type('Maria Karoline') //digita o nome
          .should('have.value', 'Maria Karoline') //faz uma verificação se realmente não colocado o valor certo
          .clear() //limpa o campo
          .should('have.value', '') // faz uma verificação se o campo realmente foi limpo

        cy.get('#lastName')
          .type("G. M dos Santos")
          .should('have.value', 'G. M dos Santos')
          .clear()
          .should('have.value', '')

        cy.get('#phone')
          .type('11972654606')
          .should('have.value', '11972654606')
          .clear()
          .should('have.value', '')

        cy.get('#email')
          .type('teste@teste.com')
          .should('have.value', 'teste@teste.com')
          .clear()
          .should('have.value', '')

        cy.get('#phone-checkbox').click()

    })
it ('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible') 
})

it ('Envia o formuário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit() //puxando o support/commands.js preenche os campos obrigatórios e submete
    cy.get('.success').should('be.visible')

})

it ('Seleciona um produto (YouTube) por seu texto', function() {
  cy.get('#product') //elemento mapeado 
    .select('YouTube') //selecionar a opção YouTube pelo nome
    .should('have.value','youtube') //verificando se youtube foi selecionado, porém desta vez é pelo value
})

it ('Seleciona um produto (Mentoria) por seu valor (value)', function() {
  cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
})

it ('Seleciona um produto (Blog) por seu índice', function() {
  cy.get('#product')
    .select(1)
    .should('have.value', "blog")

})

it ('Marca o tipo de atendimento "Feedback"', function () {
  cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('have.value', 'feedback')

})

it ('Marca cada tipo de atendimento', function () {
  cy.get('input[type="radio"]') //pega todos os elementos do tipo radio
    .should('have.length', 3) //faz uma verificação que o tamanho 
    .each(function($radio) { //usa o each para passar por cada elemento e esse each tem uma função, a função faz ações para cada radio, é uma iteração
      cy.wrap($radio).check() //o wrap serve para empacotar o elemento
      cy.wrap($radio).should('be.checked')
    }) 
})

it ('marca ambos checkboxes, depois desmarca o último', function () {
  cy.get('input[type="checkbox"]') //pega os elementos do tipo Checkbox
    .check() //dá um check
    .should('be.checked') //faz a verificação se foi marcado
    .last() //pega o útimo checkbox
    .uncheck() //e desmarca 
    .should('not.be.checked') //faz a verificação se foi desmarcado
})

it ('Seleciona um arquivo da pasta fixtures', function () {
  cy.get('input[type="file"]') //pega o elemento do tipo arquivo
    .should('not.have.value') //foi encadeado o should para verificar se o campo está vazio
    .selectFile('./cypress/fixtures/example.json') //usa o comando selectfile para pegar o arquivo que quer fazer upload passando o caminho
    .should(function($input) { //o should recebe uma função de callback para verificar se o arquivo foi selecionado
      expect($input[0].files[0].name).to.equal('example.json') //arquivo com nome example.json que está no 1º arquivo do 1º input
    })
})

it ('seleciona um arquivo simulando um drag-and-drop', function () {
  cy.get('input[type="file"]') 
    .should('not.have.value') 
    .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' }) //o segundo argumento simula um arrasta e solta do arquivo
    .should(function($input) { 
      expect($input[0].files[0].name).to.equal('example.json') 
  })
})

it ('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
  cy.fixture('example.json').as('sampleFile') //pega o arquivo examplo da pasta Fixtures e dá uma apelido usando o as.
  cy.get('input[type="file"]') //pega o elemento normalmente
    .selectFile('@sampleFile') //seleciona o arquivo utilizando o alias, tem que usar o @ para o sistema verificar que é um alias
    .should(function($input) { //faz a verificação normalmente
      expect($input[0].files[0].name).to.equal('example.json') 
  })
    
})

it ('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
  cy.get('#privacy a').should('have.attr', 'target', '_blank') //pegando o elemento privacy e verificando se tem o atributo target com valor blank
})

it ('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
  cy.get('#privacy a')
    .invoke('removeAttr', 'target') //invocando o método remove para remover o target para que o cypress abra a página na msm aba e identifique essa aba
    .click()

  cy.contains('Talking About Testing').should('be.visible') //verificando que tem um elemento "Talking ..."  e se está visível
})



});