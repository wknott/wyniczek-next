"use client";

import { useMemo, useState, useEffect, useActionState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input, Label, Spinner, TextField, toast } from "@heroui/react";
import type { GetGamesForScoringQuery, GetPlayersQuery } from "@/gql/graphql";
import { GameSelect } from "@/ui/atoms/GameSelect";
import { ScoringTable } from "@/ui/molecues/ScoringTable";
import { createResult } from "@/app/actions/formSubmit";

type Game = GetGamesForScoringQuery["games"]["items"][number];
type Player = GetPlayersQuery["players"][number];

interface ScoringFormProps {
	games: Game[];
	players: Player[];
}

export const ScoringForm = ({ games, players }: ScoringFormProps) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [selectedExpansionIds, setSelectedExpansionIds] = useState<string[]>([]);

	const [_, action, isPending] = useActionState(async (_prevState: unknown, formData: FormData) => {
		const { id } = await createResult(formData);
		toast("Wynik został poprawnie zapisany!", { variant: "success" });
		router.push(`/results/${id}`);
		return;
	}, null);

	const selectedGameId = searchParams.get("gameId") || "";

	const selectedGame = useMemo(
		() => games.find((g) => g.id === selectedGameId),
		[games, selectedGameId],
	);

	console.log(selectedGame);

	useEffect(() => {
		setSelectedExpansionIds([]);
	}, [selectedGameId]);

	const expansions = selectedGame?.expansions ?? [];
	console.log(expansions);

	const toggleExpansion = (id: string) => {
		setSelectedExpansionIds((prev) =>
			prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id],
		);
	};

	const activeCategories = useMemo(() => {
		const gameCategories = selectedGame?.pointCategories ?? [];
		const expansionCategories = expansions
			.filter((e) => selectedExpansionIds.includes(e.id))
			.flatMap((e) => e.pointCategories ?? []);
		return [...gameCategories, ...expansionCategories];
	}, [selectedGame, expansions, selectedExpansionIds]);

	return (
		<form action={action} className="mx-auto max-w-2xl space-y-6 px-4 py-6">
			<GameSelect games={games} />

			{activeCategories.map((category) => (
				<Input type="hidden" name="categories[]" value={category.id} key={category.id} />
			))}
			{selectedExpansionIds.map((id) => (
				<Input type="hidden" name="expansionIds[]" value={id} key={id} />
			))}

			{expansions.length > 0 && (
				<div className="space-y-2">
					<Label>Użyte dodatki</Label>
					<div className="flex flex-wrap gap-2">
						{expansions.map((expansion) => {
							const isSelected = selectedExpansionIds.includes(expansion.id);
							return (
								<Button
									key={expansion.id}
									type="button"
									size="sm"
									variant={isSelected ? "primary" : "outline"}
									onClick={() => toggleExpansion(expansion.id)}
								>
									{expansion.name}
								</Button>
							);
						})}
					</div>
				</div>
			)}

			{selectedGame && activeCategories.length > 0 && (
				<ScoringTable
					key={`${selectedGame.id}-${selectedExpansionIds.join(",")}`}
					pointCategories={activeCategories}
					players={players}
					minPlayers={selectedGame.minPlayers}
					maxPlayers={selectedGame.maxPlayers}
				/>
			)}

			<TextField className="w-full" name="playingTime" type="number">
				<Label>Czas rozgrywki (min)</Label>
				<Input className="text-base" required type="number" />
			</TextField>
			<div className="pt-4 pb-8">
				<Button type="submit" className="w-full" isDisabled={!selectedGameId} isPending={isPending}>
					{isPending ? <Spinner color="current" size="sm" /> : null}
					Dodaj wynik
				</Button>
			</div>
		</form>
	);
};
