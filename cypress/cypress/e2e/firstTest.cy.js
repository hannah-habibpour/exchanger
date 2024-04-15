describe("xchanger", () => {
  it("renders the default elements on the screen", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="mainpage-title"]')
      .should("exist")
      .should("have.text", "Xchanger");
  });

  it("renders the selected currency component title", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="select-currency"]').should("exist");
  });
});
