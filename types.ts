export interface ResultsResponse {
	results: Result[];
	numberOfResults: number;
}

export interface Result {
	_id: string;
	game: Game;
	scores: Score[];
	author: string;
	date: string;
	playingTime: number;
	__v: number;
}

export interface Game {
	pointFields: string[];
	_id: string;
	name: string;
	minPlayers: number;
	maxPlayers: number;
	bggId: number;
	imgUrl: string;
	thumbnailUrl: string;
	__v: number;
}

export interface Score {
	points: number | undefined[];
	_id: string;
	user: User;
}

export interface User {
	name: string;
	id: string;
}
