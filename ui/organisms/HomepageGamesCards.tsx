import { executeGraphql } from "@/api/executeGraphql";
import { type GameSortBy, GetGamesForInfiniteScrollDocument } from "@/gql/graphql";
import { GameCard } from "@/ui/molecues/GameCard";

interface HomepageGamesCardsProps {
    sortBy?: GameSortBy;
}

export const HomepageGamesCards = async ({ sortBy = "LAST_PLAYED" }: HomepageGamesCardsProps) => {
    const { games } = await executeGraphql(GetGamesForInfiniteScrollDocument, { skip: 0, take: 50, sortBy });

    return (
        <div className="flex flex-wrap gap-4 justify-center items-center">
            {games.items.map((game) => (
                <GameCard key={game.id} {...game} />
            ))}
        </div>
    )
}