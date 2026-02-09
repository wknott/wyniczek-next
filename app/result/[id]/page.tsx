import { getResultById } from "../actions";
import { Avatar, Card, Chip } from "@heroui/react";
import Link from "next/link";
import { ChevronLeft } from "@gravity-ui/icons";

interface ResultPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function ResultPage({ params }: ResultPageProps) {
	const { id } = await params;
	const result = await getResultById(id);

	if (!result) {
		return (
			<main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center gap-6 p-2 sm:p-4 md:p-6">
				<div className="text-center">
					<h1 className="text-4xl font-bold">Wynik nie znaleziony</h1>
					<Link
						href="/history"
						className="mt-4 inline-flex items-center gap-2 text-blue-500 hover:text-blue-600"
					>
						<ChevronLeft />
						Wróć do historii
					</Link>
				</div>
			</main>
		);
	}

	const createdAt = new Date(result.createdAt as string).toLocaleString("pl-PL", {
		dateStyle: "long",
		timeStyle: "short",
	});

	const totalScore: Record<string, number> = {};
	result.scores?.forEach((score) => {
		const playerName = score.player?.name || "Nieznany";
		if (!totalScore[playerName]) {
			totalScore[playerName] = 0;
		}
		score.points?.forEach((point) => {
			if (point.value) {
				totalScore[playerName] += point.value;
			}
		});
	});

	// Sort players by total score descending
	const sortedPlayers = Object.entries(totalScore)
		.sort((a, b) => b[1] - a[1])
		.map(([name, score]) => ({ name, score }));

	return (
		<main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 p-2 sm:p-4 md:p-6">
			{/* Header */}
			<div className="flex items-center gap-4">
				<Link
					href="/history"
					className="bg-segment hover:bg-muted inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
				>
					<ChevronLeft />
				</Link>
				<div className="flex-1">
					<h1 className="text-4xl font-bold">{result.game.name}</h1>
					<p>{createdAt}</p>
				</div>
			</div>

			{/* Game Info */}
			<Card className="p-6">
				<div className="flex items-start gap-6">
					{result.game.thumbnailUrl && (
						<Avatar size="lg">
							<Avatar.Image src={result.game.thumbnailUrl} />
						</Avatar>
					)}
					<div className="flex-1">
						<p className="text-lg">
							<strong>Czas gry:</strong>{" "}
							{result.playingTime ? `${result.playingTime} minut` : "Nie podano"}
						</p>
					</div>
				</div>
			</Card>

			{/* Scores */}
			<div>
				<h2 className="mb-4 text-2xl font-bold">Wyniki</h2>

				{/* Final Standings */}
				<Card className="mb-6 p-6">
					<h3 className="mb-4 text-xl font-semibold">Klasyfikacja końcowa</h3>
					<div className="space-y-3">
						{sortedPlayers.map((player, index) => (
							<div key={player.name} className="flex items-center justify-between rounded-lg p-3">
								<div className="flex items-center gap-3">
									<Chip
										color={index === 0 ? "success" : index === 1 ? "warning" : "default"}
										variant="soft"
										className="font-bold"
									>
										#{index + 1}
									</Chip>
									<span className="text-lg font-semibold">{player.name}</span>
								</div>
								<span className="text-2xl font-bold">{player.score}</span>
							</div>
						))}
					</div>
				</Card>

				{/* Detailed Scores */}
				<Card className="p-6">
					<h3 className="mb-4 text-xl font-semibold">Szczegółowe wyniki</h3>
					<div className="space-y-4">
						{result.scores?.map((score) => (
							<div key={score.id} className="border-b border-gray-200 pb-4 last:border-b-0">
								<h4 className="mb-2 text-lg font-semibold">
									{score.player?.name || "Nieznany gracz"}
								</h4>
								<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
									{score.points?.map((point) => (
										<div key={point.id} className="rounded-lg border p-3">
											<div className="text-sm">{point.pointCategory.name}</div>
											<div className="text-2xl font-bold text-blue-600">{point.value ?? "-"}</div>
										</div>
									))}
								</div>
								<div className="mt-3 border-t border-gray-200 pt-3">
									<span className="font-semibold">
										Suma: {score.points?.reduce((sum, p) => sum + (p.value || 0), 0) ?? "-"}
									</span>
								</div>
							</div>
						))}
					</div>
				</Card>
			</div>
		</main>
	);
}
