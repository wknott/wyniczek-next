"use client";

import { Card, Avatar, Button, ButtonGroup, Chip } from "@heroui/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, PersonFill, StarFill, LayoutCells, Plus } from "@gravity-ui/icons";
import Link from "next/link";
import { GetGamesListQuery } from "@/gql/graphql";

type GameItem = GetGamesListQuery["games"]["items"][number];

interface GamesListProps {
    initialData: {
        total: number;
        items: GameItem[];
    };
    onPageChange: (skip: number) => Promise<any>;
}

export const GamesList = ({ initialData, onPageChange }: GamesListProps) => {
    const itemsPerPage = 12;
    const [data, setData] = useState(initialData);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const totalPages = Math.ceil(data.total / itemsPerPage);

    const handlePageChange = async (newPage: number) => {
        setIsLoading(true);
        setCurrentPage(newPage);
        const skip = (newPage - 1) * itemsPerPage;
        try {
            const newData = await onPageChange(skip);
            setData(newData);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            {isLoading && <div className="text-center text-slate-400">Ładowanie...</div>}
            {!isLoading && data.items.length === 0 && (
                <div className="text-center text-slate-400">Brak gier w kolekcji</div>
            )}
            {!isLoading && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {data.items.map((game) => (
                        <Card key={game.id} className="p-4 transition-all hover:bg-slate-800/40 hover:shadow-xl">
                            <div className="flex gap-4">
                                <Link href={{ pathname: `/games/${game.id}` }} className="shrink-0 transition-transform hover:scale-105 active:scale-95">
                                    <Avatar size="lg">
                                        <Avatar.Image src={game.thumbnailUrl || ""} />
                                    </Avatar>
                                </Link>
                                <div className="flex flex-1 flex-col gap-2 overflow-hidden">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="overflow-hidden">
                                            <Link href={{ pathname: `/games/${game.id}` }} className="block hover:text-accent transition-colors">
                                                <h3 className="truncate text-lg font-bold leading-tight">{game.name}</h3>
                                            </Link>
                                            {!!game.lastPlayedAt && (
                                                <p className="text-xs text-slate-400">
                                                    Ostatnio grane:{" "}
                                                    {new Date(game.lastPlayedAt as string).toLocaleDateString("pl-PL")}
                                                </p>
                                            )}
                                        </div>
                                        <Button size="sm" isIconOnly className="shrink-0">
                                            <Link href={`/results/new?gameId=${game.id}`}>
                                                <Plus className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <Chip size="sm" color="success">
                                            <div className="flex items-center gap-1">
                                                <PersonFill className="h-3 w-3" />
                                                {game.minPlayers}-{game.maxPlayers}
                                            </div>
                                        </Chip>
                                        {game.bggRank && (
                                            <Chip size="sm" color="warning">
                                                <div className="flex items-center gap-1">
                                                    <StarFill className="h-3 w-3" />
                                                    Rank: {game.bggRank}
                                                </div>
                                            </Chip>
                                        )}
                                        {game.bggWeight && (
                                            <Chip size="sm" color="accent">
                                                <div className="flex items-center gap-1">
                                                    <LayoutCells className="h-3 w-3" />
                                                    Waga: {game.bggWeight.toFixed(2)}
                                                </div>
                                            </Chip>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {totalPages > 1 && !isLoading && (
                <div className="mt-4 flex items-center justify-center gap-4">
                    <ButtonGroup>
                        <Button
                            isDisabled={currentPage === 1 || isLoading}
                            onClick={() => handlePageChange(currentPage - 1)}
                            size="sm"
                        >
                            <ChevronLeft /> Poprzednia
                        </Button>
                        <Button isDisabled className="pointer-events-none">
                            Strona {currentPage} z {totalPages}
                        </Button>
                        <Button
                            isDisabled={currentPage === totalPages || isLoading}
                            onClick={() => handlePageChange(currentPage + 1)}
                            size="sm"
                        >
                            Następna <ChevronRight />
                        </Button>
                    </ButtonGroup>
                </div>
            )}
        </div>
    );
};
