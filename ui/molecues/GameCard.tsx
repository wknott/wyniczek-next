import { Avatar, Button, Card, Chip } from "@heroui/react";
import Link from "next/link";
import { Plus } from "@gravity-ui/icons";
import { GameCardDataFragment } from "@/gql/graphql";

export const GameCard = ({ id, name, thumbnailUrl, latestResult }: GameCardDataFragment) => {
	const createdAt = new Date(latestResult?.createdAt as string).toLocaleString("pl-PL", {
		dateStyle: "short",
	});

	return (
		<Card key={id} className="flex-grow-1 md:w-xs">
			<Card.Header>
				<div className="flex items-center gap-4">
					<Avatar size="lg">
						<Avatar.Image src={thumbnailUrl || ""} />
					</Avatar>
					<Card.Title className="text-2xl font-bold">{name}</Card.Title>
					<Button isIconOnly className="ml-auto shrink-0">
						<Link
							href={{
								pathname: "/result/new/",
								query: {
									gameId: id,
									players: latestResult?.scores?.map((s) => s?.player?.id || "") || "",
								},
							}}
						>
							<Plus />
						</Link>
					</Button>
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
