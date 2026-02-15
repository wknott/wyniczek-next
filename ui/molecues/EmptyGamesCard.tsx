import { Button, Card } from "@heroui/react";
import Link from "next/link";

export const EmptyGamesCard = () => {
	return (
		<Card className="flex items-center justify-center px-6 py-16">
			<div className="text-center">
				<div className="mb-4 text-6xl">📭</div>
				<h3 className="text-default-700 mb-2 text-xl font-semibold">Brak wyników gier</h3>
				<p className="text-default-500 mb-6">
					Nie ma żadnych wyników gier w bazie danych. Zacznij grać i dodaj swoje pierwsze wyniki!
				</p>
				<Link href="/results/new">
					<Button size="lg" className="bg-blue-500 text-white">
						Dodaj pierwszy wynik
					</Button>
				</Link>
			</div>
		</Card>
	);
};
