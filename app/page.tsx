import { Suspense } from "react";
import { HomepageGamesCards } from "@/ui/organisms/HomepageGamesCards";
import { SortSelect } from "@/ui/molecues/SortSelect";
import type { GameSortBy } from "@/gql/graphql";

interface PageProps {
	searchParams: Promise<{ sortBy?: GameSortBy }>;
}

export default async function Home({ searchParams }: PageProps) {
	const { sortBy = "LAST_PLAYED" } = await searchParams;

	return (
		<main className="flex min-h-screen flex-col items-center p-2 sm:p-4 md:p-6 max-w-7xl mx-auto">
			<div className="w-full flex justify-end mb-4">
				<Suspense fallback={null}>
					<SortSelect defaultValue={sortBy} />
				</Suspense>
			</div>
			<HomepageGamesCards sortBy={sortBy} />
		</main>
	);
}
