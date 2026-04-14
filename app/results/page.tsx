import { ResultsList } from "@/ui/organisms/ResultsList";
import { getResultsPage } from "./actions";
import { executeGraphql } from "@/api/executeGraphql";
import { GetGamesForScoringDocument } from "@/gql/graphql";
import { GameSelect } from "@/ui/atoms/GameSelect";
import { Suspense } from "react";
import { ResultsListSkeleton } from "@/ui/molecues/Skeletons";
import { Skeleton } from "@heroui/react";

interface PageProps {
	searchParams: Promise<{ gameId?: string }>;
}

async function ResultsFilter() {
	const gamesData = await executeGraphql(GetGamesForScoringDocument);
	return <GameSelect games={gamesData.games.items} allowEmpty />;
}

async function ResultsData({ gameId }: { gameId?: string }) {
	const initialData = await getResultsPage(gameId, 0);
	const fetchPage = getResultsPage.bind(null, gameId);
	return <ResultsList initialData={initialData} onPageChange={fetchPage} />;
}

export default async function ResultsPage({ searchParams }: PageProps) {
	const { gameId } = await searchParams;

	return (
		<main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center gap-6 p-2 sm:p-4 md:p-6">
			<div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
				<h1 className="text-4xl font-bold">Historia wyników</h1>
				<Suspense fallback={<Skeleton className="h-10 w-full rounded-md md:w-48" />}>
					<ResultsFilter gameId={gameId} />
				</Suspense>
			</div>
			<div className="w-full">
				<Suspense key={gameId ?? "all"} fallback={<ResultsListSkeleton />}>
					<ResultsData gameId={gameId} />
				</Suspense>
			</div>
		</main>
	);
}
