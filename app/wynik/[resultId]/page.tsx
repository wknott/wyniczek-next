import { getResultById } from "@/api/results";

export default async function ResultPage({
	params,
}: {
	params: {
		resultId: string;
	};
}) {
	const { resultId } = await params;
	const result = await getResultById(resultId);

	return (
		<main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-lg">
				<h1 className="mb-8 text-4xl font-bold text-gray-900">Wynik Gry</h1>

				<div className="space-y-6">
					<div className="flex items-center gap-4 border-b border-gray-200 pb-6">
						<img
							src={result.game?.imgUrl}
							alt={result.game?.name}
							className="h-24 w-24 rounded-lg object-cover"
						/>
						<div>
							<p className="text-sm text-gray-500">Gra</p>
							<p className="text-2xl font-semibold text-gray-900">{result.game?.name}</p>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<p className="text-sm text-gray-500">Autor</p>
							<p className="text-lg font-medium text-gray-900">{result.author}</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">Data</p>
							<p className="text-lg font-medium text-gray-900">
								{new Date(result.date).toLocaleDateString()}
							</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">Czas gry</p>
							<p className="text-lg font-medium text-gray-900">{result.playingTime} min</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">ID Wyniku</p>
							<p className="truncate text-lg font-medium text-gray-900">{result._id}</p>
						</div>
					</div>

					<div className="border-t border-gray-200 pt-6">
						<h2 className="mb-4 text-xl font-bold text-gray-900">Wyniki graczy</h2>
						<ul className="space-y-3">
							{result.scores.map((score) => (
								<li
									key={score._id}
									className="flex items-center justify-between rounded-lg bg-gray-100 p-4"
								>
									<span className="font-medium text-gray-900">{score.user.name}</span>
									<span className="text-lg font-semibold text-blue-600">
										{Array.isArray(score.points) ? score.points.join(", ") : score.points || 0} pkt
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</main>
	);
}
