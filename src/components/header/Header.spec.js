// redux
import { Provider } from "react-redux";
import { store } from "../../store/store";

// importing mount from cypress react
import { mount } from "@cypress/react";

// component
import Header from "./Header";

describe("unit testing of header component", () => {
  it("renders header", () => {
    mount(
      <Provider store={store}>
        <Header />
      </Provider>
    );
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
  });
});
