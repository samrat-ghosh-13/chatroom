// importing mount from cypress react
import { mount } from "@cypress/react";

// component
import Footer from "./Footer";

describe("unit testing of footer component", () => {
  it("renders footer", () => {
    mount(<Footer />);
    cy.get(".app__footer").should("exist");
    cy.get("[data-testid=app__footer]").should("exist");
    cy.get(".app__footer__contents").should("exist");
    cy.get("[data-testid=app__footer__contents]").should("exist");
    cy.get(".app__footer__contents").contains("Samrat Ghosh");
  });
});
