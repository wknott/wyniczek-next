"use server";

import { executeGraphql } from "@/api/executeGraphql";
import {
    GetGamesListDocument,
    GameSortBy,
    UpdateGameCollectionStatusDocument,
    SyncGameWithBggDocument,
    GetGameByIdDocument,
    UpdateGameCategoriesDocument,
    CreateExpansionDocument,
    UpdateExpansionDocument,
    DeleteExpansionDocument,
    UpdateGameManualUrlDocument,
} from "@/gql/graphql";
import { revalidatePath } from "next/cache";

export async function getGamesPage(
    sortBy: GameSortBy = "ALPHABETICAL",
    skip: number = 0,
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

export async function updateGameCategories(
    id: string,
    categories: { id?: string | null; name: string; order: number }[],
) {
    await executeGraphql(UpdateGameCategoriesDocument, { id, categories });
    revalidatePath(`/games/${id}`);
}

export async function createExpansion(
    gameId: string,
    name: string,
    pointCategoryNames?: string[],
) {
    const { createExpansion } = await executeGraphql(CreateExpansionDocument, {
        input: { gameId, name, pointCategoryNames },
    });
    revalidatePath(`/games/${gameId}`);
    return createExpansion;
}

export async function updateExpansion(
    gameId: string,
    id: string,
    name?: string,
    categories?: { id?: string | null; name: string; order: number }[],
) {
    await executeGraphql(UpdateExpansionDocument, {
        input: { id, name, categories },
    });
    revalidatePath(`/games/${gameId}`);
}

export async function deleteExpansion(gameId: string, id: string) {
    await executeGraphql(DeleteExpansionDocument, { id });
    revalidatePath(`/games/${gameId}`);
}

export async function updateGameManualUrl(gameId: string, url: string | null) {
    await executeGraphql(UpdateGameManualUrlDocument, { id: gameId, url });
    revalidatePath(`/games/${gameId}`);
}
