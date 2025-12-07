import { ResultTable } from "@/ui/organisms/ResultTable";
import { Pagination } from "@/ui/molecues/Pagination";
import { ResultsGetListDocument } from "@/gql/graphql";
import { executeGraphql } from "@/api/executeGraphql";

const NUMBER_OF_PRODUCTS_PER_PAGE = 10;

export default async function Results({ params }: { params: { pageNumber: string } }) {
	const { pageNumber } = await params;
	const response = await executeGraphql(ResultsGetListDocument, { skip: (Number(pageNumber) - 1) * NUMBER_OF_PRODUCTS_PER_PAGE, take: NUMBER_OF_PRODUCTS_PER_PAGE });
	const { items: results, total: numberOfResults } = response.results;

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<ResultTable results={results} />
			<Pagination numberOfPages={Math.ceil(numberOfResults / NUMBER_OF_PRODUCTS_PER_PAGE)} />
		</main>
	);
}
