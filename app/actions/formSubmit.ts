"use server";

import { CreateResultInput, CreateScoreInput } from "@/gql/graphql";
import { createResultAction } from "@/app/actions/createResult";

const parseFormDataToCreateResultInput = (formData: FormData): CreateResultInput => {
	const players = formData.getAll("players[]");
	const gameId = formData.get("gameId") as string;
	const playingTime = formData.get("playingTime");
	const categories = formData.getAll("categories[]");

	const scores: CreateScoreInput[] = players.map((playerId, index) => ({
		playerId: playerId as string,
		points: categories.map((category) => ({
			pointCategoryId: category as string,
			value: +formData.getAll(`category-${category}[]`)[index] || 0,
		})),
	}));

	return {
		gameId,
		playingTime: Number(playingTime),
		scores,
		userId: "1234",
	};
};

export async function createResult(formData: FormData) {
	return await createResultAction(parseFormDataToCreateResultInput(formData));
	// mutate data
	// revalidate the cache
}
