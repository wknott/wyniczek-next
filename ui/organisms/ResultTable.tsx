import { ResultTableRow } from "@/ui/molecues/ResultTableRow";

type ResultTableProps = {
	results: Array<{
		gameImageUrl: string;
		gameName: string;
		firstPlayer: string;
		numberOfPlayers: number;
		date: string;
		time: string;
	}>;
};

export const ResultTable = ({ results }: ResultTableProps) => {
	return (
		<table>
			<thead>
				<tr>
					<th></th>
					<th>Game Name</th>
					<th>First player</th>
					<th>Number of Players</th>
					<th>Date</th>
					<th>Time</th>
				</tr>
			</thead>
			<tbody>
				{results.map((result, index) => (
					<ResultTableRow
						key={index}
						gameImageUrl={result.gameImageUrl}
						gameName={result.gameName}
						firstPlayer={result.firstPlayer}
						numberOfPlayers={result.numberOfPlayers}
						date={result.date}
						time={result.time}
					/>
				))}
			</tbody>
		</table>
	);
};
