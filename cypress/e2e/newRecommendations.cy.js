import { recommendationFactory } from "../factories/recommendationFactory";

beforeEach(() => {
	cy.truncate();
});

describe("Test post /recommendation/", () => {
	it("test add new recommendation with valid params", async () => {
		const recommendation = await recommendationFactory();

		cy.createRecommendation(recommendation);

		cy.get("[data-cy=urlname]").should("contain.text", recommendation.name);
	});
});
