import { Suspense } from "react";
import { getResultById } from "../actions";
import { Avatar, Card, Chip } from "@heroui/react";
import Link from "next/link";
import { ChevronLeft } from "@gravity-ui/icons";
import { ResultDetailSkeleton } from "@/ui/molecues/Skeletons";
import { ImageCarousel } from "@/ui/molecues/ImageCarousel";

interface ResultPageProps {
	params: Promise<{
		id: string;
	}>;
}

async function ResultDetail({ id }: { id: string }) {
	const result = await getResultById(id);

	if (!result) {
		return (
			<div className="text-center">
				<h1 className="text-4xl font-bold">Wynik nie znaleziony</h1>
				<Link
					href="/results"
					className="mt-4 inline-flex items-center gap-2 text-accent hover:text-accent-hover"
				>
					<ChevronLeft />
					Wróć do historii
				</Link>
			</div>
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

	const sortedPlayers = Object.entries(totalScore)
		.sort((a, b) => b[1] - a[1])
		.map(([name, score]) => ({ name, score }));

	return (
		<>
			<div className="flex items-center gap-4">
				<Link
					href="/results"
					className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-segment transition-colors hover:bg-muted"
				>
					<ChevronLeft />
				</Link>
				<div className="flex-1">
					<h1 className="text-4xl font-bold">{result.game.name}</h1>
					<p>{createdAt}</p>
				</div>
			</div>

			{result.images && result.images.length > 0 && (
				<ImageCarousel images={result.images} />
			)}

			<Card className="p-6">
				<div className="flex items-start gap-6">
					{result.game.thumbnailUrl && (
						<Avatar size="lg">
							<Avatar.Image src={result.game.thumbnailUrl} />
						</Avatar>
					)}
					<div className="flex-1 space-y-2">
						<p className="text-lg">
							<strong>Czas gry:</strong>{" "}
							{result.playingTime ? `${result.playingTime} minut` : "Nie podano"}
						</p>
						{result.expansions && result.expansions.length > 0 && (
							<div>
								<p className="mb-1 text-sm font-semibold text-muted">Użyte dodatki</p>
								<div className="flex flex-wrap gap-2">
									{result.expansions.map((e) => (
										<Chip key={e.id} size="sm" variant="soft" color="accent">
											{e.name}
										</Chip>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</Card>

			<div>
				<h2 className="mb-4 text-2xl font-bold">Wyniki</h2>

				<Card className="mb-6 p-6">
					<h3 className="mb-4 text-xl font-semibold">Klasyfikacja końcowa</h3>
					<div className="space-y-3">
						{sortedPlayers.map((player, index) => (
							<div
								key={player.name}
								className="flex items-center justify-between rounded-lg p-3"
							>
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

				<Card className="p-6">
					<h3 className="mb-4 text-xl font-semibold">Szczegółowe wyniki</h3>
					<div className="space-y-4">
						{result.scores?.map((score) => (
							<div
								key={score.id}
								className="border-b border-separator pb-4 last:border-b-0"
							>
								<h4 className="mb-2 text-lg font-semibold">
									{score.player?.name || "Nieznany gracz"}
								</h4>
								<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
									{score.points?.map((point) => (
										<div key={point.id} className="rounded-lg border border-border p-3">
											<div className="text-sm">{point.pointCategory.name}</div>
											<div className="text-2xl font-bold text-accent">
												{point.value ?? "-"}
											</div>
										</div>
									))}
								</div>
								<div className="mt-3 border-t border-separator pt-3">
									<span className="font-semibold">
										Suma: {score.points?.reduce((sum, p) => sum + (p.value || 0), 0) ?? "-"}
									</span>
								</div>
							</div>
						))}
					</div>
				</Card>
			</div>
		</>
	);
}

export default async function ResultPage({ params }: ResultPageProps) {
	const { id } = await params;

	return (
		<main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 p-2 sm:p-4 md:p-6">
			<Suspense fallback={<ResultDetailSkeleton />}>
				<ResultDetail id={id} />
			</Suspense>
		</main>
	);
}
