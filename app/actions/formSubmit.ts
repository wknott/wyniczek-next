"use server";

import { CreateResultInput, CreateScoreInput, CreateResultImageInput } from "@/gql/graphql";
import { createResultAction } from "@/app/actions/createResult";

const parseFormDataToCreateResultInput = (formData: FormData): CreateResultInput => {
	const players = formData.getAll("players[]");
	const gameId = formData.get("gameId") as string;
	const playingTime = formData.get("playingTime");
	const categories = formData.getAll("categories[]");
	const expansionIds = formData.getAll("expansionIds[]") as string[];
	const imagesJson = formData.get("images") as string | null;

	const scores: CreateScoreInput[] = players.map((playerId, index) => ({
		playerId: playerId as string,
		points: categories.map((category) => ({
			pointCategoryId: category as string,
			value: +formData.getAll(`category-${category}[]`)[index] || 0,
		})),
	}));

	let images: CreateResultImageInput[] | undefined;
	if (imagesJson) {
		const parsed = JSON.parse(imagesJson) as Array<{ url: string; key: string }>;
		if (parsed.length > 0) {
			images = parsed.map((img, order) => ({ url: img.url, key: img.key, order }));
		}
	}

	return {
		gameId,
		playingTime: Number(playingTime),
		scores,
		userId: "1234",
		expansionIds: expansionIds.length > 0 ? expansionIds : undefined,
		images,
	};
};

export async function createResult(formData: FormData) {
	return await createResultAction(parseFormDataToCreateResultInput(formData));
}
