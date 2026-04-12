"use client";

import { useState, useTransition } from "react";
import { Button, Input, Spinner } from "@heroui/react";
import { Plus, TrashBin, ChevronUp, ChevronDown } from "@gravity-ui/icons";
import { updateGameCategories } from "@/app/games/actions";

interface Category {
    id?: string | null;
    name: string;
    order: number;
}

interface CategoryManagerProps {
    gameId: string;
    initialCategories: Category[];
}

export const CategoryManager = ({ gameId, initialCategories }: CategoryManagerProps) => {
    const [categories, setCategories] = useState<Category[]>(
        [...initialCategories].sort((a, b) => a.order - b.order),
    );
    const [isPending, startTransition] = useTransition();

    const reorder = (list: Category[]) =>
        list.map((cat, index) => ({ ...cat, order: index }));

    const move = (index: number, direction: -1 | 1) => {
        const next = [...categories];
        const target = index + direction;
        if (target < 0 || target >= next.length) return;
        [next[index], next[target]] = [next[target], next[index]];
        setCategories(reorder(next));
    };

    const rename = (index: number, name: string) => {
        const next = [...categories];
        next[index] = { ...next[index], name };
        setCategories(next);
    };

    const add = () => {
        setCategories((prev) =>
            reorder([...prev, { name: "", order: prev.length }]),
        );
    };

    const remove = (index: number) => {
        setCategories((prev) => reorder(prev.filter((_, i) => i !== index)));
    };

    const save = () => {
        startTransition(async () => {
            await updateGameCategories(gameId, categories);
        });
    };

    const isDirty =
        JSON.stringify(categories) !==
        JSON.stringify([...initialCategories].sort((a, b) => a.order - b.order));

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                {categories.map((cat, index) => (
                    <div key={cat.id ?? `new-${index}`} className="flex items-center gap-2">
                        <div className="flex flex-col">
                            <Button
                                isIconOnly
                                size="sm"
                                variant="ghost"
                                isDisabled={index === 0}
                                onClick={() => move(index, -1)}
                                aria-label="Przesuń wyżej"
                            >
                                <ChevronUp />
                            </Button>
                            <Button
                                isIconOnly
                                size="sm"
                                variant="ghost"
                                isDisabled={index === categories.length - 1}
                                onClick={() => move(index, 1)}
                                aria-label="Przesuń niżej"
                            >
                                <ChevronDown />
                            </Button>
                        </div>
                        <Input
                            value={cat.name}
                            onChange={(e) => rename(index, e.target.value)}
                            placeholder="Nazwa kategorii"
                            className="flex-1"
                        />
                        <Button
                            isIconOnly
                            size="sm"
                            variant="danger-soft"
                            onClick={() => remove(index)}
                            aria-label="Usuń kategorię"
                        >
                            <TrashBin />
                        </Button>
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={add} className="gap-1">
                    <Plus /> Dodaj kategorię
                </Button>
                <Button
                    size="sm"
                    variant="primary"
                    isDisabled={!isDirty || isPending}
                    onClick={save}
                >
                    {isPending ? <Spinner color="current" size="sm" /> : "Zapisz"}
                </Button>
            </div>
        </div>
    );
};
