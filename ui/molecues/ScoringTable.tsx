"use client";

import React, { useState } from "react";
import { PlayerManager } from "@/ui/molecues/PlayerManager";
import { Player, PointCategory } from "@/gql/graphql";
import { Chip, Input, Separator } from "@heroui/react";

interface ScoringTableProps {
	pointCategories: Pick<PointCategory, "id" | "name">[];
	players: Pick<Player, "id" | "name">[];
	minPlayers?: number | null;
	maxPlayers?: number | null;
}

const DEFAULT_NUMBER_OF_PLAYERS = 2;

export const ScoringTable = ({
	pointCategories,
	players,
	minPlayers,
	maxPlayers,
}: ScoringTableProps) => {
	const [numberOfPlayers, setNumberOfPlayers] = useState(
		Math.max(DEFAULT_NUMBER_OF_PLAYERS, minPlayers || 0),
	);

	const [scores, setScores] = useState<Record<string, Record<number, number>>>({});

	const handleScoreChange = (
		categoryId: string,
		playerIndex: number,
		value: string,
	) => {
		const numValue = value === "" ? 0 : parseFloat(value);
		setScores((prev) => ({
			...prev,
			[categoryId]: {
				...prev[categoryId],
				[playerIndex]: numValue,
			},
		}));
	};

	const getPlayerTotal = (playerIndex: number) => {
		return pointCategories.reduce((sum, category) => {
			const categoryScore = scores[category.id]?.[playerIndex] || 0;
			return sum + categoryScore;
		}, 0);
	};

	return (
		<div
			className="grid gap-2"
			style={{
				gridTemplateColumns: `minmax(160px, auto) repeat(${numberOfPlayers}, minmax(80px, 400px))`,
			}}
		>
			<PlayerManager
				players={players}
				numberOfPlayers={numberOfPlayers}
				setNumberOfPlayers={setNumberOfPlayers}
				minPlayers={minPlayers}
				maxPlayers={maxPlayers}
			/>
			{pointCategories.map((category) => (
				<React.Fragment key={category.id}>
					<Chip size="lg" variant="soft">
						{category.name.length > 16 ? `${category.name.slice(0, 16)}...` : category.name}
					</Chip>
					{[...Array(numberOfPlayers).keys()].map((_, index) => (
						<Input
							key={`${category.id}-${index}`}
							type="number"
							aria-label={`${category.id}-${index}`}
							placeholder="0"
							className="text-base"
							name={`category-${category.id}[]`}
							onChange={(e) => handleScoreChange(category.id, index, e.target.value)}
						/>
					))}
				</React.Fragment>
			))}
			<Chip size="lg" color="accent" variant="soft" className="h-10">
				Suma
			</Chip>
			{[...Array(numberOfPlayers).keys()].map((_, index) => (
				<Chip
					key={`sum-${index}`}
					className="flex justify-center items-center font-bold text-lg"
					color="accent"
					variant="soft"
				>
					{getPlayerTotal(index)}
				</Chip>
			))}
		</div>
	);
};
