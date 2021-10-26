// redux
import { Provider } from "react-redux";
import { store } from "../../store/store";

// importing mount from cypress react
import { mount } from "@cypress/react";

// component
import Content from "./Content";

describe("unit testing of content component", () => {
  it("renders content", () => {
    mount(
      <Provider store={store}>
        <Content />
      </Provider>
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
  });
});
