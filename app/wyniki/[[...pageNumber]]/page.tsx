import { ResultTable } from "@/ui/organisms/ResultTable";
import { getResults } from "@/queries/getResults";

export default async function Results({ params }: { params: { pageNumber: string } }) {
	const { pageNumber } = await params;
	const response = await getResults(+pageNumber);
	const { results } = response;

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<ResultTable results={results} />
		</main>
	);
}
