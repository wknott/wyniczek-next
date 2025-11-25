"use client";

import { usePathname } from "next/navigation";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

export function Pagination({ numberOfPages }: { numberOfPages: number }) {
	const pathname = usePathname();
	const currentPage = Number(pathname.split("/").pop()) || 1;

	const getHref = (page: number) => `/wyniki/${page}`;

	const prevPage = Math.max(1, currentPage - 1);
	const nextPage = Math.min(numberOfPages, currentPage + 1);

	return (
		<nav
			aria-label="pagination"
			className="mt-auto flex items-center justify-center border-t border-slate-200 px-4"
		>
			<ul className="flex items-center gap-1 py-4">
				<li>
					<ActiveLink href={getHref(1)} className="px-3 py-1 text-sm" aria-label="First page">
						« Pierwsza
					</ActiveLink>
				</li>
				<li>
					<ActiveLink
						href={getHref(prevPage)}
						className="px-3 py-1 text-sm"
						aria-label="Previous page"
					>
						‹ Poprzednia
					</ActiveLink>
				</li>
				<li>{currentPage}</li>
				<li>
					<ActiveLink href={getHref(nextPage)} className="px-3 py-1 text-sm" aria-label="Next page">
						Następna ›
					</ActiveLink>
				</li>
				<li>
					<ActiveLink
						href={getHref(numberOfPages)}
						className="px-3 py-1 text-sm"
						aria-label="Last page"
					>
						Ostatnia »
					</ActiveLink>
				</li>
			</ul>
		</nav>
	);
}
