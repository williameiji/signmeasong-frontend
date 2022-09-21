import { recommendationFactory } from "../factories/recommendationFactory";

beforeEach(() => {
	cy.truncate();
});

describe("Test post /recommendation/upvote", () => {
	it("test upvote on recommendation", async () => {
		const recommendation = await recommendationFactory();

		cy.visit("http://localhost:3000");
		cy.get('[data-cy="name"]').type(recommendation.name);
		cy.get('[data-cy="url"]').type(recommendation.youtubeLink);

		cy.intercept("GET", "http://localhost:5000/recommendations").as(
			"findRecommendations"
		);

		cy.intercept("POST", "http://localhost:5000/recommendations").as("insert");
		cy.get('[data-cy="submit"]').click();
		cy.wait("@insert").its("response.statusCode").should("eq", 201);

		cy.wait("@findRecommendations");

		cy.intercept("GET", "http://localhost:5000/recommendations").as(
			"findRecommendationsUpvotes"
		);

		cy.intercept("POST", "/recommendations/*/upvote").as("upvote");
		cy.get('[data-cy="upvote"]').click();
		cy.wait("@upvote").its("response.statusCode").should("eq", 200);

		cy.wait("@findRecommendationsUpvotes");

		cy.get('[data-cy="urlname"]').should("contain.text", recommendation.name);
		cy.get('[data-cy="counter"]').should("contain.text", 1);
	});
});
