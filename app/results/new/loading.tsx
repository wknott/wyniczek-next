import { ScoringFormSkeleton } from "@/ui/molecues/Skeletons";

export default function ResultsNewLoading() {
	return (
		<main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-4 p-2 sm:p-4 md:p-6">
			<ScoringFormSkeleton />
		</main>
	);
}
