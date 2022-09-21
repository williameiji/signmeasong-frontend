import { recommendationFactory } from "../factories/recommendationFactory";

beforeEach(() => {
	cy.truncate();
});

describe("Test /Get recommendations", () => {
	it("test get recommendations after posts", async () => {
		const recommendation = await recommendationFactory();

		cy.intercept("GET", "http://localhost:5000/recommendations").as(
			"findRecommendations"
		);
		cy.createRecommendation(recommendation);
		cy.wait("@findRecommendations")
			.its("response.statusCode")
			.should("eq", 200);
	});
});
