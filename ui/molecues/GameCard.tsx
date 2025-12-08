import { Avatar, Card, Chip } from "@heroui/react";

type GameCardProps = {
    id: string;
    name: string;
    thumbnailUrl?: string | null;
    latestResult?: {
        createdAt: unknown;
        scores?: Array<{ player?: { name: string } | null }> | null;
    } | null;
};

export const GameCard = ({ id, name, thumbnailUrl, latestResult }: GameCardProps) => {
    const createdAt = new Date(latestResult?.createdAt as string).toLocaleString("pl-PL", { dateStyle: "short" });

    return (
        <Card key={id} className="flex-grow-1">
            <Card.Header>
                <div className="flex items-center gap-4">
                    <Avatar size="lg">
                        <Avatar.Image src={thumbnailUrl || ""} />
                    </Avatar>
                    <Card.Title className="font-bold text-2xl">
                        {name}
                    </Card.Title>
                </div>
                <Card.Description className="mt-2">
                    Ostatnia rozgrywka: <strong>{createdAt}</strong>
                    <br />
                    Rozpoczynający:
                    <Chip className="ml-2">
                        <strong>{latestResult?.scores?.[0]?.player?.name}</strong>
                    </Chip>
                </Card.Description>
            </Card.Header>
        </Card>
    );
};
