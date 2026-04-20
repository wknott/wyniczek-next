import { Avatar, Card, Chip } from "@heroui/react";
import { CrownDiamond } from "@gravity-ui/icons";
import Link from "next/link";

interface PlayerStat {
	wins: number;
	totalGames: number;
	player: {
		id: string;
		name: string;
	};
}

interface GamePlayerStatsProps {
	stats: PlayerStat[];
}

function getInitials(name: string) {
	return name
		.split(" ")
		.map((w) => w[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();
}

export const GamePlayerStats = ({ stats }: GamePlayerStatsProps) => {
	if (stats.length === 0) {
		return (
			<Card>
				<Card.Header>
					<Card.Description>Brak rozegranych partii.</Card.Description>
				</Card.Header>
			</Card>
		);
	}

	const topWins = stats[0].wins;

	return (
		<div className="flex flex-col gap-2">
			{stats.map((stat, index) => {
				const winRate = stat.totalGames > 0 ? Math.round((stat.wins / stat.totalGames) * 100) : 0;
				const isTop = stat.wins > 0 && stat.wins === topWins;

				return (
					<Link
						key={stat.player.id}
						href={{ pathname: `/players/${stat.player.id}` }}
						className="block"
					>
						<Card className="hover:bg-separator transition-colors">
							<Card.Header className="flex flex-row items-center gap-3">
								<span
									className={`text-muted w-6 shrink-0 text-center text-sm font-bold ${
										isTop ? "text-warning" : ""
									}`}
								>
									{index + 1}
								</span>
								<Avatar size="md" className="shrink-0">
									<Avatar.Fallback>{getInitials(stat.player.name)}</Avatar.Fallback>
								</Avatar>
								<div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
									<div className="flex items-center gap-2">
										<span className="truncate font-semibold">{stat.player.name}</span>
										{isTop && <CrownDiamond className="text-warning h-4 w-4 shrink-0" />}
									</div>
									<span className="text-muted text-xs">
										{stat.totalGames} {stat.totalGames === 1 ? "partia" : "partii"} • {winRate}%
										wygranych
									</span>
								</div>
								<Chip size="sm" variant="soft" color={isTop ? "warning" : "accent"}>
									<strong>{stat.wins}</strong>
									<span className="text-muted ml-1">/ {stat.totalGames}</span>
								</Chip>
							</Card.Header>
						</Card>
					</Link>
				);
			})}
		</div>
	);
};
