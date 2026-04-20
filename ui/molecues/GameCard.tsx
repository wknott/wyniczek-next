import { Avatar, Card, Chip } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import Link from "next/link";
import { Plus, Calendar, PersonFill, Clock } from "@gravity-ui/icons";
import { GameCardDataFragment } from "@/gql/graphql";

export const GameCard = ({
	id,
	name,
	thumbnailUrl,
	latestResult,
	avgPlayingTime2Players,
}: GameCardDataFragment) => {
	const createdAt = new Date(latestResult?.createdAt as string).toLocaleString("pl-PL", {
		dateStyle: "short",
	});

	return (
		<Card key={id}>
			<Card.Header className="flex flex-row items-center gap-4">
				<Link
					href={{ pathname: `/games/${id}` }}
					className="flex flex-1 items-center gap-4 overflow-hidden"
				>
					<Avatar size="lg" className="shrink-0">
						<Avatar.Image src={thumbnailUrl || ""} />
					</Avatar>
					<div className="flex-1 overflow-hidden">
						<Card.Title className="truncate text-lg font-bold">{name}</Card.Title>
						<Card.Description className="mt-2 flex flex-wrap gap-2">
							<Chip>
								<Calendar className="mr-1" /> <strong>{createdAt}</strong>
							</Chip>
							<Chip>
								<PersonFill className="mr-1" />
								<strong>{latestResult?.scores?.[0]?.player?.name}</strong>
							</Chip>
							{avgPlayingTime2Players != null && (
								<Chip>
									<Clock className="mr-1" />
									<strong>~{avgPlayingTime2Players} min</strong>
								</Chip>
							)}
						</Card.Description>
					</div>
				</Link>
				<Link
					href={{
						pathname: "/results/new/",
						query: {
							gameId: id,
							players: latestResult?.scores?.map((s) => s?.player?.id || "") || "",
						},
					}}
					className={buttonVariants({ variant: "secondary", isIconOnly: true })}
				>
					<Plus />
				</Link>
			</Card.Header>
		</Card>
	);
};
