import { ResultsResponse } from "../types";

export const getResults = async (page: number): Promise<ResultsResponse> => {
	const res = await fetch(`https://wyniczekapi.bieda.it/api/results?page=${page}`);

	return await res.json();
};
