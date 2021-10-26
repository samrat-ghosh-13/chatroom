// importing mount from cypress react
import { mount } from "@cypress/react";

// component
import Modal from "./Modal";

describe("unit testing of modal component", () => {
  it("renders modal", () => {
    mount(
      <Modal>
        <h1>Hello World</h1>
      </Modal>
    );
    cy.get(".modal").should("exist");
    cy.get(".modal__contents").should("exist");
    cy.get(".modal__contents h1").should("exist");
    cy.get(".modal__contents h1").contains("Hello World");
  });

  it("renders modal callbacks", () => {
    const handleModalOutsideClick = cy.spy();
    mount(
      <Modal open={true} handleClick={() => handleModalOutsideClick()}>
        <h1>Hello World</h1>
      </Modal>
    );
    cy.get(".modal")
      .click("topRight")
      .then(() => handleModalOutsideClick());
  });
});
