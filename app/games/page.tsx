import { GamesList } from "@/ui/organisms/GamesList";
import { getGamesPage } from "./actions";
import { SortSelect } from "@/ui/molecues/SortSelect";
import { GameSortBy } from "@/gql/graphql";
import { Suspense } from "react";
import { GamesListSkeleton } from "@/ui/molecues/Skeletons";

interface PageProps {
	searchParams: Promise<{ sortBy?: GameSortBy }>;
}

async function GamesData({ sortBy }: { sortBy: GameSortBy }) {
	const initialData = await getGamesPage(sortBy);
	const fetchPage = getGamesPage.bind(null, sortBy);
	return <GamesList initialData={initialData} onPageChange={fetchPage} />;
}

export default async function GamesPage({ searchParams }: PageProps) {
	const { sortBy = "POPULARITY" } = await searchParams;

	return (
		<main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center gap-6 p-2 sm:p-4 md:p-6">
			<div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
				<h1 className="text-4xl font-bold">Moje Gry</h1>
				<Suspense fallback={null}>
					<SortSelect defaultValue={sortBy} />
				</Suspense>
			</div>
			<div className="w-full">
				<Suspense key={sortBy} fallback={<GamesListSkeleton />}>
					<GamesData sortBy={sortBy} />
				</Suspense>
			</div>
		</main>
	);
}
