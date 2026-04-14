import { executeGraphql } from "@/api/executeGraphql";
import { GetGamesForScoringDocument, GetPlayersDocument } from "@/gql/graphql";
import { ScoringForm } from "@/ui/organisms/ScoringForm";
import { ScoringFormSkeleton } from "@/ui/molecues/Skeletons";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Wyniczek - Nowy wynik",
	description: "Dodaj nowy wynik gry planszowej",
};

async function ScoringFormData() {
	const [gamesData, playersData] = await Promise.all([
		executeGraphql(GetGamesForScoringDocument),
		executeGraphql(GetPlayersDocument),
	]);

	return <ScoringForm games={gamesData.games.items} players={playersData.players} />;
}

export default function ScoringPage() {
	return (
		<main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-4 p-2 sm:p-4 md:p-6">
			<Suspense fallback={<ScoringFormSkeleton />}>
				<ScoringFormData />
			</Suspense>
		</main>
	);
}
