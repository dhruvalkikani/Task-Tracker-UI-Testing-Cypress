const validUser = { username: "DDD", password: "DDD" };
const testUser = { username: "testuser", password: "password" };

describe("Task Tracker App", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080/task-tracker.html");
  });

  describe("App Load Test", () => {
    it("Displays login title", () => {
      cy.contains("Login to Task Tracker").should("be.visible");
    });
  });

  describe("Login Form Input Tests", () => {
    it("Should type username and password", () => {
      cy.get('[data-cy="username-input"]').type("testuser").should("have.value", "testuser");
      cy.get('[data-cy="password-input"]').type("DDDD").should("have.value", "DDDD");
    });
  });

  describe("Login Tests", () => {
    it("Successful login shows notification", () => {
      cy.login(testUser.username, testUser.password);
    });

    describe("Invalid Login", () => {
      it("Empty username", () => {
        cy.get('[data-cy="login-button"]').click();
        cy.get('[data-cy="notification"]').should("not.have.class", "show");
      });

      it("Empty password", () => {
        cy.get('[data-cy="username-input"]').type("DDDD").should("have.value", "DDDD");
        cy.get('[data-cy="login-button"]').click();
        cy.get('[data-cy="notification"]').should("not.have.class", "show");
      });

      it("Invalid credentials show errors", () => {
        cy.get('[data-cy="username-input"]').type("DD").should("have.value", "DD");
        cy.get('[data-cy="password-input"]').type("DD").should("have.value", "DD");
        cy.get('[data-cy="login-button"]').click();

        cy.get('[data-cy="username-error"]').should("be.visible").and("contain", "Username must be at least 3 characters");
        cy.get('[data-cy="password-error"]').should("be.visible").and("contain", "Password must be at least 3 characters");
      });
    });
  });

  describe("Task Section Tests", () => {
    beforeEach(() => {
      cy.login(testUser.username, testUser.password);
    });

    it("Shows empty task state", () => {
      cy.get('[data-cy="empty-state"]').should("exist").and("contain", "No tasks found");
    });

    it("Adds a new task and displays it", () => {
      cy.addTask('Test Task','Test','Medium','2025-06-15');
    });

    it("Marks a task as completed", () => {

      cy.addTask('Test Task','Test','Medium','2025-06-15');

      cy.get('[data-cy="toggle-task-button"]').click();
      cy.get('[data-cy="notification"]').should("have.class", "show").and("contain", "Task marked as completed!");
      cy.get('[data-cy="task-item"]').should("have.class", "task-item completed");
    });

    it("Deletes a task after confirmation", () => {

      cy.addTask('Test Task','Test','Medium','2025-06-15');

      cy.on("window:confirm", (text) => {
        expect(text).to.equal("Are you sure you want to delete this task?");
        return true;
      });

      cy.get('[data-cy="delete-task-button"]').click();
      cy.get('[data-cy="notification"]').should("have.class", "show").and("contain", "Task deleted successfully!");
      cy.get('[data-cy="empty-state"]').should("be.visible");
    });

    it("Adds multiple tasks and checks order", () => {

      cy.addTask('Test Task 1','Test 1','Medium','2025-06-16');
      cy.addTask('Test Task 2','Test 2','Low','2025-06-17');
      cy.addTask('Test Task 3','Test 3','High','2025-06-15');

      cy.get('[data-cy="task-item"]').eq(0).should("contain", "Test Task 3");
      cy.get('[data-cy="task-item"]').eq(1).should("contain", "Test Task 2");
      cy.get('[data-cy="task-item"]').eq(2).should("contain", "Test Task 1");
    });
  });
});