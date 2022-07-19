/// <reference types="cypress"/>
import '../../support/commands'
describe("Automation-Test-Store", () => {
    let form;
    before(function () {
        cy.visit(Cypress.env("base_url") + "/index.php?rt=checkout/cart");
        cy.clearCookies();
        cy.fixture("example.json")
            .then(function (data) {
                form = data;
            })
            .then(function () {
                cy.contains("Login or register").click();
                cy.LoginCredentials(form.login_name, form.password);
                cy.get(".nav.topcart.pull-left").click()
                cy.get("#cart_checkout2").click()

            });
    });


    it("shipping details", function () {

        cy.get(".table.confirm_shippment_options td[class='align_left']").first().should('contain', 'Shaik Sadiq')
        cy.get(".table.confirm_shippment_options td[class='align_left'] address").should('contain', 'Davangere')
        cy.get(".table.confirm_shippment_options td[class='align_left']").last().should('have.text', 'Flat Shipping Rate')
    })

    it("Payment Details", () => {
        cy.get(".table.confirm_payment_options td[class='align_left']").first().should('contain', 'Shaik Sadiq')
        cy.get(".table.confirm_payment_options td[class='align_left'] address").should('contain', 'Davangere')
        cy.get(".table.confirm_payment_options td[class='align_left']").last().should('have.text', 'Cash On Delivery')
    })
    it("Item and size in the cart", () => {
        cy.get("a[class='checkout_heading']").should('contain', 'stock locations')
        cy.get("table[class*='confirm_products'] small").should('contain', 'Size EU EU')
        cy.get("#checkout_btn").click()
        cy.url().should('include', 'home')
    })

})