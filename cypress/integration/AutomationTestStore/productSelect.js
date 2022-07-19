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


it("loginlClick",function(){
    cy.contains("Login or register").click()
    cy.LoginCredentials(form.login_name,form.password)
    cy.url().should('include','account')
    cy.get("ul[class*='categorymenu'] li ").contains("Apparel & accessories").trigger('mouseover')
    cy.get("ul[class*='categorymenu'] li div[class='subcategories'] img").invoke("removeAttr",'style', 'display: none')
    cy.get("ul[class*='categorymenu'] li div a").contains('T-shirts').click({force: true})

})

it("Add products to cart",function(){
    cy.selectProducts(form.productName)
    cy.url().should('include','product_id')
    

})
it("selectSize and checkout",()=>{
    cy.Select("select[id*='option']","EU 2XL (Asia 5XL)  (6 In Stock)");
    cy.get("select[id*='option']").should('have.value',780)
    cy.get("#product_quantity").clear().type(2)
    cy.get(".cart").click()
    cy.url().should('contain','checkout')
})
})