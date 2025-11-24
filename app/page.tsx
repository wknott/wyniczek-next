export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center p-8">
			<header className="flex w-full max-w-4xl items-center justify-between py-6">
				<div className="flex items-center gap-4">
					<div className="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-600 font-bold text-white">
						W
					</div>
					<div>
						<h1 className="text-2xl font-semibold">Wyniczek</h1>
						<p className="text-sm text-slate-500">Proste wpisywanie wyników gier planszowych</p>
					</div>
				</div>
			</header>

			<section className="w-full max-w-4xl rounded-xl p-8 shadow-md">
				<div className="flex flex-col items-center gap-6 md:flex-row">
					<div className="flex-1">
						<h2 className="mb-2 text-3xl font-bold">Zapisuj wyniki szybko i wygodnie</h2>
						<p className="mb-4 text-slate-600">
							Tymczasowa strona startowa — użyj przycisku poniżej, aby przejść do listy wyników albo
							dodać nowy wpis.
						</p>
					</div>

					<aside className="w-56">
						<div className="rounded-lg bg-slate-100 p-4">
							<h3 className="text-sm font-semibold text-slate-700">Przykładowy wpis</h3>
							<ul className="mt-2 space-y-1 text-sm text-slate-600">
								<li>Data: 2025-11-24</li>
								<li>Gra: Azul</li>
								<li>Wyniki: Jan 75, Ala 60</li>
							</ul>
						</div>
					</aside>
				</div>
			</section>

			<footer className="mt-8 w-full max-w-4xl text-center text-sm text-slate-500">
				<p>Wersja tymczasowa aplikacji Wyniczek — tylko do testów.</p>
			</footer>
		</main>
	);
}
