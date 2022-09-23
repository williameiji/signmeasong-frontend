import { recommendationFactory } from "../factories/recommendationFactory";

beforeEach(() => {
	cy.truncate();
	cy.createTop();
});

describe("Test /recommendations/top", () => {
	it("test if return a songs", async () => {
		cy.intercept("GET", "http://localhost:5000/recommendations/top/*").as(
			"top"
		);
		cy.visit("http://localhost:3000/top");

		cy.wait("@top").its("response.statusCode").should("eq", 200);
		cy.get('[data-cy="recommendation"]').should("have.length", 10);
	});
});
