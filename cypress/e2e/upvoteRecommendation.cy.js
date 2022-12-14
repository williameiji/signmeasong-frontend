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
			"findRecommendationsUpvotes"
		);

		cy.intercept("POST", "/recommendations/*/upvote").as("upvote");
		cy.get('[data-cy="upvote"]').click();
		cy.wait("@upvote").its("response.statusCode").should("eq", 200);

		cy.wait("@findRecommendationsUpvotes");

		cy.get('[data-cy="urlname"]').should("contain.text", recommendation.name);
		cy.get('[data-cy="counter"]').should("contain.text", "1");
	});
});
