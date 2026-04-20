"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { executeGraphql } from "@/api/executeGraphql";
import {
    CreatePlayerDocument,
    GetPlayersDocument,
    GetPlayerByIdDocument,
} from "@/gql/graphql";

export async function createPlayer(formData: FormData) {
    const name = formData.get("name") as string;
    const userId = "1234";

    if (!name) return;

    await executeGraphql(CreatePlayerDocument, {
        input: {
            name,
            userId,
        },
    });

    revalidatePath("/");
    revalidatePath("/players");
    redirect("/players");
}

export async function getPlayers() {
    const { players } = await executeGraphql(GetPlayersDocument, {});
    return players;
}

export async function getPlayerById(id: string) {
    const { player } = await executeGraphql(GetPlayerByIdDocument, { id });
    return player;
}
