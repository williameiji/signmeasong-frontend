import { scryRenderedComponentsWithType } from "react-dom/test-utils";
import { recommendationFactory } from "../factories/recommendationFactory";

beforeEach(() => {
	cy.truncate();
});

describe("Test new recommendation", () => {
	it("test add new recommendation with valid params", async () => {
		const recommendation = await recommendationFactory();

		cy.visit("http://localhost:3000");
		cy.get('[data-cy="name"]').type(recommendation.name);
		cy.get('[data-cy="url"]').type(recommendation.youtubeLink);

		cy.intercept("POST", "http://localhost:5000/recommendations").as("insert");
		cy.get('[data-cy="submit"]').click();
		cy.wait("@insert");

		cy.get("[data-cy=urlname]").should("contain.text", recommendation.name);
	});
});
