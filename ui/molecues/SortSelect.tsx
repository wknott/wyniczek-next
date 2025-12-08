"use client";

import { Key, Label, ListBox, Select } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const SORT_OPTIONS = [
    { id: "LAST_PLAYED", name: "Ostatnio grane" },
    { id: "ALPHABETICAL", name: "Alfabetycznie" },
    { id: "POPULARITY", name: "Popularność" },
] as const;

type SortOption = (typeof SORT_OPTIONS)[number]["id"];

interface SortSelectProps {
    defaultValue?: SortOption;
}

export function SortSelect({ defaultValue = "LAST_PLAYED" }: SortSelectProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSort = (searchParams.get("sortBy") as SortOption) || defaultValue;

    const handleChange = useCallback(
        (value: Key | null) => {
            if (!value) return;

            const params = new URLSearchParams(searchParams.toString());
            params.set("sortBy", value as string);
            router.push(`?${params.toString()}`);
        },
        [router, searchParams]
    );

    return (
        <Select
            className="w-full md:w-[256px]"
            placeholder="Sortuj według"
            value={currentSort}
            onChange={handleChange}
        >
            <Label>Sortuj według</Label>
            <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
                <ListBox>
                    {SORT_OPTIONS.map((option) => (
                        <ListBox.Item key={option.id} id={option.id} textValue={option.name}>
                            {option.name}
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                    ))}
                </ListBox>
            </Select.Popover>
        </Select>
    );
}
