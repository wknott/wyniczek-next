import { ResultTable } from "@/ui/organisms/ResultTable";
import { data } from "../data";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<ul>
				<li>
					<article>
						<ResultTable results={data.results} />
					</article>
				</li>
			</ul>
		</main>
	);
}
