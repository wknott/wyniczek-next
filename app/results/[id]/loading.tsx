import { ResultDetailSkeleton } from "@/ui/molecues/Skeletons";

export default function ResultDetailLoading() {
	return (
		<main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 p-2 sm:p-4 md:p-6">
			<ResultDetailSkeleton />
		</main>
	);
}
