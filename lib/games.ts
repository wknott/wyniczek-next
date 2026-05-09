export function playsCount(records: { resultId: string }[]): number {
	return new Set(records.map((r) => r.resultId)).size;
}
