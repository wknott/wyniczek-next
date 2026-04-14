import { GameDetailSkeleton } from "@/ui/molecues/Skeletons";
import { Skeleton } from "@heroui/react";

export default function GameDetailLoading() {
	return (
		<main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 p-4 md:p-8">
			<Skeleton className="h-5 w-32 rounded" />
			<GameDetailSkeleton />
		</main>
	);
}
