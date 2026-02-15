"use client";
import { Card, Avatar, Button, ButtonGroup, Chip } from "@heroui/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "@gravity-ui/icons";
import Link from "next/link";
interface ResultsItem {
	id: string;
	createdAt: unknown;
	playingTime?: number | null;
	game: {
		name: string;
		thumbnailUrl?: string | null;
	};
	scores?: Array<{
		player?: {
			name: string;
		} | null;
		points?: Array<{
			value?: number | null;
		}> | null;
	}> | null;
}
interface ResultsListProps {
	initialData: {
		total: number;
		items: ResultsItem[];
	};
	onPageChange: (skip: number) => Promise<any>;
}
export const ResultsList = ({ initialData, onPageChange }: ResultsListProps) => {
	const itemsPerPage = 10;
	const [data, setData] = useState(initialData);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const totalPages = Math.ceil(data.total / itemsPerPage);

	const handlePageChange = async (newPage: number) => {
		setIsLoading(true);
		setCurrentPage(newPage);
		const skip = (newPage - 1) * itemsPerPage;
		try {
			const newData = await onPageChange(skip);
			setData(newData);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col gap-4">
			{isLoading && <div className="text-center">Ładowanie...</div>}
			{!isLoading && data.items.length === 0 && <div className="text-center">Brak wyników</div>}
			{!isLoading &&
				data.items.map((result) => (
					<Link key={result.id} href={`/results/${result.id}`} className="block hover:no-underline">
						<Card className="hover:bg-separator p-4 transition-all hover:shadow-lg">
							<div className="flex gap-4">
								<Avatar size="lg">
									<Avatar.Image src={result.game.thumbnailUrl || ""} />
								</Avatar>
								<div className="flex flex-1 flex-col gap-1 lg:flex-row lg:gap-8">
									<div>
										<h3 className="text-lg font-semibold">{result.game.name}</h3>
										<p className="text-sm">
											{new Date(result.createdAt as string).toLocaleString("pl-PL", {
												dateStyle: "short",
												timeStyle: "short",
											})}
											{result.playingTime && ` • ${result.playingTime} min`}
										</p>
									</div>
									<div className="flex flex-wrap gap-3">
										{result.scores?.map((score, idx) => (
											<Chip key={idx} className="flex gap-2 font-semibold">
												<span>{score.player?.name || "Nieznany"}</span>
												<span>
													{score?.points?.reduce((a, b) => a + +(b.value || 0), 0) ?? "-"}
												</span>
											</Chip>
										))}
									</div>
								</div>
							</div>
						</Card>
					</Link>
				))}
			{totalPages > 1 && !isLoading && (
				<div className="flex items-center justify-center gap-4">
					<ButtonGroup>
						<Button
							isDisabled={currentPage === 1 || isLoading}
							onClick={() => handlePageChange(currentPage - 1)}
							size="sm"
						>
							<ChevronLeft /> Poprzednia
						</Button>
						<Button isDisabled className="pointer-events-none">
							Strona {currentPage} z {totalPages}
						</Button>
						<Button
							isDisabled={currentPage === totalPages || isLoading}
							onClick={() => handlePageChange(currentPage + 1)}
							size="sm"
						>
							Następna <ChevronRight />
						</Button>
					</ButtonGroup>
				</div>
			)}
		</div>
	);
};
