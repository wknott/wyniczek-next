"use server";

import { executeGraphql } from "@/api/executeGraphql";
import { GetGamesListDocument, GameSortBy } from "@/gql/graphql";

export async function getGamesPage(skip: number = 0, sortBy: GameSortBy = "ALPHABETICAL") {
    const { games } = await executeGraphql(GetGamesListDocument, {
        skip,
        take: 12,
        sortBy,
    });

    return games;
}
