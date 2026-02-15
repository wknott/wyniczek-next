"use server";

import { executeGraphql } from "@/api/executeGraphql";
import { CreateResultDocument } from "@/gql/graphql";
import type { CreateResultInput } from "@/gql/graphql";
import { revalidatePath } from "next/cache";

export async function createResultAction(input: CreateResultInput) {
	const result = await executeGraphql(CreateResultDocument, { input });

	revalidatePath("/");
	revalidatePath("/results/new");

	return result.createResult;
}
