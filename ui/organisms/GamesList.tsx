"use client";

import { Card, Avatar, Button, ButtonGroup, Chip, toast } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, PersonFill, StarFill, LayoutCells, Plus } from "@gravity-ui/icons";
import Link from "next/link";
import { GetGamesListQuery } from "@/gql/graphql";
import { GamesListSkeleton } from "@/ui/molecues/Skeletons";

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

    useEffect(() => {
        setData(initialData);
        setCurrentPage(1);
    }, [initialData]);

    const totalPages = Math.ceil(data.total / itemsPerPage);

    const handlePageChange = async (newPage: number) => {
        setIsLoading(true);
        setCurrentPage(newPage);
        const skip = (newPage - 1) * itemsPerPage;
        try {
            const newData = await onPageChange(skip);
            setData(newData);
        } catch {
            toast("Nie udało się załadować gier", { variant: "danger" });
            setCurrentPage((prev) => prev);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            {isLoading && <GamesListSkeleton count={itemsPerPage} />}
            {!isLoading && data.items.length === 0 && (
                <div className="text-center text-muted">Brak gier w kolekcji</div>
            )}
            {!isLoading && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {data.items.map((game) => (
                        <Card key={game.id}>
                            <Card.Header className="flex flex-row items-center gap-4">
                                <Link
                                    href={{ pathname: `/games/${game.id}` }}
                                    className="flex flex-1 items-start gap-4 overflow-hidden"
                                >
                                    <Avatar size="lg" className="shrink-0">
                                        <Avatar.Image src={game.thumbnailUrl || ""} />
                                    </Avatar>
                                    <div className="flex flex-1 flex-col gap-2 overflow-hidden">
                                        <Card.Title className="truncate text-lg font-bold leading-tight">
                                            {game.name}
                                        </Card.Title>
                                        {!!game.lastPlayedAt && (
                                            <Card.Description>
                                                Ostatnio grane:{" "}
                                                {new Date(game.lastPlayedAt as string).toLocaleDateString("pl-PL")}
                                            </Card.Description>
                                        )}
                                        <div className="flex flex-wrap gap-2">
                                            <Chip size="sm" color="success">
                                                <PersonFill className="mr-1" />
                                                {game.minPlayers}-{game.maxPlayers}
                                            </Chip>
                                            {game.bggRank && (
                                                <Chip size="sm" color="warning">
                                                    <StarFill className="mr-1" />
                                                    Rank: {game.bggRank}
                                                </Chip>
                                            )}
                                            {game.bggWeight && (
                                                <Chip size="sm" color="accent">
                                                    <LayoutCells className="mr-1" />
                                                    Waga: {game.bggWeight.toFixed(2)}
                                                </Chip>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                                <Link
                                    href={`/results/new?gameId=${game.id}`}
                                    className={buttonVariants({ variant: "secondary", isIconOnly: true, size: "sm" })}
                                >
                                    <Plus />
                                </Link>
                            </Card.Header>
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
