"use client";

import { useMemo, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Button, Input, Label, TextField } from "@heroui/react";
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
	const [_, action, isPending] = useActionState((_prevState: unknown, formData: FormData) => {
		return createResult(formData);
	}, null);

	const selectedGameId = searchParams.get("gameId") || "";

	const selectedGame = useMemo(
		() => games.find((g) => g.id === selectedGameId),
		[games, selectedGameId],
	);

	const pointCategories = selectedGame?.pointCategories;

	return (
		<form action={action} className="mx-auto max-w-2xl space-y-6 px-4 py-6">
			<GameSelect games={games} />
			{pointCategories &&
				pointCategories.map((category) => (
					<Input type="hidden" name={`categories[]`} value={category.id} key={category.id} />
				))}
			{selectedGame && pointCategories && (
				<ScoringTable
					key={selectedGame.id}
					pointCategories={pointCategories}
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
				<Button type="submit" className="w-full" isDisabled={isPending || !selectedGameId}>
					Dodaj wynik
				</Button>
			</div>
		</form>
	);
};
