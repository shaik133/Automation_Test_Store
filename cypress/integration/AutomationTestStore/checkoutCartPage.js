/// <reference types="cypress"/>
import "../../support/commands";
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

            });
    });

    it("Click on the cart button on homepage", function () {
        cy.get(".nav.topcart.pull-left").click()
    });

    it.skip("Apply invalid coupon code", () => {
        cy.get("#coupon_coupon").type('Coupon')

        cy.get("#apply_coupon_btn").click()

        cy.get("div[class*='alert-danger'] strong").then(function (errorText) {
            expect(errorText).includes("Error: Coupon is either invalid")
        })
    })

    it("Estimate shipping charges & Taxes", () => {
        cy.Select("#estimate_country", form.country)
        cy.Select("#estimate_country_zones", form.state)
        cy.get("#estimate_postcode").clear().type(form.Postal)
        // cy.get("button[value='estimate']").click()
        cy.get("#shippings option").then(function (text) {
            let shippingText = text.text();
            expect(shippingText).includes("Flat Shipping Rate - $2.00")
        })
    })

    it("calculating the total shipping charges", () => {
        let sum = 0;
        cy.get("#totals_table tbody tr td span[class='bold ']").each(($ele, index, $list) => {
            let price = $ele.text();
            let cleanPrice = price.split('$')[1]
            let trimmedPrice = cleanPrice.trim();
            sum += Number(trimmedPrice)
        }).then(function () {
            cy.log(sum)
        })

        cy.get("#totals_table tbody tr td span[class='bold totalamout']").then(function (text) {
            let Price = text.text().split('$')[1]
            let totalPrice = Number(Price)
            expect(totalPrice).to.eq(sum)
        })
        cy.get("#cart_checkout2").click()
        cy.url().should('include', 'login')
    })


});
