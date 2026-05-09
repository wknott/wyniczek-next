"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "@gravity-ui/icons";
import { buttonVariants } from "@heroui/styles";
import { playsCount } from "@/lib/games";
import { formatDate } from "@/lib/dates";
import type { GetGamesMainViewQuery } from "@/gql/graphql";

export type GameItem = GetGamesMainViewQuery["games"]["items"][number];

export function GameRow({ game }: { game: GameItem }) {
	const router = useRouter();
	const plays = playsCount(game.records);
	const { latestResult } = game;
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
					<img
						src={game.thumbnailUrl}
						alt=""
						className="size-5 shrink-0 rounded object-cover"
					/>
				) : (
					<span className="flex size-5 shrink-0 items-center justify-center rounded bg-accent/10 text-[9px] font-bold text-accent">
						{game.name[0]?.toUpperCase()}
					</span>
				)}

				<div className="min-w-0 flex-1">
					<div className="flex min-w-0 items-center gap-1">
						<span className="min-w-0 truncate text-[13px] font-bold leading-tight text-foreground">
							{game.name}
						</span>
						{game.bggRank != null && game.bggRank <= 10 && (
							<span className="shrink-0 rounded bg-accent/15 px-[5px] py-[1px] text-[9px] font-extrabold leading-none text-accent">
								Top 10
							</span>
						)}
					</div>

					<div className="flex items-center gap-1 pt-0.5">
						{latestResult && winner && (
							<>
								<span className="flex size-[15px] shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-[8px] font-bold text-accent">
									{winner.name[0]?.toUpperCase()}
								</span>
								<span className="max-w-[60px] truncate text-[11px] font-semibold text-foreground/70">
									{winner.name}
								</span>
								<span className="text-[11px] text-muted">·</span>
							</>
						)}
						{game.avgPlayingTime2Players != null && latestResult && (
							<span className="inline-flex items-center rounded bg-surface px-1.5 py-0.5 text-[10px] text-muted">
								⏱ {game.avgPlayingTime2Players}min
							</span>
						)}
						<span className="inline-flex items-center rounded bg-surface px-1.5 py-0.5 text-[10px] text-muted">
							🎲 {plays}×
						</span>
						{latestResult?.createdAt != null && (
							<span className="ml-auto shrink-0 text-[10px] text-muted/70">
								{formatDate(latestResult.createdAt)}
							</span>
						)}
					</div>
				</div>
			</button>

			<Link
				href={`/results/new?gameId=${game.id}`}
				className={buttonVariants({ variant: "secondary", isIconOnly: true, size: "sm" }) + " mx-2.5"}
				aria-label={`Dodaj wynik dla ${game.name}`}
			>
				<Plus className="size-4" />
			</Link>
		</li>
	);
}
