describe("App Load Test", () => {
  it("Checks if the home page loads", () => {
    cy.visit("http://127.0.0.1:8080/task-tracker.html");
    cy.contains("Login to Task Tracker");
  });
});

describe("Input Test", () => {
  it("Should type username and password", () => {
    cy.visit("http://127.0.0.1:8080/task-tracker.html");

    cy.get('[data-cy="username-input"]')
      .type("testuser")
      .should("have.value", "testuser");

    cy.get('[data-cy="password-input"]')
      .type("DDDD")
      .should("have.value", "DDDD");
  });
});

describe("Login Test", () => {
  it("Successful login", () => {
    cy.visit("http://127.0.0.1:8080/task-tracker.html");

    cy.get('[data-cy="username-input"]')
      .type("testuser")
      .should("have.value", "testuser");

    cy.get('[data-cy="password-input"]')
      .type("DDDD")
      .should("have.value", "DDDD");

    cy.get('[data-cy="login-button"]').click();

    cy.get('[data-cy="notification"]').should("have.class", "show");
    cy.get('[data-cy="notification-message"]').should(
      "contain",
      "Login successful"
    );
  });
});

describe("Incorrect and empty creds", () => {
  it("Checks Empty Username", () => {
    cy.visit("http://127.0.0.1:8080/task-tracker.html");
    cy.get('[data-cy="login-button"]').click();
    cy.get('[data-cy="notification"]').should("not.have.class", "show");
  });

  it("Checks Empty Password", () => {
    cy.visit("http://127.0.0.1:8080/task-tracker.html");
    cy.get('[data-cy="username-input"]')
      .type("DDDD")
      .should("have.value", "DDDD");
    cy.get('[data-cy="login-button"]').click();
    cy.get('[data-cy="notification"]').should("not.have.class", "show");
  });

  it("Checks Wrong Creds", () => {
    cy.visit("http://127.0.0.1:8080/task-tracker.html");
    cy.get('[data-cy="username-input"]').type("DD").should("have.value", "DD");
    cy.get('[data-cy="password-input"]').type("DD").should("have.value", "DD");

    cy.get('[data-cy="login-button"]').click();

    cy.get('[data-cy="username-error"]').should("be.visible");
    cy.get('[data-cy="username-error"]').should(
      "contain",
      "Username must be at least 3 characters"
    );

    cy.get('[data-cy="password-error"]').should("be.visible");
    cy.get('[data-cy="password-error"]').should(
      "contain",
      "Password must be at least 3 characters"
    );
  });
});
