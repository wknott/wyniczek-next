import { Skeleton, Spinner } from "@heroui/react";

export const GameCardSkeleton = () => (
	<div className="flex items-center gap-4 rounded-lg border border-border bg-surface p-4">
		<Skeleton className="size-14 shrink-0 rounded-full" />
		<div className="flex flex-1 flex-col gap-2 overflow-hidden">
			<Skeleton className="h-4 w-3/4 rounded" />
			<div className="flex flex-wrap gap-2">
				<Skeleton className="h-5 w-20 rounded-full" />
				<Skeleton className="h-5 w-24 rounded-full" />
				<Skeleton className="h-5 w-16 rounded-full" />
			</div>
		</div>
		<Skeleton className="size-9 shrink-0 rounded-md" />
	</div>
);

export const HomepageGamesCardsSkeleton = ({ count = 6 }: { count?: number }) => (
	<>
		<div className="mb-4 flex w-full justify-end">
			<Skeleton className="h-10 w-44 rounded-md" />
		</div>
		<div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{Array.from({ length: count }).map((_, i) => (
				<GameCardSkeleton key={i} />
			))}
		</div>
	</>
);

export const GamesListSkeleton = ({ count = 6 }: { count?: number }) => (
	<div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{Array.from({ length: count }).map((_, i) => (
			<GameCardSkeleton key={i} />
		))}
	</div>
);

export const ResultsListSkeleton = ({ count = 5 }: { count?: number }) => (
	<div className="flex w-full flex-col gap-4">
		{Array.from({ length: count }).map((_, i) => (
			<div key={i} className="flex items-start gap-4 rounded-lg border border-border bg-surface p-4">
				<Skeleton className="size-14 shrink-0 rounded-full" />
				<div className="flex flex-1 flex-col gap-2 overflow-hidden">
					<Skeleton className="h-4 w-2/3 rounded" />
					<Skeleton className="h-3 w-1/2 rounded" />
					<div className="mt-1 flex flex-wrap gap-2">
						<Skeleton className="h-6 w-24 rounded-full" />
						<Skeleton className="h-6 w-24 rounded-full" />
					</div>
				</div>
			</div>
		))}
	</div>
);

export const GameDetailSkeleton = () => (
	<div className="w-full rounded-lg border border-border bg-surface p-4 md:p-8">
		<div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
			<Skeleton className="size-36 shrink-0 self-center rounded-3xl md:size-56 md:self-start" />
			<div className="flex flex-1 flex-col gap-4">
				<Skeleton className="h-9 w-3/4 rounded md:h-12" />
				<div className="flex flex-wrap gap-2">
					<Skeleton className="h-7 w-28 rounded-full" />
					<Skeleton className="h-7 w-24 rounded-full" />
					<Skeleton className="h-7 w-28 rounded-full" />
				</div>
				<Skeleton className="h-px w-full" />
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
					<Skeleton className="h-12 rounded-md" />
					<Skeleton className="h-12 rounded-md" />
				</div>
			</div>
		</div>
		<div className="mt-10 space-y-3">
			<Skeleton className="h-5 w-44 rounded" />
			<Skeleton className="h-16 w-full rounded-md" />
		</div>
		<div className="mt-6 space-y-3">
			<Skeleton className="h-5 w-32 rounded" />
			<Skeleton className="h-16 w-full rounded-md" />
		</div>
	</div>
);

export const ResultDetailSkeleton = () => (
	<div className="flex w-full flex-col gap-6">
		<div className="flex items-center gap-4">
			<Skeleton className="size-10 shrink-0 rounded-lg" />
			<div className="flex flex-1 flex-col gap-2">
				<Skeleton className="h-8 w-1/2 rounded md:h-10" />
				<Skeleton className="h-4 w-1/3 rounded" />
			</div>
		</div>
		<div className="rounded-lg border border-border bg-surface p-4 md:p-6">
			<div className="flex items-start gap-4">
				<Skeleton className="size-14 shrink-0 rounded-full" />
				<div className="flex-1 space-y-2">
					<Skeleton className="h-4 w-2/3 rounded" />
					<Skeleton className="h-3 w-1/2 rounded" />
				</div>
			</div>
		</div>
		<Skeleton className="h-6 w-32 rounded" />
		<div className="rounded-lg border border-border bg-surface p-4 md:p-6">
			<Skeleton className="mb-4 h-6 w-44 rounded" />
			<div className="space-y-3">
				{Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<Skeleton className="h-6 w-10 rounded-full" />
							<Skeleton className="h-5 w-32 rounded" />
						</div>
						<Skeleton className="h-7 w-12 rounded" />
					</div>
				))}
			</div>
		</div>
	</div>
);

export const ScoringFormSkeleton = () => (
	<div className="mx-auto w-full max-w-2xl space-y-6 px-4 py-6">
		<Skeleton className="h-12 w-full rounded-md" />
		<Skeleton className="h-5 w-32 rounded" />
		<div className="flex flex-wrap gap-2">
			<Skeleton className="h-9 w-24 rounded-md" />
			<Skeleton className="h-9 w-28 rounded-md" />
		</div>
		<div className="space-y-3">
			<Skeleton className="h-10 w-full rounded-md" />
			<Skeleton className="h-10 w-full rounded-md" />
			<Skeleton className="h-10 w-full rounded-md" />
		</div>
		<Skeleton className="h-12 w-full rounded-md" />
	</div>
);

export const FullscreenSpinner = ({ label = "Ładowanie..." }: { label?: string }) => (
	<div
		role="status"
		aria-live="polite"
		className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-3 p-6 text-muted"
	>
		<Spinner size="lg" color="accent" />
		<span className="text-sm">{label}</span>
	</div>
);
