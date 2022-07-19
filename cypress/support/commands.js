// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//select command
Cypress.Commands.add("Select",function($element, value){
    cy.get($element).select(value)
})

//AutomationTestStore-RegisterForm
Cypress.Commands.add("fillForm",function(fn,ln,email,addrs,city,country,state,postal,login_name,pwd,cpwd){
    cy.get("#AccountFrm_firstname").type(fn);
    cy.get("#AccountFrm_lastname").type(ln);
    cy.get("#AccountFrm_email").type(email);
    cy.get("#AccountFrm_address_1").type(addrs);
    cy.get("#AccountFrm_city").type(city);
    cy.get('#AccountFrm_country_id').select(country);
    cy.get('#AccountFrm_zone_id').select(state)
    cy.get('#AccountFrm_postcode').type(postal);
    
    cy.get("#AccountFrm_loginname").type(login_name);
    cy.get("#AccountFrm_password").type(pwd);
    cy.get("#AccountFrm_confirm").type(cpwd);
    cy.get("#AccountFrm_newsletter0").check().should('be.checked').and('have.value',0)
    cy.get("#AccountFrm_agree").check().should('be.checked').and('have.value',1)
    cy.get("button[title='Continue']").click()
})

Cypress.Commands.add("LoginCredentials",function(Email,password){
    cy.get("#loginFrm_loginname").type(Email)
    cy.get("#loginFrm_password").type(password)
    cy.get("button[title='Login']").click();
})

Cypress.Commands.add("selectProducts",function(product){
    cy.get(".fixed .prdocutname").each(($ele,index,$list)=>{
        if($ele.text().includes(product)){
            cy.get(".jumbotron .productcart").eq(index-1).click();
        }
    })
})
