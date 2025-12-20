"use client";

import { ListBox, Select } from "@heroui/react";

export const PlayerSelect = ({
	players,
	placeholder,
	name,
	defaultValue,
}: {
	players: { id: string; name: string }[];
	placeholder: string;
	name: string;
	defaultValue?: string;
}) => {
	return (
		<Select
			placeholder={placeholder}
			name={name}
			aria-label="player-select"
			defaultValue={defaultValue}
		>
			<Select.Trigger>
				<Select.Value></Select.Value>
				<Select.Indicator />
			</Select.Trigger>
			<Select.Popover>
				<ListBox>
					{players?.map((player) => (
						<ListBox.Item key={player.id} id={player.id} textValue={player.name}>
							{player.name}
							<ListBox.ItemIndicator />
						</ListBox.Item>
					))}
				</ListBox>
			</Select.Popover>
		</Select>
	);
};
