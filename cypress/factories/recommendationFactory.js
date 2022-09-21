import { faker } from "@faker-js/faker";

export async function recommendationFactory() {
	return {
		name: faker.lorem.words(3),
		youtubeLink: "https://www.youtube.com/watch?v=PPqC0Hd9D7U&t=1872s",
	};
}
