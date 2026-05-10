"use client";

import { useState, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Magnifier, Xmark, LayoutList } from "@gravity-ui/icons";
import { buttonVariants } from "@heroui/styles";
import Link from "next/link";
import { GameRow } from "@/ui/molecues/GameRow";
import type { GameItem } from "@/ui/molecues/GameRow";
import type { GameSortBy } from "@/gql/graphql";

const SORT_OPTIONS: { value: GameSortBy; label: string }[] = [
	{ value: "LAST_PLAYED", label: "Ostatnio grane" },
	{ value: "ALPHABETICAL", label: "Alfabetycznie" },
	{ value: "POPULARITY", label: "Rozgrywki" },
	{ value: "AVG_PLAYING_TIME_2P", label: "Śr. czas" },
];

interface GamesMainViewProps {
	games: GameItem[];
	sortBy: GameSortBy;
}

export function GamesMainView({ games, sortBy }: GamesMainViewProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [query, setQuery] = useState("");

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		return q ? games.filter((g) => g.name.toLowerCase().includes(q)) : games;
	}, [games, query]);

	function handleSortChange(value: GameSortBy) {
		const params = new URLSearchParams();
		if (value !== "LAST_PLAYED") params.set("sort", value);
		const qs = params.toString();
		startTransition(() => {
			router.replace(qs ? `/?${qs}` : "/", { scroll: false });
		});
	}

	return (
		<div className="flex flex-col">
			<div className="border-border bg-background sticky top-14 z-30 flex gap-2 border-b px-3 py-2 sm:top-16">
				<div className="relative flex-1">
					<Magnifier className="text-muted absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
					<input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Szukaj gry…"
						className="border-border bg-surface text-foreground placeholder:text-muted focus:ring-accent w-full rounded-lg border py-2 pr-8 pl-8 focus:ring-1 focus:outline-none"
					/>
					{query && (
						<button
							onClick={() => setQuery("")}
							aria-label="Wyczyść"
							className="text-muted hover:text-foreground absolute top-1/2 right-2.5 -translate-y-1/2"
						>
							<Xmark className="size-3.5" />
						</button>
					)}
				</div>

				<div className="relative shrink-0">
					<select
						value={sortBy}
						onChange={(e) => handleSortChange(e.target.value as GameSortBy)}
						disabled={isPending}
						className="border-border bg-surface text-foreground focus:ring-accent h-full appearance-none rounded-lg border py-2 pr-7 pl-3 text-sm focus:ring-1 focus:outline-none disabled:opacity-60"
					>
						{SORT_OPTIONS.map((opt) => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</select>
					<svg
						className="text-muted pointer-events-none absolute top-1/2 right-2 size-3 -translate-y-1/2"
						viewBox="0 0 12 12"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
					>
						<path d="M3 4.5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>
			</div>

			{filtered.length === 0 ? (
				query ? (
					<p className="text-muted px-3 py-10 text-center text-sm">Brak wyników dla „{query}"</p>
				) : (
					<div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
						<div className="bg-default-100 text-default-400 flex size-14 items-center justify-center rounded-2xl">
							<LayoutList className="size-7" />
						</div>
						<div className="space-y-1">
							<p className="text-foreground text-sm font-semibold">Brak gier w kolekcji</p>
							<p className="text-muted text-xs">Zacznij grać i dodaj swoje pierwsze wyniki!</p>
						</div>
						<Link
							href="/results/new"
							className={buttonVariants({ size: "sm", variant: "primary" })}
						>
							Dodaj pierwszy wynik
						</Link>
					</div>
				)
			) : (
				<ul
					className={`divide-separator divide-y transition-opacity ${isPending ? "opacity-50" : ""}`}
				>
					{filtered.map((game) => (
						<GameRow key={game.id} game={game} />
					))}
				</ul>
			)}
		</div>
	);
}
