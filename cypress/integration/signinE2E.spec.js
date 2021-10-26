// End 2 End Test Cases
// run yarn cypress run to check the test cases in a headless browser instance
context("Message Board Sign in Web App E2E Testing", () => {
  beforeEach(() => {
    cy.visit("/signin");
  });

  describe("Message Board App Testing", () => {
    it("renders the default state of the application - without sign in", () => {
      // headers should exist
      cy.get(".app__header").should("exist");
      cy.get("[data-testid=app__header]").should("exist");
      cy.get(".app__header__contents").should("exist");
      cy.get(".app__header__contents__left").should("exist");
      cy.get(".app__header__contents__left__text").should("exist");
      cy.get(".app__header__contents__left__text").contains("Message Boards");

      // Sign in Button
      cy.get(".app__header__contents__right .cancel").should("exist");
      cy.get(".app__header__contents__right .cancel .button__text").should(
        "exist"
      );
      cy.get(".app__header__contents__right .cancel .button__text").contains(
        "Sign in"
      );

      // Register Button
      cy.get(".app__header__contents__right .check").should("exist");
      cy.get(".app__header__contents__right .check .button__text").should(
        "exist"
      );
      cy.get(".app__header__contents__right .check .button__text").contains(
        "Register"
      );

      cy.get(".signin").should("exist");
      cy.get(".signin__c").should("exist");
      cy.get(".signin__c__email").should("exist");
      cy.get(".signin__c__email__label").should("exist");
      cy.get(".signin__c__email__input").should("exist");
      cy.get(".signin__c__password").should("exist");
      cy.get(".signin__c__password__label").should("exist");
      cy.get(".signin__c__password__input").should("exist");
      cy.get(".signin__c__submit").should("exist");
      cy.get(".signin__c__submit").should("be.disabled");

      // text input
      cy.get(".signin__c__email__input").type("Hello, World");
      cy.get(".signin__c__password__input").type("Hello, World");

      cy.get(".signin__c__submit").should("not.be.disabled");

      // footers should exist
      cy.get(".app__footer").should("exist");
      cy.get("[data-testid=app__footer]").should("exist");
      cy.get(".app__footer__contents").should("exist");
      cy.get("[data-testid=app__footer__contents]").should("exist");
      cy.get(".app__footer__contents").contains("Samrat Ghosh");
    });
  });
});
