import { ResultsList } from "@/ui/organisms/ResultsList";
import { connection } from "next/server";
import { getResultsPage } from "./actions";
import { executeGraphql } from "@/api/executeGraphql";
import { GetGamesForScoringDocument } from "@/gql/graphql";
import { GameSelect } from "@/ui/atoms/GameSelect";
import { Suspense } from "react";

interface PageProps {
	searchParams: Promise<{ gameId?: string }>;
}

export default async function ResultsPage({ searchParams }: PageProps) {
	await connection();

	const { gameId } = await searchParams;
	const fetchPage = getResultsPage.bind(null, gameId);

	const [initialData, gamesData] = await Promise.all([
		getResultsPage(gameId, 0),
		executeGraphql(GetGamesForScoringDocument),
	]);

	return (
		<main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center gap-6 p-2 sm:p-4 md:p-6">
			<div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
				<h1 className="text-4xl font-bold">Historia wyników</h1>
				<Suspense fallback={null}>
					<GameSelect games={gamesData.games.items} allowEmpty />
				</Suspense>
			</div>
			<div className="w-full">
				<ResultsList initialData={initialData} onPageChange={fetchPage} />
			</div>
		</main>
	);
}
