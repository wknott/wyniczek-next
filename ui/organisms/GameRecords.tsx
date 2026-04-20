import { Card, Chip } from "@heroui/react";
import { CircleNumber1, Calendar, PersonFill } from "@gravity-ui/icons";
import Link from "next/link";

interface GameRecord {
	totalPoints: number;
	createdAt: unknown;
	resultId: string;
	player: {
		id: string;
		name: string;
	};
	expansions: Array<{
		id: string;
		name: string;
	}>;
}

interface GameRecordsProps {
	records: GameRecord[];
}

export const GameRecords = ({ records }: GameRecordsProps) => {
	if (records.length === 0) {
		return (
			<Card>
				<Card.Header>
					<Card.Description>Brak rekordów — zagraj pierwszą partię.</Card.Description>
				</Card.Header>
			</Card>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
			{records.map((record) => (
				<Link
					key={record.resultId}
					href={{ pathname: `/results/${record.resultId}` }}
					className="block"
				>
					<Card className="hover:bg-separator h-full transition-colors">
						<Card.Header className="flex flex-col items-start gap-3">
							<div className="flex flex-wrap gap-1.5">
								{record.expansions.length === 0 ? (
									<Chip size="sm" variant="soft">
										Baza
									</Chip>
								) : (
									record.expansions.map((e) => (
										<Chip key={e.id} size="sm" variant="soft" color="accent">
											{e.name}
										</Chip>
									))
								)}
							</div>
							<div className="flex items-center gap-2">
								<CircleNumber1 className="text-warning h-6 w-6" />
								<span className="text-accent text-3xl font-extrabold">{record.totalPoints}</span>
								<span className="text-muted text-sm font-semibold">pkt</span>
							</div>
							<Card.Description className="flex flex-wrap gap-2">
								<Chip size="sm">
									<PersonFill className="mr-1" />
									<strong>{record.player.name}</strong>
								</Chip>
								<Chip size="sm">
									<Calendar className="mr-1" />
									{new Date(record.createdAt as string).toLocaleDateString("pl-PL")}
								</Chip>
							</Card.Description>
						</Card.Header>
					</Card>
				</Link>
			))}
		</div>
	);
};
