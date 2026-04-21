import { Suspense } from "react";
import { getGameById, updateGameCollectionStatus, syncGameWithBgg } from "../actions";
import { notFound } from "next/navigation";
import { Avatar, Card, Chip } from "@heroui/react";
import { LayoutCells, PersonFill, Archive, ArrowRotateRight, ChevronLeft } from "@gravity-ui/icons";
import Link from "next/link";
import { CategoryManager } from "@/ui/organisms/CategoryManager";
import { ExpansionManager } from "@/ui/organisms/ExpansionManager";
import { GameManualUrl } from "@/ui/organisms/GameManualUrl";
import { GameRecords } from "@/ui/organisms/GameRecords";
import { GamePlayerStats } from "@/ui/organisms/GamePlayerStats";
import { GameDetailSkeleton } from "@/ui/molecues/Skeletons";
import { SubmitButton } from "@/ui/atoms/SubmitButton";

interface PageProps {
	params: Promise<{ id: string }>;
}

async function GameDetail({ id }: { id: string }) {
	const game = await getGameById(id);

	if (!game) {
		notFound();
	}

	return (
		<Card className="overflow-hidden border-border bg-surface p-4 backdrop-blur-xl md:p-10">
			<div className="flex flex-col gap-8 md:flex-row md:items-start">
				<div className="relative shrink-0 self-center md:self-start">
					<Avatar className="h-40 w-40 rounded-3xl shadow-2xl md:h-56 md:w-56" size="lg">
						<Avatar.Image src={game.thumbnailUrl || ""} />
					</Avatar>
					{game.bggRank && (
						<div className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-warning font-bold text-warning-foreground shadow-lg">
							#{game.bggRank}
						</div>
					)}
				</div>

				<div className="flex flex-1 flex-col gap-6">
					<div className="flex flex-col gap-4">
						<h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
							{game.name}
						</h1>
						<div className="flex flex-wrap gap-2">
							<Chip size="md" color="success" variant="soft">
								<div className="flex items-center gap-1.5">
									<PersonFill className="h-4 w-4" />
									<span className="font-semibold">
										{game.minPlayers}-{game.maxPlayers} graczy
									</span>
								</div>
							</Chip>
							{game.bggWeight && (
								<Chip size="md" color="accent" variant="soft">
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
							>
								<span className="font-bold">
									{game.inCollection ? "W kolekcji" : "Poza kolekcją"}
								</span>
							</Chip>
						</div>
					</div>

					<div className="h-px w-full bg-separator" />

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<form
							action={async () => {
								"use server";
								await updateGameCollectionStatus(game.id, !game.inCollection);
							}}
						>
							<SubmitButton
								fullWidth
								size="lg"
								variant={game.inCollection ? "danger-soft" : "primary"}
								className="font-bold"
								pendingLabel="Zapisywanie..."
							>
								<Archive className="mr-2 h-5 w-5" />
								{game.inCollection ? "Usuń z kolekcji" : "Dodaj do kolekcji"}
							</SubmitButton>
						</form>

						<form
							action={async () => {
								"use server";
								await syncGameWithBgg(game.id);
							}}
						>
							<SubmitButton
								fullWidth
								size="lg"
								variant="outline"
								className="font-bold"
								pendingLabel="Synchronizacja z BGG..."
							>
								<ArrowRotateRight className="mr-2 h-5 w-5" />
								Aktualizuj z BGG
							</SubmitButton>
						</form>
					</div>
				</div>
			</div>

			<div className="mt-12 space-y-4">
				<div className="flex items-center gap-2">
					<div className="h-1.5 w-1.5 rounded-full bg-primary" />
					<h2 className="text-xl font-bold uppercase tracking-wider text-muted">
						Instrukcja
					</h2>
				</div>
				<GameManualUrl gameId={game.id} initialUrl={game.manualUrl} />
			</div>

			<div className="mt-8 space-y-4">
				<div className="flex items-center gap-2">
					<div className="h-1.5 w-1.5 rounded-full bg-primary" />
					<h2 className="text-xl font-bold uppercase tracking-wider text-muted">
						Kategorie punktacji
					</h2>
				</div>
				<CategoryManager gameId={game.id} initialCategories={game.pointCategories ?? []} />
			</div>

			<div className="mt-8 space-y-4">
				<div className="flex items-center gap-2">
					<div className="h-1.5 w-1.5 rounded-full bg-accent" />
					<h2 className="text-xl font-bold uppercase tracking-wider text-muted">Dodatki</h2>
				</div>
				<ExpansionManager gameId={game.id} initialExpansions={game.expansions ?? []} />
			</div>

			<div className="mt-8 space-y-4">
				<div className="flex items-center gap-2">
					<div className="h-1.5 w-1.5 rounded-full bg-warning" />
					<h2 className="text-xl font-bold uppercase tracking-wider text-muted">Rekordy</h2>
				</div>
				<GameRecords records={game.records ?? []} />
			</div>

			<div className="mt-8 space-y-4">
				<div className="flex items-center gap-2">
					<div className="h-1.5 w-1.5 rounded-full bg-success" />
					<h2 className="text-xl font-bold uppercase tracking-wider text-muted">
						Ranking graczy
					</h2>
				</div>
				<GamePlayerStats stats={game.playerStats ?? []} />
			</div>
		</Card>
	);
}

export default async function GameDetailPage({ params }: PageProps) {
	const { id } = await params;

	return (
		<main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 p-4 md:p-8">
			<Link
				href={{ pathname: "/games" }}
				className="flex items-center gap-2 text-muted transition-colors duration-200 hover:text-foreground"
			>
				<ChevronLeft /> Powrót do listy
			</Link>

			<Suspense fallback={<GameDetailSkeleton />}>
				<GameDetail id={id} />
			</Suspense>
		</main>
	);
}
