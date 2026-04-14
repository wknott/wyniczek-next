import { FullscreenSpinner } from "@/ui/molecues/Skeletons";

export default function NewPlayerLoading() {
	return (
		<main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center gap-6 p-4 md:p-8">
			<FullscreenSpinner label="Przygotowywanie formularza..." />
		</main>
	);
}
