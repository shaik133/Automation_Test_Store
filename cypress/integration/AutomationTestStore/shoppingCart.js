/// <reference types="cypress"/>
import "../../support/commands";
describe("Automation-Test-Store", () => {
    let form;
    before(function () {
        cy.visit(Cypress.env("base_url") + "/index.php?rt=checkout/cart");
        cy.fixture("example.json")
            .then(function (data) {
                form = data;
            })
            .then(function () {
                cy.contains("Login or register").click();
                cy.LoginCredentials(form.login_name, form.password);
                cy.get("ul[class*='categorymenu'] li ")
                    .contains("Apparel & accessories")
                    .trigger("mouseover");
                cy.get("ul[class*='categorymenu'] li div a")
                    .contains("T-shirts")
                    .click({ force: true });
                cy.selectProducts(form.productName);
                cy.Select("select[id*='option']", "EU 2XL (Asia 5XL)  (6 In Stock)");
                cy.get("#product_quantity").clear().type(2);
                cy.get(".cart").click();
            });
    });

    it("Get the title of the page", function () {
        cy.title().should("include", "Shopping Cart");
    });

    it("validate the shopping cart", () => {
        cy.get(".align_left a").should(
            "contain",
            "Product with options and stock locations"
        );
        cy.get(".align_left div").should("contain", "Size EU EU 2XL (Asia 5XL)");
        cy.get(".table-bordered tbody td.align_right")
            .first()
            .should("contain", 21);
        // cy.get(".table-bordered tbody td.align_right").next().first().should('contain', 2)
        cy.get("input[id*='cart_quantity']").should("have.value", 2);
        cy.get(".table-bordered tbody td.align_right").last().should("contain", 42);
    });

});
