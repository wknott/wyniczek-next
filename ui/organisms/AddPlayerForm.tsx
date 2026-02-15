"use client";

import {
    Button,
    Input,
    Label,
    Card,
} from "@heroui/react";
import { createPlayer } from "@/app/actions/createPlayer";

export const AddPlayerForm = () => {
    return (
        <Card className="mx-auto w-full max-w-md bg-content1/50 backdrop-blur-md">
            <Card.Header>
                <Card.Title className="text-2xl font-bold">Dodaj gracza</Card.Title>
            </Card.Header>
            <form action={createPlayer}>
                <Card.Content className="flex flex-col gap-6 py-6">
                    <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium">Nazwa gracza</Label>
                        <Input
                            name="name"
                            placeholder="Nazwa gracza"
                            required
                        />
                    </div>
                </Card.Content>
                <Card.Footer>
                    <Button type="submit" variant="primary" className="w-full" size="lg">
                        Dodaj gracza
                    </Button>
                </Card.Footer>
            </form>
        </Card>
    );
};
