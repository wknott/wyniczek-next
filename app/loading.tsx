import { FullscreenSpinner } from "@/ui/molecues/Skeletons";

export default function RootLoading() {
	return (
		<main className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center p-2 sm:p-4 md:p-6">
			<FullscreenSpinner />
		</main>
	);
}
