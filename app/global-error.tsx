"use client";

export default function GlobalError({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html lang="pl">
			<body
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					minHeight: "80vh",
					fontFamily: "system-ui, sans-serif",
					background: "#0a0a0a",
					color: "#fafafa",
					padding: "1rem",
				}}
			>
				<div style={{ textAlign: "center", maxWidth: "400px" }}>
					<h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
						Coś poszło nie tak
					</h1>
					<p style={{ color: "#888", marginBottom: "1.5rem" }}>
						Wystąpił krytyczny błąd. Spróbuj odświeżyć stronę.
					</p>
					<button
						onClick={reset}
						style={{
							padding: "0.5rem 1.5rem",
							borderRadius: "0.5rem",
							border: "1px solid #333",
							background: "#1a1a1a",
							color: "#fafafa",
							cursor: "pointer",
							fontSize: "0.875rem",
						}}
					>
						Spróbuj ponownie
					</button>
				</div>
			</body>
		</html>
	);
}
