import { GamesList } from "@/ui/organisms/GamesList";
import { connection } from "next/server";
import { getGamesPage } from "./actions";
import { SortSelect } from "@/ui/molecues/SortSelect";
import { GameSortBy } from "@/gql/graphql";
import { Suspense } from "react";

interface PageProps {
    searchParams: Promise<{ sortBy?: GameSortBy }>;
}

export default async function GamesPage({ searchParams }: PageProps) {
    await connection();

    const { sortBy = "POPULARITY" } = await searchParams;
    const initialData = await getGamesPage(0, sortBy);

    return (
        <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center gap-6 p-2 sm:p-4 md:p-6">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-4xl font-bold">Moje Gry</h1>
                <Suspense fallback={null}>
                    <SortSelect defaultValue={sortBy} />
                </Suspense>
            </div>
            <div className="w-full">
                <GamesList
                    initialData={initialData}
                    onPageChange={async (skip) => {
                        "use server";
                        return getGamesPage(skip, sortBy);
                    }}
                />
            </div>
        </main>
    );
}

