"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { executeGraphql } from "@/api/executeGraphql";
import { CreateGameDocument } from "@/gql/graphql";

export async function createGame(formData: FormData) {
    const name = formData.get("name") as string;
    const bggIdStr = formData.get("bggId") as string;
    const categories = formData.getAll("categories") as string[];

    const bggId = bggIdStr ? parseInt(bggIdStr, 10) : undefined;
    const userId = "1234";

    await executeGraphql(CreateGameDocument, {
        input: {
            name,
            bggId,
            userId,
            pointCategoryNames: categories.filter(Boolean),
        },
    });

    revalidatePath("/");
    redirect("/");
}
