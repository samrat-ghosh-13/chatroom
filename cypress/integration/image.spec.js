// End 2 End Test Cases
// run yarn cypress run to check the test cases in a headless browser instance
context("Image Web App E2E Testing", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Image Web App Testing", () => {
    it("renders the default state of the application", () => {
      // headers should exist
      cy.get(".app__header").should("exist");
      cy.get("[data-testid=app__header]").should("exist");
      cy.get(".app__header__contents").should("exist");
      cy.get(".app__header__contents__left").should("exist");
      cy.get(".app__header__contents__left__text").should("exist");
      cy.get(".app__header__contents__left__text").contains(
        "Image Approval Application"
      );

      // placeholders should exist
      cy.get(".app__content").should("exist");
      cy.get(".app__content__approved-images-text").should("exist");
      cy.get(".app__content__approved-images-text").contains("Approved Images");
      cy.get(".app__content__placeholder").should("exist");
      cy.get(".app__content__message").contains(
        "Click on the in order to get image recommendations from Unsplash"
      );
      cy.get(".app__content__message__icon").should("exist");

      // footers should exist
      cy.get(".app__footer").should("exist");
      cy.get("[data-testid=app__footer]").should("exist");
      cy.get(".app__footer__contents").should("exist");
      cy.get("[data-testid=app__footer__contents]").should("exist");
      cy.get(".app__footer__contents").contains("Samrat Ghosh");
    });

    it("renders the new image on click of placeholder, approve, reject button", () => {
      // headers should exist
      cy.get(".app__header").should("exist");
      cy.get("[data-testid=app__header]").should("exist");
      cy.get(".app__header__contents").should("exist");
      cy.get(".app__header__contents__left").should("exist");
      cy.get(".app__header__contents__left__text").should("exist");
      cy.get(".app__header__contents__left__text").contains(
        "Image Approval Application"
      );

      // placeholders should exist
      cy.get(".app__content").should("exist");
      cy.get(".app__content__approved-images-text").should("exist");
      cy.get(".app__content__approved-images-text").contains("Approved Images");
      cy.get(".app__content__placeholder").should("exist");
      cy.get(".app__content__message").contains(
        "Click on the in order to get image recommendations from Unsplash"
      );
      cy.get(".app__content__message__icon").should("exist");

      // click of placeholder
      cy.get(".app__content__placeholder--default").click();
      cy.wait(500);

      // click of approve button
      cy.get(".app__content__buttons-c__button__icon--approve").click();
      cy.wait(500);

      // click of reject button
      cy.get(".app__content__buttons-c__button__icon--cancel").click();
      cy.wait(500);

      // check for loader
      cy.get(".loader").should("exist");
      cy.get(".loader__bounce").should("exist");
      cy.get(".loader__bounce__first").should("exist");
      cy.get(".loader__bounce__second").should("exist");
      cy.get(".loader__bounce__third").should("exist");

      // footers should exist
      cy.get(".app__footer").should("exist");
      cy.get("[data-testid=app__footer]").should("exist");
      cy.get(".app__footer__contents").should("exist");
      cy.get("[data-testid=app__footer__contents]").should("exist");
      cy.get(".app__footer__contents").contains("Samrat Ghosh");
    });
  });
});
