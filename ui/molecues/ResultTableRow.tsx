import { GameImage } from "@/ui/atoms/GameImage";

type ResultTableRowProps = {
	gameImageUrl: string;
	gameName: string;
	firstPlayer: string;
	numberOfPlayers: number;
	date: string;
	time: string;
};

export const ResultTableRow = ({
	gameImageUrl,
	gameName,
	firstPlayer,
	numberOfPlayers,
	date,
	time,
}: ResultTableRowProps) => {
	return (
		<tr className="m-4 border-b">
			<td className="px-6 py-4 whitespace-nowrap">
				<GameImage src={gameImageUrl} alt={gameName} />
			</td>
			<td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-100">{gameName}</td>
			<td className="px-6 py-4 text-sm whitespace-nowrap text-gray-100">{firstPlayer}</td>
			<td className="px-6 py-4 text-sm whitespace-nowrap text-gray-100">{numberOfPlayers}</td>
			<td className="px-6 py-4 text-sm whitespace-nowrap text-gray-100">
				{new Date(date).toLocaleString("pl-PL")}
			</td>
			<td className="px-6 py-4 text-sm whitespace-nowrap text-gray-100">{time}</td>
		</tr>
	);
};
