"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "@gravity-ui/icons";
import { Switch } from "@heroui/react";

export const ThemeSwitch = () => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const isDark = mounted ? theme === "dark" : true;

	return (
		<Switch
			size="lg"
			isSelected={isDark}
			onChange={(selected: boolean) => setTheme(selected ? "dark" : "light")}
			aria-label={isDark ? "Włącz jasny motyw" : "Włącz ciemny motyw"}
		>
			{({ isSelected }) => (
				<Switch.Control>
					<Switch.Thumb>
						<Switch.Icon>
							{isSelected ? (
								<Moon className="size-3 text-inherit opacity-100" />
							) : (
								<Sun className="size-3 text-inherit opacity-70" />
							)}
						</Switch.Icon>
					</Switch.Thumb>
				</Switch.Control>
			)}
		</Switch>
	);
};
