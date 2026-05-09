"use client";

import { useState, useMemo } from "react";
import { Magnifier, Xmark, LayoutList } from "@gravity-ui/icons";
import { buttonVariants } from "@heroui/styles";
import Link from "next/link";
import { GameRow } from "@/ui/molecues/GameRow";
import type { GameItem } from "@/ui/molecues/GameRow";

type SortKey = "recent" | "alpha" | "plays" | "avgtime";

function playsCountFrom(records: { resultId: string }[]): number {
	return new Set(records.map((r) => r.resultId)).size;
}

interface GamesMainViewProps {
	games: GameItem[];
}

export function GamesMainView({ games }: GamesMainViewProps) {
	const [query, setQuery] = useState("");
	const [sortKey, setSortKey] = useState<SortKey>("recent");

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		return q ? games.filter((g) => g.name.toLowerCase().includes(q)) : games;
	}, [games, query]);

	const sorted = useMemo(() => {
		return [...filtered].sort((a, b) => {
			switch (sortKey) {
				case "recent": {
					const aDate = a.latestResult?.createdAt;
					const bDate = b.latestResult?.createdAt;
					if (!aDate && !bDate) return 0;
					if (!aDate) return 1;
					if (!bDate) return -1;
					return (
						new Date(bDate as string).getTime() -
						new Date(aDate as string).getTime()
					);
				}
				case "alpha":
					return a.name.localeCompare(b.name, "pl");
				case "plays":
					return playsCountFrom(b.records) - playsCountFrom(a.records);
				case "avgtime":
					return (
						(b.avgPlayingTime2Players ?? 0) - (a.avgPlayingTime2Players ?? 0)
					);
				default:
					return 0;
			}
		});
	}, [filtered, sortKey]);

	return (
		<div className="flex flex-col">
			<div className="sticky top-14 z-30 flex gap-2 border-b border-border bg-background px-3 py-2 sm:top-16">
				<div className="relative flex-1">
					<Magnifier className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted" />
					<input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Szukaj gry…"
						className="w-full rounded-lg border border-border bg-surface py-2 pl-8 pr-8 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
					/>
					{query && (
						<button
							onClick={() => setQuery("")}
							aria-label="Wyczyść"
							className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
						>
							<Xmark className="size-3.5" />
						</button>
					)}
				</div>

				<div className="relative shrink-0">
					<select
						value={sortKey}
						onChange={(e) => setSortKey(e.target.value as SortKey)}
						className="h-full appearance-none rounded-lg border border-border bg-surface py-2 pl-3 pr-7 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
					>
						<option value="recent">Ostatnio grane</option>
						<option value="alpha">Alfabetycznie</option>
						<option value="plays">Rozgrywki</option>
						<option value="avgtime">Śr. czas</option>
					</select>
					<svg
						className="pointer-events-none absolute right-2 top-1/2 size-3 -translate-y-1/2 text-muted"
						viewBox="0 0 12 12"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
					>
						<path
							d="M3 4.5l3 3 3-3"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
			</div>

			{sorted.length === 0 ? (
				query ? (
					<p className="px-3 py-10 text-center text-sm text-muted">
						Brak wyników dla „{query}"
					</p>
				) : (
					<div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
						<div className="flex size-14 items-center justify-center rounded-2xl bg-default-100 text-default-400">
							<LayoutList className="size-7" />
						</div>
						<div className="space-y-1">
							<p className="text-sm font-semibold text-foreground">Brak gier w kolekcji</p>
							<p className="text-xs text-muted">
								Zacznij grać i dodaj swoje pierwsze wyniki!
							</p>
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
				<ul className="divide-y divide-separator">
					{sorted.map((game) => (
						<GameRow key={game.id} game={game} />
					))}
				</ul>
			)}
		</div>
	);
}
