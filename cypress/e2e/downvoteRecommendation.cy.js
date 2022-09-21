import { recommendationFactory } from "../factories/recommendationFactory";

beforeEach(() => {
	cy.truncate();
});

describe("Test post /recommendation/upvote", () => {
	it("test upvote on recommendation", async () => {
		const recommendation = await recommendationFactory();

		cy.intercept("GET", "http://localhost:5000/recommendations").as(
			"findRecommendations"
		);

		cy.createRecommendation(recommendation);

		cy.wait("@findRecommendations");

		cy.intercept("GET", "http://localhost:5000/recommendations").as(
			"findRecommendationsDownvotes"
		);

		cy.intercept("POST", "/recommendations/*/downvote").as("downvote");
		cy.get('[data-cy="downvote"]').click();
		cy.wait("@downvote").its("response.statusCode").should("eq", 200);

		cy.wait("@findRecommendationsDownvotes");

		cy.get('[data-cy="urlname"]').should("contain.text", recommendation.name);
		cy.get('[data-cy="counter"]').should("contain.text", "-1");
	});
});
