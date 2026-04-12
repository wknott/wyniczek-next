"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { type Key, ListBox, Select } from "@heroui/react";

interface Game {
	id: string;
	name: string;
}

interface GameSelectProps {
	games: Game[];
	allowEmpty?: boolean;
}

export const GameSelect = ({ games, allowEmpty = false }: GameSelectProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const currentGameId = searchParams.get("gameId") || "";

	const handleChange = useCallback(
		(key: Key | null) => {
			const params = new URLSearchParams(searchParams.toString());
			if (!key) {
				params.delete("gameId");
			} else {
				params.set("gameId", String(key));
			}
			router.push(`?${params.toString()}`);
		},
		[router, searchParams],
	);

	return (
		<Select
			placeholder="Wybierz grę"
			value={currentGameId}
			onChange={handleChange}
			name="gameId"
			aria-label="gameId"
			isRequired={!allowEmpty}
		>
			<Select.Trigger>
				<Select.Value />
				<Select.Indicator />
			</Select.Trigger>
			<Select.Popover>
				<ListBox>
					{allowEmpty && (
						<ListBox.Item key="" id="" textValue="Wszystkie gry">
							Wszystkie gry
							<ListBox.ItemIndicator />
						</ListBox.Item>
					)}
					{games.map((game) => (
						<ListBox.Item key={game.id} id={game.id} textValue={game.name}>
							{game.name}
							<ListBox.ItemIndicator />
						</ListBox.Item>
					))}
				</ListBox>
			</Select.Popover>
		</Select>
	);
};
