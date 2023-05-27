describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);

    // Create a user to backend
    const user = {
      name: "yiyimeow",
      username: "yiyi",
      password: "yiyi",
    };

    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("Login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("Login").click();
      cy.get("#username").type("yiyi");
      cy.get("#password").type("yiyi");
      cy.get("#login-button").click();

      cy.contains("yiyi logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("Login").click();
      cy.get("#username").type("notyiyi");
      cy.get("#password").type("notyiyi");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.contains("yiyi logged in").should("not.exist");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "yiyi", password: "yiyi" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();

      cy.get("#title").type("a title");
      cy.get("#author").type("an mystery author");
      cy.get("#url").type("mystery.com");

      cy.get("#create-button").click();

      cy.contains("a title an mystery author");
    });

    describe("blogs", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "title 1",
          author: "author 1",
          url: "1.com",
        });

        cy.createBlog({
          title: "title 2",
          author: "author 2",
          url: "2.com",
        });

        cy.createBlog({
          title: "title 3",
          author: "author 3",
          url: "3.com",
        });
      });

      it("users can like a blog", function () {
        cy.contains("title 1 author 1")
          .parent()
          .contains("view")
          .as("targetButton");

        cy.get("@targetButton").click();
        cy.get("#like-button").click();

        cy.contains("likes 1");
      });

      it("owner can delete blog", function () {
        cy.contains("title 1 author 1").parent().contains("view").click();

        cy.get("#remove-button").click();

        cy.visit("");

        cy.contains("remove").should("not.exist");
      });

      it("non owner do not see delete button", function () {
        // Create a new user
        const user = {
          name: "non_owner",
          username: "non_owner",
          password: "non_owner",
        };

        cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);

        cy.login({
          username: "non_owner",
          password: "non_owner",
        });

        cy.contains("title 1 author 1").parent().contains("view").click();

        cy.contains("remove").should("not.exist");
      });

      it("blogs are arranged according to likes", function () {
        // First Blog Likes - 8 (Second)
        cy.get(".blog")
          .eq(0)
          .should("contain", "title 1 author 1")
          .contains("view")
          .click();

        cy.get(".blog")
          .eq(0)
          .contains("like")
          .then(async (button) => {
            for (let i = 0; i < 5; i++) {
              await cy.wrap(button).click();
            }
          });

        // Second Blog Likes - 2 (Third)
        cy.get(".blog")
          .eq(1)
          .should("contain", "title 2 author 2")
          .contains("view")
          .click();

        cy.get(".blog")
          .eq(1)
          .contains("like")
          .then(async (button) => {
            for (let i = 0; i < 2; i++) {
              await cy.wrap(button).click();
            }
          });

        // Third Blog Likes - 15 (First)
        cy.get(".blog")
          .eq(2)
          .should("contain", "title 3 author 3")
          .contains("view")
          .click();

        cy.get(".blog")
          .eq(2)
          .contains("like")
          .then(async (button) => {
            for (let i = 0; i < 15; i++) {
              await cy.wrap(button).click();
            }
          });

        cy.visit("");

        cy.get(".blog").eq(0).should("contain", "title 3 author 3");

        cy.get(".blog").eq(1).should("contain", "title 1 author 1");

        cy.get(".blog").eq(2).should("contain", "title 2 author 2");
      });
    });
  });
});
