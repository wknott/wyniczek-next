import { ResultTableRow } from "@/ui/molecues/ResultTableRow";
import { ResultsGetListQuery } from "@/gql/graphql";

type ResultTableProps = {
	results: ResultsGetListQuery["results"]["items"];
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
						key={result.id}
						id={result.id}
						gameImageUrl={result.game?.imgUrl || ""}
						gameName={result.game.name}
						firstPlayer={result?.scores?.[0]?.player?.name || ""}
						numberOfPlayers={result?.scores?.length || 0}
						date={result.createdAt as string}
						time={String(result.playingTime)}
					/>
				))}
			</tbody>
		</table>
	);
};
