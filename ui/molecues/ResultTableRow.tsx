"use client";
import { GameImage } from "@/ui/atoms/GameImage";
import { useRouter } from "next/navigation";

type ResultTableRowProps = {
	id: string;
	gameImageUrl: string;
	gameName: string;
	firstPlayer: string;
	numberOfPlayers: number;
	date: string;
	time: string;
};

export const ResultTableRow = ({
	id,
	gameImageUrl,
	gameName,
	firstPlayer,
	numberOfPlayers,
	date,
	time,
}: ResultTableRowProps) => {
	const router = useRouter();

	return (
		<tr className="m-4 border-b" onClick={() => router.push(`/wynik/${id}`)}>
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
