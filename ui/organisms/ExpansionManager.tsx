"use client";

import { useState, useTransition } from "react";
import { Button, Input, Spinner } from "@heroui/react";
import { Plus, TrashBin, ChevronUp, ChevronDown, ChevronDown as ExpandIcon } from "@gravity-ui/icons";
import {
    createExpansion,
    updateExpansion,
    deleteExpansion,
} from "@/app/games/actions";

interface Category {
    id?: string | null;
    name: string;
    order: number;
}

interface Expansion {
    id: string;
    name: string;
    pointCategories?: Category[] | null;
}

interface ExpansionManagerProps {
    gameId: string;
    initialExpansions: Expansion[];
}

function ExpansionRow({
    gameId,
    expansion,
    onDeleted,
}: {
    gameId: string;
    expansion: Expansion;
    onDeleted: (id: string) => void;
}) {
    const [categories, setCategories] = useState<Category[]>(
        [...(expansion.pointCategories ?? [])].sort((a, b) => a.order - b.order),
    );
    const [isPending, startTransition] = useTransition();
    const [isDeleting, startDeleteTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);

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
        setCategories((prev) => reorder([...prev, { name: "", order: prev.length }]));
    };

    const remove = (index: number) => {
        setCategories((prev) => reorder(prev.filter((_, i) => i !== index)));
    };

    const save = () => {
        startTransition(async () => {
            await updateExpansion(gameId, expansion.id, undefined, categories);
        });
    };

    const handleDelete = () => {
        startDeleteTransition(async () => {
            await deleteExpansion(gameId, expansion.id);
            onDeleted(expansion.id);
        });
    };

    const initialSorted = [...(expansion.pointCategories ?? [])].sort(
        (a, b) => a.order - b.order,
    );
    const isDirty =
        JSON.stringify(categories) !== JSON.stringify(initialSorted);

    return (
        <div className="rounded-lg border border-slate-700 bg-slate-800/40">
            <div className="flex items-center gap-2 p-3">
                <button
                    type="button"
                    onClick={() => setIsOpen((v) => !v)}
                    className="flex flex-1 items-center gap-2 text-left font-semibold text-slate-200"
                >
                    <ExpandIcon
                        className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-0" : "-rotate-90"}`}
                    />
                    {expansion.name}
                    {expansion.pointCategories && expansion.pointCategories.length > 0 && (
                        <span className="text-xs text-slate-500">
                            ({expansion.pointCategories.length}{" "}
                            {expansion.pointCategories.length === 1 ? "kategoria" : "kategorie"})
                        </span>
                    )}
                </button>
                <Button
                    isIconOnly
                    size="sm"
                    variant="danger-soft"
                    isDisabled={isDeleting}
                    onClick={handleDelete}
                    aria-label="Usuń dodatek"
                >
                    {isDeleting ? <Spinner color="current" size="sm" /> : <TrashBin />}
                </Button>
            </div>

            {isOpen && (
                <div className="border-t border-slate-700 p-3 space-y-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">
                        Kategorie punktacji
                    </p>
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
                    <div className="flex gap-2 pt-1">
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
            )}
        </div>
    );
}

export const ExpansionManager = ({
    gameId,
    initialExpansions,
}: ExpansionManagerProps) => {
    const [expansions, setExpansions] = useState<Expansion[]>(initialExpansions);
    const [newName, setNewName] = useState("");
    const [isCreating, startCreateTransition] = useTransition();

    const handleCreate = () => {
        if (!newName.trim()) return;
        startCreateTransition(async () => {
            const created = await createExpansion(gameId, newName.trim());
            setExpansions((prev) => [...prev, created]);
            setNewName("");
        });
    };

    const handleDeleted = (id: string) => {
        setExpansions((prev) => prev.filter((e) => e.id !== id));
    };

    return (
        <div className="space-y-3">
            {expansions.length === 0 && (
                <p className="text-sm text-slate-500">Brak dodatków. Dodaj pierwszy poniżej.</p>
            )}

            {expansions.map((expansion) => (
                <ExpansionRow
                    key={expansion.id}
                    gameId={gameId}
                    expansion={expansion}
                    onDeleted={handleDeleted}
                />
            ))}

            <div className="flex gap-2 pt-1">
                <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Nazwa nowego dodatku"
                    className="flex-1"
                    onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                />
                <Button
                    size="sm"
                    variant="primary"
                    isDisabled={!newName.trim() || isCreating}
                    onClick={handleCreate}
                    className="gap-1 shrink-0"
                >
                    {isCreating ? <Spinner color="current" size="sm" /> : <><Plus /> Dodaj</>}
                </Button>
            </div>
        </div>
    );
};
