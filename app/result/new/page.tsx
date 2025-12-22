import { executeGraphql } from "@/api/executeGraphql";
import { GetGamesForScoringDocument, GetPlayersDocument } from "@/gql/graphql";
import { ScoringForm } from "@/ui/organisms/ScoringForm";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Wyniczek - Nowy wynik",
	description: "Dodaj nowy wynik gry planszowej",
};

const ScoringPage = async () => {
	const [gamesData, playersData] = await Promise.all([
		executeGraphql(GetGamesForScoringDocument),
		executeGraphql(GetPlayersDocument),
	]);

	const games = gamesData.games.items;
	const players = playersData.players;

	return (
		<Suspense fallback={null}>
			<ScoringForm games={games} players={players} />
		</Suspense>
	);
};

export default ScoringPage;
