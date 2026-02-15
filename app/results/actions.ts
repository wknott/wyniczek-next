"use server";

import { executeGraphql } from "@/api/executeGraphql";
import { ResultsGetListDocument, type ResultsGetListQuery, GetResultByIdDocument, type GetResultByIdQuery } from "@/gql/graphql";

const itemsPerPage = 10;

export async function getResultsPage(skip: number): Promise<ResultsGetListQuery["results"]> {
    const data = await executeGraphql(ResultsGetListDocument, {
        skip,
        take: itemsPerPage,
    });
    return data.results;
}

export async function getResultById(id: string): Promise<GetResultByIdQuery["result"]> {
    const data = await executeGraphql(GetResultByIdDocument, { id });
    return data.result;
}
