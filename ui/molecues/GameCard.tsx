import { Avatar, Button, Card, Chip } from "@heroui/react";
import Link from "next/link";
import { Plus, Calendar, PersonFill } from "@gravity-ui/icons";
import { GameCardDataFragment } from "@/gql/graphql";

export const GameCard = ({ id, name, thumbnailUrl, latestResult }: GameCardDataFragment) => {
	const createdAt = new Date(latestResult?.createdAt as string).toLocaleString("pl-PL", {
		dateStyle: "short",
	});

	return (
		<Card key={id}>
			<Card.Header className="flex flex-row items-center gap-4">
				<Link href={{ pathname: `/games/${id}` }} className="shrink-0 transition-transform hover:scale-105 active:scale-95">
					<Avatar size="lg">
						<Avatar.Image src={thumbnailUrl || ""} />
					</Avatar>
				</Link>
				<div className="flex-1 overflow-hidden">
					<Link href={{ pathname: `/games/${id}` }} className="block hover:text-primary transition-colors">
						<Card.Title className="truncate text-lg font-bold">{name}</Card.Title>
					</Link>
					<Card.Description className="mt-2 flex gap-2">
						<Chip>
							<Calendar className="mr-1" /> <strong>{createdAt}</strong>
						</Chip>
						<Chip>
							<PersonFill className="mr-1" />
							<strong>{latestResult?.scores?.[0]?.player?.name}</strong>
						</Chip>
					</Card.Description>
				</div>
				<Button isIconOnly className="ml-auto shrink-0">
					<Link
						href={{
							pathname: "/results/new/",
							query: {
								gameId: id,
								players: latestResult?.scores?.map((s) => s?.player?.id || "") || "",
							},
						}}
					>
						<Plus />
					</Link>
				</Button>
			</Card.Header>
		</Card>
	);
};
