// End 2 End Test Cases
// run yarn cypress run to check the test cases in a headless browser instance
context("Message Board Dashboard Web App E2E Testing", () => {
  beforeEach(() => {
    cy.visit("/");
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

      // Add Thread Button
      cy.get(".app__content .check").should("exist");
      cy.get(".app__content .check .button__text").should("exist");
      cy.get(".app__content .check .button__text").contains("Add Thread");

      // Loader
      cy.get(".loader").should("exist");
      cy.get(".loader__bounce").should("exist");
      cy.get(".loader__bounce__first").should("exist");
      cy.get(".loader__bounce__second").should("exist");
      cy.get(".loader__bounce__third").should("exist");

      // message boards
      cy.get(".app__content__message").should("exist");
      cy.get(".app__content__message__boards").should("exist");
      cy.get(".app__content__message__boards__buttons-c").should("exist");
      cy.get(".app__content__message__boards__buttons-c__reply-button").should(
        "exist"
      );
      cy.get(".app__content__message__boards__buttons-c__comments").should(
        "exist"
      );
      cy.get(".app__content__message__boards__buttons-c__edit-button").should(
        "exist"
      );
      cy.get(".app__content__message__boards__buttons-c__delete-button").should(
        "exist"
      );

      // footers should exist
      cy.get(".app__footer").should("exist");
      cy.get("[data-testid=app__footer]").should("exist");
      cy.get(".app__footer__contents").should("exist");
      cy.get("[data-testid=app__footer__contents]").should("exist");
      cy.get(".app__footer__contents").contains("Samrat Ghosh");
    });
  });
});
