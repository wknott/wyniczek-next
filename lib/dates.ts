export function formatDate(dateInput: unknown): string {
	const date = new Date(dateInput as string);
	const now = new Date();
	const diffDays = Math.floor((now.getTime() - date.getTime()) / 86_400_000);

	if (diffDays === 0) return "Dziś";
	if (diffDays === 1) return "Wczoraj";
	if (diffDays < 7) return `${diffDays} dni temu`;
	if (diffDays < 14) return "Tydzień temu";
	return date.toLocaleDateString("pl-PL", { day: "numeric", month: "short" });
}
