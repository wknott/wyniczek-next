"use client";

import React, { useState } from "react";
import { PlayerManager } from "@/ui/molecues/PlayerManager";
import { Player, PointCategory } from "@/gql/graphql";
import { Chip, Input } from "@heroui/react";

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
						/>
					))}
				</React.Fragment>
			))}
		</div>
	);
};
