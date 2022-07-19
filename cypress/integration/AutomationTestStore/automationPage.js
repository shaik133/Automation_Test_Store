/// <reference types="cypress"/>
import '../../support/commands'
describe("Automation-Test-Store",()=>{
    let form;
    before(function(){
        cy.visit("https://automationteststore.com/")
        cy.fixture('example.json').then(function(data){
            form=data
        })
       
        })

it("Title of the page",()=>{
    cy.title().then(function(title){
     const titleOfthePage = title
     expect(title).to.eq("A place to practice your automation skills!");
    // cy.title().should('eq','A place to practice your automation skills!')
    })
})
it("click on the register button",()=>{
    cy.contains("Login or register").click()
    cy.url().should('contain','login')
    cy.get("button[title='Continue']").click();
    cy.url().should('contain','create')
})

it("Fill Register form",()=>{
    cy.contains("Login or register").click()
    cy.get("button[title='Continue']").click();
    cy.fillForm("Shaik","Sadiq","shaikjafarsadq786@gmail.com","Davangere","Davangere",'India','Karnataka',"577006",
    "AutomationTest","AutomationTest@8009","AutomationTest@8009")
cy.get('#AccountFrm').find('p').then(function(data){
    cy.log(data.text())
    expect(data.text()).to.include("If you already have an account with us, please login at the ")
    cy.get("div[class*='alert-danger']")
    .should('contain','Error: E-Mail Address is already registered!')
    
})
})
it("loginlClick",function(){
    cy.contains("Login or register").click()
    cy.LoginCredentials(form.login_name,form.password)
    cy.url().should('include','account')
})



})