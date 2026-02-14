import { executeGraphql } from "@/api/executeGraphql";
import { type GameSortBy, GetGamesForInfiniteScrollDocument } from "@/gql/graphql";
import { GameCard } from "@/ui/molecues/GameCard";

interface HomepageGamesCardsProps {
	sortBy?: GameSortBy;
}

export const HomepageGamesCards = async ({ sortBy = "LAST_PLAYED" }: HomepageGamesCardsProps) => {
	const { games } = await executeGraphql(GetGamesForInfiniteScrollDocument, {
		skip: 0,
		take: 50,
		sortBy,
	});

	return (
		<div className="grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
			{games.items
				.filter(({ latestResult }) => !!latestResult)
				.map((game) => (
					<GameCard key={game.id} {...game} />
				))}
		</div>
	);
};
