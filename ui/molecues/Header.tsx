"use client";

import Link from "next/link";
import Image from "next/image";
import {
	SquareListUl,
	Dice2,
	SquarePlus,
	PersonPlus,
} from "@gravity-ui/icons";
import { Route } from "next";
import { ThemeSwitch } from "@/ui/atoms/ThemeSwitch";

const menuItems = [
	{ label: "Historia", href: "/results" as Route, icon: SquareListUl },
	{ label: "Gry", href: "/games" as Route, icon: Dice2 },
	{ label: "Dodaj grę", href: "/games/new" as Route, icon: SquarePlus },
	{ label: "Dodaj gracza", href: "/players/new" as Route, icon: PersonPlus },
];

export const Header = () => {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur-md">
			<div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-3 sm:h-16 sm:px-6">
				<Link
					href="/"
					className="flex items-center transition-opacity hover:opacity-80"
				>
					<Image
						src="/header-logo.svg"
						alt="Wynniczek"
						width={140}
						height={48}
						priority
						className="h-9 w-auto sm:h-12"
					/>
				</Link>

				<nav className="hidden gap-8 md:flex">
					{menuItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="group relative flex items-center gap-2 py-2 text-sm font-semibold transition-colors hover:text-accent"
						>
							<item.icon className="size-4 text-muted transition-colors group-hover:text-accent" />
							<span>{item.label}</span>
							<span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
						</Link>
					))}
				</nav>

				<ThemeSwitch />
			</div>
		</header>
	);
};



