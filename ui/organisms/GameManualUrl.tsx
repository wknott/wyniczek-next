"use client";

import { useState, useTransition } from "react";
import { Button, Card, Spinner } from "@heroui/react";
import { updateGameManualUrl } from "@/app/games/actions";

interface GameManualUrlProps {
	gameId: string;
	initialUrl: string | null | undefined;
}

export const GameManualUrl = ({ gameId, initialUrl }: GameManualUrlProps) => {
	const [editing, setEditing] = useState(false);
	const [url, setUrl] = useState(initialUrl ?? "");
	const [isPending, startTransition] = useTransition();

	const handleSave = () => {
		startTransition(async () => {
			await updateGameManualUrl(gameId, url.trim() || null);
			setEditing(false);
		});
	};

	const handleDelete = () => {
		startTransition(async () => {
			await updateGameManualUrl(gameId, null);
			setUrl("");
			setEditing(false);
		});
	};

	if (!editing && !initialUrl) {
		return (
			<button
				onClick={() => setEditing(true)}
				className="text-muted hover:text-foreground text-sm underline underline-offset-4 transition-colors"
			>
				+ Dodaj link do instrukcji
			</button>
		);
	}

	if (!editing && initialUrl) {
		return (
			<Card>
				<Card.Header className="flex flex-row items-center gap-3">
					<a
						href={initialUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="text-accent flex-1 truncate text-sm underline underline-offset-4"
					>
						{initialUrl}
					</a>
					<button
						onClick={() => setEditing(true)}
						className="text-muted hover:text-foreground shrink-0 text-xs transition-colors"
					>
						Edytuj
					</button>
				</Card.Header>
			</Card>
		);
	}

	return (
		<Card>
			<Card.Header className="flex flex-col gap-3">
				<input
					type="url"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					placeholder="https://..."
					className="border-border bg-surface text-foreground placeholder:text-muted w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
					autoFocus
				/>
				<div className="flex gap-2">
					<Button
						size="sm"
						variant="primary"
						onPress={handleSave}
						isDisabled={isPending}
						isPending={isPending}
					>
						{isPending ? <><Spinner size="sm" color="current" /> Zapisywanie...</> : "Zapisz"}
					</Button>
					{initialUrl && (
						<Button
							size="sm"
							variant="danger-soft"
							onPress={handleDelete}
							isDisabled={isPending}
						>
							Usuń
						</Button>
					)}
					<button
						onClick={() => {
							setUrl(initialUrl ?? "");
							setEditing(false);
						}}
						className="text-muted hover:text-foreground px-2 text-sm transition-colors"
						disabled={isPending}
					>
						Anuluj
					</button>
				</div>
			</Card.Header>
		</Card>
	);
};
