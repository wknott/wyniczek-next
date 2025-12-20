"use client";

import React, { useState } from "react";
import { PlayerManager } from "@/ui/molecues/PlayerManager";
import { Player, PointCategory } from "@/gql/graphql";
import { Chip, Input } from "@heroui/react";

interface ScoringTableProps {
	pointCategories: Pick<PointCategory, "id" | "name">[];
	players: Pick<Player, "id" | "name">[];
}

const DEFAULT_NUMBER_OF_PLAYERS = 2;

export const ScoringTable = ({ pointCategories, players }: ScoringTableProps) => {
	const [numberOfPlayers, setNumberOfPlayers] = useState(DEFAULT_NUMBER_OF_PLAYERS);

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
