import { executeGraphql } from "@/api/executeGraphql";
import { GetGamesForInfiniteScrollDocument } from "@/gql/graphql";
import { GameCard } from "@/ui/molecues/GameCard";

export const HomepageGamesCards = async () => {
    const { games } = await executeGraphql(GetGamesForInfiniteScrollDocument, { skip: 0, take: 10 });

    return (
        <div className="flex flex-wrap gap-4 justify-center items-center">
            {games.items.map((game) => (
                <GameCard key={game.id} {...game} />
            ))}
        </div>
    )
}