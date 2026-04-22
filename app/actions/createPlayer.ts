"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { executeGraphql } from "@/api/executeGraphql";
import { CreatePlayerDocument } from "@/gql/graphql";

export async function createPlayer(formData: FormData) {
    const name = formData.get("name") as string;

    if (!name) return;

    await executeGraphql(CreatePlayerDocument, {
        input: {
            name,
        },
    });

    revalidatePath("/");
    redirect("/");
}
