"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "@gravity-ui/icons";
import { buttonVariants } from "@heroui/styles";
import { formatDate } from "@/lib/dates";
import type { GetGamesMainViewQuery } from "@/gql/graphql";

export type GameItem = GetGamesMainViewQuery["games"]["items"][number];

export function GameRow({ game }: { game: GameItem }) {
	const router = useRouter();
	const { latestResult, resultsCount } = game;
	const winner = latestResult?.scores?.[0]?.player;

	function handleRowClick() {
		if (latestResult?.id) {
			router.push(`/results/${latestResult.id}`);
		} else {
			router.push(`/results/new?gameId=${game.id}`);
		}
	}

	return (
		<li className="flex items-center">
			<button
				onClick={handleRowClick}
				className="flex min-w-0 flex-1 items-center gap-2 py-1.5 pl-2.5 text-left"
			>
				{game.thumbnailUrl ? (
					<img src={game.thumbnailUrl} alt="" className="size-5 shrink-0 rounded object-cover" />
				) : (
					<span className="bg-accent/10 text-accent flex size-5 shrink-0 items-center justify-center rounded text-[9px] font-bold">
						{game.name[0]?.toUpperCase()}
					</span>
				)}

				<div className="min-w-0 flex-1">
					<div className="flex min-w-0 items-center gap-1">
						<span className="text-foreground min-w-0 truncate text-[13px] leading-tight font-bold">
							{game.name}
						</span>
						{game.bggRank != null && game.bggRank <= 10 && (
							<span className="bg-accent/15 text-accent shrink-0 rounded px-[5px] py-[1px] text-[9px] leading-none font-extrabold">
								Top 10
							</span>
						)}
					</div>

					<div className="flex items-center gap-1 pt-0.5">
						{latestResult && winner && (
							<>
								<span className="border-accent/40 bg-accent/10 text-accent flex size-[15px] shrink-0 items-center justify-center rounded-full border text-[8px] font-bold">
									{winner.name[0]?.toUpperCase()}
								</span>
								<span className="text-foreground/70 max-w-[60px] truncate text-[11px] font-semibold">
									{winner.name}
								</span>
								<span className="text-muted text-[11px]">·</span>
							</>
						)}
						{game.avgPlayingTime2Players != null && latestResult && (
							<span className="bg-surface text-muted inline-flex items-center rounded px-1.5 py-0.5 text-[10px]">
								⏱ {game.avgPlayingTime2Players}min
							</span>
						)}
						<span className="bg-surface text-muted inline-flex items-center rounded px-1.5 py-0.5 text-[10px]">
							🎲 {resultsCount}×
						</span>
						{latestResult?.createdAt != null && (
							<span className="text-muted/70 ml-auto shrink-0 text-[10px]">
								{formatDate(latestResult.createdAt)}
							</span>
						)}
					</div>
				</div>
			</button>

			<Link
				href={`/results/new?gameId=${game.id}`}
				className={
					buttonVariants({ variant: "secondary", isIconOnly: true, size: "sm" }) + " mx-2.5"
				}
				aria-label={`Dodaj wynik dla ${game.name}`}
			>
				<Plus className="size-4" />
			</Link>
		</li>
	);
}
