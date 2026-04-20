import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Avatar, Card } from "@heroui/react";
import { ChevronLeft } from "@gravity-ui/icons";
import { getPlayerById } from "../actions";
import { PlayerRecords } from "@/ui/organisms/PlayerRecords";
import { FullscreenSpinner } from "@/ui/molecues/Skeletons";

interface PageProps {
	params: Promise<{ id: string }>;
}

async function PlayerDetail({ id }: { id: string }) {
	const player = await getPlayerById(id);

	if (!player) {
		notFound();
	}

	const initials = player.name
		.split(" ")
		.map((w) => w[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

	return (
		<Card className="border-border bg-surface p-4 backdrop-blur-xl md:p-10">
			<div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-8">
				<Avatar
					className="h-24 w-24 rounded-3xl shadow-2xl md:h-32 md:w-32"
					size="lg"
				>
					<Avatar.Fallback>{initials}</Avatar.Fallback>
				</Avatar>
				<div className="flex flex-1 flex-col gap-2 text-center md:text-left">
					<h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
						{player.name}
					</h1>
					<p className="text-muted text-sm">
						{player.records?.length ?? 0} rekord{player.records?.length === 1 ? "" : "y"}
					</p>
				</div>
			</div>

			<div className="mt-8 space-y-4">
				<div className="flex items-center gap-2">
					<div className="bg-warning h-1.5 w-1.5 rounded-full" />
					<h2 className="text-muted text-xl font-bold uppercase tracking-wider">
						Rekordy
					</h2>
				</div>
				<PlayerRecords records={player.records ?? []} />
			</div>
		</Card>
	);
}

export default async function PlayerDetailPage({ params }: PageProps) {
	const { id } = await params;

	return (
		<main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 p-4 md:p-8">
			<Link
				href={{ pathname: "/players" }}
				className="text-muted hover:text-foreground flex items-center gap-2 transition-colors duration-200"
			>
				<ChevronLeft /> Powrót do listy graczy
			</Link>

			<Suspense fallback={<FullscreenSpinner />}>
				<PlayerDetail id={id} />
			</Suspense>
		</main>
	);
}
