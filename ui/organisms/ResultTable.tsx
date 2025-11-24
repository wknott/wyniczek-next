import { ResultTableRow } from "@/ui/molecues/ResultTableRow";
import { Result } from "../../types";

type ResultTableProps = {
	results: Result[];
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
				{results.map((result) => (
					<ResultTableRow
						key={result._id}
						gameImageUrl={result.game.imgUrl}
						gameName={result.game.name}
						firstPlayer={result.scores[0]?.user.name || ""}
						numberOfPlayers={result.scores.length}
						date={result.date}
						time={String(result.playingTime)}
					/>
				))}
			</tbody>
		</table>
	);
};
