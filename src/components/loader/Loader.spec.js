// importing mount from cypress react
import { mount } from "@cypress/react";

// component
import Loader from "./Loader";

describe("unit testing of loader component", () => {
  it("renders footer", () => {
    mount(<Loader />);
    cy.get(".loader").should("exist");
    cy.get(".loader__bounce").should("exist");
    cy.get(".loader__bounce__first").should("exist");
    cy.get(".loader__bounce__second").should("exist");
    cy.get(".loader__bounce__third").should("exist");
  });
});
