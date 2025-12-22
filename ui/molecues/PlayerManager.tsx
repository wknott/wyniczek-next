"use client";
import { Button } from "@heroui/react";
import { PersonXmark, PersonPlus } from "@gravity-ui/icons";
import { PlayerSelect } from "@/ui/atoms/PlayerSelect";
import { Player } from "@/gql/graphql";
import { useSearchParams } from "next/navigation";

interface PlayerManagerProps {
	players: Pick<Player, "id" | "name">[];
	numberOfPlayers: number;
	setNumberOfPlayers: (num: number) => void;
	minPlayers?: number | null;
	maxPlayers?: number | null;
}

export const PlayerManager = ({
	players,
	numberOfPlayers,
	setNumberOfPlayers,
	minPlayers,
	maxPlayers,
}: PlayerManagerProps) => {
	const searchParams = useSearchParams();

	const lastResultPlayers = searchParams.getAll("players") || [];
	const defaultPlayers = lastResultPlayers.reverse();

	return (
		<>
			<div className="flex justify-center gap-5">
				<Button
					isIconOnly
					isDisabled={!!maxPlayers && numberOfPlayers >= maxPlayers}
					onPress={() => {
						setNumberOfPlayers(numberOfPlayers + 1);
					}}
				>
					<PersonPlus />
				</Button>
				<Button
					isIconOnly
					variant="danger"
					isDisabled={numberOfPlayers <= (minPlayers || 1)}
					onPress={() => {
						setNumberOfPlayers(numberOfPlayers - 1);
					}}
				>
					<PersonXmark />
				</Button>
			</div>
			{players &&
				[...Array(numberOfPlayers).keys()].map((_, index) => (
					<PlayerSelect
						key={index}
						players={players}
						placeholder={`Player ${index + 1}`}
						name="players[]"
						defaultValue={defaultPlayers[index]}
					/>
				))}
		</>
	);
};
