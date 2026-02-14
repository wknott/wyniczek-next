import { GameCardDataFragment } from "@/gql/graphql";
import { GameCard } from "@/ui/molecues/GameCard";

interface HomepageGamesCardsProps {
	games: GameCardDataFragment[];
}

export const HomepageGamesCards = async ({ games }: HomepageGamesCardsProps) => {
	return (
		<div className="grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
			{games.map((game) => (
				<GameCard key={game.id} {...game} />
			))}
		</div>
	);
};
