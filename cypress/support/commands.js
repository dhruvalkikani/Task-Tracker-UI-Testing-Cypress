Cypress.Commands.add("login", (username = "DDD", password = "DDD") => {
  cy.visit("http://127.0.0.1:8080/task-tracker.html");
  cy.get('[data-cy="username-input"]').type(username);
  cy.get('[data-cy="password-input"]').type(password);
  cy.get('[data-cy="login-button"]').click();
  cy.get('[data-cy="notification"]').should("have.class", "show");
  cy.get('[data-cy="notification-message"]').should(
      "contain",
      "Login successful"
    );
});

Cypress.Commands.add("addTask",(title, desc, priority, date) =>{
  cy.get('[data-cy="task-title-input"]').type(title);
  cy.get('[data-cy="task-description-input"]').type(desc);
  cy.get('[data-cy="task-priority-select"]').select(priority);
  cy.get('[data-cy="task-due-date-input"]').type(date);
  cy.get('[data-cy="add-task-button"]').click();
  cy.get('[data-cy="notification"]').should("have.class", "show");
  cy.get('[data-cy="notification-message"]').should(
      "contain",
      "Task added successfully"
    );
  cy.get('[data-cy="task-title-input"]').should("have.value", "");
  cy.get('[data-cy="task-description-input"]').should("have.value", "");
  cy.get('[data-cy="task-item"]').contains("Test Task");
});