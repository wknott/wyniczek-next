import { Suspense } from "react";
import { HomepageGamesCards } from "@/ui/organisms/HomepageGamesCards";
import { SortSelect } from "@/ui/molecues/SortSelect";
import { GameSortBy, GetGamesForInfiniteScrollDocument } from "@/gql/graphql";
import { executeGraphql } from "@/api/executeGraphql";
import { EmptyGamesCard } from "@/ui/molecues/EmptyGamesCard";

interface PageProps {
	searchParams: Promise<{ sortBy?: GameSortBy }>;
}

export default async function Home({ searchParams }: PageProps) {
	const { sortBy = "LAST_PLAYED" } = await searchParams;
	const { games } = await executeGraphql(GetGamesForInfiniteScrollDocument, {
		skip: 0,
		take: 50,
		sortBy,
	});

	const gamesWithLastResult = games.items.filter(({ latestResult }) => !!latestResult);
	const hasGames = gamesWithLastResult.length > 0;

	return (
		<main className="mx-auto flex min-h-screen max-w-7xl flex-col items-center p-2 sm:p-4 md:p-6">
			{!hasGames ? (
				<EmptyGamesCard />
			) : (
				<>
					<div className="mb-4 flex w-full justify-end">
						<Suspense fallback={null}>
							<SortSelect defaultValue={sortBy} />
						</Suspense>
					</div>
					<HomepageGamesCards games={gamesWithLastResult} />
				</>
			)}
		</main>
	);
}
