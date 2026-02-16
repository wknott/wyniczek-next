"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
	Bars,
	SquareListUl,
	Dice2,
	SquarePlus,
	PersonPlus,
} from "@gravity-ui/icons";
import {
	Dropdown,
	Description,
	Label,
} from "@heroui/react";
import { Route } from "next";

const menuItems = [
	{
		label: "Historia",
		href: "/results" as Route,
		icon: SquareListUl,
		description: "Przeglądaj historię gier",
	},
	{
		label: "Gry",
		href: "/games" as Route,
		icon: Dice2,
		description: "Twoja kolekcja gier",
	},
	{
		label: "Dodaj grę",
		href: "/games/new" as Route,
		icon: SquarePlus,
		description: "Dodaj nową grę do bazy",
	},
	{
		label: "Dodaj gracza",
		href: "/players/new" as Route,
		icon: PersonPlus,
		description: "Zarejestruj nowego gracza",
	},
];

export const Header = () => {
	const router = useRouter();

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
				<div className="flex items-center">
					<Link href="/" className="transition-opacity hover:opacity-80">
						<Image
							src="/header-logo.svg"
							alt="Wynniczek"
							width={140}
							height={48}
							priority
						/>
					</Link>
				</div>

				<nav className="hidden gap-8 md:flex">
					{menuItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="group relative flex items-center gap-2 py-2 text-sm font-semibold transition-colors hover:text-primary"
						>
							<item.icon className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
							<span>{item.label}</span>
							<span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
						</Link>
					))}
				</nav>

				<div className="flex md:hidden">
					<Dropdown>
						<Dropdown.Trigger>
							<Bars className="size-6 outline-none" />
						</Dropdown.Trigger>
						<Dropdown.Popover className="min-w-[240px] border-border/50 bg-background/90 backdrop-blur-lg">
							<Dropdown.Menu
								aria-label="Nawigacja mobilna"
								onAction={(key) => router.push(key as unknown as Route)}
							>
								<Dropdown.Section>
									{menuItems.map((item) => (
										<Dropdown.Item
											key={item.href}
											id={item.href}
											textValue={item.label}
											className="py-2"
										>
											<div className="flex items-center gap-3">
												<div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
													<item.icon className="size-4" />
												</div>
												<div className="flex flex-col">
													<Label className="cursor-pointer">{item.label}</Label>
													<Description>{item.description}</Description>
												</div>
											</div>
										</Dropdown.Item>
									))}
								</Dropdown.Section>
							</Dropdown.Menu>
						</Dropdown.Popover>
					</Dropdown>
				</div>
			</div>
		</header>
	);
};



