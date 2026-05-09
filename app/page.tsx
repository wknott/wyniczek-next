import { Suspense } from "react";
import { GamesMainView } from "@/ui/organisms/GamesMainView";
import { GamesMainViewSkeleton } from "@/ui/molecues/Skeletons";
import { getGamesForMainView } from "@/app/games/actions";

async function GamesData() {
	const games = await getGamesForMainView();
	return <GamesMainView games={games} />;
}

export default function Home() {
	return (
		<main className="mx-auto max-w-xl">
			<Suspense fallback={<GamesMainViewSkeleton />}>
				<GamesData />
			</Suspense>
		</main>
	);
}
