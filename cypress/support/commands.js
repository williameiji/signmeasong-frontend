// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add("createRecommendation", (recommendation) => {
	cy.visit("http://localhost:3000");
	cy.get('[data-cy="name"]').type(recommendation.name);
	cy.get('[data-cy="url"]').type(recommendation.youtubeLink);

	cy.intercept("POST", "http://localhost:5000/recommendations").as("insert");
	cy.get('[data-cy="submit"]').click();
	cy.wait("@insert").its("response.statusCode").should("eq", 201);
});

Cypress.Commands.add("truncate", () => {
	cy.request("POST", "http://localhost:5000/e2e/cleardb", {});
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
