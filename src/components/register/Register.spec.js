// redux
import { Provider } from "react-redux";
import { store } from "../../store/store";

// importing mount from cypress react
import { mount } from "@cypress/react";

// component
import Register from "./Register";

describe("unit testing of signin component", () => {
  it("renders signin", () => {
    mount(
      <Provider store={store}>
        <Register />
      </Provider>
    );
    cy.get(".register").should("exist");
    cy.get(".register__c").should("exist");
    cy.get(".register__c__name").should("exist");
    cy.get(".register__c__name__label").should("exist");
    cy.get(".register__c__name__input").should("exist");
    cy.get(".register__c__email").should("exist");
    cy.get(".register__c__email__label").should("exist");
    cy.get(".register__c__email__input").should("exist");
    cy.get(".register__c__password").should("exist");
    cy.get(".register__c__password__label").should("exist");
    cy.get(".register__c__password__input").should("exist");
    cy.get(".register__c__submit").should("exist");
    cy.get(".register__c__submit").should("be.disabled");

    // text input
    cy.get(".register__c__name__input").type("Hello, World");
    cy.get(".register__c__email__input").type("Hello, World");
    cy.get(".register__c__password__input").type("Hello, World");

    cy.get(".register__c__submit").should("not.be.disabled");
  });
});
