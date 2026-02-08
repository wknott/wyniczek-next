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
		<main className="mx-auto flex min-h-screen max-w-7xl flex-col items-center p-2 sm:p-4 md:p-6">
			<div className="mb-4 flex w-full justify-end">
				<Suspense fallback={null}>
					<SortSelect defaultValue={sortBy} />
				</Suspense>
			</div>
			<HomepageGamesCards sortBy={sortBy} />
		</main>
	);
}
