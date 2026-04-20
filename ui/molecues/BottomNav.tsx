"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import type { Route } from "next";
import type { ComponentType, SVGProps } from "react";
import {
	House,
	Dice2,
	Plus,
	SquareListUl,
	Ellipsis,
	SquarePlus,
	PersonPlus,
	Persons,
} from "@gravity-ui/icons";
import { Dropdown, Description, Label } from "@heroui/react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface TabItem {
	label: string;
	href: Route;
	icon: IconComponent;
}

const leftItems: TabItem[] = [
	{ label: "Dom", href: "/" as Route, icon: House },
	{ label: "Gry", href: "/games" as Route, icon: Dice2 },
];

const rightItems: TabItem[] = [
	{ label: "Historia", href: "/results" as Route, icon: SquareListUl },
];

const moreItems = [
	{
		label: "Gracze",
		href: "/players" as Route,
		icon: Persons,
		description: "Lista graczy i rekordy",
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

const CENTER_HREF = "/results/new" as Route;

const isTabActive = (pathname: string, href: string) => {
	if (href === "/") return pathname === "/";
	if (pathname === CENTER_HREF) return false;
	return pathname === href || pathname.startsWith(`${href}/`);
};

const NavTab = ({
	href,
	label,
	icon: Icon,
	active,
}: TabItem & { active: boolean }) => (
	<Link
		href={href}
		aria-current={active ? "page" : undefined}
		className={`group flex h-full flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
			active ? "text-accent" : "text-muted hover:text-foreground"
		}`}
	>
		<Icon
			className={`size-5 transition-transform duration-200 ${
				active ? "-translate-y-0.5 scale-110" : ""
			}`}
		/>
		<span className="leading-none">{label}</span>
		<span
			aria-hidden
			className={`mt-0.5 h-0.5 w-5 rounded-full transition-all duration-200 ${
				active ? "bg-accent opacity-100" : "opacity-0"
			}`}
		/>
	</Link>
);

export const BottomNav = () => {
	const router = useRouter();
	const pathname = usePathname();
	const isCenterActive = pathname === CENTER_HREF;

	return (
		<nav
			aria-label="Nawigacja dolna"
			className="fixed inset-x-0 bottom-0 z-40 md:hidden"
			style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
		>
			<div className="border-t border-border bg-background/85 backdrop-blur-xl">
				<ul className="relative mx-auto grid h-16 max-w-xl grid-cols-5 items-stretch">
					{leftItems.map((item) => (
						<li key={item.href} className="contents">
							<NavTab {...item} active={isTabActive(pathname, item.href)} />
						</li>
					))}

					<li className="relative flex items-center justify-center">
						<Link
							href={CENTER_HREF}
							aria-label="Dodaj wynik"
							aria-current={isCenterActive ? "page" : undefined}
							className={`flex size-14 -translate-y-5 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/30 ring-4 ring-background transition-transform duration-200 active:scale-95 ${
								isCenterActive ? "scale-105" : ""
							}`}
						>
							<Plus className="size-6" />
						</Link>
					</li>

					{rightItems.map((item) => (
						<li key={item.href} className="contents">
							<NavTab {...item} active={isTabActive(pathname, item.href)} />
						</li>
					))}

					<li className="flex">
						<Dropdown>
							<Dropdown.Trigger
								aria-label="Więcej"
								className="flex h-full w-full flex-col items-center justify-center gap-1 bg-transparent text-[11px] font-medium text-muted outline-none transition-colors hover:text-foreground"
							>
								<Ellipsis className="size-5" />
								<span className="leading-none">Więcej</span>
								<span aria-hidden className="mt-0.5 h-0.5 w-5 rounded-full opacity-0" />
							</Dropdown.Trigger>
							<Dropdown.Popover
								placement="top end"
								className="min-w-[260px] border-border bg-background/95 backdrop-blur-lg"
							>
								<Dropdown.Menu
									aria-label="Dodatkowe akcje"
									onAction={(key) => router.push(key as unknown as Route)}
								>
									<Dropdown.Section>
										{moreItems.map((item) => (
											<Dropdown.Item
												key={item.href}
												id={item.href}
												textValue={item.label}
												className="py-2"
											>
												<div className="flex items-center gap-3">
													<div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
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
					</li>
				</ul>
			</div>
		</nav>
	);
};
