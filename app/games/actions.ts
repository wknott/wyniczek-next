"use server";

import { executeGraphql } from "@/api/executeGraphql";
import { GetGamesListDocument, GameSortBy, UpdateGameCollectionStatusDocument, SyncGameWithBggDocument, GetGameByIdDocument } from "@/gql/graphql";
import { revalidatePath } from "next/cache";

export async function getGamesPage(
    skip: number = 0,
    sortBy: GameSortBy = "ALPHABETICAL",
    includeNotInCollection: boolean = false,
) {
    const { games } = await executeGraphql(GetGamesListDocument, {
        skip,
        take: 12,
        sortBy,
        includeNotInCollection,
    });

    return games;
}

export async function getGameById(id: string) {
    const { game } = await executeGraphql(GetGameByIdDocument, { id });
    return game;
}

export async function updateGameCollectionStatus(id: string, inCollection: boolean) {
    await executeGraphql(UpdateGameCollectionStatusDocument, {
        id,
        inCollection,
    });
    revalidatePath(`/games/${id}`);
    revalidatePath("/games");
    revalidatePath("/");
}

export async function syncGameWithBgg(id: string) {
    await executeGraphql(SyncGameWithBggDocument, { id });
    revalidatePath(`/games/${id}`);
    revalidatePath("/games");
    revalidatePath("/");
}
