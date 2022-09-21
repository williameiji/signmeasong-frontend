import { recommendationFactory } from "../factories/recommendationFactory";

beforeEach(() => {
	cy.truncate();
});

describe("Test /recommendations/random", () => {
	it("test if return a song", async () => {
		const recommendation = await recommendationFactory();

		cy.createRecommendation(recommendation);

		cy.intercept("GET", "http://localhost:5000/recommendations/random").as(
			"random"
		);
		cy.visit("http://localhost:3000/random");
		cy.wait("@random").its("response.statusCode").should("eq", 200);
	});
});
