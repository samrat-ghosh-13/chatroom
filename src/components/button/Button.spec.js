// importing mount from cypress react
import { mount } from "@cypress/react";

// component
import Button from "./Button";

describe("unit testing of button component", () => {
  it("renders button", () => {
    mount(<Button classname="unit__testing">Testing</Button>);
    cy.get(".button").should("exist");
    cy.get(".button__text").should("exist");
    cy.get(".button__text").contains("Testing");
  });

  it("renders disabled button", () => {
    mount(
      <Button classname="unit__testing" disabled={true}>
        Testing
      </Button>
    );
    cy.get(".button").should("exist");
    cy.get(".button__text").should("exist");
    cy.get(".button__text").contains("Testing");
  });

  it("renders data-testid of the button", () => {
    mount(<Button classname="unit__testing">Testing</Button>);
    cy.get(".button").should("exist");
    cy.get('[data-testid="button"]').should("exist");
    cy.get(".button__text").contains("Testing");
  });

  it("renders the button classnames, types, size", () => {
    mount(
      <Button
        classname="unit__testing"
        type="unit__testing--type"
        size="unit__testing--size"
        disabled={false}
      >
        Testing
      </Button>
    );
    cy.get(".button").should("exist");
    cy.get(".button__text").should("exist");
    cy.get(".button__text").contains("Testing");
  });

  it("renders the button clicks/callbacks", () => {
    const onClick = cy.stub().as("onClick");
    mount(
      <Button classname="unit__testing" handleClick={() => onClick()}>
        Testing
      </Button>
    );
    cy.get(".button").should("exist");
    cy.get(".button__text").should("exist");
    cy.get(".button").click();
    cy.get("@onClick").should("have.been.calledOnce");
  });
});
