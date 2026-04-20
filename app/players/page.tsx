import Link from "next/link";
import { buttonVariants } from "@heroui/styles";
import { Avatar, Card, Chip } from "@heroui/react";
import { PersonPlus, CrownDiamond } from "@gravity-ui/icons";
import { getPlayers } from "./actions";

function getInitials(name: string) {
	return name
		.split(" ")
		.map((w) => w[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();
}

export default async function PlayersPage() {
	const players = await getPlayers();
	const sorted = [...players].sort((a, b) => a.name.localeCompare(b.name));

	return (
		<main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 p-4 md:p-8">
			<div className="flex items-center justify-between gap-4">
				<h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Gracze</h1>
				<Link
					href={{ pathname: "/players/new" }}
					className={buttonVariants({ variant: "primary", size: "sm" })}
				>
					<PersonPlus /> Dodaj gracza
				</Link>
			</div>

			{sorted.length === 0 ? (
				<Card>
					<Card.Header>
						<Card.Description>Brak graczy — dodaj pierwszego.</Card.Description>
					</Card.Header>
				</Card>
			) : (
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
					{sorted.map((player) => (
						<Link key={player.id} href={{ pathname: `/players/${player.id}` }} className="block">
							<Card className="hover:bg-separator h-full transition-colors">
								<Card.Header className="flex flex-row items-center gap-4">
									<Avatar size="lg" className="shrink-0">
										<Avatar.Fallback>{getInitials(player.name)}</Avatar.Fallback>
									</Avatar>
									<Card.Title className="flex-1 truncate text-lg font-bold">
										{player.name}
									</Card.Title>
									<Chip size="sm" variant="soft" color="warning" className="shrink-0">
										<div className="flex items-center gap-1">
											<CrownDiamond className="h-3.5 w-3.5" />
											<strong>{player.totalWins}</strong>
										</div>
									</Chip>
								</Card.Header>
							</Card>
						</Link>
					))}
				</div>
			)}
		</main>
	);
}
