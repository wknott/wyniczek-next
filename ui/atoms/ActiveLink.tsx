"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { type Route } from "next";

type ActiveLinkProps = {
	href: string;
	children: React.ReactNode;
	className?: string;
	activeClassName?: string;
	exact?: boolean;
};

export const ActiveLink = ({ href, className, children, exact }: ActiveLinkProps) => {
	const pathname = usePathname();
	const isActive = exact ? pathname === href : pathname.includes(href);

	return (
		<Link
			href={href as Route}
			className={clsx(
				isActive ? "border-blue-500" : "border-transparent",
				"flex h-full min-w-[3rem] items-center justify-center border-b-2 px-1 pt-1 text-center text-sm font-medium text-slate-500 hover:border-gray-300 hover:text-slate-700",
				className,
			)}
			{...(isActive ? { "aria-current": true } : {})}
		>
			{children}
		</Link>
	);
};
