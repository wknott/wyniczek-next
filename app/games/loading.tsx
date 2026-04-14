import { GamesListSkeleton } from "@/ui/molecues/Skeletons";
import { Skeleton } from "@heroui/react";

export default function GamesLoading() {
	return (
		<main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center gap-6 p-2 sm:p-4 md:p-6">
			<div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
				<Skeleton className="h-10 w-40 rounded" />
				<Skeleton className="h-10 w-44 rounded-md" />
			</div>
			<GamesListSkeleton />
		</main>
	);
}
