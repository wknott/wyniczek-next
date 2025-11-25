import { ResultTable } from "@/ui/organisms/ResultTable";
import { getResults } from "@/api/results";
import { Pagination } from "@/ui/molecues/Pagination";

const NUMBER_OF_PRODUCTS_PER_PAGE = 10;

export default async function Results({ params }: { params: { pageNumber: string } }) {
	const { pageNumber } = await params;
	const response = await getResults(+pageNumber);
	const { results, numberOfResults } = response;

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<ResultTable results={results} />
			<Pagination numberOfPages={Math.ceil(numberOfResults / NUMBER_OF_PRODUCTS_PER_PAGE)} />
		</main>
	);
}
