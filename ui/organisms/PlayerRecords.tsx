import { Avatar, Card, Chip } from "@heroui/react";
import { CircleNumber1, Calendar } from "@gravity-ui/icons";
import Link from "next/link";

interface PlayerRecord {
	totalPoints: number;
	createdAt: unknown;
	resultId: string;
	game: {
		id: string;
		name: string;
		thumbnailUrl?: string | null;
	};
	expansions: Array<{
		id: string;
		name: string;
	}>;
}

interface PlayerRecordsProps {
	records: PlayerRecord[];
}

export const PlayerRecords = ({ records }: PlayerRecordsProps) => {
	if (records.length === 0) {
		return (
			<Card>
				<Card.Header>
					<Card.Description>Brak rekordów — ten gracz nie ma jeszcze wyników.</Card.Description>
				</Card.Header>
			</Card>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
			{records.map((record) => (
				<Link
					key={`${record.game.id}-${record.resultId}`}
					href={{ pathname: `/results/${record.resultId}` }}
					className="block"
				>
					<Card className="hover:bg-separator h-full transition-colors">
						<Card.Header className="flex flex-row items-start gap-4">
							<Avatar size="lg" className="shrink-0">
								<Avatar.Image src={record.game.thumbnailUrl || ""} />
							</Avatar>
							<div className="flex flex-1 flex-col gap-2 overflow-hidden">
								<Card.Title className="truncate text-base font-bold">
									{record.game.name}
								</Card.Title>
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
									<CircleNumber1 className="text-warning h-5 w-5" />
									<span className="text-accent text-2xl font-extrabold">
										{record.totalPoints}
									</span>
									<span className="text-muted text-sm font-semibold">pkt</span>
								</div>
								<Chip size="sm">
									<Calendar className="mr-1" />
									{new Date(record.createdAt as string).toLocaleDateString("pl-PL")}
								</Chip>
							</div>
						</Card.Header>
					</Card>
				</Link>
			))}
		</div>
	);
};
