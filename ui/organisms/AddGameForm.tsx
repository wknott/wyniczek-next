"use client";

import { useState, useCallback } from "react";
import {
    Button,
    Input,
    Autocomplete,
    EmptyState,
    Label,
    ListBox,
    SearchField,
    useFilter,
    Card,
    type Key,
} from "@heroui/react";
import { Plus, TrashBin, Magnifier } from "@gravity-ui/icons";
import { searchBgg } from "@/app/actions/searchBgg";
import { createGame } from "@/app/actions/createGame";

interface BggGame {
    bggId: string;
    name: string;
}

export const AddGameForm = () => {
    const [gameName, setGameName] = useState("");
    const [bggId, setBggId] = useState("");
    const [categories, setCategories] = useState(["Punkty"]);
    const [searchResults, setSearchResults] = useState<BggGame[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedKey, setSelectedKey] = useState<Key | null>(null);

    const { contains } = useFilter({ sensitivity: "base" });

    const handleSearch = useCallback(async (query: string) => {
        setSearchQuery(query);
        if (query.length < 3) {
            setSearchResults([]);
            return;
        }
        setIsSearching(true);
        try {
            const results = await searchBgg(query);
            setSearchResults(results as BggGame[]);
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setIsSearching(false);
        }
    }, []);

    const handleSelectionChange = (key: Key | null) => {
        setSelectedKey(key);
        if (!key) return;
        const selected = searchResults.find((r) => r.bggId === String(key));
        if (selected) {
            setGameName(selected.name);
            setBggId(selected.bggId);
        }
    };

    const addCategory = () => {
        setCategories([...categories, ""]);
    };

    const removeCategory = (index: number) => {
        setCategories(categories.filter((_, i) => i !== index));
    };

    const updateCategory = (index: number, value: string) => {
        const newCats = [...categories];
        newCats[index] = value;
        setCategories(newCats);
    };

    return (
        <Card className="mx-auto w-full max-w-2xl bg-content1/50 backdrop-blur-md">
            <Card.Header>
                <Card.Title className="text-2xl font-bold">Dodaj nową grę</Card.Title>
                <Card.Description>Wyszukaj grę na BGG lub wpisz dane ręcznie</Card.Description>
            </Card.Header>
            <form action={createGame}>
                <Card.Content className="flex flex-col gap-6 py-6">
                    <div className="flex flex-col gap-2">
                        <Autocomplete
                            className="w-full"
                            placeholder="Wyszukaj na BGG..."
                            selectionMode="single"
                            value={selectedKey}
                            onChange={handleSelectionChange}
                            allowsEmptyCollection
                        >
                            <Label className="text-sm font-medium">Szukaj w bazie BoardGameGeek</Label>
                            <Autocomplete.Trigger>
                                <Autocomplete.Value />
                                <Autocomplete.ClearButton />
                                <Autocomplete.Indicator />
                            </Autocomplete.Trigger>
                            <Autocomplete.Popover>
                                <Autocomplete.Filter filter={contains}>
                                    <SearchField
                                        autoFocus
                                        name="search"
                                        variant="secondary"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                    >
                                        <SearchField.Group>
                                            <Magnifier />
                                            <SearchField.Input placeholder="Wpisz min. 3 znaki..." />
                                            <SearchField.ClearButton />
                                        </SearchField.Group>
                                    </SearchField>
                                    <ListBox
                                        renderEmptyState={() => (
                                            <EmptyState>
                                                {isSearching ? "Szukanie..." : "Nie znaleziono gier"}
                                            </EmptyState>
                                        )}
                                    >
                                        {searchResults.map((game) => (
                                            <ListBox.Item
                                                key={game.bggId}
                                                id={game.bggId}
                                                textValue={game.name}
                                            >
                                                {game.name}
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Autocomplete.Filter>
                            </Autocomplete.Popover>
                        </Autocomplete>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium">Nazwa gry</Label>
                        <Input
                            name="name"
                            placeholder="Wpisz nazwę gry"
                            value={gameName}
                            onChange={(e) => setGameName(e.target.value)}
                            required
                        />
                    </div>

                    <input type="hidden" name="bggId" value={bggId} />

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Kategorie punktacji</h3>
                            <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onPress={addCategory}
                            >
                                <Plus className="mr-1" /> Dodaj kategorię
                            </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                            {categories.map((cat, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        name="categories"
                                        placeholder="Nazwa kategorii"
                                        value={cat}
                                        onChange={(e) => updateCategory(index, e.target.value)}
                                        required
                                    />
                                    {categories.length > 1 && (
                                        <Button
                                            isIconOnly
                                            variant="danger"
                                            onPress={() => removeCategory(index)}
                                        >
                                            <TrashBin />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </Card.Content>
                <Card.Footer>
                    <Button type="submit" variant="primary" className="w-full" size="lg">
                        Dodaj grę do kolekcji
                    </Button>
                </Card.Footer>
            </form>
        </Card>
    );
};
