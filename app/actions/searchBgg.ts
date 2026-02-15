"use server";

import { executeGraphql } from "@/api/executeGraphql";
import { SearchBggGamesDocument } from "@/gql/graphql";

export async function searchBgg(query: string) {
    if (!query || query.length < 3) return [];
    try {
        const data = await executeGraphql(SearchBggGamesDocument, { query });
        return data.searchBggGames;
    } catch (error) {
        console.error("Search BGG failed:", error);
        return [];
    }
}
