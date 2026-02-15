import { getGameById, updateGameCollectionStatus, syncGameWithBgg } from "../actions";
import { notFound } from "next/navigation";
import { Avatar, Button, Card, Chip } from "@heroui/react";
import { StarFill, LayoutCells, PersonFill, Archive, ArrowRotateRight, ChevronLeft } from "@gravity-ui/icons";
import Link from "next/link";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function GameDetailPage({ params }: PageProps) {
    const { id } = await params;
    const game = await getGameById(id);

    if (!game) {
        notFound();
    }

    return (
        <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 p-4 md:p-8">
            <Link href={{ pathname: "/games" }} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200">
                <ChevronLeft /> Powrót do listy
            </Link>

            <Card className="overflow-hidden border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl md:p-10">
                <div className="flex flex-col gap-8 md:flex-row md:items-start">
                    <div className="relative shrink-0 self-center md:self-start">
                        <Avatar className="h-40 w-40 rounded-3xl shadow-2xl md:h-56 md:w-56" size="lg">
                            <Avatar.Image src={game.thumbnailUrl || ""} />
                        </Avatar>
                        {game.bggRank && (
                            <div className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-warning font-bold text-black shadow-lg">
                                #{game.bggRank}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-1 flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">{game.name}</h1>
                            <div className="flex flex-wrap gap-2">
                                <Chip size="md" color="success" variant="soft" className="bg-success/10 text-success">
                                    <div className="flex items-center gap-1.5">
                                        <PersonFill className="h-4 w-4" />
                                        <span className="font-semibold">{game.minPlayers}-{game.maxPlayers} graczy</span>
                                    </div>
                                </Chip>
                                {game.bggWeight && (
                                    <Chip size="md" color="accent" variant="soft" className="bg-accent/10 text-accent">
                                        <div className="flex items-center gap-1.5">
                                            <LayoutCells className="h-4 w-4" />
                                            <span className="font-semibold">Waga: {game.bggWeight.toFixed(2)} / 5</span>
                                        </div>
                                    </Chip>
                                )}
                                <Chip
                                    size="md"
                                    variant="soft"
                                    color={game.inCollection ? "accent" : "default"}
                                    className={game.inCollection ? "bg-accent/10 text-accent" : "bg-slate-700/50"}
                                >
                                    <span className="font-bold">{game.inCollection ? "W kolekcji" : "Poza kolekcją"}</span>
                                </Chip>
                            </div>
                        </div>

                        <div className="h-px bg-slate-800 w-full" />

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <form action={async () => {
                                "use server";
                                await updateGameCollectionStatus(game.id, !game.inCollection);
                            }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    size="lg"
                                    variant={game.inCollection ? "danger-soft" : "primary"}
                                    className="font-bold"
                                >
                                    <Archive className="mr-2 h-5 w-5" />
                                    {game.inCollection ? "Usuń z kolekcji" : "Dodaj do kolekcji"}
                                </Button>
                            </form>

                            <form action={async () => {
                                "use server";
                                await syncGameWithBgg(game.id);
                            }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    size="lg"
                                    variant="outline"
                                    className="font-bold border-slate-700 hover:bg-slate-800"
                                >
                                    <ArrowRotateRight className="mr-2 h-5 w-5" />
                                    Aktualizuj z BGG
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>

                {game.pointCategories && game.pointCategories.length > 0 && (
                    <div className="mt-12 space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <h2 className="text-xl font-bold uppercase tracking-wider text-slate-400">Kategorie punktacji</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {game.pointCategories.map((cat) => (
                                <Chip
                                    key={cat.id}
                                    variant="tertiary"
                                    className="border-slate-800 bg-slate-800/20 px-4"
                                >
                                    <span className="font-medium">{cat.name}</span>
                                </Chip>
                            ))}
                        </div>
                    </div>
                )}
            </Card>
        </main>
    );
}
