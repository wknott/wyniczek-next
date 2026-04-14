import { Suspense } from "react";
import { HomepageGamesCards } from "@/ui/organisms/HomepageGamesCards";
import { SortSelect } from "@/ui/molecues/SortSelect";
import { GameSortBy, GetGamesForInfiniteScrollDocument } from "@/gql/graphql";
import { executeGraphql } from "@/api/executeGraphql";
import { EmptyGamesCard } from "@/ui/molecues/EmptyGamesCard";
import { HomepageGamesCardsSkeleton } from "@/ui/molecues/Skeletons";

interface PageProps {
	searchParams: Promise<{ sortBy?: GameSortBy }>;
}

async function HomeData({ sortBy }: { sortBy: GameSortBy }) {
	const { games } = await executeGraphql(GetGamesForInfiniteScrollDocument, {
		skip: 0,
		take: 50,
		sortBy,
	});

	const gamesWithLastResult = games.items.filter(({ latestResult }) => !!latestResult);
	const hasGames = gamesWithLastResult.length > 0;

	if (!hasGames) {
		return <EmptyGamesCard />;
	}

	return (
		<>
			<div className="mb-4 flex w-full justify-end">
				<Suspense fallback={null}>
					<SortSelect defaultValue={sortBy} />
				</Suspense>
			</div>
			<HomepageGamesCards games={gamesWithLastResult} />
		</>
	);
}

export default async function Home({ searchParams }: PageProps) {
	const { sortBy = "LAST_PLAYED" } = await searchParams;

	return (
		<main className="mx-auto flex min-h-screen max-w-7xl flex-col items-center p-2 sm:p-4 md:p-6">
			<Suspense key={sortBy} fallback={<HomepageGamesCardsSkeleton />}>
				<HomeData sortBy={sortBy} />
			</Suspense>
		</main>
	);
}
