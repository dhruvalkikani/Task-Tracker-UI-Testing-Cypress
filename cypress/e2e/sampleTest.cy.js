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

describe('Login Test', () => {
  it('The username fields matches after login', () => {
    cy.visit('http://127.0.0.1:8080/task-tracker.html');

    cy.get('[data-cy="username-input"]').type('testuser');
    cy.get('[data-cy="password-input"]').type('password');
    cy.get('[data-cy="login-button"]').click();

    cy.get('[data-cy="username-input"]').should('have.value', 'testuser');

  });
});

describe('Task Section Visibility', () => {
  it('Shows task section content (empty state) after login', () => {
    cy.visit('http://127.0.0.1:8080/task-tracker.html');

    // Login
    cy.get('[data-cy="username-input"]').type('testuser');
    cy.get('[data-cy="password-input"]').type('password');
    cy.get('[data-cy="login-button"]').click();

    cy.get('[data-cy="empty-state"]').should('exist');
    cy.get('[data-cy="empty-state"]').should('contain', 'No tasks found');
  });
});


describe(' After a successful login, simulate adding a task and verify', ()=>{
  it('Adds task ',() => {
    cy.visit('http://127.0.0.1:8080/task-tracker.html');
    
    cy.get('[data-cy="username-input"]').type('DDD');
    cy.get('[data-cy="password-input"]').type('DDD');
    cy.get('[data-cy="login-button"]').click();

    cy.get('[data-cy="task-title-input"]')
      .type('Test Task')
      .should('have.value','Test Task');
    cy.get('[data-cy="task-description-input"]')
      .type('Test')
      .should('have.value','Test');
    cy.get('[data-cy="task-priority-select"]').select('Medium');
    cy.get('[data-cy="task-due-date-input"]')
      .type('2025-06-15')
      .should('have.value', '2025-06-15');
    cy.get('[data-cy="add-task-button"]').click();

    cy.get('[data-cy="notification"]').should("have.class", "show");
    cy.get('[data-cy="notification-message"]').should("contain","Task added successfully");
    cy.get('[data-cy="task-item"]').contains('Test Task');

  })
})

describe('Test Completed Task', () => {
  it ('should Mark a task as completed', () =>{
    cy.visit('http://127.0.0.1:8080/task-tracker.html');
    
    cy.get('[data-cy="username-input"]').type('DDD');
    cy.get('[data-cy="password-input"]').type('DDD');
    cy.get('[data-cy="login-button"]').click();

    cy.get('[data-cy="task-title-input"]')
      .type('Test Task')
      .should('have.value','Test Task');
    cy.get('[data-cy="task-description-input"]')
      .type('Test')
      .should('have.value','Test');
    cy.get('[data-cy="task-priority-select"]').select('Medium');
    cy.get('[data-cy="task-due-date-input"]')
      .type('2025-06-15')
      .should('have.value', '2025-06-15');
    cy.get('[data-cy="add-task-button"]').click();

    cy.get('[data-cy="toggle-task-button"]').click();
    cy.get('[data-cy="notification"]').should('have.class','show');
    cy.get('[data-cy="notification"]').should('contain','Task marked as completed!');
    cy.get('[data-cy="task-item"]').should('have.class','task-item completed');

  })



})