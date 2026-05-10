import { Suspense } from "react";
import { GamesMainView } from "@/ui/organisms/GamesMainView";
import { GamesMainViewSkeleton } from "@/ui/molecues/Skeletons";
import { getGamesForMainView } from "@/app/games/actions";
import type { GameSortBy } from "@/gql/graphql";

const VALID_SORTS: GameSortBy[] = [
	"LAST_PLAYED",
	"ALPHABETICAL",
	"POPULARITY",
	"AVG_PLAYING_TIME_2P",
];

function parseSortBy(value: string | undefined): GameSortBy {
	return VALID_SORTS.find((s) => s === value) ?? "LAST_PLAYED";
}

async function GamesData({ sortBy }: { sortBy: GameSortBy }) {
	const games = await getGamesForMainView(sortBy);
	return <GamesMainView games={games} sortBy={sortBy} />;
}

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ sort?: string }>;
}) {
	const sortBy = parseSortBy((await searchParams).sort);
	return (
		<main className="mx-auto max-w-xl">
			<Suspense key={sortBy} fallback={<GamesMainViewSkeleton />}>
				<GamesData sortBy={sortBy} />
			</Suspense>
		</main>
	);
}
