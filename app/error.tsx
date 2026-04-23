"use client";

import { Alert, Button } from "@heroui/react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<main className="flex min-h-[80vh] items-center justify-center p-4">
			<Alert status="danger" className="w-full max-w-md">
				<Alert.Indicator />
				<Alert.Content>
					<Alert.Title>Coś poszło nie tak</Alert.Title>
					<Alert.Description>
						{error.message || "Wystąpił nieoczekiwany błąd. Spróbuj ponownie."}
					</Alert.Description>
					<div className="mt-3 flex gap-3">
						<Button size="sm" variant="danger" onPress={reset}>
							Spróbuj ponownie
						</Button>
						<Button size="sm" variant="outline" onPress={() => (window.location.href = "/")}>
							Strona główna
						</Button>
					</div>
				</Alert.Content>
			</Alert>
		</main>
	);
}
