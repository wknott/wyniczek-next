import { ResultsList } from "@/ui/organisms/ResultsList";
import { getResultsPage } from "./actions";
export default async function HistoryPage() {
	const initialData = await getResultsPage(0);
	return (
		<main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center gap-6 p-2 sm:p-4 md:p-6">
			<div>
				<h1 className="text-4xl font-bold">Historia wyników</h1>
				<p>Razem: {initialData.total} wyników</p>
			</div>
			<div className="w-full">
				<ResultsList initialData={initialData} onPageChange={getResultsPage} />
			</div>
		</main>
	);
}
