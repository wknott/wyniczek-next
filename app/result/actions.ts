"use server";

import { executeGraphql } from "@/api/executeGraphql";
import { GetResultByIdDocument, type GetResultByIdQuery } from "@/gql/graphql";

export async function getResultById(id: string): Promise<GetResultByIdQuery["result"]> {
	const data = await executeGraphql(GetResultByIdDocument, { id });
	return data.result;
}
